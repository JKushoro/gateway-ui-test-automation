//framework/src/helpers/AssertionHelper.ts
import { Locator, Page, expect } from '@playwright/test';
import { FrameworkConfig } from '../types';

/**
 * 🎯 AssertionHelper - Simplified Playwright Assertions for Junior Developers
 * 
 * This helper provides easy-to-use assertion methods with clear error messages.
 * All methods use proper Playwright expect() assertions for better debugging.
 * 
 * Key Features:
 * - Clear, descriptive error messages
 * - Consistent timeout handling
 * - Junior developer friendly method names
 * - Proper Playwright assertion patterns
 * 
 * @example Basic usage
 * ```typescript
 * // In your step class
 * await this.assert.assertElementVisible(loginButton);
 * await this.assert.assertElementHasText(heading, 'Welcome');
 * await this.assert.assertInputHasValue(emailInput, 'test@example.com');
 * ```
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
   * 🎯 Assert element has specific text content
   *
   * @param locator - The element locator
   * @param expectedText - The expected text content
   * @param timeout - Optional timeout (uses default if not provided)
   */
  public async assertElementHasText(
    locator: Locator,
    expectedText: string,
    timeout?: number
  ): Promise<void> {
    await expect(locator, `Element should have text "${expectedText}"`).toHaveText(expectedText, {
      timeout: timeout || this.config.timeout,
    });
  }

  /**
   * 🎯 Assert element contains specific text
   *
   * @param locator - The element locator
   * @param expectedText - The text that should be contained
   * @param timeout - Optional timeout (uses default if not provided)
   */
  public async assertElementContainsText(
    locator: Locator,
    expectedText: string,
    timeout?: number
  ): Promise<void> {
    await expect(locator, `Element should contain text "${expectedText}"`).toContainText(
      expectedText,
      {
        timeout: timeout || this.config.timeout,
      }
    );
  }

  /**
   * 🎯 Assert element is visible
   *
   * @param locator - The element locator
   * @param timeout - Optional timeout (uses default if not provided)
   */
  public async assertElementVisible(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator, 'Element should be visible').toBeVisible({
      timeout: timeout || this.config.timeout,
    });
  }

  /**
   * 🎯 Assert element is hidden
   *
   * @param locator - The element locator
   * @param timeout - Optional timeout (uses default if not provided)
   */
  public async assertElementHidden(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator, 'Element should be hidden').toBeHidden({
      timeout: timeout || this.config.timeout,
    });
  }

  /**
   * 🎯 Assert element is enabled
   *
   * @param locator - The element locator
   * @param timeout - Optional timeout (uses default if not provided)
   */
  public async assertElementEnabled(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator, 'Element should be enabled').toBeEnabled({
      timeout: timeout || this.config.timeout,
    });
  }

  /**
   * 🎯 Assert element is disabled
   *
   * @param locator - The element locator
   * @param timeout - Optional timeout (uses default if not provided)
   */
  public async assertElementDisabled(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator, 'Element should be disabled').toBeDisabled({
      timeout: timeout || this.config.timeout,
    });
  }

  /**
   * 🎯 Assert element is checked (for checkboxes/radio buttons)
   *
   * @param locator - The checkbox/radio button locator
   * @param timeout - Optional timeout (uses default if not provided)
   */
  public async assertElementChecked(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator, 'Element should be checked').toBeChecked({
      timeout: timeout || this.config.timeout,
    });
  }

  /**
   * 🎯 Assert element is unchecked
   *
   * @param locator - The checkbox/radio button locator
   * @param timeout - Optional timeout (uses default if not provided)
   */
  public async assertElementUnchecked(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator, 'Element should be unchecked').not.toBeChecked({
      timeout: timeout || this.config.timeout,
    });
  }

  /**
   * 🎯 Assert input has specific value
   *
   * @param locator - The input element locator
   * @param expectedValue - The expected value
   * @param timeout - Optional timeout (uses default if not provided)
   */
  public async assertInputHasValue(
    locator: Locator,
    expectedValue: string,
    timeout?: number
  ): Promise<void> {
    await expect(locator, `Input should have value "${expectedValue}"`).toHaveValue(expectedValue, {
      timeout: timeout || this.config.timeout,
    });
  }

  /**
   * 🎯 Assert element count
   *
   * @param locator - The element locator
   * @param expectedCount - The expected number of elements
   * @param timeout - Optional timeout (uses default if not provided)
   */
  public async assertElementCount(
    locator: Locator,
    expectedCount: number,
    timeout?: number
  ): Promise<void> {
    await expect(locator, `Should find exactly ${expectedCount} element(s)`).toHaveCount(
      expectedCount,
      {
        timeout: timeout || this.config.timeout,
      }
    );
  }

  /**
   * 🎯 Assert page title
   *
   * @param expectedTitle - The expected page title
   * @param timeout - Optional timeout (uses default if not provided)
   */
  public async assertPageTitle(expectedTitle: string, timeout?: number): Promise<void> {
    await expect(this.page, `Page title should be "${expectedTitle}"`).toHaveTitle(expectedTitle, {
      timeout: timeout || this.config.timeout,
    });
  }

  /**
   * 🎯 Assert page title contains text
   *
   * @param partialTitle - The text that should be in the title
   * @param timeout - Optional timeout (uses default if not provided)
   */
  public async assertPageTitleContains(partialTitle: string, timeout?: number): Promise<void> {
    await expect(this.page, `Page title should contain "${partialTitle}"`).toHaveTitle(
      new RegExp(partialTitle),
      {
        timeout: timeout || this.config.timeout,
      }
    );
  }

  /**
   * 🎯 Assert page URL
   *
   * @param expectedUrl - The expected URL
   * @param timeout - Optional timeout (uses default if not provided)
   */
  public async assertPageURL(expectedUrl: string, timeout?: number): Promise<void> {
    await expect(this.page, `Page URL should be "${expectedUrl}"`).toHaveURL(expectedUrl, {
      timeout: timeout || this.config.timeout,
    });
  }

  /**
   * 🎯 Assert page URL contains text
   *
   * @param partialUrl - The text that should be in the URL
   * @param timeout - Optional timeout (uses default if not provided)
   */
  public async assertPageURLContains(partialUrl: string, timeout?: number): Promise<void> {
    await expect(this.page, `Page URL should contain "${partialUrl}"`).toHaveURL(
      new RegExp(partialUrl),
      {
        timeout: timeout || this.config.timeout,
      }
    );
  }

  /**
   * 🎯 Assert that a heading with specific text is visible
   *
   * This method first tries to find a heading by test ID, then falls back to text search.
   *
   * @param headingText - The text of the heading
   * @param timeout - Optional timeout (uses default if not provided)
   */
  public async assertHeadingVisible(headingText: string, timeout?: number): Promise<void> {
    const t = timeout ?? this.config.timeout;

    // Try to find by test ID first (more reliable)
    const titleByTestId = this.page.getByTestId('definition-form-active-page-title');
    const titleByText = this.page.getByText(headingText, { exact: false }).first();

    const element = (await titleByTestId.count()) ? titleByTestId : titleByText;

    await expect(element, `Heading "${headingText}" should be visible`).toBeVisible({ timeout: t });
  }

  /**
   * 🎯 Assert element is clickable (visible and enabled)
   *
   * @param locator - The element locator
   * @param timeout - Optional timeout (uses default if not provided)
   */
  public async assertElementClickable(locator: Locator, timeout?: number): Promise<void> {
    await this.assertElementVisible(locator, timeout);
    await this.assertElementEnabled(locator, timeout);
  }

  /**
   * 🎯 Assert element has specific attribute value
   *
   * @param locator - The element locator
   * @param attribute - The attribute name
   * @param expectedValue - The expected attribute value
   * @param timeout - Optional timeout (uses default if not provided)
   */
  public async assertElementHasAttribute(
    locator: Locator,
    attribute: string,
    expectedValue: string,
    timeout?: number
  ): Promise<void> {
    await expect(
      locator,
      `Element should have attribute "${attribute}" with value "${expectedValue}"`
    ).toHaveAttribute(attribute, expectedValue, {
      timeout: timeout || this.config.timeout,
    });
  }

  /**
   * 🎯 Assert element has specific class
   *
   * @param locator - The element locator
   * @param className - The class name to check for
   * @param timeout - Optional timeout (uses default if not provided)
   */
  public async assertElementHasClass(
    locator: Locator,
    className: string,
    timeout?: number
  ): Promise<void> {
    await expect(locator, `Element should have class "${className}"`).toHaveClass(
      new RegExp(className),
      {
        timeout: timeout || this.config.timeout,
      }
    );
  }

  /**
   * 🎯 Update configuration at runtime
   *
   * @param updates - Partial configuration updates
   */
  public updateConfig(updates: Partial<FrameworkConfig>): void {
    Object.assign(this.config, updates);
  }

  /**
   * 🎯 Parse formatted number from string (utility method)
   *
   * @param value - The string value to parse
   * @returns The parsed number or NaN if invalid
   */
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

  /**
   * 🎯 Assert formatted number equals expected value
   *
   * @param locator - The element containing the formatted number
   * @param expectedValue - The expected numeric value
   * @param timeout - Optional timeout (uses default if not provided)
   */
  public async assertFormattedNumberEquals(locator: Locator, expectedValue: number, timeout?: number): Promise<void> {
    const t = timeout || this.config.timeout;
    await expect(locator).toBeVisible({ timeout: t });

    const tagName = await locator.evaluate(el => el.tagName.toLowerCase());
    const rawValue = tagName === 'input' || tagName === 'textarea' ? await locator.inputValue({ timeout: t })
        : ((await locator.textContent({ timeout: t })) ?? '');

    const actualValue = this.parseFormattedNumber(rawValue);
    expect(actualValue, `Formatted number should equal ${expectedValue}, but got "${rawValue}" (parsed as ${actualValue})`).toBe(expectedValue);
  }
}