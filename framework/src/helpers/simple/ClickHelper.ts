// framework/src/helpers/simple/ClickHelper.ts
import { Locator, Page } from '@playwright/test';
import { WaitHelper } from '../WaitHelper';
import { createLogger } from '../../utils/Logger';

/**
 * 🖱️ Simple Click Helper
 * Easy-to-understand methods for clicking things on the page
 */
export class ClickHelper {
  private wait: WaitHelper;
  private logger = createLogger('ClickHelper');

  constructor(private page: Page) {
    this.wait = new WaitHelper(page);
  }

  // ===== CLICK BUTTONS =====
  
  /** Click a button by its text (e.g., "Save", "Submit", "Continue") */
  async clickButton(buttonText: string): Promise<void> {
    const button = this.page.getByRole('button', { name: new RegExp(buttonText, 'i') });
    await this.wait.waitForElement(button);
    await button.click();
    this.logger.info?.(`✓ Clicked button: "${buttonText}"`);
  }

  /** Click a button with exact text match */
  async clickButtonExact(buttonText: string): Promise<void> {
    const button = this.page.getByRole('button', { name: buttonText, exact: true });
    await this.wait.waitForElement(button);
    await button.click();
    this.logger.info?.(`✓ Clicked button (exact): "${buttonText}"`);
  }

  // ===== CLICK LINKS =====
  
  /** Click a link by its text */
  async clickLink(linkText: string): Promise<void> {
    const link = this.page.getByRole('link', { name: new RegExp(linkText, 'i') });
    await this.wait.waitForElement(link);
    await link.click();
    this.logger.info?.(`✓ Clicked link: "${linkText}"`);
  }

  // ===== CLICK ANY ELEMENT =====
  
  /** Click any element by its selector */
  async clickElement(selector: string): Promise<void> {
    const element = this.page.locator(selector);
    await this.wait.waitForElement(element);
    await element.click();
    this.logger.info?.(`✓ Clicked element: ${selector}`);
  }

  /** Click any element (Playwright Locator) */
  async clickLocator(locator: Locator): Promise<void> {
    await this.wait.waitForElement(locator);
    await locator.click();
    this.logger.info?.(`✓ Clicked element`);
  }

  // ===== SPECIAL CLICKS =====
  
  /** Click and wait for page to navigate to new URL */
  async clickAndWaitForNavigation(locator: Locator, expectedUrl: string): Promise<void> {
    await Promise.all([
      this.page.waitForURL(expectedUrl),
      this.clickLocator(locator)
    ]);
    this.logger.info?.(`✓ Clicked and navigated to: ${expectedUrl}`);
  }
}