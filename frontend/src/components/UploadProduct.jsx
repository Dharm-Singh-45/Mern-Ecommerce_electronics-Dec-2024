import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import api from "../common/api"; // Import the centralized api instance
import { toast } from "react-toastify";

const UploadProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const [fullScreenImage, setFullScreenImage] = useState("");
  const [openFullSCreenImage, setOpenFullScreenImage] = useState(false);

  const handleOnChnage = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      };
    });
  };

  const handleDeleteProduct = async (index) => {
    const newProductimage = [...data.productImage];
    newProductimage.splice(index, 1);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...newProductimage],
      };
    });
  };

  /* upload product */
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/upload-product", data); // Use the centralized api instance
      toast(response?.data?.message);
      onClose();
      fetchData();
    } catch (error) {
      toast(error?.response?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="fixed bg-slate-200 bg-opacity-35 w-full h-full topp-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white  p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg ">Upload Product</h2>
          <div
            className="w-fit al-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <IoMdClose />
          </div>
        </div>
        <form
          className="grid p-4 gap-3 overflow-y-scroll h-full pb-5"
          onSubmit={handelSubmit}
        >
          <label htmlFor="productName">Product Name :</label>
          <input
            type="text"
            id="productName"
            placeholder="Enter Product Name"
            name="productName"
            value={data.productName}
            onChange={handleOnChnage}
            className="p-2 bg-slate-100 border rounded "
            required
          />
          <label htmlFor="brandName" className="mt-3">
            Brand Name :
          </label>
          <input
            type="text"
            id="brandName"
            placeholder="Enter Brand Name"
            name="brandName"
            value={data.brandName}
            onChange={handleOnChnage}
            className="p-2 bg-slate-100 border rounded "
            required
          />

          <label htmlFor="category" className="mt-3">
            Categoty :
          </label>

          <select
            value={data.category}
            name="category"
            onChange={handleOnChnage}
            className="p-2 bg-slate-100 border rounded "
            required
          >
            <option value="">Select Category</option>
            {productCategory.map((el, index) => {
              return (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              );
            })}
          </select>

          <label htmlFor="productImage" className="mt-3">
            Product Image :
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-600 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image </p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>
          <div>
            {data?.productImage[0] ? (
              <div className="flex items-center gap-2">
                {data.productImage.map((el, index) => {
                  return (
                    <div className="relative group">
                      <img
                        src={el}
                        alt={el}
                        width={80}
                        height={80}
                        className="bg-slate-100 border cursor-pointer"
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(el);
                        }}
                      />
                      <div
                        className="absolute bottom-0 right-0 p-1 bg-red-500 
                      rounded-full text-white hidden group-hover:block cursor-pointer"
                        onClick={() => handleDeleteProduct(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-xs">
                *Please Upload Product Image
              </p>
            )}
          </div>

          <label htmlFor="price">Price :</label>
          <input
            type="number"
            id="price"
            placeholder="Enter Product Price"
            name="price"
            value={data.price}
            onChange={handleOnChnage}
            className="p-2 bg-slate-100 border rounded "
            required
          />
          <label htmlFor="sellingPrice">Selling Price :</label>
          <input
            type="number"
            id="sellingPrice"
            placeholder="Enter Product Selling Price"
            name="sellingPrice"
            value={data.sellingPrice}
            onChange={handleOnChnage}
            className="p-2 bg-slate-100 border rounded "
            required
          />

          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            id="description"
            rows={3}
            className="h-28 bg-slate-100 border resize-none p-1"
            placeholder="Enter Product Description"
            value={data.description}
            onChange={handleOnChnage}
            required
          >
          </textarea>

          <button className="px3 py-2 bg-red-500 text-white mb-10 hover:bg-red-700 ">
            Upload Product
          </button>
        </form>
      </div>

      {/* display image full screen  */}

      {openFullSCreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imageUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default UploadProduct;
