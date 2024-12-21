import React, { useEffect, useState } from "react";
import api from "../common/api"; // Importing the centralized API client
import moment from "moment";
import displayINRCurrency from "../helpers/displayCurrency";
import { toast } from "react-toastify";

const OrderPage = () => {
  const [data, setData] = useState([]);

  const fetchOrderDetails = async () => {
    try {
      const response = await api.get("/order-list"); // Using the centralized API client


      setData(response?.data?.data);
    } catch (error) {
      toast(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div className="p-4 w-full">
      {!data[0] && <p>No Order Available</p>}

      <div>
        {data.map((item, index) => {
          return (
            <div key={`${index} + order`}>
              <p className="font-medium text-lg">
                {moment(item.createdAt).format("LL")}
              </p>

              <div className="border rounded">
                <div className="flex flex-col lg:flex-row justify-between">
                  <div className="grid gap-1">
                    {item?.productDetails.map((product, index) => {
                      return (
                        <div
                          key={index + "product"}
                          className="flex gap-3 bg-slate-100"
                        >
                          <img
                            src={product.image[0]}
                            alt=""
                            className="w-28 h-28 bg-slate-200 object-scale-down p-2"
                          />
                          <div>
                            <div className="font-medium text-lg text-ellipsis line-clamp-1">
                              {product.name}
                            </div>
                            <div className="flex items-center gap-5 mt-1">
                              <div className="text-lg text-red-500">
                                {" "}
                                {displayINRCurrency(product.price)}
                              </div>
                              <p>Quantity : {product.quantity}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-col gap-4 p-2 min-w-[300px]">
                    <div>
                      <div className="text-lg font-medium">Payment Details :</div>
                      <p className="m ml-2">
                        Payment Method :{" "}
                        {item.paymentDetails.payment_method_type[0]}
                      </p>
                      <p className=" ml-2">
                        Payment Status : {item.paymentDetails.payment_status}
                      </p>
                    </div>
                    <div>
                      <div className="font-medium text-lg">
                        Shipping Details :{" "}
                      </div>
                      {item.shipping_options.map((shipping, index) => {
                        return (
                          <div className="ml-2" key={index}>
                            Shipping Amount :{" "}
                            {displayINRCurrency(shipping.shipping_amount)}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="font-semibold lg:text-lg ml-auto w-fit mt-10">
                  Total Amount : {displayINRCurrency(item.total_amount)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderPage;
