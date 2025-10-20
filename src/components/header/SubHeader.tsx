import Link from "next/link";
import { memo } from "react";
import { LuInstagram } from "react-icons/lu";
import { FaYoutube } from "react-icons/fa";
import { SiTelegram } from "react-icons/si";
import { LanguageSwitcher } from "./LanguageSwitcher";

const SubHeader = ({ setOpenCategory }: any) => {
  return (
    <div
      onMouseEnter={() => setOpenCategory(null)}
      className="container text-[14px] h-8 place-items-center justify-between flex"
    >
      <ul className="flex gap-5 text-[12px] font-[Montserrat,sans-serif] text-gray-600 font-normal">
        <li>
          <Link
            href={"/about"}
            className="hover:text-indigo-500 relative inline-block group transition-all duration-300"
          >
            About company
            <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
        <li>
          <Link
            href={"/delivery"}
            className="hover:text-indigo-500 relative inline-block group transition-all duration-300"
          >
            Delivery
            <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
        <li>
          <Link
            href={"/trade-in"}
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
            href={"/news"}
            className="hover:text-indigo-500 relative inline-block group transition-all duration-300"
          >
            News
            <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
        <li>
          <Link
            href={"/contacts"}
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
  );
};

export default memo(SubHeader);
