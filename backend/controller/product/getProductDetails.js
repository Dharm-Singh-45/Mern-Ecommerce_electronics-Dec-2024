import ProductModel from "../../models/productModel.js";


const getProductDetails = async(req,res) => {
    try {

        const {productId} = req.body

        const product  = await ProductModel.findById(productId)

        res.status(200).json({
            message:"ok",
            success:true,
            error:false,
            data:product
        })


    } catch (error) {
        res.status(500).json({
            message: message.error || "Something went wrong",
            error: true,
            success: false,
          });
    }
} 


export default getProductDetails