import ProductModel from "../../models/productModel.js";

const getCategoryProduct = async (req, res) => {
  try {

    const productCategory = await ProductModel.distinct("category")

   
    // arrat to store one product for each category

    const productByCategory =  []

    for (const category of productCategory) {
        const product = await ProductModel.findOne({category})

        if(product){
            productByCategory.push(product)
        }
    }

    res.status(200).json({
        message:"Category Product",
        error:false,
        success:true,
        data: productByCategory
    })


  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong",
      error: true,
      success: false,
    });
  }
};

export default getCategoryProduct;
