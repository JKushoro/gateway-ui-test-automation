"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementHelper = void 0;
const TextHelper_1 = require("./TextHelper");
/**
 * Simplified ElementHelper with essential utility methods
 * Removed unnecessary complexity and kept only commonly used functions
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
     * Get inner HTML from locator
     */
    static async getInnerHTML(locator) {
        return (await locator.innerHTML()) || '';
    }
    /**
     * Check if element has specific class
     */
    static async hasClass(locator, className) {
        const classAttr = await this.getAttribute(locator, 'class');
        return classAttr.split(' ').includes(className);
    }
    /**
     * Get CSS property value
     */
    static async getCSSProperty(locator, property) {
        return await locator.evaluate((el, prop) => {
            return window.getComputedStyle(el).getPropertyValue(prop);
        }, property);
    }
    /**
     * Get element's bounding box
     */
    static async getBoundingBox(locator) {
        const box = await locator.boundingBox();
        return box ? { x: box.x, y: box.y, width: box.width, height: box.height } : null;
    }
    /**
     * Get element's position
     */
    static async getPosition(locator) {
        const box = await this.getBoundingBox(locator);
        return box ? { x: box.x, y: box.y } : { x: 0, y: 0 };
    }
    /**
     * Get element's size
     */
    static async getSize(locator) {
        const box = await this.getBoundingBox(locator);
        return box ? { width: box.width, height: box.height } : { width: 0, height: 0 };
    }
    /**
     * Check if element is in viewport
     */
    static async isInViewport(locator) {
        return await locator.isVisible() && await locator.evaluate(el => {
            const rect = el.getBoundingClientRect();
            return (rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth));
        });
    }
    /**
     * Get element's tag name
     */
    static async getTagName(locator) {
        return await locator.evaluate(el => el.tagName.toLowerCase());
    }
    /**
     * Get element's ID
     */
    static async getId(locator) {
        return await this.getAttribute(locator, 'id');
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
     * Get comprehensive element information
     */
    static async getElementInfo(locator) {
        return {
            tagName: await this.getTagName(locator),
            id: await this.getId(locator),
            className: await this.getAttribute(locator, 'class'),
            text: await TextHelper_1.TextHelper.getTrimmedText(locator),
            value: await this.getValue(locator),
            isVisible: await locator.isVisible(),
            isEnabled: await locator.isEnabled(),
            isChecked: await locator.isChecked().catch(() => undefined)
        };
    }
    /**
     * Check if element is clickable (visible, enabled, and not covered)
     */
    static async isClickable(locator) {
        const isVisible = await locator.isVisible();
        const isEnabled = await locator.isEnabled();
        if (!isVisible || !isEnabled) {
            return false;
        }
        // Check if element is not covered by another element
        const isNotCovered = await locator.evaluate(el => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const elementAtPoint = document.elementFromPoint(centerX, centerY);
            return el === elementAtPoint || el.contains(elementAtPoint);
        });
        return isNotCovered;
    }
    /**
     * Get element's text length
     */
    static async getTextLength(locator) {
        const text = await TextHelper_1.TextHelper.getTrimmedText(locator);
        return text.length;
    }
    /**
     * Check if element text is empty
     */
    static async isTextEmpty(locator) {
        return (await this.getTextLength(locator)) === 0;
    }
}
exports.ElementHelper = ElementHelper;
//# sourceMappingURL=ElementHelper.js.map