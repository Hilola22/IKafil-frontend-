"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "../../lib/useCart";
import { Trash2 } from "lucide-react";

const CartDrawerView = () => {
  const router = useRouter();
  const { cart, removeFromCart, clearCart } = useCartStore();

  if (!cart || cart.length === 0) {
    return <p className="text-center text-gray-500 mt-10">Savat bo‘sh</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-4 overflow-y-scroll h-[70vh] pr-2">
        {cart.map((item) => {
          const imageUrl =
            item.image || item.device_images?.[0]?.url || "/no-image.jpg";

          return (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-2xl p-4 transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <img
                  src={imageUrl}
                  alt={item.name}
                  className="w-24 h-24 object-cover  bg-white border border-gray-200 shadow-sm"
                />

                <div>
                  <h4
                    onClick={() => router.push(`/products/${item.id}`)}
                    className="font-semibold text-[16px] text-gray-800 hover:text-blue-600 cursor-pointer transition-colors"
                  >
                    {item.name}
                  </h4>
                  <p className="text-gray-500 text-sm mt-1">
                    {item.storage ?? item.details?.storage ?? "—"}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xl font-semibold text-gray-900">
                  {Number(item.price || item.base_price).toLocaleString()}{" "}
                  <span className="text-sm text-gray-900">сум</span>
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-2 text-red-500 hover:text-red-600 transition"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          );
        })}

        {cart.length > 0 && (
          <div className="pt-4 border-t flex justify-end">
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 text-sm font-semibold transition"
            >
              Savatni tozalash
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawerView;
