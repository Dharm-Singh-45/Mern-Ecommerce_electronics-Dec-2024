import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import VerticleCard from "../components/VerticleCard";
import api from "../common/api"; // Import your centralized API client

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
        // Use the centralized API client for the request
        const response = await api.get(`/search?q=${searchTerm}`);
        
        setData(response?.data?.data || []); // Set response data
      }
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [location.search]);

  return (
    <div className="container mx-auto p-4">
      {loading && <p className="text-lg text-center">Loading....</p>}
      <p className="text-lg font-semibold my-3">Search Results: {data.length}</p>
      {data.length === 0 && !loading && (
        <p className="bg-white text-lg text-center p-4">No data Found ...</p>
      )}
      {data.length !== 0 && !loading && <VerticleCard loading={loading} data={data} />}
    </div>
  );
};

export default SearchProduct;
