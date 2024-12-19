import uploadProductPermission from "../../helpers/permission.js";
import ProductModel from "../../models/productModel.js";

const updateProductController = async (req, res) => {
  try {
    if (!uploadProductPermission(req.user.data._id)) {
      res.status(400).json({
        message: "permission denied",
        error: true,
        success: false,
      });
    }

    const { _id, ...resBody } = req.body;

    const updateProduct = await ProductModel.findByIdAndUpdate(_id, resBody);

    res.status(200).json({
      message: "Update Successfully",
      error: false,
      success: true,
      data: updateProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: message.error || "Something went wrong",
      error: true,
      success: false,
    });
  }
};

export default updateProductController;
