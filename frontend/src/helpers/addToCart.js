import api from "../common/api";  // Import the centralized api instance
import { toast } from "react-toastify";

const addToCart = async (e, id) => {
  e?.stopPropagation();
  e?.preventDefault();

  try {
    const response = await api.post(
      "/addtocart",  // Use the endpoint relative to the base URL
      {
        productId: id,
      }
    );

    toast(response?.data?.message);  // Show success message from response

    return response?.data;  // Return the response data if needed

  } catch (error) {
    toast(error?.response?.data?.message || "An unexpected error occurred.");  // Handle error and show message
  }
};

export default addToCart;
