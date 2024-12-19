import AddToCartModel from "../../models/cartProduct.js";

const addToCartViewProduct = async (req, res) => {
  try {
    const currentUser = req?.user?.data?._id;

    const allProduct = await AddToCartModel.find({ userId:currentUser }).populate("productId");

    res.status(200).json({
      message: "ok",
      error: false,
      success: true,
      data: allProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Somethng went wrong",
      error: true,
      success: false,
    });
  }
};

export default addToCartViewProduct;
