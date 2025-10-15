import { memo } from "react";
import { FaInstagram, FaTelegram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#f5f5f5]">
      <div className="container h-96 mb-2">
        <div className="flex">
          <div className="flex-[40%] px-7 py-11">
            <p className="text-2xl mb-10">iKalif team work</p>
            <p className="w-111">
              iKalif Market is an online shop project where users can browse and
              order devices such as smartphones, Apple products, laptops, and
              accessories.
            </p>
            <div className="flex gap-4 text-2xl mt-6">
              <FaInstagram />
              <FaTelegram />
              <FaYoutube />
              <FaTwitter />
            </div>
          </div>
          <div className="flex flex-[50%] justify-between place-content-center px-22">
            <div className="p-5 flex flex-col justify-center gap-4 h-80">
              <strong className="pb-4">Buy</strong>
              <p>Computers</p>
              <p>Phones</p>
              <p>Laptops</p>
              <p>Accessories</p>
            </div>

            <div className="p-5 flex flex-col justify-center gap-4 h-80">
              <strong className="pb-4">Support</strong>
              <p>FAQ</p>
              <p>Delivery & Payment</p>
              <p>Warranty</p>
              <p>Return Policy</p>
            </div>

            <div className="p-5 flex flex-col justify-center gap-4 h-80">
              <strong className="pb-4">Company</strong>
              <p>About Us</p>
              <p>News</p>
              <p>Careers</p>
              <p>Contacts</p>
            </div>
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
