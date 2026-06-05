"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClickActions = void 0;
const CoreActions_1 = require("./CoreActions");
/**
 * ClickActions - Simple clicking and basic interactions
 *
 * Handles all click-related operations like clicking buttons, links,
 * and basic element interactions. Junior developer friendly with
 * clear method names and automatic waiting.
 */
class ClickActions extends CoreActions_1.CoreActions {
    constructor(page, config) {
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
    async clickLocator(locator, options) {
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
        }
        catch (error) {
            throw new Error(`Failed to click element: ${error}`);
        }
    }
    /**
     * Double click an element
     *
     * @param locator Element to double click
     */
    async doubleClick(locator) {
        const element = await this.getElement(locator, 'double click');
        try {
            await element.dblclick({ timeout: this.config.timeout });
            await this.slowMo();
            this.logger.debug('Successfully double clicked element');
        }
        catch (error) {
            throw new Error(`Failed to double click element: ${error}`);
        }
    }
    /**
     * Right click (context menu) an element
     *
     * @param locator Element to right click
     */
    async rightClick(locator) {
        const element = await this.getElement(locator, 'right click');
        try {
            await element.click({
                button: 'right',
                timeout: this.config.timeout
            });
            await this.slowMo();
            this.logger.debug('Successfully right clicked element');
        }
        catch (error) {
            throw new Error(`Failed to right click element: ${error}`);
        }
    }
    /**
     * Click button by visible text (case-insensitive, exact match)
     *
     * @param buttonText Text on the button
     */
    async clickButtonByText(buttonText) {
        try {
            const button = this.page.locator('button, input[type="button"], input[type="submit"]')
                .filter({ hasText: new RegExp(`^\\s*${this.esc(buttonText)}\\s*$`, 'i') });
            await this.clickLocator(button);
            this.logger.debug(`Successfully clicked button with text: ${buttonText}`);
        }
        catch (error) {
            throw new Error(`Failed to click button with text "${buttonText}": ${error}`);
        }
    }
    /**
     * Click link by visible text (case-insensitive, exact match)
     *
     * @param linkText Text of the link
     */
    async clickLinkByText(linkText) {
        try {
            const link = this.page.locator('a')
                .filter({ hasText: new RegExp(`^\\s*${this.esc(linkText)}\\s*$`, 'i') });
            await this.clickLocator(link);
            this.logger.debug(`Successfully clicked link with text: ${linkText}`);
        }
        catch (error) {
            throw new Error(`Failed to click link with text "${linkText}": ${error}`);
        }
    }
    /**
     * Click element containing specific text
     *
     * @param text Text to search for (partial match)
     * @param elementType Optional element type to narrow search
     */
    async clickByText(text, elementType) {
        try {
            const selector = elementType || '*';
            const element = this.page.locator(selector)
                .filter({ hasText: new RegExp(this.esc(text), 'i') });
            await this.clickLocator(element);
            this.logger.debug(`Successfully clicked element containing text: ${text}`);
        }
        catch (error) {
            throw new Error(`Failed to click element with text "${text}": ${error}`);
        }
    }
    /**
     * Click element by data-testid attribute
     *
     * @param testId The data-testid value
     */
    async clickByTestId(testId) {
        try {
            const element = this.page.locator(`[data-testid="${testId}"]`);
            await this.clickLocator(element);
            this.logger.debug(`Successfully clicked element with testid: ${testId}`);
        }
        catch (error) {
            throw new Error(`Failed to click element with testid "${testId}": ${error}`);
        }
    }
    /**
     * Click element by aria-label
     *
     * @param ariaLabel The aria-label value
     */
    async clickByAriaLabel(ariaLabel) {
        try {
            const element = this.page.locator(`[aria-label="${ariaLabel}"]`);
            await this.clickLocator(element);
            this.logger.debug(`Successfully clicked element with aria-label: ${ariaLabel}`);
        }
        catch (error) {
            throw new Error(`Failed to click element with aria-label "${ariaLabel}": ${error}`);
        }
    }
    /**
     * Click at specific coordinates
     *
     * @param x X coordinate
     * @param y Y coordinate
     */
    async clickAtCoordinates(x, y) {
        try {
            await this.page.mouse.click(x, y);
            await this.slowMo();
            this.logger.debug(`Successfully clicked at coordinates (${x}, ${y})`);
        }
        catch (error) {
            throw new Error(`Failed to click at coordinates (${x}, ${y}): ${error}`);
        }
    }
    /**
     * Hover over an element
     *
     * @param locator Element to hover over
     */
    async hover(locator) {
        const element = await this.getElement(locator, 'hover');
        try {
            await element.hover({ timeout: this.config.timeout });
            await this.slowMo();
            this.logger.debug('Successfully hovered over element');
        }
        catch (error) {
            throw new Error(`Failed to hover over element: ${error}`);
        }
    }
    /**
     * Focus on an element
     *
     * @param locator Element to focus
     */
    async focus(locator) {
        const element = await this.getElement(locator, 'focus');
        try {
            await element.focus({ timeout: this.config.timeout });
            await this.slowMo();
            this.logger.debug('Successfully focused on element');
        }
        catch (error) {
            throw new Error(`Failed to focus on element: ${error}`);
        }
    }
    /**
     * Press a key or key combination
     *
     * @param key Key to press (e.g., 'Enter', 'Tab', 'Ctrl+A')
     */
    async pressKey(key) {
        try {
            await this.page.keyboard.press(key);
            await this.slowMo();
            this.logger.debug(`Successfully pressed key: ${key}`);
        }
        catch (error) {
            throw new Error(`Failed to press key "${key}": ${error}`);
        }
    }
    /**
     * Press Enter key - Convenience method for the most common key press
     */
    async pressEnter() {
        await this.pressKey('Enter');
    }
    /**
     * Press Tab key - Useful for navigation between form fields
     */
    async pressTab() {
        await this.pressKey('Tab');
    }
    /**
     * Press Escape key - Useful for closing modals or canceling operations
     */
    async pressEscape() {
        await this.pressKey('Escape');
    }
}
exports.ClickActions = ClickActions;
//# sourceMappingURL=ClickActions.js.map