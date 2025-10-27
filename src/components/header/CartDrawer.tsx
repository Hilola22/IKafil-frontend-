"use client";
import { useRouter } from "next/navigation";
import { FiX } from "react-icons/fi";
import CartDrawerView from "./CartDrawerView";
import { useCartStore } from "../../lib/useCart";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const router = useRouter();
  const { cart, getTotalPrice } = useCartStore();

  const handleViewCart = () => {
    onClose();
    setTimeout(() => {
      router.push("/cart");
    }, 300);
  };

  const isEmpty = cart.length === 0;

  return (
    <div
      className={`fixed inset-0 z-[999] transition-all duration-500 ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div
        className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={`absolute right-0 top-0 h-full w-[520px] bg-white shadow-2xl transform transition-transform duration-500 rounded-l-2xl flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Your cart</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {isEmpty ? (
            <div className="flex flex-col justify-center items-center h-[80%] text-center text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-20 h-20 mb-4 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.293 6.707A1 1 0 007.7 21h8.6a1 1 0 00.993-.707L19 13M9 21a2 2 0 104 0"
                />
              </svg>
              <p className="text-gray-500 text-lg">
                Your cart is currently empty.
              </p>
              <button
                onClick={onClose}
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
          <div className="border-t border-gray-200 p-6 sticky bottom-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
            <div className="flex gap-5 items-center mb-4">
              <span className="text-xl font-medium text-gray-700">Total:</span>
              <span className="text-xl font-semibold text-gray-900">
                {getTotalPrice().toLocaleString()} sum
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <button
                onClick={handleViewCart}
                className="flex-1 px-6 py-2.5 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all"
              >
                View Cart
              </button>
              <button
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
