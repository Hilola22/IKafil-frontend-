import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { api } from "@/api";

const cookieStorage = () => {
  const isClient = typeof document !== "undefined";

  return {
    getItem: (name: string): string | null => {
      if (!isClient) return null;
      const match = document.cookie
        .split("; ")
        .find((row) => row.startsWith(name + "="));
      if (!match) return null;
      return decodeURIComponent(match.split("=")[1] || "") || null;
    },

    setItem: (name: string, value: string, options?: { maxAge?: number }) => {
      if (!isClient) return;
      const maxAge = options?.maxAge ?? 7 * 24 * 60 * 60;
      const secure = window.location.protocol === "https:";
      document.cookie = `${name}=${encodeURIComponent(
        value
      )}; path=/; max-age=${maxAge}; SameSite=Lax${secure ? "; Secure" : ""}`;
    },

    removeItem: (name: string) => {
      if (!isClient) return;
      document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
    },
  };
};

export interface User {
  id: number;
  username: string;
  full_name: string;
  email: string;
  phone?: string;
  role: string;
  region_id?: number;
  photo?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<void>;
  signup: (data: Record<string, any>) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  getAccessToken: () => string | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,

      login: async (email, password) => {
        try {
          const res = await api.post("/auth/signin", { email, password });
          const data = res.data;

          const accessToken =
            data.access_token ||
            data.accessToken ||
            data.token ||
            data.data?.accessToken ||
            null;

          if (!accessToken) throw new Error("Access token topilmadi!");

          const user = data.user ||
            data.data?.user || {
              id: data.id,
              username: data.username,
              full_name: data.full_name,
              email: data.email,
              role: data.role,
              photo: data.photo,
            };

          cookieStorage().setItem("accessToken", accessToken, {
            maxAge: 5 * 60 * 60,
          });

          set({
            user,
            accessToken,
            isAuthenticated: true,
          });

          console.log("🎉 Login muvaffaqiyatli");
        } catch (error: any) {
          console.error(
            "❌ Login error:",
            error.response?.data || error.message
          );
          throw error;
        }
      },

      signup: async (userData) => {
        try {
          const res = await api.post("/auth/register", userData);
          const data = res.data;

          const accessToken =
            data.access_token ||
            data.accessToken ||
            data.token ||
            data.data?.accessToken ||
            null;

          if (!accessToken) throw new Error("Access token topilmadi!");

          const user = data.user ||
            data.data?.user || {
              id: data.id,
              username: data.username,
              full_name: data.full_name,
              email: data.email,
              role: data.role,
              photo: data.photo,
            };

          cookieStorage().setItem("accessToken", accessToken, {
            maxAge: 5 * 60 * 60,
          });

          set({
            user,
            accessToken,
            isAuthenticated: true,
          });

          console.log("🎉 Sign up muvaffaqiyatli");
        } catch (error: any) {
          console.error(
            "❌ Sign up error:",
            error.response?.data || error.message
          );
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        });
        cookieStorage().removeItem("accessToken");
        console.log("🚪 Logged out");
      },

      updateUser: (updatedUser) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedUser } : null,
        })),

      getAccessToken: () =>
        get().accessToken || cookieStorage().getItem("accessToken"),
    }),
    {
      name: "auth-storage-cookie",
      storage: createJSONStorage(() => cookieStorage() as any),
      partialize: (state) => ({
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
        user: state.user
          ? {
              id: state.user.id,
              email: state.user.email,
              username: state.user.username,
              photo: state.user.photo,
            }
          : null,
      }),
    }
  )
);
