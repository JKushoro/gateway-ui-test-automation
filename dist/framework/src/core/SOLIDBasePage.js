"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePage = exports.SOLIDBasePage = void 0;
const Logger_1 = require("../utils/Logger");
const ServiceContainer_1 = require("./ServiceContainer");
/**
 * SOLIDBasePage - Refactored BasePage following SOLID principles
 *
 * SOLID Principles Applied:
 * - Single Responsibility: Only provides core page functionality and service access
 * - Open/Closed: Open for extension, closed for modification
 * - Liskov Substitution: Can be substituted by any subclass without breaking functionality
 * - Interface Segregation: Clients only depend on interfaces they use (via UIServices)
 * - Dependency Inversion: Depends on abstractions (interfaces) not concretions
 *
 * What this class DOES NOT do (following SRP):
 * - Screenshot taking (moved to ScreenshotService)
 * - Navigation logic (moved to NavigationService)
 * - Retry mechanisms (moved to RetryService)
 * - Complex helper initialization (moved to ServiceContainer)
 */
class SOLIDBasePage {
    constructor(page, config = {}) {
        // Input validation
        if (!page) {
            throw new Error('Page instance is required');
        }
        // Core initialization only
        this.page = page;
        this.config = {
            timeout: 30000,
            ...config,
        };
        // Single responsibility: logging for this class only
        this.logger = (0, Logger_1.createLogger)(this.constructor.name);
        // Dependency injection: UI services from container
        this.ui = (0, ServiceContainer_1.createUIServices)(page, this.config);
        this.logger.debug(`${this.constructor.name} initialized successfully`);
    }
    /**
     * Get the current page instance
     * Clean accessor following encapsulation principles
     */
    getPage() {
        return this.page;
    }
    /**
     * Get the current configuration
     * Clean accessor following encapsulation principles
     */
    getConfig() {
        return { ...this.config }; // Return copy to prevent mutation
    }
    /**
     * Get page URL - simple delegation to Playwright
     * Single responsibility: just expose Playwright functionality
     */
    getCurrentUrl() {
        return this.page.url();
    }
    /**
     * Get page title - simple delegation to Playwright
     * Single responsibility: just expose Playwright functionality
     */
    async getTitle() {
        return await this.page.title();
    }
    /**
     * Wait for page load state - simple delegation to Playwright
     * Single responsibility: just expose Playwright functionality
     */
    async waitForLoadState(state = 'domcontentloaded') {
        await this.page.waitForLoadState(state, { timeout: this.config.timeout });
    }
}
exports.SOLIDBasePage = SOLIDBasePage;
/**
 * Backward compatibility adapter
 * Allows existing code to work while migrating to SOLID architecture
 *
 * @deprecated Use SOLIDBasePage directly for new code
 */
class BasePage extends SOLIDBasePage {
    // Legacy helper properties for backward compatibility
    get action() {
        this.logger.warn('Using deprecated action helper. Use this.ui.click or this.ui.form instead');
        return {
            clickLocator: (locator, options) => this.ui.click.click(locator, options),
            fillInput: (locator, value, options) => this.ui.form.fillInput(locator, value, options),
        };
    }
    get wait() {
        this.logger.warn('Using deprecated wait helper. Use page.waitFor methods or dedicated services instead');
        return {
            waitForLoadingToComplete: () => this.waitForLoadState('networkidle'),
        };
    }
}
exports.BasePage = BasePage;
//# sourceMappingURL=SOLIDBasePage.js.map