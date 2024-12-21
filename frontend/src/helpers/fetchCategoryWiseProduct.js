import api from "../common/api"; // Import the centralized api instance
import { toast } from "react-toastify";

const fetchCategoryWiseProduct = async (category) => {
  try {
    const response = await api.post(
      "/category-product", // Use the centralized API instance with relative URL
      { category } // Pass category in the request body
    );
    return response.data;
  } catch (error) {
    toast(error?.response?.data?.message || "Something went wrong!");
  }
};

export default fetchCategoryWiseProduct;
