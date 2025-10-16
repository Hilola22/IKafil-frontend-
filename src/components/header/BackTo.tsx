"use client";
import { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

const BackTo = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const BackTo = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={BackTo}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-indigo-500 text-white shadow-lg hover:bg-indigo-600 transition duration-300"
        >
          <IoIosArrowUp className="size-6" />
        </button>
      )}
    </>
  );
};

export default BackTo;
