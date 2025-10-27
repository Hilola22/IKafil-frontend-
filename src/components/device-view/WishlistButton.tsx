"use client";

import React from "react";
import { useWishlistStore } from "../../lib/userWishlist";
import { Product } from "../../app/(main-layout)/products/[id]/product-detail";
import { FaRegHeart } from "react-icons/fa";

export const WishlistButton = ({ data }: { data: Product }) => {
  const { wishlist, toggleWishlist } = useWishlistStore();
  const isWishlisted = wishlist.some((i) => i.id === data.id);

  return (
    <div>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(data);
        }}
        className={`px-1.5 py-1.5 absolute top-2 right-3 border text-lg rounded-full flex items-center justify-center transition gap-2 ${
          isWishlisted ? "text-red-500" : "text-white hover:text-red-500"
        }`}
      >
        <FaRegHeart className="flex items-center justify-center" />
      </button>
    </div>
  );
};
