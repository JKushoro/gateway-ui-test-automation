// framework/src/helpers/actions/ClickActions.ts
import { Locator, Page } from '@playwright/test';
import { CoreActions } from './CoreActions';
import { FrameworkConfig } from '../../types';

/**
 * ClickActions - Simple clicking and basic interactions
 *
 * Handles all click-related operations like clicking buttons, links,
 * and basic element interactions. Junior developer friendly with
 * clear method names and automatic waiting.
 */
export class ClickActions extends CoreActions {
  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
  }

  // ===========================================================================
  // Clicks & basic interactions
  // ===========================================================================

  /**
   * Click any element with robust error handling
   *
   * @param locator Locator, selector, or strategy to find element
   * @param options Click options (force, button, etc.)
   */
  public async clickLocator(
    locator: Locator | string | (() => Locator | Promise<Locator | null>),
    options?: { force?: boolean; button?: 'left' | 'right' | 'middle'; clickCount?: number }
  ): Promise<void> {
    const element = await this.getElement(locator, 'click');
    
    try {
      await element.click({
        timeout: this.config.timeout,
        force: options?.force,
        button: options?.button,
        clickCount: options?.clickCount || 1
      });
      
      await this.slowMo();
      this.logger.debug(`Successfully clicked element`);
    } catch (error) {
      throw new Error(`Failed to click element: ${error}`);
    }
  }

  /**
   * Double click an element
   *
   * @param locator Element to double click
   */
  public async doubleClick(
    locator: Locator | string | (() => Locator | Promise<Locator | null>)
  ): Promise<void> {
    const element = await this.getElement(locator, 'double click');
    
    try {
      await element.dblclick({ timeout: this.config.timeout });
      await this.slowMo();
      this.logger.debug('Successfully double clicked element');
    } catch (error) {
      throw new Error(`Failed to double click element: ${error}`);
    }
  }

  /**
   * Right click (context menu) an element
   *
   * @param locator Element to right click
   */
  public async rightClick(
    locator: Locator | string | (() => Locator | Promise<Locator | null>)
  ): Promise<void> {
    const element = await this.getElement(locator, 'right click');
    
    try {
      await element.click({
        button: 'right',
        timeout: this.config.timeout
      });
      await this.slowMo();
      this.logger.debug('Successfully right clicked element');
    } catch (error) {
      throw new Error(`Failed to right click element: ${error}`);
    }
  }

  /**
   * Click button by visible text (case-insensitive, exact match)
   *
   * @param buttonText Text on the button
   */
  public async clickButtonByText(buttonText: string): Promise<void> {
    try {
      const button = this.page.locator('button, input[type="button"], input[type="submit"]')
        .filter({ hasText: new RegExp(`^\\s*${this.esc(buttonText)}\\s*$`, 'i') });
      
      await this.clickLocator(button);
      this.logger.debug(`Successfully clicked button with text: ${buttonText}`);
    } catch (error) {
      throw new Error(`Failed to click button with text "${buttonText}": ${error}`);
    }
  }

  /**
   * Click link by visible text (case-insensitive, exact match)
   *
   * @param linkText Text of the link
   */
  public async clickLinkByText(linkText: string): Promise<void> {
    try {
      const link = this.page.locator('a')
        .filter({ hasText: new RegExp(`^\\s*${this.esc(linkText)}\\s*$`, 'i') });
      
      await this.clickLocator(link);
      this.logger.debug(`Successfully clicked link with text: ${linkText}`);
    } catch (error) {
      throw new Error(`Failed to click link with text "${linkText}": ${error}`);
    }
  }

  /**
   * Click element containing specific text
   *
   * @param text Text to search for (partial match)
   * @param elementType Optional element type to narrow search
   */
  public async clickByText(text: string, elementType?: string): Promise<void> {
    try {
      const selector = elementType || '*';
      const element = this.page.locator(selector)
        .filter({ hasText: new RegExp(this.esc(text), 'i') });
      
      await this.clickLocator(element);
      this.logger.debug(`Successfully clicked element containing text: ${text}`);
    } catch (error) {
      throw new Error(`Failed to click element with text "${text}": ${error}`);
    }
  }

  /**
   * Click element by data-testid attribute
   *
   * @param testId The data-testid value
   */
  public async clickByTestId(testId: string): Promise<void> {
    try {
      const element = this.page.locator(`[data-testid="${testId}"]`);
      await this.clickLocator(element);
      this.logger.debug(`Successfully clicked element with testid: ${testId}`);
    } catch (error) {
      throw new Error(`Failed to click element with testid "${testId}": ${error}`);
    }
  }

  /**
   * Click element by aria-label
   *
   * @param ariaLabel The aria-label value
   */
  public async clickByAriaLabel(ariaLabel: string): Promise<void> {
    try {
      const element = this.page.locator(`[aria-label="${ariaLabel}"]`);
      await this.clickLocator(element);
      this.logger.debug(`Successfully clicked element with aria-label: ${ariaLabel}`);
    } catch (error) {
      throw new Error(`Failed to click element with aria-label "${ariaLabel}": ${error}`);
    }
  }

  /**
   * Click at specific coordinates
   *
   * @param x X coordinate
   * @param y Y coordinate
   */
  public async clickAtCoordinates(x: number, y: number): Promise<void> {
    try {
      await this.page.mouse.click(x, y);
      await this.slowMo();
      this.logger.debug(`Successfully clicked at coordinates (${x}, ${y})`);
    } catch (error) {
      throw new Error(`Failed to click at coordinates (${x}, ${y}): ${error}`);
    }
  }

  /**
   * Hover over an element
   *
   * @param locator Element to hover over
   */
  public async hover(
    locator: Locator | string | (() => Locator | Promise<Locator | null>)
  ): Promise<void> {
    const element = await this.getElement(locator, 'hover');
    
    try {
      await element.hover({ timeout: this.config.timeout });
      await this.slowMo();
      this.logger.debug('Successfully hovered over element');
    } catch (error) {
      throw new Error(`Failed to hover over element: ${error}`);
    }
  }

  /**
   * Focus on an element
   *
   * @param locator Element to focus
   */
  public async focus(
    locator: Locator | string | (() => Locator | Promise<Locator | null>)
  ): Promise<void> {
    const element = await this.getElement(locator, 'focus');
    
    try {
      await element.focus({ timeout: this.config.timeout });
      await this.slowMo();
      this.logger.debug('Successfully focused on element');
    } catch (error) {
      throw new Error(`Failed to focus on element: ${error}`);
    }
  }

  /**
   * Press a key or key combination
   *
   * @param key Key to press (e.g., 'Enter', 'Tab', 'Ctrl+A')
   */
  public async pressKey(key: string): Promise<void> {
    try {
      await this.page.keyboard.press(key);
      await this.slowMo();
      this.logger.debug(`Successfully pressed key: ${key}`);
    } catch (error) {
      throw new Error(`Failed to press key "${key}": ${error}`);
    }
  }

  /**
   * Press Enter key - Convenience method for the most common key press
   */
  public async pressEnter(): Promise<void> {
    await this.pressKey('Enter');
  }

  /**
   * Press Tab key - Useful for navigation between form fields
   */
  public async pressTab(): Promise<void> {
    await this.pressKey('Tab');
  }

  /**
   * Press Escape key - Useful for closing modals or canceling operations
   */
  public async pressEscape(): Promise<void> {
    await this.pressKey('Escape');
  }
}