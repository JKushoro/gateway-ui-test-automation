"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClickHelper = void 0;
const WaitHelper_1 = require("../WaitHelper");
const Logger_1 = require("../../utils/Logger");
/**
 * 🖱️ Simple Click Helper
 * Easy-to-understand methods for clicking things on the page
 */
class ClickHelper {
    constructor(page) {
        this.page = page;
        this.logger = (0, Logger_1.createLogger)('ClickHelper');
        this.wait = new WaitHelper_1.WaitHelper(page);
    }
    // ===== CLICK BUTTONS =====
    /** Click a button by its text (e.g., "Save", "Submit", "Continue") */
    async clickButton(buttonText) {
        const button = this.page.getByRole('button', { name: new RegExp(buttonText, 'i') });
        await this.wait.waitForElement(button);
        await button.click();
        this.logger.info?.(`✓ Clicked button: "${buttonText}"`);
    }
    /** Click a button with exact text match */
    async clickButtonExact(buttonText) {
        const button = this.page.getByRole('button', { name: buttonText, exact: true });
        await this.wait.waitForElement(button);
        await button.click();
        this.logger.info?.(`✓ Clicked button (exact): "${buttonText}"`);
    }
    // ===== CLICK LINKS =====
    /** Click a link by its text */
    async clickLink(linkText) {
        const link = this.page.getByRole('link', { name: new RegExp(linkText, 'i') });
        await this.wait.waitForElement(link);
        await link.click();
        this.logger.info?.(`✓ Clicked link: "${linkText}"`);
    }
    // ===== CLICK ANY ELEMENT =====
    /** Click any element by its selector */
    async clickElement(selector) {
        const element = this.page.locator(selector);
        await this.wait.waitForElement(element);
        await element.click();
        this.logger.info?.(`✓ Clicked element: ${selector}`);
    }
    /** Click any element (Playwright Locator) */
    async clickLocator(locator) {
        await this.wait.waitForElement(locator);
        await locator.click();
        this.logger.info?.(`✓ Clicked element`);
    }
    // ===== SPECIAL CLICKS =====
    /** Click and wait for page to navigate to new URL */
    async clickAndWaitForNavigation(locator, expectedUrl) {
        await Promise.all([
            this.page.waitForURL(expectedUrl),
            this.clickLocator(locator)
        ]);
        this.logger.info?.(`✓ Clicked and navigated to: ${expectedUrl}`);
    }
}
exports.ClickHelper = ClickHelper;
//# sourceMappingURL=ClickHelper.js.map