"use client";
import { useEffect, useState } from "react";
import { useCartStore } from "../../lib/useCart";
import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import { TiTick } from "react-icons/ti";

type DeviceButtonProps = {
  data: {
    id: number;
    name: string;
    type: string;
    sale_type: string;
    base_price: string;
    device_images?: { url: string }[];
  };
};

export const AddToCartButton = ({ data }: DeviceButtonProps) => {
  const { addToCart, cart } = useCartStore();
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const exists = cart.some((item) => item.id === data.id);
    setIsAdded(exists);
  }, [cart, data]);

  const handleBuyNow = () => {
    if (!data || data.id == null) return;

    addToCart({
      id: data.id,
      name: data.name,
      type: data.type,
      sale_type: data.sale_type,
      base_price: data.base_price,
      image: data.device_images?.[0]?.url
        ? `http://3.76.183.255:3030${data.device_images[0].url}`
        : "https://www.eclosio.ong/wp-content/uploads/2018/08/default.png",
    });

    setIsAdded(true);
  };

  return (
    <div>
      {isAdded ? (
        <Link className="" href={"/cart"}>
          <div className="mt-0.5 hover:text-slate-500 px-0.5 border justify-center items-center py-1 text-center text-black text-lg rounded-xl flex  transition justify-self-center gap-2">
            <TiTick className="text-green-600" />
          </div>
        </Link>
      ) : (
        <button
          type="button"
          disabled={isAdded}
          onClick={handleBuyNow}
          className="px-1.5 pt-[0px] border text-black text-lg rounded-xl flex items-center justify-center hover:text-slate-500 transition justify-self-center gap-2"
        >
          +
        </button>
      )}
    </div>
  );
};
