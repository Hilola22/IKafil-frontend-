"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

const baseUrl = "http://3.76.183.255:3030";

export type Product = {
  id: number;
  name: string;
  base_price: string;
  status: string;
  details?: Record<string, any>;
  device_images?: { url: string; is_primary?: boolean }[];
};

export type CartItem = {
  id: number;
  device_id: number;
  device: Product;
};

const CartDrawerView = () => {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRemoving, setIsRemoving] = useState<number | null>(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  // 🔹 Fetch cart data
  const fetchCart = async () => {
    if (!token) {
      console.warn("Token topilmadi ❌");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch(`${baseUrl}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });

      if (!res.ok) {
        console.error("Cart fetch error:", res.status);
        setCart([]);
        return;
      }

      const result = await res.json();
      setCart(result.data || result || []);
    } catch (err) {
      console.error("❌ Cart fetch xato:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Remove one item
  const handleRemove = async (id: number) => {
    if (!token) return alert("Avval tizimga kiring!");
    try {
      setIsRemoving(id);
      const res = await fetch(`${baseUrl}/api/cart/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setCart((prev) => prev.filter((item) => item.id !== id));
      } else {
        console.error("Remove error:", res.status);
      }
    } catch (err) {
      console.error("❌ Remove xato:", err);
    } finally {
      setIsRemoving(null);
    }
  };

  // 🔹 Clear cart
  const handleClearCart = async () => {
    if (!token) return alert("Avval tizimga kiring!");
    if (!confirm("Savatni tozalaysizmi?")) return;

    try {
      const res = await fetch(`${baseUrl}/api/cart/clear`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setCart([]);
      } else {
        console.error("Clear cart error:", res.status);
      }
    } catch (err) {
      console.error("❌ Clear cart xato:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const getTotalPrice = () =>
    cart.reduce((sum, item) => sum + Number(item.device.base_price || 0), 0);

  if (isLoading)
    return <p className="text-center text-gray-500 mt-10">Yuklanmoqda...</p>;

  if (!cart || cart.length === 0) {
    return <p className="text-center text-gray-500 mt-10">Savat bo‘sh 😊</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="space-y-4 overflow-y-scroll h-[70vh] pr-2">
        {cart.map((item) => {
          const device = item.device;
          const details = device.details || {};
          const imageUrl = device.device_images?.[0]?.url
            ? `${baseUrl}${device.device_images[0].url}`
            : "/no-image.jpg";

          return (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-2xl p-4 shadow-sm transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <img
                  src={imageUrl}
                  alt={device.name}
                  className="w-20 h-20 object-contain"
                  onError={(e) => ((e.currentTarget.src = "/no-image.jpg"))}
                />

                <div className="text-[14px] leading-5">
                  <h4
                    onClick={() => router.push(`/products/${device.id}`)}
                    className="font-semibold text-[16px] text-gray-800 hover:text-blue-600 cursor-pointer transition-colors"
                  >
                    {device.name}
                  </h4>

                  <div className="text-gray-600 mt-1 space-y-0.5">
                    <p>
                      Цвет:{" "}
                      <span className="text-gray-800">
                        {details.color || "-"}
                      </span>
                    </p>
                    <p>
                      Ёмкость:{" "}
                      <span className="text-gray-800">
                        {details.storage || "-"}
                      </span>
                    </p>
                    <p>
                      SIM:{" "}
                      <span className="text-gray-800">
                        {details.sim_type || "Single SIM"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="text-[18px] font-semibold text-gray-900">
                  {Number(device.base_price).toLocaleString()}{" "}
                  <span className="text-sm text-gray-800">сум</span>
                </p>
                <button
                  onClick={() => handleRemove(item.id)}
                  disabled={isRemoving === item.id}
                  className="mt-2 text-red-500 hover:text-red-600 transition disabled:opacity-50"
                >
                  {isRemoving === item.id ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <Trash2 size={20} />
                  )}
                </button>
              </div>
            </div>
          );
        })}

        {cart.length > 0 && (
          <div className="pt-4 border-t flex justify-between items-center mt-3">
            <button
              onClick={handleClearCart}
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
