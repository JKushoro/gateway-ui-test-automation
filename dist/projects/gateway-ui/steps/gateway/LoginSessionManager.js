"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSessionManager = void 0;
const SharedImports_1 = require("../../shared/SharedImports");
/**
 * Manages login session state and navigation
 * Single Responsibility: Session state management only
 */
class LoginSessionManager {
    constructor(page, loginPage) {
        this.page = page;
        this.loginPage = loginPage;
        this.envManager = (0, SharedImports_1.getEnvironmentManager)();
    }
    async navigateToApplication(environment = 'qa') {
        const baseUrl = this.envManager.getBaseUrl(environment);
        await this.page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    }
    async isUserLoggedIn() {
        const indicators = await Promise.allSettled([
            this.loginPage.getDashboardIndicatorLocator().isVisible(),
            this.loginPage.getUserMenuIndicatorLocator().isVisible(),
            this.loginPage.getLogoutButtonLocator().isVisible()
        ]);
        return indicators.some(result => result.status === 'fulfilled' && result.value === true);
    }
    async logoutIfLoggedIn() {
        if (!(await this.isUserLoggedIn())) {
            return;
        }
        await this.loginPage.getLogoutButtonLocator().click();
        await this.page.waitForLoadState('domcontentloaded');
    }
    getAdvisorEmail(environment = 'qa') {
        return this.envManager.getAdvisorEmail(environment);
    }
}
exports.LoginSessionManager = LoginSessionManager;
//# sourceMappingURL=LoginSessionManager.js.map