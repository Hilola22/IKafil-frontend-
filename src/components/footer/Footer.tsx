import { memo } from "react";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="container h-130 mb-2">
        <div className="grid grid-cols-4">
          <div className=" flex flex-col justify-center gap-7 pb-30 h-110">
            <strong>Buy</strong>
            <p>Computers</p>
            <p>Phones</p>
            <p>Laptops</p>
            <p>Accessors</p>
          </div>
          <div className=" flex flex-col justify-center gap-7 pb-30 h-110">
            <strong>Buy</strong>
            <p>Computers</p>
            <p>Phones</p>
            <p>Laptops</p>
          </div>
          <div className=" flex flex-col justify-center gap-7 pb-30 h-110">
            <strong>Buy</strong>
            <p>Computers</p>
            <p>Phones</p>
          </div>
          <div className=" flex flex-col justify-center gap-7 pb-30 h-110">
            <strong>Buy</strong>
            <p>Computers</p>
            <p>Phones</p>
            <p>Laptops</p>
            <p>Accessors</p>
          </div>
        </div>
        <hr className="text-[#dadce0]" />
        <div className="container flex flex-col md:flex-row justify-between items-center py-6">
          <p className="text-center text-gray-600 md:text-left">
            iKafil online store. All rights reserved.
          </p>
          <p className="text-center md:text-right text-gray-500 mt-2 md:mt-0">
            Developed by{" "}
            <span className="font-medium text-indigo-500">N21</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
