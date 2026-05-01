"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextHelper = void 0;
const test_1 = require("@playwright/test");
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
     * Get all text contents from multiple matching locators
     */
    static async getAllTexts(locator) {
        const count = await locator.count();
        const texts = [];
        for (let i = 0; i < count; i++) {
            texts.push(await this.getTrimmedText(locator.nth(i)));
        }
        return texts;
    }
    /**
     * Escape special characters so text can be safely used in a RegExp
     */
    static escapeRegExp(text) {
        return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    /**
     * Convert text into a RegExp
     * By default, the text is escaped and matched case-insensitively
     */
    static toRegExp(text, flags = 'i', escaped = true) {
        const source = escaped ? this.escapeRegExp(text) : text;
        return new RegExp(source, flags);
    }
    /**
     * Clean text by normalising whitespace and removing line breaks
     */
    static cleanText(text) {
        return text.replace(/\s+/g, ' ').replace(/\n/g, ' ').trim();
    }
    /**
     * Normalise text for safe comparison
     * Converts to lowercase, trims, removes special characters, and normalises spaces
     */
    static normalizeForComparison(text) {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s]/g, '')
            .replace(/\s+/g, ' ');
    }
    /**
     * Check whether two text values are similar after normalisation
     */
    static areTextsSimilar(text1, text2) {
        return this.normalizeForComparison(text1) === this.normalizeForComparison(text2);
    }
    /**
     * Extract all numbers from text
     */
    static extractNumbers(text) {
        const matches = text.match(/\d+/g);
        return matches ? matches.map(Number) : [];
    }
    /**
     * Extract the first number from text
     */
    static extractFirstNumber(text) {
        const numbers = this.extractNumbers(text);
        return numbers.length > 0 ? numbers[0] : null;
    }
    /**
     * Remove currency symbols and extract numeric price value
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
        // Use Playwright's built-in text waiting instead of manual polling
        await (0, test_1.expect)(locator).toHaveText(expectedText, { timeout });
    }
    /**
     * Wait for element to contain specific text
     */
    static async waitForTextToContain(locator, expectedText, timeout = 30000) {
        await locator.waitFor({ state: 'visible', timeout });
        // Use Playwright's built-in text waiting instead of manual polling
        await (0, test_1.expect)(locator).toContainText(expectedText, { timeout });
    }
    /**
     * Normalise whitespace by replacing multiple spaces with a single space
     */
    static normalizeWhitespace(text) {
        return (text ?? '').replace(/\s+/g, ' ').trim();
    }
    /**
     * Check whether text matches the expected Gateway date-time format
     */
    static isGatewayDateTime(text) {
        return this.gatewayDateTimeRegex.test(this.normalizeWhitespace(text));
    }
    /**
     * Parse Gateway date-time text into a JavaScript Date object
     * Example: "7 March 2026 at 01:42"
     */
    static parseGatewayDateTime(text) {
        const normalizedText = this.normalizeWhitespace(text);
        const match = normalizedText.match(this.gatewayDateTimeRegex);
        if (!match) {
            throw new Error(`Invalid Gateway date format. Expected format like "7 March 2026 at 01:42" but got: "${text}"`);
        }
        const [, dayText, monthText, yearText, hourText, minuteText] = match;
        const monthMap = {
            january: 0,
            february: 1,
            march: 2,
            april: 3,
            may: 4,
            june: 5,
            july: 6,
            august: 7,
            september: 8,
            october: 9,
            november: 10,
            december: 11,
        };
        const month = monthMap[monthText.toLowerCase()];
        if (month === undefined) {
            throw new Error(`Unknown month "${monthText}" in "${text}"`);
        }
        return new Date(Number(yearText), month, Number(dayText), Number(hourText), Number(minuteText), 0, 0);
    }
    /**
     * Check whether full name contains both forename and surname
     */
    static nameContains(fullName, forename, surname) {
        const fn = this.normalizeForComparison(forename);
        const sn = this.normalizeForComparison(surname);
        const full = this.normalizeForComparison(fullName);
        return full.includes(fn) && full.includes(sn);
    }
}
exports.TextHelper = TextHelper;
/**
 * Gateway date-time format matcher
 * Example: "7 March 2026 at 01:42"
 */
TextHelper.gatewayDateTimeRegex = /^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})\s+at\s+(\d{2}):(\d{2})$/;
//# sourceMappingURL=TextHelper.js.map