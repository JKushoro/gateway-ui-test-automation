import { Locator } from '../types/PlaywrightTypes';
import { ElementInfo, BoundingBox, Position, Size } from '../types';
/**
 * Simplified ElementHelper with essential utility methods
 * Removed unnecessary complexity and kept only commonly used functions
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
     * Get inner HTML from locator
     */
    static getInnerHTML(locator: Locator): Promise<string>;
    /**
     * Check if element has specific class
     */
    static hasClass(locator: Locator, className: string): Promise<boolean>;
    /**
     * Get CSS property value
     */
    static getCSSProperty(locator: Locator, property: string): Promise<string>;
    /**
     * Get element's bounding box
     */
    static getBoundingBox(locator: Locator): Promise<BoundingBox | null>;
    /**
     * Get element's position
     */
    static getPosition(locator: Locator): Promise<Position>;
    /**
     * Get element's size
     */
    static getSize(locator: Locator): Promise<Size>;
    /**
     * Check if element is in viewport
     */
    static isInViewport(locator: Locator): Promise<boolean>;
    /**
     * Get element's tag name
     */
    static getTagName(locator: Locator): Promise<string>;
    /**
     * Get element's ID
     */
    static getId(locator: Locator): Promise<string>;
    /**
     * Get element's data attribute
     */
    static getDataAttribute(locator: Locator, dataName: string): Promise<string>;
    /**
     * Check if element has specific attribute
     */
    static hasAttribute(locator: Locator, attribute: string): Promise<boolean>;
    /**
     * Get comprehensive element information
     */
    static getElementInfo(locator: Locator): Promise<ElementInfo>;
    /**
     * Check if element is clickable (visible, enabled, and not covered)
     */
    static isClickable(locator: Locator): Promise<boolean>;
    /**
     * Get element's text length
     */
    static getTextLength(locator: Locator): Promise<number>;
    /**
     * Check if element text is empty
     */
    static isTextEmpty(locator: Locator): Promise<boolean>;
}
//# sourceMappingURL=ElementHelper.d.ts.map