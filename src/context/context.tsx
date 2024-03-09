import { createContext, useContext } from "react";
import type { ContextValue } from "../types/contextTypes";

//здесь as, т.к. создается пустой объект. По крайней мере я видел такие примеры в интернете
export const ThemeContext = createContext<ContextValue>({} as ContextValue);

export const useTheme = () => useContext(ThemeContext);
