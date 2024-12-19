import UserModel from '../../models/userModel.js';

const updateUser = async (req, res) => {
  try {
    const { userId, email, name, role } = req.body; // Get userId from request body

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
        success: false,
        error: true,
      });
    }

    // Build the payload dynamically
    const payload = {
      ...(email && { email }),
      ...(name && { name }),
      ...(role && { role }),
    };

    // Check if the user with provided userId exists
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    // Update user and return the updated document
    const updatedUser = await UserModel.findByIdAndUpdate(userId, payload, {
      new: true, 
      runValidators: true, 
    });

    res.status(200).json({
      message: "User updated successfully",
      success: true,
      error: false,
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong",
      success: false,
      error: true,
    });
  }
};

export default updateUser;
