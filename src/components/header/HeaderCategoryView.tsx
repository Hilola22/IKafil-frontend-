"use client";

import { memo } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const categoriesData = [
  {
    name: "Apple Devices",
    columns: [
      {
        title: "iPhone 15 Pro",
        href: "/products?category=iphone-15-pro",
        image: "/images/iphone15.png",
      },
      {
        title: "MacBook Air M3",
        href: "/products?category=macbook-air-m3",
        image: "/images/macbook.png",
      },
      {
        title: "iPad Pro M2",
        href: "/products?category=ipad-pro-m2",
        image: "/images/ipad.png",
      },
      {
        title: "Apple Watch Ultra 2",
        href: "/products?category=watch-ultra-2",
        image: "/images/watch.png",
      },
    ],
  },
  {
    name: "Accessories",
    columns: [
      {
        title: "AirPods Pro 2",
        href: "/products?category=airpods-pro-2",
        image: "/images/airpods.png",
      },
      {
        title: "MagSafe Charger",
        href: "/products?category=magsafe-charger",
        image: "/images/magsafe.png",
      },
      {
        title: "Apple Pencil (2nd Gen)",
        href: "/products?category=apple-pencil",
        image: "/images/pencil.png",
      },
    ],
  },
];

const HeaderCategoryView = () => {
  return (
    <div className="container mx-auto py-16 px-6">
      <h1 className="text-2xl text-gray-600 italic font-normal mb-8 text-center">
        Explore All Devices
      </h1>

      <div className="grid md:grid-cols-2 gap-12">
        {categoriesData.map((category, index) => (
          <div key={index}>
            <h2 className="text-[15px] font-normal text-center text-gray-700  mb-4 border-b pb-5">
              {category.name}
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              {category.columns.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="group flex items-center gap-3 p-3 border rounded-2xl hover:shadow-md hover:border-indigo-500 transition-all duration-300"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-contain opacity-90 group-hover:opacity-100 transition"
                    />
                  )}

                  <div className="flex-1 flex justify-between items-center">
                    <span className="text-[15px] text-gray-700 group-hover:text-indigo-600 transition-all">
                      {item.title}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(HeaderCategoryView);
