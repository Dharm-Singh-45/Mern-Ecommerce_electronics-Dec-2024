import React, { useContext } from 'react'
import displayINRCurrency from '../helpers/displayCurrency';
import Context from '../context';
import addToCart from '../helpers/addToCart';
import { Link } from 'react-router-dom';

const VerticleCard = ({loading,data=[]}) => {

    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
      await addToCart(e, id);
      fetchUserAddToCart();
    };
  return (
    <div className=" grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-4  overflow-x-scroll scrollbar-none transition-all">
    {loading ? (
      <p>Loading...</p>
    ) : (
      data.map((product, index) => {
        return (
          <Link
            to={"/product-details/" + product?._id}
            className="w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px]  bg-white rounded-sm shadow-md "
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center ">
              <img
                src={product?.productImage[0]}
                alt=""
                className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
              />
            </div>
            <div className="p-4 grid gap-3 ">
              <h2 className="font-semibold md:text-lg text-base text-ellipsis line-clamp-1 text-black">
                {product?.productName}
              </h2>
              <p className="capitalize text-slate-500">
                {product?.category}
              </p>
              <div className="flex gap-3">
                <p className="text-red-500 font-medium">
                  {displayINRCurrency(product?.sellingPrice)}
                </p>
                <p className="text-slate-500 line-through">
                  {displayINRCurrency(product?.price)}
                </p>
              </div>
              <button
                className="text-sm bg-red-500 hover:bg-red-700 text-white px-3 py-0.5 rounded-full "
                onClick={(e) => handleAddToCart(e, product?._id)}
              >
                Add to cart
              </button>
            </div>
          </Link>
        );
      })
    )}
  </div>
  )
}

export default VerticleCard
