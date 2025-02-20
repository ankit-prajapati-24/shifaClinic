import React from "react";
import bg from '../assets/ractangle.png'
const Slider = () => {
  return (
    <div className="relative max-w-[1440px] h-[316px]">
      {/* Background Image */}
      <img
        src={bg}
        alt="Background"
        className="w-full h-full object-cover"
      />

      {/* Centered Transparent Breadcrumb */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-transparent">
        {/* Bold "Shop" Text */}
        <h1 className="text-4xl font-bold text-black">Shop</h1>

        {/* Breadcrumb Navigation */}
        <div className="text-black text-sm mt-2 flex items-center space-x-1">
          <a href="/" className="hover:underline">
            Home
          </a>
          <span className="text-black">{'>'}</span>
          <span className="text-black">Shop</span>
        </div>
      </div>
    </div>
  );
};

export default Slider;
