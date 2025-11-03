import { create } from "zustand";
import { api } from "../api";
import { validateToken } from "./validateToken";

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

const getToken = (): string | null => {
  if (typeof document === "undefined") return null;
  const tokenCookie = document.cookie
    .split("; ")
    .find(
      (row) =>
        row.startsWith("accessToken=") ||
        row.startsWith("token=") ||
        row.startsWith("access_token=")
    );

  return tokenCookie ? decodeURIComponent(tokenCookie.split("=")[1]) : null;
};

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],

  fetchCart: async () => {
    try {
      const token = getToken();
      if (!token) return;

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
      const token = getToken();
      if (!token) {
        if (typeof window !== "undefined")
          window.location.href = "/auth/signin";
        return;
      }

      const isValid = await validateToken(true);
      if (!isValid) return;

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
      const token = getToken();
      if (!token) {
        if (typeof window !== "undefined")
          window.location.href = "/auth/signin";
        return;
      }

      const isValid = await validateToken(true);
      if (!isValid) return;

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
      const token = getToken();
      if (!token) {
        if (typeof window !== "undefined")
          window.location.href = "/auth/signin";
        return;
      }

      const isValid = await validateToken(true);
      if (!isValid) return;

      await api.delete("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ cart: [] });
    } catch (error) {
      console.error("❌ Cartni tozalashda xatolik:", error);
    }
  },

  getTotalPrice: (): number => {
    return get().cart.reduce<number>((total, item) => {
      const price = parseFloat(item.device.base_price) || 0;
      return total + price;
    }, 0);
  },

  getItemCount: (): number => get().cart.length,
}));
