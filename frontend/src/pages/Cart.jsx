import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { loadStripe } from '@stripe/stripe-js';
import api from "../common/api"; // Import the centralized api instance

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const context = useContext(Context);

  const loadingCart = new Array(context.cartProductCount).fill(null);

  const fetchData = async () => {
    try {
      const response = await api.get("/viewCartProduct");
      setData(response?.data?.data || []);
    } catch (error) {
      toast(error?.response?.data?.message || "Failed to fetch cart data");
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  const increaseQty = async (id, qty) => {
    try {
      const response = await api.post(
        "/update-cart-product",
        { quantity: qty + 1, _id: id },
     
      );
      fetchData();
    } catch (error) {
      toast(error?.response?.data?.message || "Failed to update quantity");
    }
  };

  const decreaseQty = async (id, qty) => {
    if (qty >= 2) {
      try {
        const response = await api.post(
          "/update-cart-product",
          { quantity: qty - 1, _id: id },
        
        );
        fetchData();
      } catch (error) {
        toast(error?.response?.data?.message || "Failed to update quantity");
      }
    }
  };

  const deleteCartProduct = async (id) => {
    try {
      const response = await api.post(
        "/delete-cart-product",
        { _id: id },
      );
      fetchData();
      context.fetchUserAddToCart();
    } catch (error) {
      toast(error?.response?.data?.message || "Failed to delete product");
    }
  };

  const totalQty = data.reduce((prev, curr) => {
    return prev + curr?.quantity;
  }, 0);

  const totalPrice = data.reduce((prev, curr) => {
    return prev + curr?.quantity * curr?.productId?.sellingPrice;
  }, 0);

  /* Payment */
  const handlePayment = async () => {
    try {
      const stripePromise = await loadStripe('pk_test_51QXmNIF9CPxTPhc9TQanbWfLtV7q65Tsz83mkkNIIKm23aULQFed9PAv7iTuyZXlEBkUzE3MDCKKxmEb8BG1iLT700J4OSLBQs');
      const response = await api.post(
        "/checkout",
        { cartItems: data },
        
      );

      if (response.data.session.id) {
        stripePromise.redirectToCheckout({ sessionId: response.data.session.id });
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Payment failed");
    }
  };

  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No data</p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/* View Product */}
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart.map((el, index) => (
                <div
                  key={index + "cart-loading"}
                  className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                ></div>
              ))
            : data.map((product, index) => (
                <div
                  key={index + "cart-loading"}
                  className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[120px,1fr]"
                >
                  <div className="w-32 h-32 bg-slate-200">
                    <img
                      src={product?.productId?.productImage[0]}
                      alt=""
                      className="w-full h-full object-scale-down mix-blend-multiply"
                    />
                  </div>
                  <div className="px-4 py-2 relative">
                    {/* Delete product */}
                    <div
                      className="absolute right-0 text-red-600 rounded-full p-2 text-lg hover:bg-red-600 hover:text-white cursor-pointer"
                      onClick={() => deleteCartProduct(product?._id)}
                    >
                      <MdDelete />
                    </div>
                    <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                      {product?.productId?.productName}
                    </h2>
                    <p className="text-slate-500 capitalize">
                      {product?.productId?.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-red-500 font-medium text-lg">
                        {displayINRCurrency(product?.productId?.sellingPrice)}
                      </p>
                      <p className="text-slate-600 font-semibold text-lg">
                        {displayINRCurrency(
                          product?.productId?.sellingPrice * product?.quantity
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <button
                        className="border border-red-500 text-red-500 w-6 h-6 rounded hover:bg-red-700 hover:text-white"
                        onClick={() =>
                          decreaseQty(product?._id, product?.quantity)
                        }
                      >
                        -
                      </button>
                      <span>{product?.quantity}</span>
                      <button
                        className="border border-red-500 text-red-500 w-6 h-6 rounded hover:bg-red-700 hover:text-white"
                        onClick={() =>
                          increaseQty(product?._id, product?.quantity)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Summary */}
        {data[0] && (
          <div className="mt-5 lg:mt-2 w-full max-w-sm">
            {loading ? (
              <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
            ) : (
              <div className="h-36 bg-white">
                <h2 className="text-white bg-red-500 px-4 py-1">Summary</h2>
                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Quantity</p>
                  <p>{totalQty}</p>
                </div>
                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Total Price</p>
                  <p>{displayINRCurrency(totalPrice)}</p>
                </div>
                <button
                  className="bg-blue-600 text-white w-full p-2"
                  onClick={handlePayment}
                >
                  Payment
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
