"use client";

import { useState } from "react";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

export default function MenuExample() {
  const t = useTranslations("Header"); 
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      title: t("navItem1.title"),
      children: [
        t("navItem1.option1"),
        t("navItem1.option2"),
        t("navItem1.option3"),
      ],
    },
    {
      title: t("navItem2.title"),
      children: [
        t("navItem2.option1"),
        t("navItem2.option2"),
        t("navItem2.option3"),
      ],
    },
    {
      title: t("navItem3.title"),
      children: [
        t("navItem3.option1"),
        t("navItem3.option2"),
        t("navItem3.option3"),
      ],
    },
    {
      title: t("navItem4.title"),
      children: [
        t("navItem4.option1"),
        t("navItem4.option2"),
        t("navItem4.option3"),
      ],
    },
    {
      title: t("navItem5.title"),
      children: [
        t("navItem5.option1"),
        t("navItem5.option2"),
        t("navItem5.option3"),
      ],
    },
    {
      title: t("topprod"),
      href: "/products",
    },
    {
      title: t("golden"),
      href: "/golden",
    },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors"
      >
        <span className="text-[16px] font-medium">{t("menu")}</span>
        <IoIosArrowDown
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/50 backdrop-blur-[3px] transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } z-[9998]`}
      ></div>
      <div
        className={`fixed top-0 left-0 h-full w-[340px] bg-[#f5f5f5] shadow-2xl transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-[9999]`}
      >
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-200 bg-white shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">
            {t("mainMenu")}
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        <div className="p-5 overflow-y-auto h-[calc(100%-60px)] space-y-5">
          {menuItems.map((item, i) => (
            <div key={i} className="border-b border-gray-200 pb-3">
              {item.href ? (
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block font-medium text-gray-800 hover:text-indigo-600 transition-colors"
                >
                  {item.title}
                </Link>
              ) : (
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer font-medium text-gray-800 hover:text-indigo-600 transition-colors">
                    {item.title}
                    <IoIosArrowDown className="transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <ul className="mt-2 pl-4 space-y-1 text-gray-600">
                    {item.children!.map((child, idx) => (
                      <li
                        key={idx}
                        className="cursor-pointer hover:text-indigo-500 transition-colors"
                      >
                        {child}
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
