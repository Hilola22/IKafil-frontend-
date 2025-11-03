'use client';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DeviceView } from '../device-view/DeviceView';
import { useCartStore } from '../../lib/useCart';
import { CartItemRow } from './CartItemRow';
import { useParams, useRouter } from 'next/navigation';
import CheckoutButton from './CheckoutButton';
import { useAuthStore } from '../../store/auth/useAuthStore';

const baseUrl = 'https://api.ikafil.uz';

const Carts = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoadingRelated, setIsLoadingRelated] = useState(true);
  const [isRemoving, setIsRemoving] = useState<number | null>(null);
  const router = useRouter();
  const params = useParams();
  const locale = (params as any)?.locale as string;
  const getAccessToken = useAuthStore((s) => s.getAccessToken);

  const { cart, fetchCart, removeFromCart, clearCart, getTotalPrice } =
    useCartStore();

  const fetchRelatedProducts = async () => {
    try {
      setIsLoadingRelated(true);
      const response = await fetch(`${baseUrl}/api/devices?limit=8&page=1`);
      const result = await response.json();

      const normalized = Array.isArray(result.data)
        ? result.data
        : Array.isArray(result.devices)
        ? result.devices
        : Array.isArray(result)
        ? result
        : [];

      setRelatedProducts(normalized.slice(0, 4));
    } catch (error) {
      console.error('Failed to fetch related products:', error);
    } finally {
      setIsLoadingRelated(false);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchRelatedProducts();
  }, [fetchCart]);

  const user = useMemo(() => {
    try {
      const raw = localStorage.getItem('user_basic');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  const checkoutItems = useMemo(() => {
    return (cart || []).map((c) => ({
      id: c.device?.id ?? c.id,
      name: c.device?.name,
      price: Number(c.device?.base_price ?? 0),
      device: {
        id: c.device?.id,
        name: c.device?.name,
        base_price: String(c.device?.base_price ?? '0'),
        details: {
          color: c.device?.details?.color,
          storage: c.device?.details?.storage,
        },
      },
    }));
  }, [cart]);

  const handleRemove = async (id: number) => {
    setIsRemoving(id);
    await removeFromCart(id);
    setIsRemoving(null);
  };

  const handleClearCart = async () => {
    if (!confirm('Savatchani tozalaysizmi?')) return;
    await clearCart();
  };

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
        <p>Cart</p>
      </div>

      <h3 className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-medium">
        Your Cart
      </h3>

      {!cart || cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10">
        <p className="text-gray-500 text-lg text-center">🛒 Your cart is currently empty</p>
        <button
          onClick={() => {
            setTimeout(() => router.push(`/${locale}/products`), 300);
          }}
          className="mt-6 px-6 py-2.5 bg-indigo-500 text-white font-medium rounded-full shadow hover:bg-indigo-600 transition-all"
        >
          Start Shopping
        </button>
      </div>
      
      ) : (
        <div className="mt-6 flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 overflow-x-auto w-full">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b text-sm sm:text-base">
                  <th className="py-3">Product</th>
                  <th className="py-3">Price</th>
                  <th className="py-3 w-[60px] text-right"></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    isRemoving={isRemoving}
                    handleRemove={handleRemove}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div className="w-full sm:max-w-md lg:w-[320px] border rounded-2xl p-5 sm:p-6 shadow-md bg-white sticky top-20">
            <h4 className="text-lg sm:text-xl font-semibold mb-3">
              Order Summary
            </h4>
            <div className="flex justify-between text-base sm:text-lg mb-4">
              <span>Total:</span>
              <span className="font-bold text-gray-900">
                {getTotalPrice().toLocaleString()} so'm
              </span>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={handleClearCart}
                className="w-full px-5 py-2 bg-gray-200 text-black rounded-full hover:bg-gray-300 transition"
              >
                Clear Cart
              </button>
              <CheckoutButton
                items={checkoutItems}
                total={getTotalPrice()}
                locale={locale}
                user={user}
              />
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto mt-16 px-2 sm:px-4">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-8 text-center sm:text-left">
          More Products You May Like
        </h2>

        {isLoadingRelated ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card
                key={i}
                className="border-0 shadow-lg bg-white/80 backdrop-blur animate-pulse"
              >
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-200 rounded-xl mb-4" />
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-6 bg-gray-200 rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <DeviceView data={relatedProducts} />
        )}
      </div>
    </div>
  );
};

export default Carts;
