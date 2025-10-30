import { create } from "zustand";
import { api } from "../api";

// 🔹 CookieStorage'dan token olish funksiyasi
const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));
  if (!match) return null;
  return decodeURIComponent(match.split("=")[1] || "") || null;
};

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
  fetchCart: () => Promise<void>;
  addToCart: (item: Device) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],

  fetchCart: async () => {
    try {
      const token =
        getCookie("accessToken") ||
        getCookie("token") ||
        getCookie("access_token");

      if (!token) throw new Error("Token topilmadi!");

      const { data } = await api.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ cart: data });
    } catch (error) {
      console.error("❌ Cartni olishda xatolik:", error);
    }
  },

  addToCart: async (item) => {
    try {
      const token =
        getCookie("accessToken") ||
        getCookie("token") ||
        getCookie("access_token");

      if (!token) throw new Error("Token topilmadi!");

      await api.post(
        "/cart",
        { device_id: item.device.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await get().fetchCart();
    } catch (error) {
      console.error("❌ Cartga qo‘shishda xatolik:", error);
    }
  },

  removeFromCart: async (id) => {
    try {
      const token =
        getCookie("accessToken") ||
        getCookie("token") ||
        getCookie("access_token");

      if (!token) throw new Error("Token topilmadi!");

      await api.delete(`/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await get().fetchCart();
    } catch (error) {
      console.error("❌ Cartdan o‘chirishda xatolik:", error);
    }
  },

  clearCart: async () => {
    try {
      const token =
        getCookie("accessToken") ||
        getCookie("token") ||
        getCookie("access_token");

      if (!token) throw new Error("Token topilmadi!");

      await api.delete("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ cart: [] });
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
