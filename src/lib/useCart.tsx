import { create } from "zustand";
import { api } from "../api";

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
  sim_type?: string;
}



export interface DeviceImage {
  url: string;
}

export interface Device {
  id: number;
  user_id?: number;
  device_id?: number;
  added_at?: string;
  device: {
    id: number;
    name: string;
    type: string;
    sale_type: string;
    isTradible: boolean;
    seller_id: number | null;
    region_id: number | null;
    base_price: string;
    status: string;
    is_active: boolean;
    receive_type: string;
    branch_id: number | null;
    created_at: string;
    updated_at: string;
    details: DeviceDetails;
    device_images: DeviceImage[];
  };
}

interface CartStore {
  cart: Device[];
  initializeCart: () => void;
  addToCart: (item: Device) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],

  initializeCart: () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cart");
      if (stored) {
        set({ cart: JSON.parse(stored) });
      }
    }
  },

  addToCart: async (item) => {
    const currentCart = get().cart;
    const exists = currentCart.some((cartItem) => cartItem.id === item.id);
    if (exists) return;

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token topilmadi!");

      await api.post(
        "/cart",
        { device_id: item.device.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedCart = [item, ...currentCart];
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
      set({ cart: updatedCart });

      console.log("✅ Mahsulot cartga qo‘shildi (backend + local)");
    } catch (error) {
      console.error("❌ Cartga qo‘shishda xatolik:", error);
    }
  },

  removeFromCart: async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token topilmadi!");

      await api.delete(`/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedCart = get().cart.filter((item) => item.id !== id);
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
      set({ cart: updatedCart });

      console.log("✅ Cartdan o‘chirildi (backend + local)");
    } catch (error) {
      console.error("❌ Cartdan o‘chirishda xatolik:", error);
    }
  },

  clearCart: async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token topilmadi!");

      await api.delete("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
      }
      set({ cart: [] });

      console.log("✅ Cart tozalandi (backend + local)");
    } catch (error) {
      console.error("❌ Cartni tozalashda xatolik:", error);
    }
  },

  getTotalPrice: () => {
    return get().cart.reduce((total, item) => {
      const price = parseFloat(item.device.base_price) || 0;
      return total + price;
    }, 0);
  },

  getItemCount: () => get().cart.length,
}));
