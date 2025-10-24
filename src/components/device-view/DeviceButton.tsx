"use client";

import { FaShoppingCart } from "react-icons/fa";
import { Button } from "../ui/button";
import { useCartStore } from "@/lib/useCart";
import { useEffect, useState } from "react";

type DeviceButtonProps = {
  product: {
    id: number;
    name: string;
    type: string;
    sale_type: string;
    base_price: number | string;
    device_images?: { url: string }[];
  };
};

const DeviceButton = ({ product }: DeviceButtonProps) => {
  const { addToCart, cart } = useCartStore();
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const exists = cart.some((item) => item.id === product.id);
    setIsAdded(exists);
  }, [cart, product.id]);

  const handleBuyNow = () => {
    if (!product || !product.id) {
      console.error("❌ product undefined yoki id yo‘q");
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      type: product.type,
      sale_type: product.sale_type,
      price: Number(product.base_price),
      image: product.device_images?.[0]?.url
        ? `http://3.76.183.255:3030${product.device_images[0].url}`
        : "https://www.eclosio.ong/wp-content/uploads/2018/08/default.png",
    });

    setIsAdded(true);
  };

  return (
    <Button
      disabled={isAdded}
      onClick={handleBuyNow}
      className="w-full bg-black text-white py-6 text-lg rounded-xl flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      <FaShoppingCart />
      {isAdded ? "Added to Cart" : "Buy Now"}
    </Button>
  );
};

export default DeviceButton;
