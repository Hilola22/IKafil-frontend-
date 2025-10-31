"use client";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { LuUserRound } from "react-icons/lu";
import { MdEditNote } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

const menuItems = [
  { title: "profile", href: "/profile", logo: <FaUser /> },
  { title: "settings", href: "/profile/edit", logo: <MdEditNote /> },
  { title: "cart", href: "/profile/cart", logo: <FaCartShopping /> },
];

const ProfileDashboard = () => {
  const getAccessToken = useAuthStore((state) => state.getAccessToken);
  const [token, setToken] = useState<string | null>(null);
  const logout = useAuthStore((state) => state.logout);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    const savedPhoto = localStorage.getItem("profilePhoto");
    if (savedPhoto) {
      setPhoto(savedPhoto);
    }
  }, []);

  useEffect(() => {
    setToken(getAccessToken());
  }, [getAccessToken]);

  return (
    <div className="md:w-54 w-12 xl:w-64">
      <div className="flex flex-col gap-5 p-2  h-screen bg-white">
        <div className="flex place-items-center justify-between gap-2">
          <div className="flex place-items-center justify-between gap-2">
            <div className="flex place-items-center text-shadow-gray-800  md:gap-2">
              <p>
                {token ? (
                  <Link href={"/"}>
                    <img
                      src={photo ? photo : "/assets/profile-avatar.png"}
                      alt="Profile"
                      className="size-8 rounded-full border"
                    />
                  </Link>
                ) : (
                  <LuUserRound className="size-6 text-gray-700" />
                )}
              </p>
              <Link href={"/"}>
                <p className="font-semibold hidden md:block text-gray-800">
                  IKafil
                </p>
              </Link>
            </div>
          </div>
          <div className=" place-items-center hidden md:flex md:px-1 text-[14px] mr-0 md:mr-3 rounded-[3px]">
            <Link href={"/"}>
              <ArrowRight className="size-4 text-gray-800 hover:bg-gray-200 rounded-full" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col divide-y w-full max-w-3xl">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="flex items-center justify-between px-2 py-2 hover:bg-gray-50 transition group"
            >
              <div className="flex place-items-center gap-2">
                {item.logo}
                <span className="text-gray-700 hidden md:block font-normal group-hover:text-gray-900">
                  {item.title}
                </span>
              </div>
              <ChevronRight className="hidden md:flex w-4 h-4 text-gray-400 group-hover:text-gray-700 transition" />
            </Link>
          ))}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center justify-between px-2 py-2 hover:bg-gray-50 transition group"
          >
            <div className="flex place-items-center gap-2">
              <IoIosLogOut />
              <span className="text-gray-700 hidden md:block font-normal group-hover:text-gray-900">
                logout
              </span>
            </div>
            <ChevronRight className="hidden md:flex w-4 h-4 text-gray-400 group-hover:text-gray-700 transition" />
          </button>
        </div>

        {showLogoutModal && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-sm text-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeUzNnrwPUFY4oN-My9KauGfZ3AiScpgwkOg&s"
                alt="Logout"
                className="mx-auto mb-4 w-16 h-16"
              />
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Oh no! You're leaving...
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to log out?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                >
                  Nah, Just Kidding
                </button>
                <Link href={"/"}>
                  <button
                    onClick={() => {
                      logout();
                      setShowLogoutModal(false);
                    }}
                    className="px-4 py-2 rounded-md bg-black border text-white hover:bg-white hover:text-black transition"
                  >
                    Yes, Log Me Out
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ProfileDashboard);
