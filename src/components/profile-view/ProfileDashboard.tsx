"use client";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { LuUserRound } from "react-icons/lu";
import { MdEditNote } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";

const menuItems = [
  { title: "profile", href: "/profile", logo: <FaUser /> },
  { title: "settings", href: "/profile/edit", logo: <MdEditNote /> },
  { title: "cart", href: "/profile/cart", logo: <FaCartShopping /> },
];

const ProfileDashboard = () => {
  const getAccessToken = useAuthStore((state) => state.getAccessToken);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(getAccessToken());
  }, [getAccessToken]);

  return (
    <div className="fixed md:w-54 xl:w-64">
      <div className="flex flex-col gap-5 p-2  h-screen bg-white">
        <div className="flex place-items-center justify-between gap-2">
          <div className="flex place-items-center justify-between gap-2">
            <div className="flex place-items-center text-shadow-gray-800  gap-2">
              <p>
                {token ? (
                  <img
                    src="/assets/profile-avatar.png"
                    alt="Profile"
                    className="size-8 rounded-full border"
                  />
                ) : (
                  <LuUserRound className="size-6 text-gray-700" />
                )}
              </p>
              <Link href={"/"}>
                <p className="font-semibold text-gray-800">IKafil</p>
              </Link>
            </div>
          </div>
          <div className="flex place-items-center px-1 text-[14px] mr-3 rounded-[3px]">
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
                <span className="text-gray-700 font-normal group-hover:text-gray-900">
                  {item.title}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(ProfileDashboard);
