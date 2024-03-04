export function removeDuplicates(array: string[]): string[] {
	return [...new Set(array)];
}
