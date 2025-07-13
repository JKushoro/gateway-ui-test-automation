/**
 * Compares two strings, ignoring case and trimming whitespace.
 */
export function equalsIgnoreCase(a: string, b: string): boolean {
    return a.trim().toLowerCase() === b.trim().toLowerCase();
}

/**
 * Capitalizes the first letter of a string.
 */
export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Checks if string A contains string B, ignoring case.
 */
export function containsIgnoreCase(haystack: string, needle: string): boolean {
    return haystack.toLowerCase().includes(needle.toLowerCase());
}

/**
 * Safely trims a string, returns empty string if null or undefined.
 */
export function safeTrim(value?: string | null): string {
    return value?.trim() || '';
}
