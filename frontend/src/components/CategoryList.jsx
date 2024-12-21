import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../common/api"; // Import the centralized axios instance
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [CategoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(13).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    try {
      const response = await api.get("/get-categoryProduct"); // Use the centralized api instance
      setLoading(false);
      setCategoryProduct(response.data.data);
    } catch (error) {
      toast(error?.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
        {loading ? (
          categoryLoading.map((el, index) => (
            <div
              key={"categoryLoading" + index}
              className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
            ></div>
          ))
        ) : (
          CategoryProduct.map((product, index) => (
            <Link
              to={`product-category?category=${product?.category}`}
              className="cursor-pointer"
              key={"productCategory" + index}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center">
                <img
                  src={product?.productImage[0]}
                  alt={product?.category}
                  className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                />
              </div>
              <p className="text-center text-base capitalize">
                {product?.category}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryList;
