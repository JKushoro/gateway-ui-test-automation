"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormService = void 0;
const Logger_1 = require("../utils/Logger");
/**
 * FormService - Clean implementation for form interactions
 *
 * SOLID Principles Applied:
 * - Single Responsibility: Only handles form operations
 * - Interface Segregation: Implements only IFormService methods
 * - Dependency Inversion: Depends on abstractions (interfaces)
 * - Open/Closed: Open for extension via interface, closed for modification
 */
class FormService {
    constructor(page, config = {}) {
        this.page = page;
        this.logger = (0, Logger_1.createLogger)('FormService');
        this.defaultTimeout = config.timeout ?? 30000;
    }
    async fillInput(locator, value, options = {}) {
        const timeout = options.timeout ?? this.defaultTimeout;
        const shouldClear = options.clear ?? true;
        try {
            await this.waitForElementReady(locator, timeout);
            if (shouldClear) {
                await locator.clear({ timeout });
            }
            await locator.fill(value, { timeout });
            this.logger.debug(`Successfully filled input with: "${value}"`);
        }
        catch (error) {
            this.handleError('fillInput', error, { value });
        }
    }
    async selectByValue(locator, value, options = {}) {
        const timeout = options.timeout ?? this.defaultTimeout;
        try {
            await this.waitForElementReady(locator, timeout);
            await locator.selectOption({ value }, { timeout });
            this.logger.debug(`Successfully selected option by value: "${value}"`);
        }
        catch (error) {
            this.handleError('selectByValue', error, { value });
        }
    }
    async selectByText(locator, text, options = {}) {
        const timeout = options.timeout ?? this.defaultTimeout;
        try {
            await this.waitForElementReady(locator, timeout);
            await locator.selectOption({ label: text }, { timeout });
            this.logger.debug(`Successfully selected option by text: "${text}"`);
        }
        catch (error) {
            this.handleError('selectByText', error, { text });
        }
    }
    async check(locator, options = {}) {
        const timeout = options.timeout ?? this.defaultTimeout;
        try {
            await this.waitForElementReady(locator, timeout);
            await locator.check({ timeout });
            this.logger.debug('Successfully checked checkbox');
        }
        catch (error) {
            this.handleError('check', error);
        }
    }
    async uncheck(locator, options = {}) {
        const timeout = options.timeout ?? this.defaultTimeout;
        try {
            await this.waitForElementReady(locator, timeout);
            await locator.uncheck({ timeout });
            this.logger.debug('Successfully unchecked checkbox');
        }
        catch (error) {
            this.handleError('uncheck', error);
        }
    }
    // Private helper methods (following Single Responsibility)
    async waitForElementReady(locator, timeout) {
        await locator.waitFor({ state: 'visible', timeout });
        await locator.waitFor({ state: 'attached', timeout });
    }
    handleError(operation, error, context) {
        const contextStr = context ? ` Context: ${JSON.stringify(context)}` : '';
        const message = `FormService.${operation} failed: ${error}${contextStr}`;
        this.logger.error(message);
        throw new Error(message);
    }
}
exports.FormService = FormService;
//# sourceMappingURL=FormService.js.map