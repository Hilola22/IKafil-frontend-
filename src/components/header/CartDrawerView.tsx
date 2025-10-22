import Link from 'next/link';
import React from 'react';
import { useCartStore } from '../../lib/useCart';

// const cartItems = [
//   {
//     id: 1,
//     name: 'Чехол-накладка HardShell Case For MacBook Air 15 (Clear)',
//     price: 79200,
//     image:
//       'https://minapi.beemarket.uz/prod-media/productImages/1760521892XAeYzXLDFvS9.webp',
//   },
//   {
//     id: 2,
//     name: 'Планшет Samsung Galaxy Tab S9 Plus (Beige, 256 GB, SIM Wi-Fi+Cellular)',
//     price: 3534300,
//     image:
//       'https://minapi.beemarket.uz/prod-media/productImages/1760521892XAeYzXLDFvS9.webp',
//   },
// ];

const CartDrawerView = () => {
  const { cart, removeFromCart, clearCart } = useCartStore();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-2xl p-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-contain rounded-lg"
              />
              <div>
                <h4 className="font-semibold text-[16px]">{item.name}</h4>
                <p className="text-gray-500 text-sm mt-1">
                  Beige, 256 GB, Wi-Fi+Cellular
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xl font-semibold">
                {item.price.toLocaleString()}{' '}
                <span className="text-sm">сум</span>
              </p>
              <button className="mt-2 text-red-500 hover:text-red-600">
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartDrawerView;
