import OrderModel from "../../models/orderModel.js";

const orderController = async (req, res) => {
  try {
    const currentUserId = req?.user?.data?._id;

    const orrderList = await OrderModel.find({ userId: currentUserId }).sort({createdAt : -1});

    res.json({
      data: orrderList,
      message: "order list",
      succcess: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Somethng went wrong",
      error: true,
      success: false,
    });
  }
};

export default orderController;
