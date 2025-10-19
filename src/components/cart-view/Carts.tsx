import Link from 'next/link';
import React from 'react';

const Carts = () => {
  const cartItems = [
    {
      id: 1,
      name: 'Чехол-накладка HardShell Case For MacBook Air 15 (Clear)',
      price: 79200,
      image: 'https://minapi.beemarket.uz/prod-media/productImages/1760521892XAeYzXLDFvS9.webp',
    },
    {
      id: 2,
      name: 'Планшет Samsung Galaxy Tab S9 Plus (Beige, 256 GB, SIM Wi-Fi+Cellular)',
      price: 3534300,
      image: 'https://minapi.beemarket.uz/prod-media/productImages/1760521892XAeYzXLDFvS9.webp',
    },
  ];


  return (
    <div className='container'>
      <div className='flex gap-3 text-[14px]'>
        <Link href={'/'} className='hover:text-blue-400 underline underline-offset-4'>Home</Link>
        <p className='text-gray-200'>/</p>
        <p>Cart</p>
      </div>
      <div className='mt-5 text-[40px] font-medium'>
        <h3>Your cart</h3>
      </div>
      <div className='mt-5 flex gap-5'>
        <table className='w-full'>
          <thead>
            <tr className='text-left'>
              <th>Product</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className='border-t'>
                <td className='py-4'>
                  <img src={item.image} alt={item.name} className='w-16 h-16 mr-4 inline-block' />
                  <span>{item.name}</span>
                </td>
                <td className='py-4'>{item.price.toLocaleString()} so'm</td>
                <td className='py-4'>
                  <div className='flex items-center'>
                    <button className='ml-2 text-red-500'>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='mt-5 text-right border rounded-2xl p-5'>
          <button className='mt-3 px-6 py-2 bg-blue-500 text-white rounded'>Proceed to checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Carts;