"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextHelper = void 0;
/**
 * Centralized Text Helper - Eliminates duplication across ActionHelper and ElementHelper
 * Single source of truth for all text manipulation and extraction methods
 */
class TextHelper {
    /**
     * Get trimmed text content from locator
     */
    static async getTrimmedText(locator) {
        return (await locator.textContent())?.trim() || '';
    }
    /**
     * Get lowercase text content from locator
     */
    static async getLowerCasedText(locator) {
        return (await locator.textContent())?.trim().toLowerCase() || '';
    }
    /**
     * Get uppercase text content from locator
     */
    static async getUpperCasedText(locator) {
        return (await locator.textContent())?.trim().toUpperCase() || '';
    }
    /**
     * Get inner text from locator
     */
    static async getInnerText(locator) {
        return (await locator.innerText())?.trim() || '';
    }
    /**
     * Get all text contents from multiple locators
     */
    static async getAllTexts(locator) {
        const count = await locator.count();
        const texts = [];
        for (let i = 0; i < count; i++) {
            const text = await this.getTrimmedText(locator.nth(i));
            texts.push(text);
        }
        return texts;
    }
    /**
     * Clean and normalize text (remove extra whitespace, normalize line breaks)
     */
    static cleanText(text) {
        return text
            .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
            .replace(/\n/g, ' ') // Replace line breaks with space
            .trim();
    }
    /**
     * Format text for comparison (lowercase, trim, remove special chars)
     */
    static normalizeForComparison(text) {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s]/g, '') // Remove special characters
            .replace(/\s+/g, ' '); // Normalize whitespace
    }
    /**
     * Check if two texts are similar (ignoring case, whitespace, special chars)
     */
    static areTextsSimilar(text1, text2) {
        return this.normalizeForComparison(text1) === this.normalizeForComparison(text2);
    }
    /**
     * Extract numbers from text
     */
    static extractNumbers(text) {
        const matches = text.match(/\d+/g);
        return matches ? matches.map(Number) : [];
    }
    /**
     * Extract first number from text
     */
    static extractFirstNumber(text) {
        const numbers = this.extractNumbers(text);
        return numbers.length > 0 ? numbers[0] : null;
    }
    /**
     * Remove currency symbols and extract price
     */
    static extractPrice(priceText) {
        const cleanPrice = priceText.replace(/[^\d.]/g, '');
        return parseFloat(cleanPrice) || 0;
    }
    /**
     * Wait for element to have specific text
     */
    static async waitForText(locator, expectedText, timeout = 30000) {
        await locator.waitFor({ state: 'visible', timeout });
        const startTime = Date.now();
        while (Date.now() - startTime < timeout) {
            const currentText = await this.getTrimmedText(locator);
            if (currentText === expectedText) {
                return;
            }
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        throw new Error(`Element did not have expected text "${expectedText}" within ${timeout}ms`);
    }
    /**
     * Wait for element to contain specific text
     */
    static async waitForTextToContain(locator, expectedText, timeout = 30000) {
        await locator.waitFor({ state: 'visible', timeout });
        const startTime = Date.now();
        while (Date.now() - startTime < timeout) {
            const currentText = await this.getTrimmedText(locator);
            if (currentText.includes(expectedText)) {
                return;
            }
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        throw new Error(`Element did not contain expected text "${expectedText}" within ${timeout}ms`);
    }
    static nameContains(fullName, forename, surname) {
        const fn = this.normalizeForComparison(forename);
        const sn = this.normalizeForComparison(surname);
        const full = this.normalizeForComparison(fullName);
        return full.includes(fn) && full.includes(sn);
    }
}
exports.TextHelper = TextHelper;
//# sourceMappingURL=TextHelper.js.map