'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { DeviceView } from '../device-view/DeviceView';
import { useCartStore } from '../../lib/useCart';

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

const baseUrl = 'http://3.76.183.255:3030';

const Carts = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingRelated, setIsLoadingRelated] = useState(true);
  const [isRemoving, setIsRemoving] = useState<number | null>(null);

  const { initializeCart, getTotalPrice } = useCartStore();

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  const fetchCart = async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch(`${baseUrl}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      });

      if (!res.ok) {
        setCart([]);
        return;
      }

      const result = await res.json();
      setCart(result.data || result || []);
    } catch (err) {
      console.error('❌ Cart fetch xato:', err);
    } finally {
      setIsLoading(false);
    }
  };

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
    initializeCart();
    fetchCart();
    fetchRelatedProducts();
  }, [initializeCart]);

  const handleRemove = async (id: number) => {
    if (!token) return alert('Avval tizimga kiring!');
    try {
      setIsRemoving(id);
      const res = await fetch(`${baseUrl}/api/cart/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setCart((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error('❌ Remove xato:', err);
    } finally {
      setIsRemoving(null);
    }
  };

  const handleClearCart = async () => {
    if (!token) return alert('Avval tizimga kiring!');
    if (!confirm('Savatchani tozalaysizmi?')) return;

    try {
      const res = await fetch(`${baseUrl}/api/cart/clear`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) setCart([]);
    } catch (err) {
      console.error('❌ Clear cart xato:', err);
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (!cart || cart.length === 0)
    return <p className="mt-5 text-gray-400 text-center">Savatchangiz bo‘sh 😊</p>;

  return (
    <div className="container mx-auto px-4">
      <div className="flex gap-3 text-[14px] mt-3">
        <Link href="/" className="hover:text-blue-500 underline underline-offset-4">
          Home
        </Link>
        <p className="text-gray-300">/</p>
        <p>Cart</p>
      </div>

      <div className="mt-5 text-[40px] font-medium">
        <h3>Your Cart</h3>
      </div>

      <div className="mt-5 flex gap-8 items-start">
        <div className="flex-1 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left border-b">
                <th className="py-3">Product</th>
                <th className="py-3">Price</th>
                <th className="py-3"></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => {
                const imageUrl =
                  item.device.device_images?.[0]?.url
                    ? `${baseUrl}${item.device.device_images[0].url}`
                    : '/no-image.jpg';
                const details = item.device.details || {};

                return (
                  <tr key={item.id} className="border-b">
                    <td className="py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={imageUrl}
                          alt={item.device.name}
                          className="w-20 h-20 object-contain rounded-lg "
                        />

                        <div className="text-[14px] leading-5">
                          <Link
                            href={`/products/${item.device.id}`}
                            className="text-[16px] font-medium hover:text-blue-500 transition-colors"
                          >
                            {item.device.name}
                          </Link>

                          <div className="text-gray-600 mt-1 space-y-0.5">
                            <p>
                              Цвет:{' '}
                              <span className="text-gray-800">
                                {details.color || '-'}
                              </span>
                            </p>
                            <p>
                              Ёмкость:{' '}
                              <span className="text-gray-800">
                                {details.storage || '-'}
                              </span>
                            </p>
                            <p>
                              SIM:{' '}
                              <span className="text-gray-800">
                                {details.sim_type || 'Single SIM'}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 align-top font-medium text-gray-800">
                      {Number(item.device.base_price).toLocaleString()} so'm
                    </td>

                    <td className="py-4 text-right align-top">
                      <button
                        onClick={() => handleRemove(item.id)}
                        disabled={isRemoving === item.id}
                        className="text-red-500 hover:text-red-600 transition disabled:opacity-50"
                      >
                        {isRemoving === item.id ? (
                          <Loader2 size={20} className="animate-spin" />
                        ) : (
                          <Trash2 size={20} />
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="w-[320px] sticky top-20 border rounded-2xl p-6 shadow-sm bg-white">
          <h4 className="text-lg font-semibold mb-3">Order Summary</h4>
          <div className="flex justify-between text-[16px] mb-4">
            <span>Total:</span>
            <span className="font-bold text-gray-900">
              {getTotalPrice().toLocaleString()} so'm
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleClearCart}
              className="px-6 py-2 bg-gray-200 text-black rounded-full hover:bg-gray-300 transition"
            >
              Clear Cart
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          More Products You May Like
        </h2>

        {isLoadingRelated ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="border-0 shadow-lg bg-white/80 backdrop-blur animate-pulse">
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
