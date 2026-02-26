
import { Locator } from '@playwright/test';
import { TextHelper } from './TextHelper';

/**
 * Essential ElementHelper with commonly used utility methods
 * Focused on practical UI automation needs
 */
export class ElementHelper {
  
  /**
   * Get attribute value from locator
   */
  public static async getAttribute(locator: Locator, attribute: string): Promise<string> {
    return (await locator.getAttribute(attribute)) || '';
  }

  /**
   * Get input value from locator
   */
  public static async getValue(locator: Locator): Promise<string> {
    return (await locator.inputValue())?.trim() || '';
  }

  /**
   * Check if element has specific class
   */
  public static async hasClass(locator: Locator, className: string): Promise<boolean> {
    const classAttr = await this.getAttribute(locator, 'class');
    return classAttr.split(' ').includes(className);
  }

  /**
   * Get element's data attribute
   */
  public static async getDataAttribute(locator: Locator, dataName: string): Promise<string> {
    return await this.getAttribute(locator, `data-${dataName}`);
  }

  /**
   * Check if element has specific attribute
   */
  public static async hasAttribute(locator: Locator, attribute: string): Promise<boolean> {
    const value = await locator.getAttribute(attribute);
    return value !== null;
  }

  /**
   * Check if element is clickable (visible and enabled)
   */
  public static async isClickable(locator: Locator): Promise<boolean> {
    return await locator.isVisible() && await locator.isEnabled();
  }

  /**
   * Check if element text is empty
   */
  public static async isTextEmpty(locator: Locator): Promise<boolean> {
    const text = await TextHelper.getTrimmedText(locator);
    return text.length === 0;
  }
}