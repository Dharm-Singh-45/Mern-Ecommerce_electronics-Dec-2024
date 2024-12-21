import stripe from "../../config/stripe.js";
import UserModel from "../../models/userModel.js";

const paymentController = async (req, res) => {
  try {
    const { cartItems } = req.body;

    const user = await UserModel.findOne({ _id: req?.user?.data?._id });

    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [
        {
          shipping_rate: "shr_1QXmhYF9CPxTPhc9fXJyUwMo",
        },
      ],
      customer_email: user?.email,
      metadata:{
        userId : user?.id
      },
      line_items: cartItems.map((item, index) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.productId.productName,
              images: item.productId.productImage,
              metadata: {
                productId: item.productId._id,
              },
            },
            unit_amount: item.productId.sellingPrice * 100,
          },
          adjustable_quantity : {
            enabled : true,
            minimum : 1
          },
          quantity : item.quantity
        };
      }),
      success_url : `${process.env.FRONTEND_URL}/success`,
      cancel_url : `${process.env.FRONTEND_URL}/cancel`
    };

    const session = await stripe.checkout.sessions.create(params);

    res.status(200).json({
        message:"payment page",
        success:true,
        error:false,
        session
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Somethng went wrong",
      error: true,
      success: false,
    });
  }
};

export default paymentController;
