import type {AppContextType} from "@/app/providers/AppContextTypes.ts";
import {createContext, useContext} from "react";

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext must be used inside AppContextProvider");
  }
  return ctx;
};
