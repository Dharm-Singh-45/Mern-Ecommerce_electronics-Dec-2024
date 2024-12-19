import ProductModel from "../../models/productModel.js";

const getCategoryWiseProduct = async (req, res) => {
    try {
        const { category } = req.body || req.query; // Ensure category is extracted

        if (!category) {
            return res.status(400).json({
                message: "Category is required",
                success: false,
                error: true,
                data: null,
            });
        }

        const product = await ProductModel.find({ category });

        res.status(200).json({
            message: "Products fetched successfully",
            success: true,
            error: false,
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: true,
            data: null,
        });
    }
};

export default getCategoryWiseProduct;
