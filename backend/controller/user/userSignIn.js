import UserModel from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSignInController = async (req, res) => {
  try {
    const { email, password } = req.body;

  

    // validation

    if (!email || !password) {
      return res.status(400).json({
        message: "Fill all fields",
        error: true,
        success: false,
      });
    }
    // user exist or not

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        error: true,
        sucess: false,
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };
      const token = await jwt.sign(
        {
          data: tokenData,
        },
        process.env.TOKEN_SECRET_KEY,
        { expiresIn: 60 * 60 * 8 }
      );
      const tokenOption = {
        httpOnly:true,
        secure:true
      }

      res.status(200).cookie("token",token,tokenOption).json({
        message: "login successfuly",
        data: token,
        error: false,
        success: true,
      });
    } else {
      res.status(400).json({
        message: "password not correct",
        error: true,
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong",
      error: true,
      success: false,
    });
  }
};

export default userSignInController;
