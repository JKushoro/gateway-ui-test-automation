"use strict";
// projects/gateway-ui/steps/LoginSteps.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSteps = void 0;
const LoginPageLocators_1 = require("@pages/LoginPageLocators");
const BasePage_1 = require("@framework/core/BasePage");
const DashboardSteps_1 = require("@steps/DashboardSteps");
const EnvironmentManager_1 = require("@utils/EnvironmentManager");
/**
 * LoginSteps - Complete Login Engine and Setup
 * - Loads environment settings
 * - Resolves BASE_URL
 * - Performs Microsoft login flow (AAD)
 * - Provides complete setup functionality (replaces GatewaySetup)
 */
class LoginSteps extends BasePage_1.BasePage {
    constructor(page, config) {
        super(page, config);
        this.envManager = (0, EnvironmentManager_1.getEnvironmentManager)();
        this.loginPage = new LoginPageLocators_1.LoginPageLocators(page, config);
        this.dashboardSteps = new DashboardSteps_1.DashboardSteps(page);
    }
    /* -------------------- Environment Management -------------------- */
    /**
     * Resolve base URL from env file.
     */
    getBaseUrl(environment = 'qa') {
        return this.envManager.getBaseUrl(environment);
    }
    /**
     * Get credentials from environment or process.env
     * Uses ADVISOR_EMAIL and ADVISOR_PASSWORD only
     */
    getCredentials(environment = 'qa') {
        return this.envManager.getCredentials(environment);
    }
    /* -------------------- Navigation -------------------- */
    /**
     * Navigate to Gateway application landing page.
     */
    async navigateToApplication(environment = 'qa') {
        const baseUrl = this.getBaseUrl(environment);
        await this.page.goto(baseUrl);
        await this.wait.waitForLoadingToComplete();
    }
    /* -------------------- Login Flow -------------------- */
    /**
     * Start AAD login flow by clicking app login button.
     */
    async startMicrosoftLogin() {
        await this.action.clickLocator(this.loginPage.loginButton);
        // URL-based wait is less flaky than waiting for network idle on AAD pages
        await this.page.waitForURL(/login\.microsoftonline\.com/);
        await this.wait.waitForDOMContentLoaded();
    }
    /**
     * Perform a full login.
     * If username/password not provided, uses env credentials.
     */
    async login(username, password, environment = 'qa') {
        await this.startMicrosoftLogin();
        const creds = (!username || !password) ? this.getCredentials(environment) : undefined;
        const loginUsername = username ?? creds.username;
        const loginPassword = password ?? creds.password;
        // Username -> Next
        await this.loginPage.usernameInput.fill(loginUsername);
        await this.action.clickLocator(this.loginPage.nextButton);
        await this.wait.waitForDOMContentLoaded();
        // Password -> Sign in
        await this.loginPage.passwordInput.fill(loginPassword);
        await this.action.clickLocator(this.loginPage.signInButton);
        // Let redirect complete
        await this.wait.waitForDOMContentLoaded();
        await this.wait.waitForNetworkIdle();
    }
    /**
     * Convenience: Navigate + login using env credentials.
     */
    async performValidLogin(environment = 'qa') {
        await this.navigateToApplication(environment);
        await this.login(undefined, undefined, environment);
    }
    /* -------------------- Complete Setup (replaces GatewaySetup) -------------------- */
    /**
     * Complete Gateway setup for testing - Navigate, login and verify dashboard
     * This replaces the old GatewaySetup.setupForEnvironment method
     */
    static async setupForEnvironment(page, environment = 'qa') {
        const loginSteps = new LoginSteps(page);
        await loginSteps.navigateToApplication(environment);
        await loginSteps.login(undefined, undefined, environment);
        await loginSteps.verifyDashboard();
    }
    /**
     * Verify dashboard is loaded after login
     */
    async verifyDashboard() {
        await this.dashboardSteps.verifyDashboard();
    }
    /* -------------------- Legacy Support -------------------- */
    /**
     * Legacy method for backward compatibility
     * @deprecated Use login() instead
     */
    async clickLogin(username, password) {
        await this.login(username, password);
    }
}
exports.LoginSteps = LoginSteps;
//# sourceMappingURL=LoginSteps.js.map