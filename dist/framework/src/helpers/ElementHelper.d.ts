import { Locator } from '@playwright/test';
/**
 * Essential ElementHelper with commonly used utility methods
 * Focused on practical UI automation needs
 */
export declare class ElementHelper {
    /**
     * Get attribute value from locator
     */
    static getAttribute(locator: Locator, attribute: string): Promise<string>;
    /**
     * Get input value from locator
     */
    static getValue(locator: Locator): Promise<string>;
    /**
     * Check if element has specific class
     */
    static hasClass(locator: Locator, className: string): Promise<boolean>;
    /**
     * Get element's data attribute
     */
    static getDataAttribute(locator: Locator, dataName: string): Promise<string>;
    /**
     * Check if element has specific attribute
     */
    static hasAttribute(locator: Locator, attribute: string): Promise<boolean>;
    /**
     * Check if element is clickable (visible and enabled)
     */
    static isClickable(locator: Locator): Promise<boolean>;
    /**
     * Check if element text is empty
     */
    static isTextEmpty(locator: Locator): Promise<boolean>;
}
//# sourceMappingURL=ElementHelper.d.ts.map