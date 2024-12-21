import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productCategory from "../helpers/productCategory";
import api from "../common/api"; // Import your centralized API client
import VerticleCard from "../components/VerticleCard";
import { toast } from "react-toastify";

const CategoryProduct = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListInArray = urlSearch.getAll("category");

  const urlCategoryListObject = {};

  urlCategoryListInArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);

  const [sortBy, setSortBy] = useState("");

  // Use centralized API client (api) to fetch data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.post("/filter", {
        category: filterCategoryList,
      });
  
      setData(response?.data?.data || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || "Error fetching products");
      console.log("Error from category product page:", error);
    }
  };

  const handelSelectCategory = (e) => {
    const { name, value, checked } = e.target;

    setSelectCategory((prev) => {
      return {
        ...prev,
        [value]: checked,
      };
    });
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .map((categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }
        return null;
      })
      .filter((el) => el);
    setFilterCategoryList(arrayOfCategory);

    const urlFormat = arrayOfCategory.map((el, index) => {
      if (arrayOfCategory.length - 1 === index) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });
    navigate("/product-category?" + urlFormat.join(""));
  }, [selectCategory]);

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;

    setSortBy(value);
    if (value === "asc") {
      setData((prev) => prev.sort((a, b) => a.sellingPrice - b.sellingPrice));
    }
    if (value === "dsc") {
      setData((prev) => prev.sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  useEffect(() => {}, [sortBy]);

  return (
    <div className="container mx-auto p-4">
      {/* Desktop version*/}

      <div className="hidden lg:grid grid-cols-[200px,1fr] ">
        {/* Left side */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
          {/* sort by */}
          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 border-slate-300 border-b pb-2">
              Sort By
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="felx items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "asc"}
                  value={"asc"}
                  onChange={handleOnChangeSortBy}
                />
                <label>Price - Low to High</label>
              </div>
              <div className="felx items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "dsc"}
                  value={"dsc"}
                  onChange={handleOnChangeSortBy}
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* filter by */}
          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 border-slate-300 border-b pb-2">
              Category
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((categoryName, index) => {
                return (
                  <div className="flex item-center gap-3" key={"hello" + index}>
                    <input
                      type="checkbox"
                      name={"category"}
                      checked={selectCategory[categoryName?.value]}
                      id={categoryName?.value}
                      value={categoryName?.value}
                      onChange={handelSelectCategory}
                    />
                    <label htmlFor={categoryName?.value}>
                      {categoryName?.label}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>

        {/* Right side  (product display) */}

        <div className="px-4">
          <p className="font-medium text-slate-800 text-lg my-2">
            Search Results : {data?.length}
          </p>
          <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh)]">
            {data.length !== 0 && (
              <VerticleCard data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
