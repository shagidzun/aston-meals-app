import type { MealFull } from "../types/apiTypes";

export function filterProps(
	obj: Partial<MealFull> = {},
	prop: string
): (string | null)[] {
	return Object.entries(obj)
		.filter(
			([key, value]) =>
				key.startsWith(prop) && value?.trim() !== "" && value !== null
		)
		.map(([_, value]) => {
			return value;
		});
}
