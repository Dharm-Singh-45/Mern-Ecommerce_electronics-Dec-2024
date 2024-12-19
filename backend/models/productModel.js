import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,

    },
    brandName: {
      type: String,
     
    },
    category: {
      type: String,
   
    },
    productImage: {
      type: Array,
   
    },
    description: {
      type: String,
   
    },
    price: {
      type: Number,
   
    },
    sellingPrice: {
      type: Number,
   
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
