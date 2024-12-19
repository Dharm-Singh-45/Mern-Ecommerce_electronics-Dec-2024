import ProductModel from "../../models/productModel.js";

const getProductController = async (req, res) => {
  try {
    const allProduct = await ProductModel.find().sort({ createdAt: -1 });

    if(!allProduct){
        res.status(400).json({
            message: "Not any product listed yet",
            success: false,
            error: true,
          })
    }

    res.status(200).json({
      message: "All Products",
      success: true,
      error: false,
      data: allProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong",
      error: true,
      success: false,
    });
  }
};

export default getProductController;
