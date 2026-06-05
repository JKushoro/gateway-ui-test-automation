"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClickService = void 0;
const Logger_1 = require("../utils/Logger");
const WaitHelper_1 = require("../helpers/WaitHelper");
/**
 * ClickService - Handles all click-related interactions
 * Single Responsibility: Click operations only
 */
class ClickService {
    constructor(page, config) {
        this.page = page;
        this.config = config;
        this.logger = (0, Logger_1.createLogger)('ClickService');
        this.waitHelper = new WaitHelper_1.WaitHelper(page, config);
    }
    /**
     * Click a locator with proper waiting and error handling
     */
    async click(locator, options) {
        const timeout = options?.timeout || this.config.timeout || 30000;
        try {
            await locator.waitFor({ state: 'visible', timeout });
            await locator.waitFor({ state: 'attached', timeout });
            // Check if element is enabled before clicking (unless force is true)
            if (!options?.force) {
                const isEnabled = await locator.isEnabled({ timeout });
                if (!isEnabled) {
                    throw new Error('Element is not enabled');
                }
            }
            await locator.click({ timeout, force: options?.force });
            this.logger.debug('Click successful');
        }
        catch (error) {
            this.logger.error(`Click failed: ${error}`);
            throw new Error(`Unable to click element: ${error}`);
        }
    }
    /**
     * Double-click a locator
     */
    async doubleClick(locator, options) {
        const timeout = options?.timeout || this.config.timeout || 30000;
        try {
            await locator.waitFor({ state: 'visible', timeout });
            await locator.dblclick({ timeout });
            this.logger.debug('Double-click successful');
        }
        catch (error) {
            this.logger.error(`Double-click failed: ${error}`);
            throw new Error(`Unable to double-click element: ${error}`);
        }
    }
    /**
     * Right-click (context menu) on a locator
     */
    async rightClick(locator, options) {
        const timeout = options?.timeout || this.config.timeout || 30000;
        try {
            await locator.waitFor({ state: 'visible', timeout });
            await locator.click({ button: 'right', timeout });
            this.logger.debug('Right-click successful');
        }
        catch (error) {
            this.logger.error(`Right-click failed: ${error}`);
            throw new Error(`Unable to right-click element: ${error}`);
        }
    }
    /**
     * Click at specific coordinates
     */
    async clickAt(x, y) {
        try {
            await this.page.mouse.click(x, y);
            this.logger.debug(`Clicked at coordinates (${x}, ${y})`);
        }
        catch (error) {
            this.logger.error(`Click at coordinates failed: ${error}`);
            throw new Error(`Unable to click at coordinates (${x}, ${y}): ${error}`);
        }
    }
}
exports.ClickService = ClickService;
//# sourceMappingURL=ClickService.js.map