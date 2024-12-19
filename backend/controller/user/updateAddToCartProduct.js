import AddToCartModel from "../../models/cartProduct.js";

const updateAddToCartController = async (req, res) => {
  try {
    const currentUserId = req?.user?.data?._id; 
    const addToCartProductId = req.body._id; 
    const qty = req.body.quantity; 

    
    const updateProduct = await AddToCartModel.updateOne(
      { userId: currentUserId, _id: addToCartProductId }, 
      { $set: { quantity: qty } } 
    );

    if (updateProduct.matchedCount === 0) {
      return res.status(404).json({
        message: "Product not found in the cart",
        error: true,
        success: false,
      });
    }

    res.status(200).json({
      message: "Product Updated",
      error: false,
      success: true,
      data: updateProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong",
      success: false,
      error: true,
    });
  }
};

export default updateAddToCartController;
