type Theme = "primary" | "success";

interface ContextValue {
	theme: Theme;
	toggleTheme: () => void;
}

export type { ContextValue, Theme };
