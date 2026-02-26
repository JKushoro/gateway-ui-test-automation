"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePage = void 0;
const WaitHelper_1 = require("../helpers/WaitHelper");
const ActionHelper_1 = require("../helpers/ActionHelper");
const AssertionHelper_1 = require("../helpers/AssertionHelper");
const LocatorHelper_1 = require("../helpers/LocatorHelper");
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
            ...config
        };
        // Initialize all helpers once - no more duplication in derived classes
        this.action = new ActionHelper_1.ActionHelper(page, this.config);
        this.wait = new WaitHelper_1.WaitHelper(page, this.config);
        this.assert = new AssertionHelper_1.AssertionHelper(page, this.config);
        this.locate = new LocatorHelper_1.LocatorHelper(page);
    }
}
exports.BasePage = BasePage;
//# sourceMappingURL=BasePage.js.map