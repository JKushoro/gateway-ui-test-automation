"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupTest = setupTest;
exports.setupLoginValidationTest = setupLoginValidationTest;
const LoginSteps_1 = require("@steps/gateway/LoginSteps");
const GatewayManagementSteps_1 = require("@steps/gateway/GatewayManagementSteps");
const SideNav_1 = require("@steps/components/SideNav");
const NavBar_1 = require("@steps/components/NavBar");
/**
 * Base test class to eliminate all duplicated code patterns
 * Usage: class MyTest extends BaseTest { ... }
 */
class BaseTest {
    constructor(page) {
        this.page = page;
        this.factFindSteps = new GatewayManagementSteps_1.GatewayManagementSteps(page);
        this.sideNav = new SideNav_1.SideNavService(page);
        this.navBar = new NavBar_1.NavBarService(page);
    }
    static async create(browser, environment = 'qa') {
        const page = await browser.newPage();
        await LoginSteps_1.LoginSteps.setupForEnvironment(page, environment);
        return new BaseTest(page);
    }
    async cleanup() {
        await this.page?.close();
    }
}
exports.default = BaseTest;
async function setupTest(browser, environment = 'qa') {
    const page = await browser.newPage();
    await LoginSteps_1.LoginSteps.setupForEnvironment(page, environment);
    const factFindSteps = new GatewayManagementSteps_1.GatewayManagementSteps(page);
    const sideNav = new SideNav_1.SideNavService(page);
    const navBar = new NavBar_1.NavBarService(page);
    return { page, factFindSteps, sideNav, navBar };
}
async function setupLoginValidationTest(browser, _environment = 'qa') {
    const context = await browser.newContext({
        storageState: undefined,
    });
    const page = await context.newPage();
    return { context, page };
}
//# sourceMappingURL=TestUtils.js.map