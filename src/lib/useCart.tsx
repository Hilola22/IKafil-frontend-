import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: number;
  name: string;
  type: string;
  sale_type: string;
  price: number;
  image: string;
};

type CartStore = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],

      addToCart: (item) =>
        set((state) => {
          if (!item || !item.id) {
            console.error("❌ addToCart() — item undefined yoki id yo‘q!");
            return state;
          }

          const exists = state.cart.some((i) => i.id === item.id);
          if (exists) return state;

          return { cart: [...state.cart, item] };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);
