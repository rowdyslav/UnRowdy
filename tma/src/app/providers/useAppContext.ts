import {useContext} from "react";
import {AppContext} from "@/app/providers/appContext.ts";

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext must be used inside AppContextProvider");
  }

  return ctx;
};
