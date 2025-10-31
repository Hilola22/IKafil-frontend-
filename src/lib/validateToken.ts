import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { api } from "../api";

/**
 * ✅ Tokenni to‘liq tekshiradi:
 * - mavjudligi
 * - muddati tugamaganligini
 * - backend tasdiqlashini (/auth/me)
 * 
 * @param redirectOnFail - agar `true` bo‘lsa, signin sahifasiga yo‘naltiradi.
 */
export const validateToken = async (redirectOnFail: boolean = true): Promise<boolean> => {
  const authStore = useAuthStore.getState();
  const token = authStore.getAccessToken();

  if (!token) {
    console.warn("⚠️ Token topilmadi");
    authStore.logout();
    if (redirectOnFail) window.location.href = "/auth/signin";
    return false;
  }

  try {
    const decoded: any = jwtDecode(token);
    if (!decoded?.exp) {
      console.warn("⚠️ Token noto‘g‘ri formatda");
      authStore.logout();
      if (redirectOnFail) window.location.href = "/auth/signin";
      return false;
    }

    const isExpired = Date.now() >= decoded.exp * 1000;
    if (isExpired) {
      console.warn("⌛ Token muddati tugagan");
      authStore.logout();
      if (redirectOnFail) window.location.href = "/auth/signin";
      return false;
    }

    const response = await api.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response?.status === 200 && response?.data?.id) {
      return true;
    } else {
      console.warn("❌ Backend tokenni tasdiqlamadi");
      authStore.logout();
      if (redirectOnFail) window.location.href = "/auth/signin";
      return false;
    }
  } catch (error: any) {
    console.error("❌ Tokenni tekshirishda xatolik:", error);

    if (error?.response?.status === 401) {
      console.warn("🚫 Token noto‘g‘ri yoki muddati tugagan");
    }

    useAuthStore.getState().logout();
    if (redirectOnFail) window.location.href = "/auth/signin";
    return false;
  }
};
