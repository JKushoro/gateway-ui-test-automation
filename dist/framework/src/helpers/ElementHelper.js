"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementHelper = void 0;
const TextHelper_1 = require("./TextHelper");
/**
 * Essential ElementHelper with commonly used utility methods
 * Focused on practical UI automation needs
 */
class ElementHelper {
    /**
     * Get attribute value from locator
     */
    static async getAttribute(locator, attribute) {
        return (await locator.getAttribute(attribute)) || '';
    }
    /**
     * Get input value from locator
     */
    static async getValue(locator) {
        return (await locator.inputValue())?.trim() || '';
    }
    /**
     * Check if element has specific class
     */
    static async hasClass(locator, className) {
        const classAttr = await this.getAttribute(locator, 'class');
        return classAttr.split(' ').includes(className);
    }
    /**
     * Get element's data attribute
     */
    static async getDataAttribute(locator, dataName) {
        return await this.getAttribute(locator, `data-${dataName}`);
    }
    /**
     * Check if element has specific attribute
     */
    static async hasAttribute(locator, attribute) {
        const value = await locator.getAttribute(attribute);
        return value !== null;
    }
    /**
     * Check if element is clickable (visible and enabled)
     */
    static async isClickable(locator) {
        return await locator.isVisible() && await locator.isEnabled();
    }
    /**
     * Check if element text is empty
     */
    static async isTextEmpty(locator) {
        const text = await TextHelper_1.TextHelper.getTrimmedText(locator);
        return text.length === 0;
    }
}
exports.ElementHelper = ElementHelper;
//# sourceMappingURL=ElementHelper.js.map