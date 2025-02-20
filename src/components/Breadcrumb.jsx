import React from "react";

const Breadcrumb = () => {
  return (
    <div className="bg-gray-100 p-4">
      <div className="text-gray-600 text-sm flex items-center space-x-1">
        <a href="/" className="hover:underline">
          Home
        </a>
        <span className="text-gray-400">{'>'}</span>
        <span className="text-gray-800 font-medium">Shop</span>
      </div>
      <h1 className="text-4xl font-bold mt-2">Shop</h1>
    </div>
  );
};

export default Breadcrumb;
