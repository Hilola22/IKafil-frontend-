import React from 'react';
import { useCartStore } from '../../lib/useCart';

const CartDrawerView = () => {
  const { cart, removeFromCart, clearCart } = useCartStore();

  if (!cart || cart.length === 0) {
    return <p className="text-center text-gray-500 mt-10">Savat bo‘sh</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-4 overflow-y-scroll h-[100vh]">
        {cart.map((item) => {          
          const imageUrl =
            item.image ||
            (item.device_images?.[0]?.url ?? "/no-image.jpg");
            const detailsColor =item.color || (item.details?.color ?? "--")
            console.log(detailsColor);
                        
            

          return (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-2xl p-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={imageUrl}
                  alt={item.name}
                  className="w-24 h-24 object-contain rounded-lg"
                />
                <div>
                  <h4 className="font-semibold text-[16px]">{item.name}</h4>
                  <p className="text-gray-500 text-sm mt-1">
                   {detailsColor}
                    {/* {item.color ?? item.details?.color ?? "—"},{" "} */}
                    {item.storage ?? item.details?.storage ?? "—"}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xl font-semibold">
                  {Number(item.price || item.base_price).toLocaleString()}{" "}
                  <span className="text-sm">сум</span>
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-2 text-red-500 hover:text-red-600 transition"
                >
                  🗑️
                </button>
              </div>
            </div>
          );
        })}

        {cart.length > 0 && (
          <div className="pt-4 border-t flex justify-end">
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 text-sm font-semibold"
            >
              Savatni tozalash
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawerView;
