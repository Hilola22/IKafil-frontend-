import { memo } from "react";
import { FaInstagram, FaTelegram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#f5f5f5]">
      <div className="container min-h-96 mb-2">
        <div className="flex flex-col sm:flex-col xl:flex-row">
          <div className="flex-[40%] px-7 py-11">
            <p className="text-2xl mt-4 mb-9 font-light">iKafil team work</p>
            <p className="max-w-111">
              iKalif Market is an online shop project where users can browse and
              order devices such as smartphones, Apple products, laptops, and
              accessories.
            </p>
            <div className="flex gap-6 text-2xl mt-6">
              <FaInstagram className="transition-all duration-500 hover:-translate-y-2 hover:text-pink-500 cursor-pointer" />
              <FaTelegram className="transition-all duration-500 hover:-translate-y-2 hover:text-blue-500 cursor-pointer" />
              <FaYoutube className="transition-all duration-500 hover:-translate-y-2 hover:text-red-500 cursor-pointer" />
              <FaTwitter className="transition-all duration-500 hover:-translate-y-2 hover:text-sky-400 cursor-pointer" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 px-5 sm:px-10 xl:px-0 md:grid-cols-3 pb-10 flex-2 gap-3 pt-10">
            <div className="py-5 flex flex-col gap-4">
              <strong className="pb-2 pt-1 uppercase font-normal">Buy</strong>
              <div className="space-y-2">
                {["Computers", "Phones", "Laptops", "Accessories"].map(
                  (item) => (
                    <div
                      key={item}
                      className="relative w-fit group cursor-pointer"
                    >
                      <p className="transition-colors duration-300 group-hover:text-indigo-600">
                        {item}
                      </p>
                      <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="py-5 flex flex-col gap-4">
              <strong className="pb-2 pt-1 uppercase font-normal">
                Support
              </strong>
              <div className="space-y-2">
                {["FAQ", "Delivery & Payment", "Warranty", "Returns"].map(
                  (item) => (
                    <div
                      key={item}
                      className="relative w-fit group cursor-pointer"
                    >
                      <p className="transition-colors duration-300 group-hover:text-indigo-600">
                        {item}
                      </p>
                      <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="py-5 flex flex-col gap-4">
              <strong className="pb-2 pt-1 uppercase font-normal">
                Company
              </strong>
              <div className="space-y-2">
                {["About Us", "News", "Careers", "Contacts"].map((item) => (
                  <div
                    key={item}
                    className="relative w-fit group cursor-pointer"
                  >
                    <p className="transition-colors duration-300 group-hover:text-indigo-600">
                      {item}
                    </p>
                    <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <hr className="text-[#dadce0]" />
        <div className="container flex flex-col px-2 xl:px-0 md:flex-row sm:px-10 justify-between items-center py-6">
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
