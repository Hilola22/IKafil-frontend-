import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  id: string;
  username: string;
  full_name: string;
  email: string;
  phone: string;
  role: string;
  region_id: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (user, token) => set({ user, token, isAuthenticated: true }),

      logout: () => set({ user: null, token: null, isAuthenticated: false }),

      updateUser: (updatedUser) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedUser } : null,
        })),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
