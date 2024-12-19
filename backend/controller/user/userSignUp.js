import UserModel from "../../models/userModel.js";
import bcrypt from "bcryptjs";

export const userSignUpController = async (req, res) => {
    try {
        const { name, email, password,profilePic } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please fill all fields",
                error: true,
                success: false,
            });
        }

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email",
                error: true,
                success: false,
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10); // Correct usage
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const userData = new UserModel({
            name,
            email,
            password: hashedPassword,
            role:"GENERAL",
            profilePic
        });

        const savedUser = await userData.save();

        res.status(201).json({
            message: "User created successfully",
            success: true,
            error: false,
            data: savedUser,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            success: false,
        });
    }
};
