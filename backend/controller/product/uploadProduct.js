import uploadProductPermission from "../../helpers/permission.js"
import ProductModel from "../../models/productModel.js"


const uploadProductController = async(req,res)=>{
    try {

        const sessonUserId = req.user.data._id

        if(!uploadProductPermission(sessonUserId)){
                res.status(400).json({
                    message:"permission denied",
                    error:true,
                    success:false
                })

        }

        const uploadProduct = new ProductModel(req.body)
        const saveProduct = await uploadProduct.save()

        res.status(200).json({
            message:'Product upload successfully',
            error:false,
            success:true,
            data: saveProduct
        })
        
    } catch (error) {
        res.status(500).json({
            message : error.message || "Something went wrong",
            error:true,
            success:false
        })
        
    }
}

export default uploadProductController