import {create} from "zustand";
import type {AuthStateType} from "@/app/providers/auth/types.ts";
import {persist} from "zustand/middleware";
import type {UserType} from "@/shared/types/userType.ts";

export const useAuthStore = create<AuthStateType>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,

      login: (user: UserType) =>
        set({user: user, isAuthenticated: true}),

      setToken: (token: string) =>
        set({token}),

      logout: () => {
        localStorage.removeItem('auth-storage'); //очистка localStorage
        set({user: null, token: null, isAuthenticated: false,})
      },

      setLoading: (loading: boolean) =>
        set({isLoading: loading}),
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        state?.setLoading(false);
      },
    }
  )
);