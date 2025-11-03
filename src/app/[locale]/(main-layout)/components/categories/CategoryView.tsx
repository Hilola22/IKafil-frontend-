"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import macImg from "../../../../../../public/assets/mac.jpg";
 import iphoneImg from "../../../../../../public/assets/iphoneImg.jpg"
const CategoryView = () => {
  const router = useRouter();

  const handleClick = (category: string) => {
    router.push(
      `/products?type=${category}&status=null&priceMin=1000&priceMax=20000`
    );
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          Explore Our Apple Categories
        </h2>
        <p className="text-gray-500 mt-2 max-w-xl mx-auto text-sm sm:text-base">
          Discover the latest Apple technology — from the powerful MacBook
          series to the innovative iPhone lineup.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 items-stretch">
        <div
          onClick={() => handleClick("mac")}
          className="relative rounded-2xl h-[200px] sm:h-[220px] lg:h-[220px] bg-[#fafafa] flex items-center justify-center overflow-hidden group cursor-pointer"
        >
          <div className="w-full h-full relative">
            <Image
              src={macImg}
              alt="MacBook"
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute bottom-3 left-4">
            <span className="text-black font-medium text-base sm:text-lg py-1 px-4 rounded-xl border border-white/70 backdrop-blur-md bg-white/20">
              MacBook
            </span>
          </div>
        </div>

        <div
          onClick={() => handleClick("iphone")}
          className="relative rounded-2xl h-[150px] sm:h-[260px] lg:h-[220px] bg-[#f5f5f5] flex items-center justify-center overflow-hidden group cursor-pointer"
        >
          <div className="w-[70%] h-[70%] relative">
            <Image
              src={iphoneImg}
              alt="iPhone"
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute bottom-3 left-4">
            <span className="text-black font-medium text-base sm:text-lg py-1 px-4 rounded-xl border border-white/70 backdrop-blur-md bg-white/20">
              iPhone
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryView;
