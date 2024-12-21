import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayINRCurrency from "../helpers/displayCurrency";

const AdminProductCard = ({ data, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <div className="w-40">
        {/* Edit Button */}
        <div
          className="w-fit ml-auto p-2 bg-green-400 rounded-full text-white hover:bg-green-500 cursor-pointer"
          onClick={() => setEditProduct(true)}
          title="Edit Product"
        >
          <MdModeEditOutline />
        </div>

        {/* Product Image */}
        <div className="w-32 h-32 flex justify-center items-center border border-gray-200 rounded overflow-hidden">
          {data?.productImage?.[0] ? (
            <img
              src={data.productImage[0]}
              alt={data.productName}
              width={120}
              height={120}
              className="object-fill mx-auto h-full"
            />
          ) : (
            <p className="text-sm text-gray-500">No Image Available</p>
          )}
        </div>

        {/* Product Details */}
        <h1
          className="text-ellipsis line-clamp-2 text-sm mt-2 font-medium"
          title={data.productName}
        >
          {data.productName}
        </h1>
        <p className="font-bold text-green-600 mt-1">
          {displayINRCurrency(data.sellingPrice)}
        </p>
      </div>

      {/* Edit Product Modal */}
      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
