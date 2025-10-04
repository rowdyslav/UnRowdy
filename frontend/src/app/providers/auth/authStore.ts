import { create } from 'zustand'
import type { AuthStateType } from '@/app/providers/auth/types.ts'
import { persist } from 'zustand/middleware'

export const useAuthStore = create<AuthStateType>()(
  persist(
    set => ({
      token: null,
      isAuthenticated: false,

      login: (token: string) => set({ isAuthenticated: true, token }),

      logout: () => {
        useAuthStore.persist.clearStorage() //очистка localStorage
        set({ token: null, isAuthenticated: false })
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
)
