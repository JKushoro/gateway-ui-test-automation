"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePage = void 0;
const ActionHelper_1 = require("../helpers/ActionHelper");
const WaitHelper_1 = require("../helpers/WaitHelper");
const LocatorHelper_1 = require("../helpers/LocatorHelper");
const AssertionHelper_1 = require("../helpers/AssertionHelper");
const EnvManager_1 = require("../config/EnvManager");
/**
 * Base page class that provides common functionality for all page objects
 * Follows the Page Object Model pattern with helper composition
 */
class BasePage {
    constructor(page) {
        this.page = page;
        this.actionHelper = new ActionHelper_1.ActionHelper(page);
        this.waitHelper = new WaitHelper_1.WaitHelper(page);
        this.locatorHelper = new LocatorHelper_1.LocatorHelper(page);
        this.assertionHelper = new AssertionHelper_1.AssertionHelper(page);
        this.baseUrl = EnvManager_1.envManager.getBaseUrl();
    }
    /**
     * Get the page instance
     */
    getPage() {
        return this.page;
    }
    /**
     * Get the base URL
     */
    getBaseUrl() {
        return this.baseUrl;
    }
    /**
     * Navigate to a specific URL
     */
    async navigateToUrl(url) {
        await this.page.goto(url);
    }
    /**
     * Navigate to a relative path from base URL
     */
    async navigateToPath(path) {
        const fullUrl = `${this.baseUrl}${path}`;
        await this.navigateToUrl(fullUrl);
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
     * Take a screenshot
     */
    async takeScreenshot(name) {
        const screenshotName = name || `screenshot-${Date.now()}`;
        return await this.page.screenshot({
            fullPage: true,
            path: `screenshots/${screenshotName}.png`
        });
    }
    /**
     * Wait for network to be idle
     */
    async waitForNetworkIdle() {
        await this.page.waitForLoadState('networkidle');
    }
    /**
     * Reload the page
     */
    async reload() {
        await this.page.reload();
    }
    /**
     * Go back in browser history
     */
    async goBack() {
        await this.page.goBack();
    }
    /**
     * Go forward in browser history
     */
    async goForward() {
        await this.page.goForward();
    }
    /**
     * Execute JavaScript in the page context
     */
    async executeScript(script, ...args) {
        return await this.page.evaluate(script, ...args);
    }
    /**
     * Clear browser storage
     */
    async clearStorage() {
        await this.page.evaluate(() => {
            localStorage.clear();
            sessionStorage.clear();
        });
        await this.page.context().clearCookies();
    }
    /**
     * Set viewport size
     */
    async setViewportSize(width, height) {
        await this.page.setViewportSize({ width, height });
    }
    /**
     * Get all locators for common elements that might exist on any page
     */
    getCommonLocators() {
        return {
            loadingSpinner: this.page.locator('[data-testid="loading-spinner"], .loading, .spinner'),
            errorMessage: this.page.locator('[data-testid="error-message"], .error, .alert-error'),
            successMessage: this.page.locator('[data-testid="success-message"], .success, .alert-success'),
            modal: this.page.locator('[data-testid="modal"], .modal, .dialog'),
            closeButton: this.page.locator('[data-testid="close-button"], .close, .btn-close'),
        };
    }
    /**
     * Wait for loading to complete
     */
    async waitForLoadingToComplete() {
        const { loadingSpinner } = this.getCommonLocators();
        await this.waitHelper.waitForLocatorToBeHidden(loadingSpinner);
    }
    /**
     * Close any open modals
     */
    async closeModal() {
        const { modal, closeButton } = this.getCommonLocators();
        if (await modal.isVisible()) {
            await closeButton.click();
            await this.waitHelper.waitForLocatorToBeHidden(modal);
        }
    }
}
exports.BasePage = BasePage;
//# sourceMappingURL=BasePage.js.map