import AddToCartModel from "../../models/cartProduct.js";

const countAddToCartProductController = async (req, res) => {
  try {
    const userId = req?.user?.data?._id;

    const count = await AddToCartModel.countDocuments({
      userId: userId,
    });

    res.json({
      data: {
        count: count,
      },
      message: "ok",
      success: true,
      eror: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Somethng went wrong",
      error: true,
      success: false,
    });
  }
};

export default countAddToCartProductController;
