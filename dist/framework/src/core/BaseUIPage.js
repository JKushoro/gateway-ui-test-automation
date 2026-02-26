"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseUIPage = void 0;
const WaitHelper_1 = require("../helpers/WaitHelper");
/**
 * Abstract Base UI Page Class
 * Provides common functionality and enforces proper OOP structure for all page objects
 *
 * Key OOP Principles:
 * - Encapsulation: Protected members, private implementation details
 * - Inheritance: Common functionality in base class
 * - Abstraction: Abstract methods that must be implemented by subclasses
 * - Polymorphism: Consistent interface across all page objects
 */
class BaseUIPage {
    constructor(page, config = {}) {
        this.page = page;
        this.config = {
            timeout: 30000,
            ...config
        };
        this.waitHelper = new WaitHelper_1.WaitHelper(page, this.config);
    }
    /**
     * Navigate to this page
     * Template method pattern - provides common navigation logic
     */
    async navigate() {
        await this.page.goto(this.pageUrl, {
            waitUntil: 'domcontentloaded',
            timeout: this.config.timeout
        });
        await this.waitForPageLoad();
    }
    /**
     * Wait for page to load - can be overridden for specific page requirements
     * Template method pattern with hook for customization
     */
    async waitForPageLoad() {
        await this.waitHelper.waitForDOMContentLoaded();
        await this.waitHelper.waitForVisible(this.pageIdentifier);
        await this.waitForPageSpecificElements();
    }
    /**
     * Hook method for subclasses to wait for page-specific elements
     * Default implementation does nothing - override as needed
     */
    async waitForPageSpecificElements() {
        // Default implementation - override in subclasses if needed
    }
    /**
     * Check if page is loaded
     */
    async isPageLoaded() {
        try {
            // Verify URL contains expected page URL
            if (!this.page.url().includes(this.pageUrl)) {
                return false;
            }
            // Verify page identifier is visible
            return await this.page.isVisible(this.pageIdentifier);
        }
        catch (error) {
            return false;
        }
    }
    /**
     * Get the page instance - provides access to underlying Playwright page
     */
    getPage() {
        return this.page;
    }
    /**
     * Get current URL
     */
    getCurrentUrl() {
        return this.page.url();
    }
    /**
     * Get page title
     */
    async getPageTitle() {
        return await this.page.title();
    }
    /**
     * Validate that all critical page elements are present
     * Uses the validation elements defined by subclasses
     */
    async validatePageElements() {
        try {
            const elements = this.getValidationElements();
            for (const element of elements) {
                if (!(await element.isVisible())) {
                    return false;
                }
            }
            return true;
        }
        catch (error) {
            return false;
        }
    }
}
exports.BaseUIPage = BaseUIPage;
//# sourceMappingURL=BaseUIPage.js.map