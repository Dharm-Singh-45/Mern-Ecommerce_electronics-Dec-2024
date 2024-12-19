import AddToCartModel from "../../models/cartProduct.js";

const deleteAddToCartProduct = async (req, res) => {
  try {
    const currentUserId = req?.user?.data?._id;
    const addToCartProductId = req?.body?._id;

    const deleteProduct = await AddToCartModel.deleteOne({
      _id: addToCartProductId,
    });

    res.json({
      message: "Product Deleted From Cart",
      error: false,
      success: true,
      data: deleteProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Somethng went wrong",
      error: true,
      success: false,
    });
  }
};

export default deleteAddToCartProduct;
