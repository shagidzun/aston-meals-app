import type { ReactNode } from "react";
import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState
} from "react";

interface ThemeProviderProps {
	children: ReactNode;
}

type Theme = "primary" | "success";

interface ContextValue {
	theme: Theme;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ContextValue>({} as ContextValue);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const [theme, setTheme] = useState<Theme>("primary");
	const toggleTheme = useCallback(() => {
		setTheme(theme === "primary" ? "success" : "primary");
	}, [theme]);

	const contextValue = useMemo(
		() => ({
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
