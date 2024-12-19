import UserModdel from '../../models/userModel.js'

const AllUserController = async (req,res) =>{
    try {

        const allUsers = await UserModdel.find()
        if(!allUsers){
            res.status(400).json({
                message:"no users available",
                error:true,
                success:false
            })
        }
        res.status(200).json({
        message:"user list",
        error:false,
        success:true,
        data:allUsers
        })

        
    } catch (error) {
        res.status(500).json({
            message: error.message || "Somethng went wrong",
            error:true,
            success:false
        })
    }
}



export default AllUserController