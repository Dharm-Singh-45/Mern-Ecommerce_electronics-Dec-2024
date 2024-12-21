import stripe from "../../config/stripe.js";
import AddToCartModel from "../../models/cartProduct.js";
import OrderModel from "../../models/orderModel.js";

const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY;

const getLineItems = async (lineItems) => {
  let productItems = [];

  if (lineItems?.data?.length) {
    for (const item of lineItems.data) {
      const product = await stripe.products.retrieve(item.price.product);
      const productId = product.metadata.productId;
      const productData = {
        productId: productId,
        name: product.name,
        price: item.price.unit_amount / 100,
        quantity: item.quantity,
        image: product.images,
      };

      productItems.push(productData);
    }
  }
  return productItems;
};

const webhooks = async (req, res) => {
  const signature = req.headers["stripe-signature"];
  const payloadString = JSON.stringify(req.body);

  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: endpointSecret,
  });

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payloadString,
      header,
      endpointSecret
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;

      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id
      );

      const productDetails = await getLineItems(lineItems);

      const orderDetails = {
        productDetails: productDetails,
        email: session.customer_email,
        userId: session.metadata.userId,
        paymentDetails: {
          paymentId: session.payment_intent,
          payment_method_type: session.payment_method_types,
          payment_status: session.payment_status,
        },
        shipping_options: session.shipping_options.map(item => {
            return{
                ...item,
                shipping_amount : item.shipping_amount /100,
            }
        } ),
        total_amount: session.amount_total / 100,
      };
      const order = new OrderModel(orderDetails);

      const saveOrder = await order.save();
      if(saveOrder._id){
        const deleteCartItem = await AddToCartModel.deleteMany({userId : session.metadata.userId})
      }

      break;

    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  res.status(200).send();
};

export default webhooks;