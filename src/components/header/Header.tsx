import Link from "next/link";
import { memo } from "react";
import { FaYoutube } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { LuInstagram, LuUserRound } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";
import { SiTelegram } from "react-icons/si";

const Header = () => {
  return (
    <header className="bg-[#f5f5f5]">
      <div className="container text-[14px] h-10 place-items-center justify-between flex">
        <ul className="flex gap-5 text-[12px]">
          <li>
            <Link
              href={"/"}
              className="hover:text-indigo-500 relative inline-block group transition-all duration-300"
            >
              About company
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              href={"/"}
              className="hover:text-indigo-500 relative inline-block group transition-all duration-300"
            >
              Delivery
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              href={"/"}
              className="hover:text-indigo-500 relative inline-block group transition-all duration-300"
            >
              Trade in
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              href={"/"}
              className="hover:text-indigo-500 relative inline-block group transition-all duration-300"
            >
              For CMI and blogers
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              href={"/"}
              className="hover:text-indigo-500 relative inline-block group transition-all duration-300"
            >
              News
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              href={"/"}
              className="hover:text-indigo-500 relative inline-block group transition-all duration-300"
            >
              Contacts
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
        </ul>
        <div className="flex items-center gap-5 justify-between cursor-pointer">
          <p className="font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-purple-600 bg-clip-text text-transparent">
            +998787772020
          </p>

          <LuInstagram />
          <FaYoutube className="size-6" />
          <SiTelegram />
          <select id="language" name="language">
            <option value="english">English</option>
            <option value="uzbek">Uzbek</option>
            <option value="russian">Russian</option>
          </select>
        </div>
      </div>
      <hr className="text-[#dadce0]" />
      <div className="container h-40">
        <div className="flex justify-between place-items-center">
          <p className="text-[35px] mt-3 font-[Ubuntu] font-medium">IKafil</p>
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
        <div className="">
          <ul className="whitespace-nowrap flex gap-6 text-[15px] font-bold mt-4">
            <li>
              <Link
                href={"/"}
                className="hover:text-indigo-500 relative inline-block group transition-all duration-300"
              >
                All categories
                <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                href={"/"}
                className="hover:text-red-500 text-red-500 relative inline-block group transition-all duration-300"
              >
                Discount
                <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li className="relative group">
              <div className="cursor-pointer flex place-items-center gap-2 px-3 hover:text-indigo-500">
                MacBook <IoIosArrowDown />
                <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </div>

              <ul className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:bg-indigo-100"
                  >
                    Option 1
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:bg-indigo-100"
                  >
                    Option 2
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:bg-indigo-100"
                  >
                    Option 3
                  </Link>
                </li>
              </ul>
            </li>
            <li className="relative group">
              <div className="cursor-pointer flex place-items-center gap-2 px-3 hover:text-indigo-500">
                iPad <IoIosArrowDown />
                <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </div>

              <ul className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:bg-indigo-100"
                  >
                    Option 1
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:bg-indigo-100"
                  >
                    Option 2
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:bg-indigo-100"
                  >
                    Option 3
                  </Link>
                </li>
              </ul>
            </li>
            <li className="relative group">
              <div className="whitespace-nowrap cursor-pointer flex place-items-center gap-2 px-3 hover:text-indigo-500">
                Accessors <IoIosArrowDown />
                <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </div>

              <ul className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:bg-indigo-100"
                  >
                    Option 1
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:bg-indigo-100"
                  >
                    Option 2
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:bg-indigo-100"
                  >
                    Option 3
                  </Link>
                </li>
              </ul>
            </li>
            <li className="relative group">
              <div className="whitespace-nowrap cursor-pointer flex place-items-center gap-2 px-3 hover:text-indigo-500">
                MacKalif Verified <IoIosArrowDown />
                <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </div>

              <ul className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:bg-indigo-100"
                  >
                    Option 1
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:bg-indigo-100"
                  >
                    Option 2
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:bg-indigo-100"
                  >
                    Option 3
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                href={"/"}
                className="font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-purple-600 bg-clip-text text-transparent"
              >
                Top week products
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>{" "}
            <li>
              <Link
                href={"/"}
                className="font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-purple-600 bg-clip-text text-transparent"
              >
                Dyson
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>{" "}
            <li>
              <Link
                href={"/"}
                className="font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-purple-600 bg-clip-text text-transparent"
              >
                Samsung
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>{" "}
            <li>
              <Link
                href={"/"}
                className="font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-purple-600 bg-clip-text text-transparent"
              >
                Golden Consept
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          </ul>
        </div>
        <p className="mt-3 font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-purple-600 bg-clip-text text-transparent">
          BroService
        </p>
      </div>
    </header>
  );
};

export default memo(Header);
