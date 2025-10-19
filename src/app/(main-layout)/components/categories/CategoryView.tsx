"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import macImg from "../../../../../public/assets/mac.jpg";
import iphoneImg from "../../../../../public/assets/iphoneImg.jpg";
import buuImg from "../../../../../public/assets/buu.jpg";
import tradeImg from "../../../../../public/assets/trade_in.png";

const CategoryView = () => {
  const router = useRouter();

  const handleClick = (category: string) => {
    router.push(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-semibold text-gray-800">
          Explore Our Apple Categories
        </h2>
        <p className="text-gray-500 mt-2 max-w-xl mx-auto">
          Discover the latest Apple technology — from the powerful MacBook
          series to the innovative iPhone lineup.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 items-stretch">
        <div
          onClick={() => handleClick("MacBook")}
          className="relative rounded-2xl h-[420px] bg-[#fafafa] flex items-center justify-center overflow-hidden group cursor-pointer"
        >
          <div className="w-[100%] h-[100%] relative">
            <Image
              src={macImg}
              alt="MacBook"
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute bottom-2 left-4">
            <span
              className="text-black font-medium text-lg py-1 px-4 rounded-xl border border-white/70 
              backdrop-blur-md bg-white/20"
            >
              MacBook
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div
            onClick={() => handleClick("BUU telefonlar")}
            className="relative bg-[#f5f5f5] rounded-2xl h-[200px] flex items-center justify-center overflow-hidden group cursor-pointer"
          >
            <div className="w-[60%] h-[70%] relative">
              <Image
                src={buuImg}
                alt="BUU telefonlar"
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute bottom-2 left-2">
              <span
                className="text-black font-medium text-lg py-1 verflow-hidden px-4 rounded-xl border border-white/70 
                backdrop-blur-md bg-white/20"
              >
                Pre-owned iPhones
              </span>
            </div>
          </div>

          <div
            onClick={() => handleClick("Trade-in")}
            className="relative bg-[#fafafa] rounded-2xl h-[200px] flex items-center justify-center overflow-hidden group cursor-pointer"
          >
            <div className="w-full h-full relative">
              <Image
                src={tradeImg}
                alt="Trade-in"
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-105 pb-8"
              />
            </div>
            <div className="absolute bottom-2 left-2">
              <span
                className="text-black font-medium text-lg py-1 overflow-hidden px-4 rounded-xl border border-white/70 
                backdrop-blur-md bg-white/20"
              >
                Trade-in
              </span>
            </div>
          </div>
        </div>

        <div
          onClick={() => handleClick("iPhone")}
          className="relative rounded-2xl h-[420px] bg-[#f5f5f5] flex items-center justify-center overflow-hidden group cursor-pointer"
        >
          <div className="w-[60%] h-[60%] relative">
            <Image
              src={iphoneImg}
              alt="iPhone"
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute bottom-3 left-4">
            <span
              className="text-black font-medium text-lg py-1 verflow-hidden px-4 rounded-xl border border-white/70 
              backdrop-blur-md bg-white/20"
            >
              iPhone
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryView;
