import { Locator } from '@playwright/test';
export declare class TextHelper {
    /**
     * Get trimmed text content from locator
     */
    static getTrimmedText(locator: Locator): Promise<string>;
    /**
     * Get lowercase text content from locator
     */
    static getLowerCasedText(locator: Locator): Promise<string>;
    /**
     * Get uppercase text content from locator
     */
    static getUpperCasedText(locator: Locator): Promise<string>;
    /**
     * Get inner text from locator
     */
    static getInnerText(locator: Locator): Promise<string>;
    /**
     * Get all text contents from multiple matching locators
     */
    static getAllTexts(locator: Locator): Promise<string[]>;
    /**
     * Escape special characters so text can be safely used in a RegExp
     */
    static escapeRegExp(text: string): string;
    /**
     * Convert text into a RegExp
     * By default, the text is escaped and matched case-insensitively
     */
    static toRegExp(text: string, flags?: string, escaped?: boolean): RegExp;
    /**
     * Clean text by normalising whitespace and removing line breaks
     */
    static cleanText(text: string): string;
    /**
     * Normalise text for safe comparison
     * Converts to lowercase, trims, removes special characters, and normalises spaces
     */
    static normalizeForComparison(text: string): string;
    /**
     * Check whether two text values are similar after normalisation
     */
    static areTextsSimilar(text1: string, text2: string): boolean;
    /**
     * Extract all numbers from text
     */
    static extractNumbers(text: string): number[];
    /**
     * Extract the first number from text
     */
    static extractFirstNumber(text: string): number | null;
    /**
     * Remove currency symbols and extract numeric price value
     */
    static extractPrice(priceText: string): number;
    /**
     * Wait for element to have specific text
     */
    static waitForText(locator: Locator, expectedText: string, timeout?: number): Promise<void>;
    /**
     * Wait for element to contain specific text
     */
    static waitForTextToContain(locator: Locator, expectedText: string, timeout?: number): Promise<void>;
    /**
     * Normalise whitespace by replacing multiple spaces with a single space
     */
    static normalizeWhitespace(text: string): string;
    /**
     * Gateway date-time format matcher
     * Example: "7 March 2026 at 01:42"
     */
    private static readonly gatewayDateTimeRegex;
    /**
     * Check whether text matches the expected Gateway date-time format
     */
    static isGatewayDateTime(text: string): boolean;
    /**
     * Parse Gateway date-time text into a JavaScript Date object
     * Example: "7 March 2026 at 01:42"
     */
    static parseGatewayDateTime(text: string): Date;
    /**
     * Check whether full name contains both forename and surname
     */
    static nameContains(fullName: string, forename: string, surname: string): boolean;
}
//# sourceMappingURL=TextHelper.d.ts.map