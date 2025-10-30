import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { api } from "../api";

/**
 * ✅ Tokenni to‘liq tekshiradi:
 * - mavjudligi
 * - muddati tugamaganligini
 * - backend tasdiqlashini (/auth/me)
 */
export const validateToken = async (): Promise<boolean> => {
  const authStore = useAuthStore.getState();
  console.log("token", authStore);  
  
  const token = authStore.getAccessToken();

  if (!token) {
    console.warn("⚠️ Token topilmadi");
    authStore.logout();
    window.location.href = "/auth/signin";
    return false;
  }

  try {
    // 1️⃣ Token formatini tekshirish
    const decoded: any = jwtDecode(token);
    if (!decoded?.exp) {
      console.warn("⚠️ Token noto‘g‘ri formatda");
      authStore.logout();
      window.location.href = "/auth/signin";
      return false;
    }

    // 2️⃣ Token muddati tugaganmi?
    const isExpired = Date.now() >= decoded.exp * 1000;
    if (isExpired) {
      console.warn("⌛ Token muddati tugagan");
      authStore.logout();
      window.location.href = "/auth/signin";
      return false;
    }

    // 3️⃣ Backend orqali tokenni tekshirish
    const response = await api.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // agar backend foydalanuvchini qaytarsa
    if (response?.status === 200 && response?.data?.id) {
      return true;
    } else {
      console.warn("❌ Backend tokenni tasdiqlamadi");
      authStore.logout();
      window.location.href = "/auth/signin";
      return false;
    }
  } catch (error: any) {
    console.error("❌ Tokenni tekshirishda xatolik:", error);

    // 401 — token noto‘g‘ri yoki muddati tugagan
    if (error?.response?.status === 401) {
      console.warn("🚫 Token noto‘g‘ri yoki muddati tugagan");
    }

    useAuthStore.getState().logout();
    window.location.href = "/auth/signin";
    return false;
  }
};
