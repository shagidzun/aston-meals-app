export function filterProps(
	obj: Record<string, string> = {},
	prop: string
): string[] {
	return Object.entries(obj)
		.filter(([key, value]) => key.startsWith(prop) && value.trim() !== "")
		.map(([_, value]) => {
			return value;
		});
}
