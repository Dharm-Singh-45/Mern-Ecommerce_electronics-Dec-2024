import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import { toast } from "react-toastify";
import AdminProductCard from "../components/AdminProductCard";
import api from "../common/api"; // Import the centralized api instance

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const fetchAllProduct = async () => {
    try {
      const response = await api.get("/get-products", { withCredentials: true });
      setAllProducts(response?.data?.data || []);
    } catch (error) {
      toast(error?.response?.data?.message || "Failed to fetch products!");
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      <div className="bg-white px-4 py-2 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          className="border-2 border-red-500 text-red-600 hover:bg-red-600 hover:text-white py-2 px-3 rounded-full transition-all"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/* All products */}
      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {allProducts.map((product, index) => (
          <AdminProductCard data={product} key={index + "allProduct"} fetchData={fetchAllProduct} />
        ))}
      </div>

      {/* Upload product component */}
      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
      )}
    </div>
  );
};

export default AllProducts;
