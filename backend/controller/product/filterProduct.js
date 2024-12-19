import ProductModel from "../../models/productModel.js";

const fiterProductController = async (req, res) => {
  try {
    const categoryList = req?.body?.category;

    const product = await ProductModel.find({
      category: {
        $in: categoryList,
      },
    });

    res.json({
      data: product,
      message: "category list product",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: true,
      data: null,
    });
  }
};

export default fiterProductController;
