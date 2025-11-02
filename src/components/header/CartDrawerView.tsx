'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Loader2 } from 'lucide-react';
import { useCartStore } from '../../lib/useCart';
import { CartItemRow } from '../cart-view/CartItemRow';

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
        <table className="w-full">
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
