"use client";
import Link from "next/link";
import { useWishlistStore } from "../../lib/userWishlist";
import { useParams, useRouter } from "next/navigation";
import { DeviceView } from "../device-view/DeviceView";

export default function WishlistView() {
  const { wishlist, toggleWishlist, getItemCount } = useWishlistStore();
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || "";

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="container mx-auto px-3 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap gap-3 text-sm sm:text-base mt-3">
          <Link
            href={`/${locale}`}
            className="hover:text-blue-500 underline underline-offset-4"
          >
            Home
          </Link>
          <span className="text-gray-300">/</span>
          <p>Wishlist</p>
        </div>
        <h3 className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-medium">
          Your Wishlist
        </h3>
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-gray-500 text-lg text-center">
            Your wishlist is empty
          </p>
          <button
            onClick={() => router.push(`/${locale}/products`)}
            className="mt-6 px-6 py-2.5 bg-indigo-500 text-white font-medium rounded-full shadow hover:bg-indigo-600 transition-all"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 sm:px-6 lg:px-8">
      <div className="flex flex-wrap gap-3 text-sm sm:text-base mt-3">
        <Link
          href={`/${locale}`}
          className="hover:text-blue-500 underline underline-offset-4"
        >
          Home
        </Link>
        <span className="text-gray-300">/</span>
        <p>Wishlist</p>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium">
          Your Wishlist ({getItemCount()})
        </h3>
        <button
          onClick={() => wishlist.forEach((i) => toggleWishlist(i))}
          className="px-5 py-2 bg-gray-200 text-black rounded-full hover:bg-gray-300 transition"
        >
          Clear
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <DeviceView data={wishlist} />
      </div>
    </div>
  );
}
