import { type ReactNode, useCallback, useMemo, useState } from "react";
import type { ContextValue, Theme } from "../types/contextTypes";
import { ThemeContext } from "./context";

interface ThemeProviderProps {
	children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const storedTheme = localStorage.getItem("theme");
	const [theme, setTheme] = useState<Theme>(
		storedTheme ? (storedTheme as Theme) : "primary"
	);
	const toggleTheme = useCallback((): void => {
		setTheme(theme === "primary" ? "success" : "primary");
		localStorage.setItem("theme", theme);
	}, [theme]);

	useMemo((): void => {
		localStorage.setItem("theme", theme);
	}, [theme]);

	const contextValue = useMemo<ContextValue>(
		(): ContextValue => ({
			theme,
			toggleTheme
		}),
		[theme, toggleTheme]
	);

	return (
		<ThemeContext.Provider value={contextValue}>
			{children}
		</ThemeContext.Provider>
	);
};
