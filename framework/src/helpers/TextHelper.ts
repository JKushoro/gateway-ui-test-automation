import { Locator } from '@playwright/test';

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
   * Get all text contents from multiple matching locators
   */
  public static async getAllTexts(locator: Locator): Promise<string[]> {
    const count = await locator.count();
    const texts: string[] = [];

    for (let i = 0; i < count; i++) {
      texts.push(await this.getTrimmedText(locator.nth(i)));
    }

    return texts;
  }

  /**
   * Escape special characters so text can be safely used in a RegExp
   */
  public static escapeRegExp(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Convert text into a RegExp
   * By default, the text is escaped and matched case-insensitively
   */
  public static toRegExp(text: string, flags: string = 'i', escaped: boolean = true): RegExp {
    const source = escaped ? this.escapeRegExp(text) : text;
    return new RegExp(source, flags);
  }

  /**
   * Clean text by normalising whitespace and removing line breaks
   */
  public static cleanText(text: string): string {
    return text.replace(/\s+/g, ' ').replace(/\n/g, ' ').trim();
  }

  /**
   * Normalise text for safe comparison
   * Converts to lowercase, trims, removes special characters, and normalises spaces
   */
  public static normalizeForComparison(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ');
  }

  /**
   * Check whether two text values are similar after normalisation
   */
  public static areTextsSimilar(text1: string, text2: string): boolean {
    return this.normalizeForComparison(text1) === this.normalizeForComparison(text2);
  }

  /**
   * Extract all numbers from text
   */
  public static extractNumbers(text: string): number[] {
    const matches = text.match(/\d+/g);
    return matches ? matches.map(Number) : [];
  }

  /**
   * Extract the first number from text
   */
  public static extractFirstNumber(text: string): number | null {
    const numbers = this.extractNumbers(text);
    return numbers.length > 0 ? numbers[0] : null;
  }

  /**
   * Remove currency symbols and extract numeric price value
   */
  public static extractPrice(priceText: string): number {
    const cleanPrice = priceText.replace(/[^\d.]/g, '');
    return parseFloat(cleanPrice) || 0;
  }

  /**
   * Wait for element to have specific text
   */
  public static async waitForText(
    locator: Locator,
    expectedText: string,
    timeout: number = 30000
  ): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });

    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      const currentText = await this.getTrimmedText(locator);
      if (currentText === expectedText) return;
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    throw new Error(`Element did not have expected text "${expectedText}" within ${timeout}ms`);
  }

  /**
   * Wait for element to contain specific text
   */
  public static async waitForTextToContain(
    locator: Locator,
    expectedText: string,
    timeout: number = 30000
  ): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });

    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      const currentText = await this.getTrimmedText(locator);
      if (currentText.includes(expectedText)) return;
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    throw new Error(`Element did not contain expected text "${expectedText}" within ${timeout}ms`);
  }

  /**
   * Normalise whitespace by replacing multiple spaces with a single space
   */
  public static normalizeWhitespace(text: string): string {
    return (text ?? '').replace(/\s+/g, ' ').trim();
  }

  /**
   * Gateway date-time format matcher
   * Example: "7 March 2026 at 01:42"
   */
  private static readonly gatewayDateTimeRegex =
    /^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})\s+at\s+(\d{2}):(\d{2})$/;

  /**
   * Check whether text matches the expected Gateway date-time format
   */
  public static isGatewayDateTime(text: string): boolean {
    return this.gatewayDateTimeRegex.test(this.normalizeWhitespace(text));
  }

  /**
   * Parse Gateway date-time text into a JavaScript Date object
   * Example: "7 March 2026 at 01:42"
   */
  public static parseGatewayDateTime(text: string): Date {
    const normalizedText = this.normalizeWhitespace(text);
    const match = normalizedText.match(this.gatewayDateTimeRegex);

    if (!match) {
      throw new Error(
        `Invalid Gateway date format. Expected format like "7 March 2026 at 01:42" but got: "${text}"`
      );
    }

    const [, dayText, monthText, yearText, hourText, minuteText] = match;

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

    const month = monthMap[monthText.toLowerCase()];
    if (month === undefined) {
      throw new Error(`Unknown month "${monthText}" in "${text}"`);
    }

    return new Date(
      Number(yearText),
      month,
      Number(dayText),
      Number(hourText),
      Number(minuteText),
      0,
      0
    );
  }

  /**
   * Check whether full name contains both forename and surname
   */
  public static nameContains(fullName: string, forename: string, surname: string): boolean {
    const fn = this.normalizeForComparison(forename);
    const sn = this.normalizeForComparison(surname);
    const full = this.normalizeForComparison(fullName);
    return full.includes(fn) && full.includes(sn);
  }
}
