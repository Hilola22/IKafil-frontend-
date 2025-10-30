'use client';
import { useRouter } from 'next/navigation';
import { FiX } from 'react-icons/fi';
import CartDrawerView from './CartDrawerView';
import { useCartStore } from '../../lib/useCart';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const router = useRouter();
  const { cart, getTotalPrice, clearCart } = useCartStore();

  const handleViewCart = () => {
    onClose();
    setTimeout(() => {
      router.push('/cart');
    }, 300);
  };

  const handleClearCart = async () => {
    if (!confirm('Savatchani tozalaysizmi?')) return;
    await clearCart();
  };

  const isEmpty = cart.length === 0;

  return (
    <div
      className={`fixed inset-0 z-[999] transition-all duration-500 ${
        open ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      <div
        className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-500 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      <div
        className={`absolute right-0 top-0 h-full bg-white shadow-2xl transform transition-transform duration-500 rounded-l-2xl flex flex-col
        w-full sm:w-[400px] md:w-[520px]
        ${open ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            Your cart
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {isEmpty ? (
            <div className="flex flex-col justify-center items-center h-[80%] text-center text-gray-600 px-4">
              <img
                src="/assets/cart-not-found.png"
                alt="cart-not-found"
                className="w-[150px] md:w-[200px]"
              />
              <p className="text-gray-500 text-sm md:text-lg mt-3">
                Your cart is currently empty.
              </p>
              <button
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    router.push('/products');
                  }, 300);
                }}
                className="mt-6 px-6 py-2.5 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-all"
              >
                Start shopping
              </button>
            </div>
          ) : (
            <CartDrawerView />
          )}
        </div>

        {!isEmpty && (
          <div className="border-t border-gray-200 p-5 sticky bottom-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-base md:text-xl font-medium text-gray-700">
                Total:
              </span>
              <span className="text-base md:text-xl font-semibold text-gray-900">
                {getTotalPrice().toLocaleString()} sum
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleViewCart}
                className="flex-1 px-6 py-2.5 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all"
              >
                View Cart
              </button>
              <button
                onClick={handleClearCart}
                className="flex-1 px-6 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
