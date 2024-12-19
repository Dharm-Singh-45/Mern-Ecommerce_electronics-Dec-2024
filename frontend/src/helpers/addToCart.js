import axios from "axios";
import { toast } from "react-toastify";

const addToCart = async (e, id) => {
  e?.stopPropagation();
  e?.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:8080/api/addtocart",
      {
        productId : id,
      },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
   
    toast(response?.data?.message)

    return response?.data

  } catch (error) {
    toast(error?.response?.data?.message)
  }
};

export default addToCart;
