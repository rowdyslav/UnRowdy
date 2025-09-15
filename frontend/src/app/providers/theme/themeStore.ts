import {create} from "zustand";
import type {ThemeStateType} from "@/app/providers/theme/types.ts";
import {persist} from "zustand/middleware";

export const useThemeStore = create<ThemeStateType>()(
  persist(
    (set) => ({
      theme: "light",

      toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light',
      })),
    }),
    {name: 'theme-storage'}
  )
)

export const setThemeDom = (theme: string) => {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
};