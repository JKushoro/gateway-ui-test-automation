import { Locator } from '@playwright/test';
/**
 * Centralized Text Helper - Eliminates duplication across ActionHelper and ElementHelper
 * Single source of truth for all text manipulation and extraction methods
 */
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
     * Get all text contents from multiple locators
     */
    static getAllTexts(locator: Locator): Promise<string[]>;
    /**
     * Clean and normalize text (remove extra whitespace, normalize line breaks)
     */
    static cleanText(text: string): string;
    /**
     * Format text for comparison (lowercase, trim, remove special chars)
     */
    static normalizeForComparison(text: string): string;
    /**
     * Check if two texts are similar (ignoring case, whitespace, special chars)
     */
    static areTextsSimilar(text1: string, text2: string): boolean;
    /**
     * Extract numbers from text
     */
    static extractNumbers(text: string): number[];
    /**
     * Extract first number from text
     */
    static extractFirstNumber(text: string): number | null;
    /**
     * Remove currency symbols and extract price
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
    static nameContains(fullName: string, forename: string, surname: string): boolean;
}
//# sourceMappingURL=TextHelper.d.ts.map