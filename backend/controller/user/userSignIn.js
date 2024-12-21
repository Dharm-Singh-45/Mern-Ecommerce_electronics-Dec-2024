import UserModel from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSignInController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Fill all fields",
        error: true,
        success: false,
      });
    }

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    // Validate password
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        message: "Password is incorrect",
        error: true,
        success: false,
      });
    }

    // Generate JWT token
    const tokenData = { _id: user._id, email: user.email };
    const token = jwt.sign(
      { data: tokenData },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "8h" }
    );

    // Send response with token
    res.status(200).json({
      message: "Login successful",
      token, // Include token in response
      user: { _id: user._id, email: user.email }, // Optional: include user data
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong",
      error: true,
      success: false,
    });
  }
};

export default userSignInController;
