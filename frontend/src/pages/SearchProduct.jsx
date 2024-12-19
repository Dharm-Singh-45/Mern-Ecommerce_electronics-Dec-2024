import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import VerticleCard from "../components/VerticleCard";

const SearchProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation(); // This hook will get the current URL and query params

  const fetchProduct = async () => {
    setLoading(true);
    try {
      // Extract the query parameter 'q' from the URL
      const queryParams = new URLSearchParams(location.search);
      const searchTerm = queryParams.get("q");

      if (searchTerm) {
        const response = await axios.get(
          `http://localhost:8080/api/search?q=${searchTerm}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setData(response.data.data)
      } else {
      }
      setLoading(false)
    } catch (error) {
      toast.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [location.search]);
  return (
    <div className="container mx-auto p-4">
      {loading && <p className="text-lg text-center">Loading....</p>}
      <p className="text-lg font-semibold my-3">Search Results : {data.length} </p>
      {
        data.length ===0 && loading && (
            <p className="bg-white text-lg text-center p-4">No data Found ... </p>
        )
      }
      {
        data.length !==0 && !loading && (
          
                    <VerticleCard  loading={loading} data={data}  />
               
            )
        
      } 
    </div>
  );
};

export default SearchProduct;
