import mongoose from "mongoose";

const addToCartSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      ref: "Product",
  
    },
    quantity: {
      type: Number,
    },
    userId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const AddToCartModel = mongoose.model("AddToCart", addToCartSchema);

export default AddToCartModel;
