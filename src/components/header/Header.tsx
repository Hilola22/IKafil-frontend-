"use client";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { LuUserRound } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";
import CartDrawer from "./CartDrawer";
import SubHeader from "./SubHeader";
import HeaderCategoryView from "./HeaderCategoryView";
import { MenuIcon } from "lucide-react";
import MenuExample from "./MenuHeader";
import { useCartStore } from "../../lib/useCart";
import { useAuthStore } from "../../store/auth/useAuthStore";
import SearchDrawer from "./SearchDrawer";

const categoriesData = [
  {
    name: "MacBook",
    columns: [
      { title: "Computers", items: ["Desktop PCs", "Monitors", "All-in-One"] },
      { title: "Smartphones", items: ["iPhone", "Samsung"] },
      { title: "Tablets", items: ["iPad Pro", "iPad Mini"] },
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
  const [isCartOpen, setCartOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [show, setShow] = useState(false);
  const { cart, getItemCount } = useCartStore();

  const getAccessToken = useAuthStore((state) => state.getAccessToken);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(getAccessToken());
  }, [getAccessToken]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > 200) {
        if (currentScroll > lastScrollY) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className="px-10 relative bg-[#f5f7f8]">
      <div className="w-full h-16 md:h-50 xl:h-40 bg-[#f5f7f8] invisible"></div>

      <div className=" md:hidden bottom-5 z-200 absolute">
        <MenuExample />
      </div>
      <div
        className={`fixed top-0 left-0 w-full z-100  px-5 bg-[#f5f5f5] md:px-10 xl:px-0 shadow transition-transform duration-500 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <SubHeader setOpenCategory={setOpenCategory} />
        <hr className="text-[#dadce0]" />

        <div className="container xl:h-32 md:h-42">
          <div
            onMouseEnter={() => setOpenCategory(null)}
            className="flex justify-between md:justify-between place-items-center"
          >
            <div className="md:hidden size-10"></div>
            <Link href={"/"} className="text-[35px] mt-2 font-[serif]">
              IKafil
            </Link>
            <div className="flex items-center gap-3 border md:border-0 border-gray-200">
              <div onClick={() => setSearchOpen(true)}>
                <RiSearchLine className="size-6 cursor-pointer transition-colors hover:text-indigo-500" />
              </div>

              <Link href={token ? "/profile" : "/auth/signin"}>
                {token ? (
                  <img
                    src="/assets/profile-avatar.png"
                    alt="Profile"
                    className="size-8 rounded-full border"
                  />
                ) : (
                  <LuUserRound className="size-6 text-gray-700" />
                )}
              </Link>
              <div className="relative" onClick={() => setCartOpen(true)}>
                {getItemCount() > 0 && (
                  <p className="left-5 bottom-3 absolute bg-indigo-500 rounded-full size-4 text-[11px] font-bold text-white grid items-center justify-center">
                    {getItemCount()}
                  </p>
                )}
                <FiShoppingCart className="size-6" />
              </div>
            </div>
          </div>

          <div
            onMouseEnter={() => setOpenCategory(null)}
            className="font-[Nunito,sans-serif] font-light text-gray-600"
          >
            <ul
              className={
                show
                  ? "whitespace-nowrap md:grid md:grid-cols-5 xl:flex  gap-6 text-[15px] mt-4"
                  : "hidden whitespace-nowrap md:grid md:grid-cols-5 xl:flex  gap-6 text-[15px] mt-4"
              }
            >
              <li className="relative">
                <div
                  className="relative"
                  onMouseEnter={() => setOpenCategory("all")}
                >
                  <div className="cursor-pointer flex items-center gap-2 transition-colors duration-300 hover:text-indigo-500">
                    All Categories <IoIosArrowDown />
                    <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-indigo-500 transition-all duration-300 hover:w-full"></span>
                  </div>

                  <div
                    className={`fixed top-[158px] left-0 w-full h-[calc(110vh)] z-40 transition-opacity duration-300 ${
                      openCategory === "all"
                        ? "backdrop-blur-xs"
                        : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <div
                      className="absolute inset-0 backdrop-grain bg-gradient-to-b from-black/60 to-black/70"
                      onMouseEnter={() => setOpenCategory(null)}
                    />
                    <div className="relative bg-[#f5f5f5] h-100 transition-opacity duration-300">
                      <HeaderCategoryView categoriesData={categoriesData} />
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
                    <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-linear-to-r from-red-500 to-red-300 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              </li>

              <li className="relative group">
                <div className="cursor-pointer flex items-center gap-2 px-3 transition-colors duration-300 group-hover:text-blue-500">
                  MacBook <IoIosArrowDown />
                  <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                </div>

                <ul className="z-10 absolute left-0 mt-2 w-48 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
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

                <ul className=" z-10 absolute left-0 mt-2 w-48 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
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
                  MacKafil Verified <IoIosArrowDown />
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                </div>

                <ul className="z-10 absolute left-0 mt-2 w-48 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
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
                    href={"/products"}
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
                    Golden Consept
                  </Link>
                </li>
              </>
            </ul>
          </div>
        </div>

        <div />
      </div>

      <CartDrawer open={isCartOpen} onClose={() => setCartOpen(false)} />
      <SearchDrawer open={isSearchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
};

export default memo(Header);
