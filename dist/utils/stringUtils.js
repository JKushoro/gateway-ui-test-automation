"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.equalsIgnoreCase = equalsIgnoreCase;
exports.capitalizeFirstLetter = capitalizeFirstLetter;
exports.containsIgnoreCase = containsIgnoreCase;
exports.safeTrim = safeTrim;
/**
 * Compares two strings, ignoring case and trimming whitespace.
 */
function equalsIgnoreCase(a, b) {
    return a.trim().toLowerCase() === b.trim().toLowerCase();
}
/**
 * Capitalizes the first letter of a string.
 */
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
/**
 * Checks if string A contains string B, ignoring case.
 */
function containsIgnoreCase(haystack, needle) {
    return haystack.toLowerCase().includes(needle.toLowerCase());
}
/**
 * Safely trims a string, returns empty string if null or undefined.
 */
function safeTrim(value) {
    return value?.trim() || '';
}
//# sourceMappingURL=stringUtils.js.map