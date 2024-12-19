import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { FaStar, FaStarHalf } from "react-icons/fa";
import displayINRCurrency from "../helpers/displayCurrency";
import VerticalCardProduct from "../components/VerticalCardProduct";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const [loading, setLoading] = useState(false);

  const [activeImage, setActiveImage] = useState("");

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });

  const navigate = useNavigate()
  const {fetchUserAddToCart} = useContext(Context)


  const [zoomImage, setZoomImage] = useState(false);

  const params = useParams();

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/product-details",
        { productId: params._id },
        {
          withCredentials: true,
          headers: "application/json",
        }
      );
      setLoading(false);
      setData(response?.data?.data);
      setActiveImage(response?.data?.data?.productImage[0]);
    } catch (error) {
      toast(error.resonse.data.message);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (img) => {
    setActiveImage(img);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setZoomImageCoordinate({ x, y });
    
    },
    [zoomImageCoordinate]
  );

  const handleLeaveImageZoom= () =>{
    setZoomImage(false)
  }

  const handleAddToCart = async(e,id) =>{
    await addToCart(e,id)
    fetchUserAddToCart()

  }

  const handleBuyProduct = async(e,id) =>{
    await addToCart(e,id)
    fetchUserAddToCart()
    navigate("/cart")

  }
  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* Product image */}
        <div className="h-96 flex flex-col  lg:flex-row-reverse gap-4 ">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 py-8 relative">
            <img
              src={activeImage}
              alt=""
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />

            {/* product zoom */}
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-125 "
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>

          <div className="h-full">
            {loading ? (
              <div className="">Loading...</div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.productImage?.map((img, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded p-1"
                      key={img}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => handleMouseEnterProduct(img)}
                        onClick={() => handleMouseEnterProduct(img)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Product details */}

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-red-200 text-red-700 px-2 rounded-full inline-block w-fit">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium">
              {data?.productName}
            </h2>
            <p className="capitalize text-slate-400">{data?.category}</p>

            <div className="text-red-500 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>

            <div className="flex items-center  gap-2 text-xl lg:text-3xl font-medium  my-2">
              <p className="text-red-700">
                {displayINRCurrency(data?.sellingPrice)}
              </p>
              <p className="text-slate-400 line-through">
                {displayINRCurrency(data?.price)}
              </p>
            </div>
            <div className="flex items-center gap-3 my-2">
              <button className="border-2 border-red-500 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white"
              onClick={(e)=>handleBuyProduct(e,data?._id)}
              >
                Buy
              </button>
              <button className="border-2 border-red-500 rounded px-3 py-1 min-w-[120px] font-medium  bg-red-600 text-white hover:text-red-500 hover:bg-white"
              onClick={(e)=>handleAddToCart(e,data._id)}
              >
                Add To Cart
              </button>
            </div>
            <div>
              <p className="text-slate-600 font-medium my-1">Description : </p>
              <p>{data?.description}</p>
            </div>
          </div>
        )}
      </div>

        {
          data.category && (

            <CategoryWiseProductDisplay category={data?.category} heading={"Recommended Product"} />
          )
        }

    </div>
  );
};

export default ProductDetails;
