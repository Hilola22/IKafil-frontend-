"use client";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { LuUserRound } from "react-icons/lu";

const menuItems = [
  { title: "profile", href: "/profile" },
  { title: "settings", href: "/profile/edit" },
  { title: "cart", href: "profile/cart" },
];

const ProfileDashboard = () => {
  const getAccessToken = useAuthStore((state) => state.getAccessToken);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(getAccessToken());
  }, [getAccessToken]);

  return (
    <div className="flex flex-col gap-5 w-75 p-2  h-screen bg-gray-50">
      <div className="flex place-items-center justify-between gap-2">
        <Link
          href={"/profile"}
          className="flex place-items-center justify-between gap-2"
        >
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
            <p className="font-semibold text-gray-800">IKafil</p>
          </div>
        </Link>
        <div className="flex place-items-center px-1 text-[14px] mr-3 rounded-[3px]">
          <Link href={"/"}>
            <ArrowRight className="size-4 text-gray-800" />
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
            <span className="text-gray-700 font-medium group-hover:text-gray-900">
              {item.title}
            </span>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-700 transition" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default memo(ProfileDashboard);
