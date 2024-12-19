import UserModel from "../../models/userModel.js";

const userDetailsController = async (req, res) => {
  try {
   
    const user = await UserModel.findById(req.user.data._id)
    res.status(200).json({
        data:user,
        error:false,
        succcess:true,
        message:"login user details"
    })
  } catch (error) {
    res.status(500).json({
      mnessage: error.mnessage || "Something went Wrong",
      error: true,
      success: false,
    });
  }
};

export default userDetailsController;
