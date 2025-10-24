import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface DeviceImage {
  id?: number;
  device_id?: number;
  url: string;
  is_primary?: boolean;
  created_at?: string;
}

export interface DeviceDetails {
  id?: number;
  color?: string;
  year?: number;
  cpu?: string;
  ram?: string;
  storage?: string;
  display_size?: string;
  battery_health?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  device_id?: number;
}

export interface Device {
  id: number;
  name: string;
  type?: string;
  sale_type?: string;
  isTradible?: boolean;
  seller_id?: number | null;
  region_id?: number;
  base_price: string;
  price?: number | string;
  status?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  image?: string;
  color?: string;
  storage?: string;
  details?: DeviceDetails;
  device_images?: DeviceImage[];
}

type CartStore = {
  cart: Device[];
  addToCart: (item: Device) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item) =>
        set((state) => {
          console.log("🧩 addToCart() kelgan item:", item);
      
          if (!item || !item.id) return state;
      
          const exists = state.cart.some((i) => i.id === item.id);
          if (exists) return state;
      
          const normalized: Device = {
            ...item,
            base_price: String(item.base_price ?? item.price ?? 0),
            device_images: Array.isArray(item.device_images)
              ? item.device_images
              : item.image
              ? [{ url: item.image }]
              : [],
            details: item.details
              ? { ...item.details }
              : { color: item.color, storage: item.storage },
            color: item.details?.color ?? item.color ?? "—",
            storage: item.details?.storage ?? item.storage ?? "—",
          };
      
          console.log("✅ Normalized:", normalized);
      
          return { cart: [normalized, ...state.cart] };
        }),
        
      

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      clearCart: () => set({ cart: [] }),

      getTotalPrice: () => {
        const { cart } = get();
        return cart.reduce(
          (total, item) => total + parseFloat(item.base_price || "0"),
          0
        );
      },

      getItemCount: () => get().cart.length,
    }),
    { name: "cart-storage" }
  )
);
