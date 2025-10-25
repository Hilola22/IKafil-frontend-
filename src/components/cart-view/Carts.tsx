'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useCartStore } from '../../lib/useCart';
import { Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { DeviceView } from '../device-view/DeviceView';

export type Product = {
  id: number;
  name: string;
  base_price: string;
  status: string;
  device_images?: { url: string; is_primary?: boolean }[];
};

const Carts = () => {
  const baseUrl = 'http://3.76.183.255:3030';
  const { cart, removeFromCart, clearCart, getTotalPrice } = useCartStore();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoadingRelated, setIsLoadingRelated] = useState(true);

  useEffect(() => {
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

    fetchRelatedProducts();
  }, []);

  return (
    <div className="container mx-auto px-4">
      {/* Breadcrumb */}
      <div className="flex gap-3 text-[14px] mt-3">
        <Link
          href="/"
          className="hover:text-blue-500 underline underline-offset-4"
        >
          Home
        </Link>
        <p className="text-gray-300">/</p>
        <p>Cart</p>
      </div>

      <div className="mt-5 text-[40px] font-medium">
        <h3>Your Cart</h3>
      </div>

      {/* Cart Table */}
      {cart.length === 0 ? (
        <p className="mt-5 text-gray-400">Sizning savatchangiz bo‘sh 😊</p>
      ) : (
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
                {cart.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            item.image
                              ? item.image
                              : item.device_images?.[0]?.url
                              ? `${baseUrl}${item.device_images[0].url}`
                              : '/no-image.jpg'
                          }
                          alt={item.name}
                          className="w-16 h-16 object-contain rounded-lg"
                        />

                        <Link
                          href={`/products/${item.id}`}
                          className="text-[16px] font-medium hover:text-blue-500 transition-colors"
                        >
                          {item.name}
                        </Link>
                      </div>
                    </td>
                    <td className="py-4">
                      {Number(item.price || item.base_price).toLocaleString()}{' '}
                      so'm
                    </td>
                    <td className="py-4 text-right">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-600 transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Order Summary */}
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
                onClick={clearCart}
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
      )}

      {/* More Products */}
      <div className="max-w-7xl mx-auto mt-16 px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          More Products You May Like
        </h2>

        {isLoadingRelated ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <DeviceView data={relatedProducts} /> // ✅ shu joyda ishlatiladi
        )}
      </div>
    </div>
  );
};

export default Carts;
