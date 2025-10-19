import Image from "next/image";
import macImg from "../../../../../public/assets/mac.jpg";
import iphoneImg from "../../../../../public/assets/iphoneImg.jpg";

const CategoryView = () => {
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
        <div className="relative rounded-2xl h-[420px] bg-[#fafafa] flex items-center justify-center overflow-hidden group">
          <div className="w-[100%] h-[100%] relative">
            <Image
              src={macImg}
              alt="MacBook"
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute bottom-4 left-4">
            <span className="text-gray-800 font-medium text-lg">MacBook</span>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="relative bg-gray-300 rounded-2xl h-[200px] flex items-end p-4">
            <span className="text-white font-medium text-lg">
              Living Room Furniture
            </span>
          </div>
          <div className="relative bg-gray-300 rounded-2xl h-[200px] flex items-end p-4">
            <span className="text-white font-medium text-lg">
              Dining Room Furniture
            </span>
          </div>
        </div>

        <div className="relative rounded-2xl h-[420px] border bg-white flex items-center justify-center overflow-hidden group">
          <div className="w-[90%] h-[90%] relative">
            <Image
              src={iphoneImg}
              alt="iPhone"
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="absolute bottom-4 left-4">
            <span className="text-white font-medium text-lg">iPhone</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryView;
