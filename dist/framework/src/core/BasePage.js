"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePage = void 0;
const WaitHelper_1 = require("../helpers/WaitHelper");
const ActionHelper_1 = require("../helpers/ActionHelper");
const AssertionHelper_1 = require("../helpers/AssertionHelper");
const LocatorHelper_1 = require("../helpers/LocatorHelper");
const Logger_1 = require("../utils/Logger");
const TableHelper_1 = require("@framework/helpers/TableHelper");
/**
 * Unified Base Page Class
 * Combines functionality of BaseSteps and BaseUIPage into a single comprehensive base class
 * Pre-instantiates all helpers to eliminate code duplication across page and step classes
 * Provides consistent patterns for both page objects and test scenarios
 */
class BasePage {
    constructor(page, config = {}) {
        this.page = page;
        this.config = {
            timeout: 30000,
            ...config,
        };
        // Initialize all helpers once - no more duplication in derived classes
        this.action = new ActionHelper_1.ActionHelper(page, this.config);
        this.wait = new WaitHelper_1.WaitHelper(page, this.config);
        this.assert = new AssertionHelper_1.AssertionHelper(page, this.config);
        this.locate = new LocatorHelper_1.LocatorHelper(page);
        this.table = new TableHelper_1.TableHelper(page, this.wait);
        this.logger = (0, Logger_1.createLogger)(this.constructor.name);
    }
    /**
     * Run an async action and ignore errors (for optional UI elements).
     * Useful for handling optional form fields or UI elements that may not be present.
     */
    async try(fn, _context) {
        try {
            await fn();
        }
        catch (error) {
            // Intentionally empty
        }
    }
    /**
     * Batch version of try() for question radios.
     * Attempts to set multiple radio button options, ignoring failures for optional elements.
     */
    // protected async tryOptionalRadios(pairs: ReadonlyArray<[string, string]>): Promise<void> {
    //   for (const [q, opt] of pairs) {
    //     await this.try(() => this.action.setRadioByQuestion(q, opt));
    //   }
    // }
    async tryOptionalRadios(pairs) {
        for (const [q, opt] of pairs) {
            await this.try(async () => {
                await this.action.setRadioByQuestion(q, opt);
            });
        }
    }
}
exports.BasePage = BasePage;
//# sourceMappingURL=BasePage.js.map