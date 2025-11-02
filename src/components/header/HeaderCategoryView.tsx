"use client";

import { memo } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

type Column = {
  title: string;
  href: string;
  image?: string;
};

type Category = {
  name: string;
  columns: Column[];
};

type HeaderCategoryViewProps = {
  categoriesData: Category[];
};

const HeaderCategoryView = ({ categoriesData }: HeaderCategoryViewProps) => {
  const t = useTranslations("Header.Categories");

  const translatedOrFallback = (key: string, fallback: string) => {
    const value = t(key);
    if (!value || value === key) return fallback;
    return value;
  };

  return (
    <div className="container mx-auto py-16 px-6">
      <h1 className="text-2xl text-gray-600 italic font-normal mb-8 text-center">
        {translatedOrFallback("exploreTitle", "Explore all devices")}
      </h1>

      <div className="grid md:grid-cols-2 gap-12">
        {categoriesData.map((category, index) => {
          const catKey = category.name.toLowerCase().replace(/\s+/g, "");
          return (
            <div key={index}>
              <h2 className="text-[15px] font-normal text-center text-gray-700 mb-4 border-b pb-5">
                {translatedOrFallback(`${catKey}.title`, category.name)}
              </h2>

              <div className="grid sm:grid-cols-2 gap-6">
                {category.columns.map((item, idx) => {
                  const colKey = item.title.toLowerCase().replace(/\s+/g, "");
                  return (
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
                          {translatedOrFallback(
                            `${catKey}.${colKey}`,
                            item.title
                          )}
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(HeaderCategoryView);
