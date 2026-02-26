"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementHelper = void 0;
/**
 * Enhanced ElementHelper with utility methods for element manipulation
 * Provides static and instance methods for common element operations
 */
class ElementHelper {
    /**
     * Get trimmed text content from locator
     */
    static async getTrimmedText(locator) {
        return (await locator.textContent())?.trim() || '';
    }
    /**
     * Get lowercase text content from locator
     */
    static async getLowerCasedText(locator) {
        return (await locator.textContent())?.trim().toLowerCase() || '';
    }
    /**
     * Get uppercase text content from locator
     */
    static async getUpperCasedText(locator) {
        return (await locator.textContent())?.trim().toUpperCase() || '';
    }
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
     * Get inner text from locator
     */
    static async getInnerText(locator) {
        return (await locator.innerText())?.trim() || '';
    }
    /**
     * Get all text contents from multiple locators
     */
    static async getAllTexts(locator) {
        const count = await locator.count();
        const texts = [];
        for (let i = 0; i < count; i++) {
            const text = await this.getTrimmedText(locator.nth(i));
            texts.push(text);
        }
        return texts;
    }
    /**
     * Get all attribute values from multiple locators
     */
    static async getAllAttributes(locator, attribute) {
        const count = await locator.count();
        const attributes = [];
        for (let i = 0; i < count; i++) {
            const attr = await this.getAttribute(locator.nth(i), attribute);
            attributes.push(attr);
        }
        return attributes;
    }
    /**
     * Get all input values from multiple locators
     */
    static async getAllValues(locator) {
        const count = await locator.count();
        const values = [];
        for (let i = 0; i < count; i++) {
            const value = await this.getValue(locator.nth(i));
            values.push(value);
        }
        return values;
    }
    /**
     * Check if element has specific class
     */
    static async hasClass(locator, className) {
        const classAttr = await this.getAttribute(locator, 'class');
        return classAttr.split(' ').includes(className);
    }
    /**
     * Check if element has any of the specified classes
     */
    static async hasAnyClass(locator, classNames) {
        const classAttr = await this.getAttribute(locator, 'class');
        const elementClasses = classAttr.split(' ');
        return classNames.some(className => elementClasses.includes(className));
    }
    /**
     * Check if element has all specified classes
     */
    static async hasAllClasses(locator, classNames) {
        const classAttr = await this.getAttribute(locator, 'class');
        const elementClasses = classAttr.split(' ');
        return classNames.every(className => elementClasses.includes(className));
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
        return await locator.boundingBox();
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
     * Check if element is a specific tag
     */
    static async isTag(locator, tagName) {
        const elementTag = await this.getTagName(locator);
        return elementTag === tagName.toLowerCase();
    }
    /**
     * Get element's ID
     */
    static async getId(locator) {
        return await this.getAttribute(locator, 'id');
    }
    /**
     * Get element's name attribute
     */
    static async getName(locator) {
        return await this.getAttribute(locator, 'name');
    }
    /**
     * Get element's data attribute
     */
    static async getDataAttribute(locator, dataName) {
        return await this.getAttribute(locator, `data-${dataName}`);
    }
    /**
     * Get all data attributes
     */
    static async getAllDataAttributes(locator) {
        return await locator.evaluate(el => {
            const data = {};
            for (let i = 0; i < el.attributes.length; i++) {
                const attr = el.attributes[i];
                if (attr.name.startsWith('data-')) {
                    const key = attr.name.substring(5); // Remove 'data-' prefix
                    data[key] = attr.value;
                }
            }
            return data;
        });
    }
    /**
     * Check if element has specific attribute
     */
    static async hasAttribute(locator, attribute) {
        const value = await locator.getAttribute(attribute);
        return value !== null;
    }
    /**
     * Get element's role attribute
     */
    static async getRole(locator) {
        return await this.getAttribute(locator, 'role');
    }
    /**
     * Get element's aria-label
     */
    static async getAriaLabel(locator) {
        return await this.getAttribute(locator, 'aria-label');
    }
    /**
     * Get element's title attribute
     */
    static async getTitle(locator) {
        return await this.getAttribute(locator, 'title');
    }
    /**
     * Get element's placeholder
     */
    static async getPlaceholder(locator) {
        return await this.getAttribute(locator, 'placeholder');
    }
    /**
     * Check if element is required
     */
    static async isRequired(locator) {
        return await this.hasAttribute(locator, 'required');
    }
    /**
     * Check if element is readonly
     */
    static async isReadonly(locator) {
        return await this.hasAttribute(locator, 'readonly');
    }
    /**
     * Get element's type attribute (for inputs)
     */
    static async getInputType(locator) {
        return await this.getAttribute(locator, 'type');
    }
    /**
     * Get element's href attribute (for links)
     */
    static async getHref(locator) {
        return await this.getAttribute(locator, 'href');
    }
    /**
     * Get element's src attribute (for images/media)
     */
    static async getSrc(locator) {
        return await this.getAttribute(locator, 'src');
    }
    /**
     * Get element's alt attribute (for images)
     */
    static async getAlt(locator) {
        return await this.getAttribute(locator, 'alt');
    }
    /**
     * Get option text from select element
     */
    static async getSelectedOptionText(locator) {
        return await locator.evaluate(el => {
            if (el instanceof HTMLSelectElement) {
                return el.options[el.selectedIndex]?.text || '';
            }
            return '';
        });
    }
    /**
     * Get all option texts from select element
     */
    static async getAllOptionTexts(locator) {
        return await locator.evaluate(el => {
            if (el instanceof HTMLSelectElement) {
                return Array.from(el.options).map(option => option.text);
            }
            return [];
        });
    }
    /**
     * Get all option values from select element
     */
    static async getAllOptionValues(locator) {
        return await locator.evaluate(el => {
            if (el instanceof HTMLSelectElement) {
                return Array.from(el.options).map(option => option.value);
            }
            return [];
        });
    }
    /**
     * Clean and normalize text (remove extra whitespace, normalize line breaks)
     */
    static cleanText(text) {
        return text
            .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
            .replace(/\n/g, ' ') // Replace line breaks with space
            .trim();
    }
    /**
     * Extract numbers from text
     */
    static extractNumbers(text) {
        const matches = text.match(/\d+/g);
        return matches ? matches.map(Number) : [];
    }
    /**
     * Extract first number from text
     */
    static extractFirstNumber(text) {
        const numbers = this.extractNumbers(text);
        return numbers.length > 0 ? numbers[0] : null;
    }
    /**
     * Remove currency symbols and extract price
     */
    static extractPrice(priceText) {
        const cleanPrice = priceText.replace(/[^\d.]/g, '');
        return parseFloat(cleanPrice) || 0;
    }
    /**
     * Format text for comparison (lowercase, trim, remove special chars)
     */
    static normalizeForComparison(text) {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s]/g, '') // Remove special characters
            .replace(/\s+/g, ' '); // Normalize whitespace
    }
    /**
     * Check if two texts are similar (ignoring case, whitespace, special chars)
     */
    static areTextsSimilar(text1, text2) {
        return this.normalizeForComparison(text1) === this.normalizeForComparison(text2);
    }
    /**
     * Get element screenshot as buffer
     */
    static async getElementScreenshot(locator) {
        return await locator.screenshot();
    }
    /**
     * Highlight element (for debugging)
     */
    static async highlightElement(locator, color = 'red') {
        await locator.evaluate((el, color) => {
            el.style.border = `3px solid ${color}`;
            el.style.backgroundColor = `${color}33`; // Semi-transparent
        }, color);
    }
    /**
     * Remove highlight from element
     */
    static async removeHighlight(locator) {
        await locator.evaluate(el => {
            el.style.border = '';
            el.style.backgroundColor = '';
        });
    }
}
exports.ElementHelper = ElementHelper;
//# sourceMappingURL=ElementHelper.js.map