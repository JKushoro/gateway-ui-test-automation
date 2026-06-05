"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreActions = void 0;
const LocatorHelper_1 = require("../LocatorHelper");
const WaitHelper_1 = require("../WaitHelper");
const AssertionHelper_1 = require("../AssertionHelper");
const Logger_1 = require("../../utils/Logger");
const DEFAULT_CONFIG = {
    slowMo: 0,
    timeout: 30000,
};
/**
 * 🔧 CoreActions - Base functionality for all action helpers
 *
 * Provides shared utilities, timing, and locator resolution logic
 * used by all other action helper classes.
 */
class CoreActions {
    constructor(page, config = {}) {
        this.page = page;
        this.config = { ...DEFAULT_CONFIG, ...config };
        this.locatorHelper = new LocatorHelper_1.LocatorHelper(page);
        this.waitHelper = new WaitHelper_1.WaitHelper(page, this.config);
        this.assertionHelper = new AssertionHelper_1.AssertionHelper(page);
        this.logger = (0, Logger_1.createLogger)('CoreActions');
    }
    // ===========================================================================
    // Text & Regex utilities
    // ===========================================================================
    /** Escape regex special chars in a string */
    esc(text) {
        return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    /** Exact match regex (trim + case-insensitive) */
    exactRx(text) {
        return new RegExp(`^\\s*${this.esc(text)}\\s*$`, 'i');
    }
    /** Contains match regex (case-insensitive) */
    containsRx(text) {
        return new RegExp(this.esc(text), 'i');
    }
    // ===========================================================================
    // Core timing / wait primitives 
    // ===========================================================================
    /** Optional slowMo after actions (useful for demo/debug) */
    async slowMo() {
        const ms = this.config.slowMo ?? 0;
        if (ms > 0) {
            this.logger.debug(`SlowMo delay: ${ms}ms`);
            await this.page.waitForTimeout(ms);
        }
    }
    /**
     * Wait for element to be ready for interaction
     * @param locator The element to wait for
     * @param action Description of the action for errors
     */
    async waitForReady(locator, action) {
        try {
            await locator.waitFor({
                state: 'visible',
                timeout: this.config.timeout
            });
            await locator.waitFor({
                state: 'attached',
                timeout: this.config.timeout
            });
        }
        catch (error) {
            throw new Error(`Failed to wait for element ready for ${action}: ${error}`);
        }
    }
    // ===========================================================================
    // Robust locator resolution utilities
    // ===========================================================================
    /**
     * Resolve locator from various input types
     * @param locatorOrStrategy Locator, string selector, or strategy function
     */
    async resolveLocator(locatorOrStrategy) {
        try {
            if (typeof locatorOrStrategy === 'string') {
                return this.page.locator(locatorOrStrategy);
            }
            if (typeof locatorOrStrategy === 'function') {
                const result = await locatorOrStrategy();
                if (!result) {
                    throw new Error('Locator strategy returned null/undefined');
                }
                return result;
            }
            return locatorOrStrategy;
        }
        catch (error) {
            throw new Error(`Failed to resolve locator: ${error}`);
        }
    }
    /**
     * Get element with comprehensive error context
     * @param locatorOrStrategy Locator or strategy to find element
     * @param action Description of what we're trying to do
     */
    async getElement(locatorOrStrategy, action) {
        const locator = await this.resolveLocator(locatorOrStrategy);
        await this.waitForReady(locator, action);
        return locator;
    }
    // ===========================================================================
    // Static utilities
    // ===========================================================================
    /**
     * Generate a unique identifier for test data
     */
    static generateId() {
        return `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    /**
     * Sleep for specified milliseconds
     * @param ms Milliseconds to sleep
     */
    static async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    /**
     * Retry an operation with exponential backoff
     * @param operation Function to retry
     * @param maxRetries Maximum number of retries
     * @param baseDelay Base delay between retries in ms
     */
    static async retry(operation, maxRetries = 3, baseDelay = 1000) {
        let lastError;
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                return await operation();
            }
            catch (error) {
                lastError = error;
                if (attempt === maxRetries) {
                    throw new Error(`Operation failed after ${maxRetries} attempts: ${lastError.message}`);
                }
                const delay = baseDelay * Math.pow(2, attempt - 1);
                await this.sleep(delay);
            }
        }
        throw lastError;
    }
}
exports.CoreActions = CoreActions;
//# sourceMappingURL=CoreActions.js.map