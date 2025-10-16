import Link from 'next/link';
import React from 'react';

const Carts = () => {
  const cartItems = [
    {
      id: 1,
      name: 'Чехол-накладка HardShell Case For MacBook Air 15 (Clear)',
      price: 79200,
      quantity: 3,
      image: 'https://minapi.beemarket.uz/prod-media/productImages/1760521892XAeYzXLDFvS9.webp',
    },
    {
      id: 2,
      name: 'Планшет Samsung Galaxy Tab S9 Plus (Beige, 256 GB, SIM Wi-Fi+Cellular)',
      price: 3534300,
      quantity: 3,
      image: 'https://minapi.beemarket.uz/prod-media/productImages/1760521892XAeYzXLDFvS9.webp',
    },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
              <th>Quantity</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className='border-t'>
                <td className='py-4'>
                  <img src={item.image} alt={item.name} className='w-16 h-16 mr-4 inline-block' />
                  <span>{item.name}</span>
                </td>
                <td className='py-4'>
                  <div className='flex items-center'>
                    <button className='px-2 bg-gray-200 rounded-l'>-</button>
                    <span className='px-4'>{item.quantity}</span>
                    <button className='px-2 bg-gray-200 rounded-r'>+</button>
                    <button className='ml-2 text-red-500'>🗑️</button>
                  </div>
                </td>
                <td className='py-4'>{item.price.toLocaleString()} so'm</td>
                <td className='py-4'>{ (item.price * item.quantity).toLocaleString() } so'm</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='mt-5 text-right border rounded-2xl p-5'>
          <p className='text-[18px] font-medium'>Total: {total.toLocaleString()} so'm</p>
          <button className='mt-3 px-6 py-2 bg-blue-500 text-white rounded'>Proceed to checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Carts;