import axios from "axios"
import { toast } from "react-toastify"


const fetchCategoryWiseProduct = async (category) => {
    try {
        const response = await axios.post(
            "http://localhost:8080/api/category-product",
            { category }, // Pass category in the request body
            {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            }
        );
        return response.data
    } catch (error) {
        toast(error?.response?.data?.message || "Something went wrong!");
    }
};

export default fetchCategoryWiseProduct;
