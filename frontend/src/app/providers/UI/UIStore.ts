import {create} from "zustand";
import {persist} from "zustand/middleware";
import type {UIStateType} from "@/app/providers/UI/types.ts";

export const useUIStore = create<UIStateType>()(
  persist(
    (set) => ({
      isOpenSideBar: false,

      toggleSideBar: () => set((state) => ({
        isOpenSideBar: !state.isOpenSideBar,
      })),
    }),
    { name: 'UI-storage' }
  )
);