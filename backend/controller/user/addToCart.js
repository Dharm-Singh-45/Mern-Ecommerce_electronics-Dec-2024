import AddToCartModel from "../../models/cartProduct.js";

const AddToCartController = async (req, res) => {
  try {
    const { productId } = req.body;
    const currentUser = req.user.data._id;

   const isProductAvailable = await AddToCartModel.findOne({ productId, userId: currentUser,});
    if (isProductAvailable) {
      return res.json({
        message: "Already Exist in Cart",
        success: false,
        error: true,
      });
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };
    const newAddToCart = new AddToCartModel(payload);

    const saveProduct = await newAddToCart.save();

 res.status(200).json({
      message: "Prdoduct Added Into cart",
      success: true,
      error: false,
      data: saveProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Somethng went wrong",
      error: true,
      success: false,
    });
  }
};

export default AddToCartController;
