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
  fetchCart: () => Promise<void>;
  addToCart: (item: Device) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],

  // 🔹 Backenddan cartni olish
  fetchCart: async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token topilmadi!");

      const { data } = await api.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ cart: data });
      console.log("🛒 Cart yuklandi (backenddan)");
    } catch (error) {
      console.error("❌ Cartni olishda xatolik:", error);
    }
  },

  // 🔹 Backendga cartga qo‘shish
  addToCart: async (item) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token topilmadi!");

      await api.post(
        "/cart",
        { device_id: item.device.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Backendni yangilab qayta yuklaymiz
      await get().fetchCart();
      console.log("✅ Mahsulot cartga qo‘shildi (faqat backend)");
    } catch (error) {
      console.error("❌ Cartga qo‘shishda xatolik:", error);
    }
  },

  // 🔹 Backenddan cartdan o‘chirish
  removeFromCart: async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token topilmadi!");

      await api.delete(`/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await get().fetchCart();
      console.log("✅ Cartdan o‘chirildi (faqat backend)");
    } catch (error) {
      console.error("❌ Cartdan o‘chirishda xatolik:", error);
    }
  },

  // 🔹 Cartni butunlay tozalash
  clearCart: async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token topilmadi!");

      await api.delete("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ cart: [] });
      console.log("✅ Cart tozalandi (faqat backend)");
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
