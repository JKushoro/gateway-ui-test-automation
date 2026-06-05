"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTestContext = exports.IsolatedTestFactory = exports.AuthenticatedTestFactory = void 0;
exports.setupTest = setupTest;
exports.setupLoginValidationTest = setupLoginValidationTest;
const LoginSteps_1 = require("@steps/gateway/LoginSteps");
const GatewayManagementSteps_1 = require("@steps/gateway/GatewayManagementSteps");
const SideNav_1 = require("@steps/components/SideNav");
const NavBar_1 = require("@steps/components/NavBar");
/**
 * Factory for creating authenticated test contexts
 * Single Responsibility: Creates authenticated browser contexts for E2E tests
 */
class AuthenticatedTestFactory {
    static async create(browser, environment = 'qa') {
        const page = await browser.newPage();
        await LoginSteps_1.LoginSteps.setupForEnvironment(page, environment);
        return {
            page,
            factFindSteps: new GatewayManagementSteps_1.GatewayManagementSteps(page),
            sideNav: new SideNav_1.SideNavService(page),
            navBar: new NavBar_1.NavBarService(page),
            async cleanup() {
                await page?.close();
            }
        };
    }
}
exports.AuthenticatedTestFactory = AuthenticatedTestFactory;
/**
 * Factory for creating isolated test contexts (no authentication)
 * Single Responsibility: Creates clean browser contexts for UI validation tests
 */
class IsolatedTestFactory {
    static async create(browser, _environment = 'qa') {
        const context = await browser.newContext({
            storageState: undefined, // Clean state, no stored authentication
        });
        const page = await context.newPage();
        return {
            context,
            page,
            async cleanup() {
                await context?.close();
            }
        };
    }
}
exports.IsolatedTestFactory = IsolatedTestFactory;
/**
 * Legacy support - maintained for backward compatibility
 * @deprecated Use AuthenticatedTestFactory.create() instead
 */
async function setupTest(browser, environment = 'qa') {
    return AuthenticatedTestFactory.create(browser, environment);
}
/**
 * Legacy support - maintained for backward compatibility
 * @deprecated Use IsolatedTestFactory.create() instead
 */
async function setupLoginValidationTest(browser, environment = 'qa') {
    return IsolatedTestFactory.create(browser, environment);
}
/**
 * Base test class using composition pattern
 * Single Responsibility: Provides common test functionality through composition
 */
class BaseTestContext {
    constructor(page, factFindSteps, sideNav, navBar) {
        this.page = page;
        this.factFindSteps = factFindSteps;
        this.sideNav = sideNav;
        this.navBar = navBar;
    }
    static async create(browser, environment = 'qa') {
        const setup = await AuthenticatedTestFactory.create(browser, environment);
        return new BaseTestContext(setup.page, setup.factFindSteps, setup.sideNav, setup.navBar);
    }
    static async createAuthenticated(browser, environment = 'qa') {
        return this.create(browser, environment);
    }
    async cleanup() {
        await this.page?.close();
    }
}
exports.BaseTestContext = BaseTestContext;
// Backward compatibility export
exports.default = BaseTestContext;
//# sourceMappingURL=TestUtils.js.map