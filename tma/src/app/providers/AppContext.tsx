import { createContext, useContext } from "react";

interface AppContextType {
  goNext: () => void;
  setIdSubCategory: (id: string) => void;
  idSubCategory: string;
  setNameCategory: (name: string) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext must be used inside AppContextProvider");
  }
  return ctx;
};
