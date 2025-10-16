"use client";

import { memo, useState } from "react";

const languages = [
  {
    code: "EN",
    name: "English",
    flag: "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg",
  },
  {
    code: "RU",
    name: "Russian",
    flag: "https://upload.wikimedia.org/wikipedia/en/f/f3/Flag_of_Russia.svg",
  },
  {
    code: "UZ",
    name: "Uzbek",
    flag: "https://upload.wikimedia.org/wikipedia/commons/8/84/Flag_of_Uzbekistan.svg",
  },
];

export const LanguageSwitcher = memo(
  ({ className = "" }: { className?: string }) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(languages[0]);

    const changeLang = (lang: (typeof languages)[0]) => {
      setSelected(lang);
      setOpen(false);
      console.log("Selected:", lang); // value outputting
    };

    return (
      <div
        className={`relative z-10 ${className}`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="cursor-pointer flex items-center gap-2 px-3 py-1.5 hover:text-indigo-500">
          <img
            src={selected.flag}
            alt={selected.name}
            className="size-3 rounded-full object-cover"
          />
          <span className="text-[12px]">{selected.code}</span>
          <svg
            className={`size-3 transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>

        <ul
          className={`absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg transition-all duration-300 transform ${
            open
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-2"
          }`}
        >
          {languages.map((lang) => (
            <li key={lang.code}>
              <button
                onClick={() => changeLang(lang)}
                className="flex items-center gap-3 w-full px-4 py-2 text-left text-gray-700 hover:bg-indigo-100 transition-colors"
              >
                <img
                  src={lang.flag}
                  alt={lang.name}
                  className="w-5 h-4 rounded-sm object-cover"
                />
                {lang.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
