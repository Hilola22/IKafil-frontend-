'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Loader2 } from 'lucide-react';
import { useCartStore } from '../../lib/useCart';

const baseUrl = 'https://api.ikafil.uz';

const CartDrawerView = () => {
  const router = useRouter();
  const { cart, fetchCart, removeFromCart, clearCart } = useCartStore();
  const [isRemoving, setIsRemoving] = useState<number | null>(null);
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleRemove = async (id: number) => {
    setIsRemoving(id);
    await removeFromCart(id);
    setIsRemoving(null);
  };

  const handleClearCart = async () => {
    if (!confirm('Savatni tozalaysizmi?')) return;
    setIsClearing(true);
    await clearCart();
    setIsClearing(false);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="space-y-4 overflow-y-scroll h-[70vh] pr-2">
        {cart.map((item) => {
          const device = item.device;
          const details = device.details || {};
          
          const imageUrl = device.device_images?.[0]?.url
            ? `${baseUrl}${device.device_images[0].url}`
            : '/assets/Image-not-found.png';

          const isThisRemoving = isRemoving === item.id;

          return (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20">
                  <img
                    src={imageUrl}
                    alt={device.name}
                    className={`w-20 h-20 object-contain rounded-md transition-opacity ${
                      isThisRemoving ? 'opacity-50' : 'opacity-100'
                    }`}
                    onError={(e) => (e.currentTarget.src = '/assets/Image-not-found.png')}
                  />
                  {isThisRemoving && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="w-7 h-7 text-gray-600 animate-spin" />
                    </div>
                  )}
                </div>

                <div className="text-[14px] leading-5">
                  <h4
                    onClick={() => router.push(`/products/${device.id}`)}
                    className="font-semibold text-[16px] text-gray-800 hover:text-blue-600 cursor-pointer transition-colors"
                  >
                    {device.name}
                  </h4>

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

              <div className="text-right">
                <p className="text-[18px] font-semibold text-gray-900">
                  {Number(device.base_price).toLocaleString()}{' '}
                  <span className="text-sm text-gray-800">сум</span>
                </p>
                <button
                  onClick={() => handleRemove(item.id)}
                  disabled={isRemoving === item.id}
                  className="mt-2 text-red-500 hover:text-red-600 transition disabled:opacity-50"
                >
                  {isThisRemoving ? (
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
              disabled={isClearing}
              className="text-red-600 hover:text-red-700 text-sm font-semibold transition disabled:opacity-50"
            >
              {isClearing ? 'Tozalanmoqda...' : 'Savatni tozalash'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawerView;
