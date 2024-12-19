import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayINRCurrency from "../helpers/displayCurrency";

const AdminProductCard = ({ data, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);
  return (
    <div className="bg-white p-4 rounded">
      <div className="w-40 ">
        <div
          className="w-fit ml-auto p-2 bg-green-400 rounded-full text-white hover:bg-green-500 cursor-pointer"
          onClick={() => setEditProduct(true)}
        >
          <MdModeEditOutline />
        </div>

        <div className="w-32 h-32 flex justify-center items-center" >
          <img
            src={data.productImage[0]}
            width={120}
            height={120}
            className="object-fill mx-auto h-full"
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2" >{data.productName}</h1>

        <p className="font-bold">{displayINRCurrency(data.sellingPrice)}</p>
      </div>

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
