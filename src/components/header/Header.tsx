"use client";
import Link from "next/link";
import { memo, useState } from "react";
import { FaYoutube } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { LuInstagram, LuUserRound } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";
import { SiTelegram } from "react-icons/si";
import { LanguageSwitcher } from "./LanguageSwitcher";

const categoriesData = [
  {
    name: "MacBook",
    columns: [
      { title: "Computers", items: ["Desktop PCs", "Monitors", "All-in-One"] },
      { title: "Smartphones", items: ["iPhone", "Samsung"] },
      { title: "Tablets", items: ["iPad Pro", "iPad Mini"] },
      { title: "Accessories", items: ["Cables", "Cases", "Chargers"] },
    ],
  },
  {
    name: "iPad",
    columns: [
      { title: "Tablets", items: ["iPad Pro", "iPad Air", "iPad Mini"] },
      { title: "Accessories", items: ["Covers", "Keyboards", "Chargers"] },
    ],
  },
];
const Header = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  return (
    <header className="bg-[#f5f5f5]">
      <div
        onMouseEnter={() => setOpenCategory(null)}
        className="container text-[14px] h-8 place-items-center justify-between flex"
      >
        <ul className="flex gap-5 text-[12px] font-[Montserrat,sans-serif] text-gray-600 font-normal">
          <li>
            <Link
              href={"/"}
              className="hover:text-indigo-500 relative inline-block group transition-all duration-300"
            >
              About company
              <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              href={"/"}
              className="hover:text-indigo-500 relative inline-block group transition-all duration-300"
            >
              Delivery
              <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              href={"/"}
              className="hover:text-indigo-500 relative inline-block group transition-all duration-300"
            >
              Trade in
              <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              href={"/"}
              className="hover:text-indigo-500 relative inline-block group transition-all duration-300"
            >
              For CMI and blogers
              <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              href={"/"}
              className="hover:text-indigo-500 relative inline-block group transition-all duration-300"
            >
              News
              <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              href={"/"}
              className="hover:text-indigo-500 relative inline-block group transition-all duration-300"
            >
              Contacts
              <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
        </ul>
        <div className="flex items-center gap-5 text-gray-800 justify-between cursor-pointer">
          <p className="font-medium text-transparent bg-clip-text bg-[linear-gradient(90deg,#60a5fa_0%,#818cf8_25%,#a78bfa_50%,#f472b6_75%,#f87171_100%)]">
            +998787772020
          </p>

          <LuInstagram />
          <FaYoutube className="size-6" />
          <SiTelegram />
          <ul className="flex gap-6">
            <LanguageSwitcher />
          </ul>
        </div>
      </div>
      <hr className="text-[#dadce0]" />

      <div className="container h-36">
        <div
          onMouseEnter={() => setOpenCategory(null)}
          className="flex justify-between place-items-center"
        >
          <p className="text-[35px] mt-2 font-[serif]">IKafil</p>
          <div className="flex gap-3">
            <RiSearchLine className="size-6" />
            <LuUserRound className="size-6" />
            <div className="relative">
              <p className="left-5 bottom-3 absolute bg-indigo-500 rounded-full size-4 text-[11px] font-bold text-white grid items-center justify-center">
                0
              </p>
              <FiShoppingCart className="size-6" />
            </div>
          </div>
        </div>
        <div
          onMouseEnter={() => setOpenCategory(null)}
          className="font-[Nunito,sans-serif] font-light text-gray-600"
        >
          <ul className="whitespace-nowrap flex gap-6 text-[15px] mt-4">
            <li className="relative">
              <div
                className="relative"
                onMouseEnter={() => setOpenCategory("all")}
              >
                {/* title */}
                <div className="cursor-pointer flex items-center gap-2 transition-colors duration-300 hover:text-indigo-500">
                  All Categories <IoIosArrowDown />
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-indigo-500 transition-all duration-300 hover:w-full"></span>
                </div>

                {/* menu + overlay */}
                <div
                  className={`fixed top-[177px] left-0 w-full h-[calc(100vh-177px)] z-40 transition-opacity duration-300 ${
                    openCategory === "all"
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  {/* overlay */}
                  <div
                    className="absolute inset-0 bg-black/10 backdrop-grain"
                    onMouseEnter={() => setOpenCategory(null)} // close only when hovering overlay
                  />

                  {/* menu */}
                  <div className="relative bg-[#f5f5f5] h-100 transition-opacity duration-300">
                    <div className="container pt-4">
                      <h2>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Fugit, autem.
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <Link href={"/"}>
                <span
                  onMouseEnter={() => setOpenCategory(null)}
                  className="relative inline-block group transition-all duration-300 text-transparent bg-clip-text"
                  style={{
                    background:
                      "linear-gradient(90deg, #ff4d4d 0%, #ff9999 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  Discount
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-gradient-to-r from-red-500 to-red-300 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>
            </li>

            <li className="relative group">
              <div className="cursor-pointer flex items-center gap-2 px-3 transition-colors duration-300 group-hover:text-blue-500">
                MacBook <IoIosArrowDown />
                <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </div>

              <ul className="absolute left-0 mt-2 w-48 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:text-gray-700 hover:bg-[#fcf9f99e]"
                  >
                    Option 1
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:text-gray-700 hover:bg-[#fcf9f99e]"
                  >
                    Option 2
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:text-gray-700 hover:bg-[#fcf9f99e]"
                  >
                    Option 3
                  </Link>
                </li>
              </ul>
            </li>
            <li className="relative group">
              <div className="cursor-pointer flex items-center gap-2 px-3 transition-colors duration-300 group-hover:text-blue-500">
                iPad <IoIosArrowDown />
                <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </div>

              <ul className="absolute left-0 mt-2 w-48 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:text-gray-700 hover:bg-[#fcf9f99e]"
                  >
                    Option 1
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:text-gray-700 hover:bg-[#fcf9f99e]"
                  >
                    Option 2
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:text-gray-700 hover:bg-[#fcf9f99e]"
                  >
                    Option 3
                  </Link>
                </li>
              </ul>
            </li>
            <li className="relative group">
              <div className="cursor-pointer flex items-center gap-2 px-3 transition-colors duration-300 group-hover:text-blue-500">
                Accessors <IoIosArrowDown />
                <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </div>

              <ul className="absolute left-0 mt-2 w-48 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:text-gray-700 hover:bg-[#fcf9f99e]"
                  >
                    Option 1
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:text-gray-700 hover:bg-[#fcf9f99e]"
                  >
                    Option 2
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:text-gray-700 hover:bg-[#fcf9f99e]"
                  >
                    Option 3
                  </Link>
                </li>
              </ul>
            </li>
            <li className="relative group">
              <div className="cursor-pointer flex items-center gap-2 px-3 transition-colors duration-300 group-hover:text-blue-500">
                MacKalif Verified <IoIosArrowDown />
                <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </div>

              <ul className="absolute left-0 mt-2 w-48 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:text-gray-700 hover:bg-[#fcf9f99e]"
                  >
                    Option 1
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:text-gray-700 hover:bg-[#fcf9f99e]"
                  >
                    Option 2
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:text-gray-700 hover:bg-[#fcf9f99e]"
                  >
                    Option 3
                  </Link>
                </li>
              </ul>
            </li>
            <>
              <li>
                <Link
                  href={"/"}
                  className="font-medium text-transparent bg-clip-text bg-[linear-gradient(90deg,#60a5fa_0%,#818cf8_25%,#a78bfa_50%,#f472b6_75%,#f87171_100%)]"
                >
                  Top week products
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className="font-medium text-transparent bg-clip-text bg-[linear-gradient(90deg,#60a5fa_0%,#818cf8_25%,#a78bfa_50%,#f472b6_75%,#f87171_100%)]"
                >
                  Dyson
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className="font-medium text-transparent bg-clip-text bg-[linear-gradient(90deg,#60a5fa_0%,#818cf8_25%,#a78bfa_50%,#f472b6_75%,#f87171_100%)]"
                >
                  Samsung
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className="font-medium text-transparent bg-clip-text bg-[linear-gradient(90deg,#60a5fa_0%,#818cf8_25%,#a78bfa_50%,#f472b6_75%,#f87171_100%)]"
                >
                  Golden Consept
                </Link>
              </li>
            </>
          </ul>
        </div>
        <p
          // onMouseEnter={() => setOpenCategory(null)}
          className="mt-2.5 text-[15px] font-normal text-transparent bg-clip-text"
          style={{
            background:
              "linear-gradient(87deg, rgba(13,10,69,1) 0%, rgba(197,197,250,1) 10%, rgba(195,190,229,1) 25%, rgba(193,184,214,1) 40%, rgba(203,122,240,1) 60%, rgba(188,168,240,1) 75%, rgba(250,120,122,1) 90%, rgba(245,5,5,0.98) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          BroService
        </p>
      </div>
    </header>
  );
};

export default memo(Header);
