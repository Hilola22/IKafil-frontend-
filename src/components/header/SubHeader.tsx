"use client";

import Link from "next/link";
import { memo } from "react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useParams } from "next/navigation";

const SubHeader = ({ setOpenCategory }: any) => {
  const t = useTranslations("SubHeader");
  const params = useParams();
  const locale = (params as any)?.locale as string;

  return (
    <div
      onMouseEnter={() => setOpenCategory(null)}
      className="container hidden text-[14px] h-8 place-items-center justify-between md:flex"
    >
      <ul className="flex gap-5 text-[12px] font-[Montserrat,sans-serif] text-gray-600 font-normal">
        <li>
          <Link
            href={`/${locale}/about`}
            className="hover:text-indigo-500 relative inline-block group transition-all duration-300"
          >
            {t("about")}
            <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
        <li>
          <Link
            href={`/${locale}/delivery`}
            className="hover:text-indigo-500 relative inline-block group transition-all duration-300"
          >
            {t("delivery")}
            <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
        <li>
          <Link
            href={`/${locale}/trade-in`}
            className="hover:text-indigo-500 relative inline-block group transition-all duration-300"
          >
            {t("trade")}
            <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
        <li>
          <Link
            href={`/${locale}`}
            className="hover:text-indigo-500 relative inline-block group transition-all duration-300"
          >
            {t("blogers")}
            <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
        <li>
          <Link
            href={`/${locale}/news`}
            className="hover:text-indigo-500 relative inline-block group transition-all duration-300"
          >
            {t("news")}
            <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
        <li>
          <Link
            href={`/${locale}/contacts`}
            className="hover:text-indigo-500 relative inline-block group transition-all duration-300"
          >
            {t("contacts")}
            <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
      </ul>

      <div className="flex items-center gap-5 text-gray-800 justify-between cursor-pointer">
        <ul className="flex gap-6">
          <LanguageSwitcher />
        </ul>
      </div>
    </div>
  );
};

export default memo(SubHeader);
