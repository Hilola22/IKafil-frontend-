"use client";
import { memo } from "react";
import { useTranslations } from "next-intl";

const HeaderCategoryView = ({ categoriesData }: any) => {
  const t = useTranslations("Header.Categories");

  const translatedOrFallback = (key: string, fallback: string) => {
    const value = t(key);
    if (!value || value === key) return fallback;
    return value;
  };

  return (
    <div className="container pt-4 h-full p-2">
      <h2 className="text-2xl italic font-sans">
        {translatedOrFallback("exploreTitle", "Explore all devices")}
      </h2>

      <div className="flex gap-10 pt-10 ">
        {categoriesData?.map((cat: any, idx: number) => {
          const catKey = cat.name.toLowerCase();

          return (
            <div className="text-[16px]" key={idx}>
              <p>{translatedOrFallback(`${catKey}.title`, cat.name)}</p>

              <div className="text-[14px] pt-4 flex flex-col gap-2">
                {cat.columns?.map((col: any, i: number) => {
                  const colKey = (
                    col.key ??
                    col.title ??
                    String(i)
                  ).toLowerCase();

                  return (
                    <div key={i} className="relative group align-bottom">
                      <span className="cursor-pointer hover:text-indigo-500 transition-all duration-300">
                        {translatedOrFallback(
                          `${catKey}.${colKey}`,
                          col.title ?? colKey
                        )}
                      </span>
                      <span className="absolute left-0 bottom-0 w-0 h-px bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                    </div>
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
