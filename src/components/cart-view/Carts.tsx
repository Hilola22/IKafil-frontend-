'use client';
import Link from 'next/link';
import React from 'react';
import { useCartStore } from '../../lib/useCart';

const Carts = () => {
  const { cart, removeFromCart, clearCart } = useCartStore();

  return (
    <div className='container'>
      <div className='flex gap-3 text-[14px] mt-3'>
        <Link href='/' className='hover:text-blue-400 underline underline-offset-4'>
          Home
        </Link>
        <p className='text-gray-200'>/</p>
        <p>Cart</p>
      </div>

      <div className='mt-5 text-[40px] font-medium'>
        <h3>Your cart</h3>
      </div>

      {cart.length === 0 ? (
        <p className='mt-5 text-gray-400'>Sizning savatchangiz bo‘sh 😊</p>
      ) : (
        <div className='mt-5 flex gap-5'>
          <table className='w-full'>
            <thead>
              <tr className='text-left'>
                <th>Product</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className='border-t'>
                  <td className='py-4'>
                    <img
                      src={item.image}
                      alt={item.name}
                      className='w-16 h-16 mr-4 inline-block'
                    />
                    <span>{item.name}</span>
                  </td>
                  <td className='py-4'>{item.price.toLocaleString()} so'm</td>
                  <td className='py-4'>
                    <div className='flex items-center'>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className='ml-2 text-red-500'
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className='mt-5 text-right border rounded-2xl p-5'>
            <button
              onClick={clearCart}
              className='mt-3 px-6 py-2 bg-gray-200 text-black rounded mr-3'
            >
              Clear Cart
            </button>
            <button className='mt-3 px-6 py-2 bg-blue-500 text-white rounded'>
              Proceed to checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carts;
