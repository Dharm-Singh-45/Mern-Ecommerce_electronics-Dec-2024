import ProductModel from "../../models/productModel.js";

const searchProductController = async (req, res) => {
  try {
    const query = req.query.q;
    const regex = new RegExp(query,"i","g")

    const product = await ProductModel.find({
        "$or" :[
            {
                productName :regex
            },
            {
                category:regex
            }
        ]
    })

    res.json({
        data: product,
        message:"Search Product",
        error:false,
        success:true
    })
  } catch (error) {
    res.status(500).json({
      message: message.error || "Something went wrong",
      error: true,
      success: false,
    });
  }
};

export default searchProductController;
