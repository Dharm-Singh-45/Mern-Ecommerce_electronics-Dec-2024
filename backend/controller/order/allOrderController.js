import UserModel from "../../models/userModel.js";
import OrderModel from "../../models/orderModel.js";

const allOrdersController = async (req, res) => {
  try {
    const userId = req?.user?.data?._id;

    const user = await UserModel.findById(userId);

    if (user.role !== "ADMIN") {
      return res.status(500).json({
        message: "not access",
      });
    }

    const AllOrder = await OrderModel.find().sort({ createdAt: -1 });

    return res.status(200).json({
      data: AllOrder,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong",
      error: true,
      success: false,
    });
  }
};

export default allOrdersController;
