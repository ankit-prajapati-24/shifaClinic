import React, { useEffect, useState } from "react";
import { GiShare } from "react-icons/gi";
import { MdOutlineCompareArrows } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import Filter from "./Filter";

const Card = () => {
  const [filterData, setFilterData] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const itemsPerPage = 16; // Number of items per page

  const setFilters = ({ minPrice, maxPrice, selectedBrands }) => {
    const filtered = data.filter((item) => {
      const itemBrandLower = item.name.toLowerCase();
      const isWithinPriceRange =
        (!minPrice || item.price >= parseFloat(minPrice)) &&
        (!maxPrice || item.price <= parseFloat(maxPrice));
      const isBrandMatched =
        selectedBrands.length === 0 ||
        selectedBrands.some((brand) => brand.toLowerCase() === itemBrandLower);
      return isWithinPriceRange && isBrandMatched;
    });

    setFilterData(filtered);
  };

  const applyFilters = (filterData) => {
    setFilters(filterData);
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const addproduct = async (data) => {
    console.log("data came", data);
    try {
      const response = await fetch("https://vercel.com/aryan-prajapats-projects/furniro-backend/api/cards/createCard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Serialize the data as JSON
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }

      // console.log("Product added successfully");

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://furniro-backend-pi.vercel.app/api/cards/getCards",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        const shuffledData = shuffleArray(result.data);
        setData(shuffledData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filterData.length > 0 ? filterData.slice(startIndex, endIndex) : data.slice(startIndex, endIndex);

  const totalPages = Math.ceil((filterData.length > 0 ? filterData.length : data.length) / itemsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const calculateDiscountedPrice = (price, discount) => {
    if (!isNaN(price) && !isNaN(discount)) {
      return (price - (price * discount) / 100).toLocaleString();
    }
    return price;
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  return (
    <>
      <Filter
        applyFilters={applyFilters}
        totalPages={filterData.length > 0 ? filterData.length : data.length}
        addproduct={addproduct}
      />
      <div className="max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-10">
          {currentItems.map((item, index) => (
            <div
              key={index}
              className="relative group w-full max-w-[285px] mx-auto sm:mx-0 h-[446px] border rounded-lg shadow-md bg-[#F4F5F7] overflow-hidden transition-all duration-300 ease-in-out"
            >
              {/* Image */}
              <img
                src={item.image || "https://via.placeholder.com/240x240"}
                alt={item.name || "Default Name"}
                className="w-full h-[240px] object-cover rounded-t-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out flex flex-col items-center justify-center">
                <button className="bg-white text-[#B88E2F] px-4 py-2 w-[180px] sm:w-[202px] h-12 mb-4 font-bold text-sm sm:text-base transition-transform duration-300 ease-in-out hover:scale-105">
                  Add to Cart
                </button>
                <div className="flex gap-4 text-white text-xs sm:text-sm">
                  <span className="cursor-pointer flex items-center gap-2">
                    <GiShare /> Share
                  </span>
                  <span className="cursor-pointer flex items-center gap-2">
                    <MdOutlineCompareArrows /> Compare
                  </span>
                  <span className="cursor-pointer flex items-center gap-2">
                    <FaRegHeart /> Like
                  </span>
                </div>
              </div>

              {/* Conditional "off" circle */}
              {item.discount > 1 ? (
                <div className="absolute top-2 right-2 text-white text-xs sm:text-sm font-bold px-2 py-1 rounded-full shadow-md bg-red-500">
                  {`-${item.discount}%`}
                </div>
              ) : item.discount === 0 ? (
                <div className="absolute top-2 right-2 text-white text-xs sm:text-sm font-bold px-2 py-1 rounded-full shadow-md bg-sky-500">
                  {"New"}
                </div>
              ) : (
                ""
              )}

              {/* Content */}
              <div className="p-4 mt-6">
                <h2 className="text-base sm:text-lg font-semibold">{item.name || "No Name"}</h2>
                <p className="text-gray-600 text-sm sm:text-base mb-2">
                  {item.description || "No Description Available"}
                </p>
                <div className="flex items-center gap-2">
                  {item.discount > 1 ? (
                    <p className="text-gray-500 line-through text-xs sm:text-sm">{item.price}</p>
                  ) : (
                    <p className="text-blue-500 font-bold text-sm sm:text-base">{item.price}</p>
                  )}
                  {item.discount > 1 && (
                    <p className="text-blue-500 font-bold text-sm sm:text-base">
                      {calculateDiscountedPrice(item.price, item.discount)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(index + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === index + 1 ? "bg-[#B88E2F] text-white" : "bg-[#F9F1E7] text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Card;
