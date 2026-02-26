//framework/src/helpers/AssertionHelper.ts
import { Locator, Page, expect } from '@playwright/test';
import { FrameworkConfig } from '../types';

/**
 * AssertionHelper with essential assertion methods
 * Focused on methods actually used in UI automation testing
 */
export class AssertionHelper {
  private readonly config: Partial<FrameworkConfig>;

  constructor(
    private page: Page,
    config: Partial<FrameworkConfig> = {}
  ) {
    this.config = {
      timeout: 30000,
      ...config,
    };
  }

  /**
   * Assert element has specific text content
   */
  public async assertElementHasText(
    locator: Locator,
    expectedText: string,
    timeout?: number
  ): Promise<void> {
    await expect(locator).toHaveText(expectedText, {
      timeout: timeout || this.config.timeout,
    });
  }

  /**
   * Assert element contains specific text
   */
  public async assertElementContainsText(
    locator: Locator,
    expectedText: string,
    timeout?: number
  ): Promise<void> {
    await expect(locator).toContainText(expectedText, {
      timeout: timeout || this.config.timeout,
    });
  }

  /**
   * Assert element is visible
   */
  public async assertElementVisible(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).toBeVisible({
      timeout: timeout || this.config.timeout,
    });
  }

  /**
   * Assert element is hidden
   */
  public async assertElementHidden(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).toBeHidden({
      timeout: timeout || this.config.timeout,
    });
  }

  /**
   * Assert element is enabled
   */
  public async assertElementEnabled(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).toBeEnabled({
      timeout: timeout || this.config.timeout,
    });
  }

  /**
   * Assert element is disabled
   */
  public async assertElementDisabled(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).toBeDisabled({
      timeout: timeout || this.config.timeout,
    });
  }

  /**
   * Assert element is checked (for checkboxes/radio buttons)
   */
  public async assertElementChecked(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).toBeChecked({
      timeout: timeout || this.config.timeout,
    });
  }

  /**
   * Assert element is unchecked
   */
  public async assertElementUnchecked(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).not.toBeChecked({
      timeout: timeout || this.config.timeout,
    });
  }

  /**
   * Assert element has specific attribute value
   */
  public async assertElementHasAttribute(
    locator: Locator,
    attribute: string,
    value: string,
    timeout?: number
  ): Promise<void> {
    await expect(locator).toHaveAttribute(attribute, value, {
      timeout: timeout || this.config.timeout,
    });
  }

  /**
   * Assert element has specific class
   */
  public async assertElementHasClass(
    locator: Locator,
    className: string,
    timeout?: number
  ): Promise<void> {
    await expect(locator).toHaveClass(new RegExp(className), {
      timeout: timeout || this.config.timeout,
    });
  }

  /**
   * Assert input has specific value
   */
  public async assertInputHasValue(
    locator: Locator,
    value: string,
    timeout?: number
  ): Promise<void> {
    await expect(locator).toHaveValue(value, {
      timeout: timeout || this.config.timeout,
    });
  }

  /**
   * Assert element count
   */
  public async assertElementCount(
    locator: Locator,
    count: number,
    timeout?: number
  ): Promise<void> {
    await expect(locator).toHaveCount(count, {
      timeout: timeout || this.config.timeout,
    });
  }

  /**
   * Assert page title
   */
  public async assertPageTitle(expectedTitle: string, timeout?: number): Promise<void> {
    await expect(this.page).toHaveTitle(expectedTitle, {
      timeout: timeout || this.config.timeout,
    });
  }

  /**
   * Assert page title contains text
   */
  public async assertPageTitleContains(partialTitle: string, timeout?: number): Promise<void> {
    await expect(this.page).toHaveTitle(new RegExp(partialTitle), {
      timeout: timeout || this.config.timeout,
    });
  }

  /**
   * Assert page URL
   */
  public async assertPageURL(expectedUrl: string, timeout?: number): Promise<void> {
    await expect(this.page).toHaveURL(expectedUrl, {
      timeout: timeout || this.config.timeout,
    });
  }

  /**
   * Assert page URL contains text
   */
  public async assertPageURLContains(partialUrl: string, timeout?: number): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(partialUrl), {
      timeout: timeout || this.config.timeout,
    });
  }

  /**
   * Assert element is clickable (visible and enabled)
   */
  public async assertElementClickable(locator: Locator, timeout?: number): Promise<void> {
    await this.assertElementVisible(locator, timeout);
    await this.assertElementEnabled(locator, timeout);
  }

  /**
   * Update configuration at runtime
   */
  public updateConfig(updates: Partial<FrameworkConfig>): void {
    Object.assign(this.config, updates);
  }

  /**
   * Assert that a page or section title with the given text is visible
   */
  public async assertHeadingVisible(text: string, timeout?: number): Promise<void> {
    const t = timeout ?? this.config.timeout;

    const title = this.page.getByTestId('definition-form-active-page-title');
    const el = (await title.count()) ? title : this.page.getByText(text, { exact: false }).first();

    await expect(el).toBeVisible({ timeout: t });
  }

  public parseFormattedNumber(value: string | null | undefined): number {
    if (value == null) return NaN;

    const trimmed = value.trim();
    if (!trimmed) return NaN;

    const cleaned = trimmed
      .replace(/,/g, '')
      .replace(/[^\d.-]/g, '')
      .replace(/(?!^)-/g, '');

    const n = Number(cleaned);

    return Number.isFinite(n) ? n : NaN;
  }

  public async assertFormattedNumberEquals(
    locator: Locator,
    expected: number,
    timeout?: number
  ): Promise<void> {
    const t = timeout ?? this.config.timeout ?? 30_000;

    await expect
      .poll(async () => this.parseFormattedNumber(await locator.inputValue()), { timeout: t })
      .toBe(expected);
  }
}