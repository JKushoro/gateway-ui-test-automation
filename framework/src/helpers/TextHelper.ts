import { Locator } from '@playwright/test';


/**
 * Centralized Text Helper - Eliminates duplication across ActionHelper and ElementHelper
 * Single source of truth for all text manipulation and extraction methods
 */
export class TextHelper {
  /**
   * Get trimmed text content from locator
   */
  public static async getTrimmedText(locator: Locator): Promise<string> {
    return (await locator.textContent())?.trim() || '';
  }

  /**
   * Get lowercase text content from locator
   */
  public static async getLowerCasedText(locator: Locator): Promise<string> {
    return (await locator.textContent())?.trim().toLowerCase() || '';
  }

  /**
   * Get uppercase text content from locator
   */
  public static async getUpperCasedText(locator: Locator): Promise<string> {
    return (await locator.textContent())?.trim().toUpperCase() || '';
  }

  /**
   * Get inner text from locator
   */
  public static async getInnerText(locator: Locator): Promise<string> {
    return (await locator.innerText())?.trim() || '';
  }

  /**
   * Get all text contents from multiple locators
   */
  public static async getAllTexts(locator: Locator): Promise<string[]> {
    const count = await locator.count();
    const texts: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const text = await this.getTrimmedText(locator.nth(i));
      texts.push(text);
    }
    
    return texts;
  }

  /**
   * Escape a string so it can be safely used inside a RegExp as a literal.
   * Example: "A+B?" -> "A\+B\?"
   */
  public static escapeRegExp(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Convert plain text into a RegExp (escaped by default).
   * - escaped=true means the text is treated as a literal (recommended for UI questions)
   * - flags defaults to 'i' for case-insensitive matching
   */
  public static toRegExp(text: string, flags: string = 'i', escaped: boolean = true): RegExp {
    const source = escaped ? this.escapeRegExp(text) : text;
    return new RegExp(source, flags);
  }

  /**
   * Clean and normalize text (remove extra whitespace, normalize line breaks)
   */
  public static cleanText(text: string): string {
    return text
      .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
      .replace(/\n/g, ' ')  // Replace line breaks with space
      .trim();
  }

  /**
   * Format text for comparison (lowercase, trim, remove special chars)
   */
  public static normalizeForComparison(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s]/g, '') // Remove special characters
      .replace(/\s+/g, ' ');   // Normalize whitespace
  }

  /**
   * Check if two texts are similar (ignoring case, whitespace, special chars)
   */
  public static areTextsSimilar(text1: string, text2: string): boolean {
    return this.normalizeForComparison(text1) === this.normalizeForComparison(text2);
  }

  /**
   * Extract numbers from text
   */
  public static extractNumbers(text: string): number[] {
    const matches = text.match(/\d+/g);
    return matches ? matches.map(Number) : [];
  }

  /**
   * Extract first number from text
   */
  public static extractFirstNumber(text: string): number | null {
    const numbers = this.extractNumbers(text);
    return numbers.length > 0 ? numbers[0] : null;
  }

  /**
   * Remove currency symbols and extract price
   */
  public static extractPrice(priceText: string): number {
    const cleanPrice = priceText.replace(/[^\d.]/g, '');
    return parseFloat(cleanPrice) || 0;
  }

  /**
   * Wait for element to have specific text
   */
  public static async waitForText(locator: Locator, expectedText: string, timeout: number = 30000): Promise<void> {
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

  public static normalizeWhitespace(text: string): string {
    return (text ?? '').replace(/\s+/g, ' ').trim();
  }

  /**
   * Validate "2 March 2026 at 20:30"
   */
  public static isGatewayDateTime(text: string): boolean {
    const t = this.normalizeWhitespace(text);
    return /^\d{1,2}\s+[A-Za-z]+\s+\d{4}\s+at\s+\d{2}:\d{2}$/.test(t);
  }

  /**
   * Parse "2 March 2026 at 20:30" -> Date (seconds assumed 00)
   */
  public static parseGatewayDateTime(text: string): Date {
    const t = this.normalizeWhitespace(text);

    const m = t.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})\s+at\s+(\d{2}):(\d{2})$/);
    if (!m) throw new Error(`Unable to parse gateway datetime: "${text}"`);

    const day = Number(m[1]);
    const monthName = m[2].toLowerCase();
    const year = Number(m[3]);
    const hh = Number(m[4]);
    const mm = Number(m[5]);

    const monthMap: Record<string, number> = {
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

    const month = monthMap[monthName];
    if (month === undefined) throw new Error(`Unknown month "${m[2]}" in "${text}"`);

    return new Date(year, month, day, hh, mm, 0, 0);
  }

  /**
   * Wait for element to contain specific text
   */
  public static async waitForTextToContain(locator: Locator, expectedText: string, timeout: number = 30000): Promise<void> {
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

  public static nameContains(fullName: string, forename: string, surname: string): boolean {
    const fn = this.normalizeForComparison(forename);
    const sn = this.normalizeForComparison(surname);
    const full = this.normalizeForComparison(fullName);
    return full.includes(fn) && full.includes(sn);
  }
}