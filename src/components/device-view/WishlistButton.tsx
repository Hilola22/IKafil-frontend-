"use client";

import React from "react";
import { useWishlistStore } from "../../lib/userWishlist";
import { Product } from "../../app/(main-layout)/products/[id]/product-detail";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

export const WishlistButton = ({ data }: { data: Product }) => {
  const { wishlist, toggleWishlist } = useWishlistStore();
  const isWishlisted = wishlist.some((i) => i.id === data.id);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        toggleWishlist(data);
      }}
    >
      <div
        className={`absolute top-2 right-3 p-1.5 rounded-full bg-slate-200 transition-colors duration-200 ${
          isWishlisted
            ? "text-black"
            : "text-gray-600 border-gray-700 hover:text-gray-700"
        }`}
      >
        {isWishlisted ? (
          <IoIosHeart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        ) : (
          <IoIosHeartEmpty className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        )}
      </div>
    </button>
  );
};
