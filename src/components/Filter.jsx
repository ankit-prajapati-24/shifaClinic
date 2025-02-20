import React, { useState } from "react";
import { PiDotsNineBold } from "react-icons/pi";
import { BsViewList } from "react-icons/bs";
import filtericon  from '../assets/Filter_Logo.png'

const Filter = ({ applyFilters, setInitialData, totalPages,addproduct }) => {
  const brands = ["Leviosa", "Lolito", "Respira", "Syltherini"];
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  // Toggle filter modal visibility
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Toggle Add Product modal visibility
  const toggleAddProduct = () => {
    setIsAddProductOpen(!isAddProductOpen);
  };

  // Handle brand selection
  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // Apply filters and close modal
  const handleApplyFilters = () => {
    applyFilters({ minPrice, maxPrice, selectedBrands });
    toggleFilter();
  };

  // Handle new product input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Handle new product submission
  const handleAddProduct = async() => {
    console.log("New Product:", newProduct); // Replace with your save logic
    await addproduct(newProduct);
    setNewProduct({ name: "", description: "", price: "", imageUrl: "" });
    toggleAddProduct();
  };

  return (
    <div className="max-w-[1440px] w-full bg-[#F9F1E7] flex flex-col lg:flex-row justify-between items-center px-4 sm:px-8 py-4 mt-3 rounded-lg shadow-md gap-4 lg:gap-0">
      {/* First Block */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-8 lg:w-auto text-center lg:text-left">
        <div className="flex items-center gap-2">
          <img
            src={filtericon}
            alt="Filter Logo"
            className="w-6 h-6"
          />
          {/* Add Filter Button */}
          <div className="w-full lg:w-auto text-center">
            <button
              onClick={toggleFilter}
              className="bg-white text-yellow-700 font-medium rounded-lg px-6 py-2 text-sm sm:text-base shadow-sm hover:bg-gray-100 transition"
            >
              Filter
            </button>
          </div>
        </div>

        <div className="flex gap-2 items-center text-gray-700 justify-center">
          <PiDotsNineBold className="text-lg sm:text-xl font-bold" />
          <BsViewList className="text-lg sm:text-xl font-bold" />
        </div>

        <span className="text-sm sm:text-base text-gray-600">
          | Showing 1-{Math.min(16, totalPages)} of {totalPages} results
        </span>
      </div>

      <div className="w-full lg:w-auto text-center">
        <button
          onClick={toggleAddProduct}
          className="bg-white text-yellow-700 font-medium rounded-lg px-6 py-2 text-sm sm:text-base shadow-sm hover:bg-gray-100 transition"
        >
          Add Product
        </button>
      </div>


         {/* Second Block */}
         <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full lg:w-auto">
        {/* Show Option */}
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto text-center sm:text-left">
          <label
            htmlFor="show"
            className="font-medium text-gray-700 text-sm sm:text-base w-auto"
          >
            Show
          </label>
          <input
            id="show"
            className="w-20 p-2 border rounded-md text-gray-800 text-sm sm:text-base focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            placeholder="16"
            type="number"
            readOnly
          />
        </div>

        {/* Sort By Option */}
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto text-center sm:text-left">
          <label
            htmlFor="sort"
            className="font-medium text-gray-700 text-sm sm:text-base w-auto"
          >
            Sort by
          </label>
          <input
            id="sort"
            className="w-20 sm:w-40 p-2 border rounded-md text-gray-800 text-sm sm:text-base focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            placeholder="Default"
            type="text"
            readOnly
          />
        </div>
      </div>

      {/* Add Product Button */}
   
      {/* Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[90%] max-w-[500px] p-6 rounded-lg shadow-lg relative">
            <h2 className="text-lg font-bold mb-4">Filter Options</h2>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-semibold text-base mb-2">Price Range</h3>
              <div className="flex gap-4">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>

            {/* Brand Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-base mb-2">Brands</h3>
              <div className="grid grid-cols-2 gap-2">
                {brands.map((brand, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={brand}
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                      className="form-checkbox"
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <button
                onClick={toggleFilter}
                className="px-4 py-2 bg-gray-300 rounded-lg shadow hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyFilters}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[90%] max-w-[500px] p-6 rounded-lg shadow-lg relative">
            <h2 className="text-lg font-bold mb-4">Add New Product</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter product name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter product description"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter product price"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <input
                type="text"
                name="imageUrl"
                value={newProduct.imageUrl}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter image URL"
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={toggleAddProduct}
                className="px-4 py-2 bg-gray-300 rounded-lg shadow hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
