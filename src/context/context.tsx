import { createContext, useContext } from "react";
import type { ContextValue } from "../types/contextTypes";

export const ThemeContext = createContext<ContextValue>({} as ContextValue);

export const useTheme = () => useContext(ThemeContext);
