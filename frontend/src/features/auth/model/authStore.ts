import {create} from "zustand";
import type {AuthStateType, UserType} from "@/features/auth/types/auth.ts";
import {persist} from "zustand/middleware";

export const useAuthStore = create<AuthStateType>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,

      login: (token: string, user: UserType) =>
        set({ token, user, isAuthenticated: true}),

      logout: () =>
        set({ user: null, token: null, isAuthenticated: false, }),

      setLoading: (loading: boolean) =>
        set({ isLoading: loading }),
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        state?.setLoading(false);
      },
    }
  )
);