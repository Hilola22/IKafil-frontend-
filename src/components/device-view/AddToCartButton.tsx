"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "../../lib/useCart";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiShoppingCart } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";

const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));
  if (!match) return null;
  return decodeURIComponent(match.split("=")[1] || "") || null;
};

type DeviceButtonProps = {
  data: {
    id: number;
    name: string;
    type: string;
    sale_type: string;
    base_price: string | number;
    device_images?: { url: string }[];
  };
};

export const AddToCartButton = ({ data }: DeviceButtonProps) => {
  const router = useRouter();
  const { addToCart, cart, fetchCart } = useCartStore();
  const [isAdded, setIsAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    const exists =
      cart.some((item) => item.device?.id === data.id || item.id === data.id) ||
      false;
    setIsAdded(exists);
  }, [cart, data.id]);

  const handleAddToCart = async () => {
    if (loading || isAdded) return;
    setLoading(true);

    try {
      await addToCart({
        id: data.id,
        device: {
          id: data.id,
          name: data.name,
          type: data.type,
          sale_type: data.sale_type,
          isTradible: false,
          seller_id: null,
          region_id: null,
          base_price: data.base_price.toString(),
          status: "available",
          is_active: true,
          receive_type: "delivery",
          branch_id: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          details: {
            id: 0,
            color: "",
            year: 0,
            cpu: "",
            ram: "",
            storage: "",
            display_size: "",
            battery_health: "",
            description: "",
            created_at: "",
            updated_at: "",
            device_id: data.id,
            sim_type: "",
          },
          device_images:
            data.device_images?.length && data.device_images[0].url
              ? [
                  {
                    url: `https://api.ikafil.uz${data.device_images[0].url}`,
                  },
                ]
              : [
                  {
                    url: "https://www.eclosio.ong/wp-content/uploads/2018/08/default.png",
                  },
                ],
        },
      });

      await fetchCart();
    } catch (err) {
      console.error("Cartga qo‘shishda xatolik:", err);
    } finally {
      setLoading(false);
    }
  };

  const attemptAdd = () => {
    const token =
      getCookie("accessToken") ||
      getCookie("token") ||
      getCookie("access_token");

    if (!token) {
      router.push("/auth/signin");
      return;
    }

    handleAddToCart();
  };

  return (
    <div>
      {isAdded ? (
        <Link href={"/cart"}>
          <div className="mt-0.5 hover:text-slate-500 px-2 border justify-center items-center py-2 text-center text-black text-lg rounded-full flex transition justify-self-center gap-2">
            <FaShoppingCart className="" />
          </div>
        </Link>
      ) : (
        <button
          type="button"
          disabled={loading || isAdded}
          onClick={attemptAdd}
          className="px-2 py-2 pt-[0px] border text-black text-lg rounded-full flex items-center justify-center hover:text-slate-500 transition justify-self-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "...." : <FiShoppingCart className="size-5 mt-2" />}
        </button>
      )}
    </div>
  );
};
