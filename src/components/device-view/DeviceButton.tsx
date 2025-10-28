'use client';

import { Button } from '../ui/button';
import { FaShoppingCart } from 'react-icons/fa';
import { Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/lib/useCart';
import { useRouter } from 'next/navigation';

// 🔹 Cookie'dan token olish helper
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(name + '='));
  if (!match) return null;
  return decodeURIComponent(match.split('=')[1] || '') || null;
};

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
  const router = useRouter();
  const { addToCart, fetchCart, cart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // 🔹 Cartni backenddan yuklab olish
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // 🔹 Cart yangilansa, mavjudligini tekshirish
  useEffect(() => {
    const exists = cart.some(
      (item) =>
        item.device?.id === product.id ||
        item.id === product.id
    );
    setIsAdded(exists);
  }, [cart, product.id]);

  const handleBuyNow = async () => {
    if (loading || isAdded) return;
    setLoading(true);

    try {
      await addToCart({
        id: product.id,
        device: {
          id: product.id,
          name: product.name,
          type: product.type,
          sale_type: product.sale_type,
          isTradible: false,
          seller_id: null,
          region_id: null,
          base_price: product.base_price.toString(),
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
            device_id: product.id,
            sim_type: "",
          },
          device_images:
            product.device_images?.length && product.device_images[0].url
              ? [
                  {
                    url: `https://api.ikafil.uz${product.device_images[0].url}`,
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
      console.error('Cartga qo‘shishda xatolik:', err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Tokenni tekshirib, bo‘lmasa /signin sahifasiga yo‘naltirish
  const attemptAdd = () => {
    const token =
      getCookie('accessToken') ||
      getCookie('token') ||
      getCookie('access_token');

    if (!token) {
      router.push('/auth/signin');
      return;
    }

    handleBuyNow();
  };

  return (
    <Button
      disabled={isAdded || loading}
      onClick={attemptAdd}
      className="w-full bg-black text-white py-6 text-lg rounded-xl flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : isAdded ? (
        <>
          <FaShoppingCart /> Added
        </>
      ) : (
        <>
          <FaShoppingCart /> Add to Cart
        </>
      )}
    </Button>
  );
};

export default DeviceButton;
