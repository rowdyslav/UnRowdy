import {createContext} from "react";
import type {AppContextType} from "@/app/providers/AppContextTypes.ts";

export const AppContext = createContext<AppContextType | undefined>(undefined);
