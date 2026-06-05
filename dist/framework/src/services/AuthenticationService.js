"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
// framework/src/services/AuthenticationService.ts
const test_1 = require("@playwright/test");
const generateOtp_1 = require("../utils/generateOtp");
const BasePage_1 = require("../core/BasePage");
const EnvironmentManager_1 = require("../utils/EnvironmentManager");
const MicrosoftLoginPageLocators_1 = require("../../../projects/gateway-ui/pages/auth/MicrosoftLoginPageLocators");
/**
 * Clean Authentication Service
 * Uses proper page locators, Playwright assertions, and eliminates all duplication
 */
class AuthenticationService extends BasePage_1.BasePage {
    constructor(page, config) {
        super(page, config);
        this.microsoftLoginPage = new MicrosoftLoginPageLocators_1.MicrosoftLoginPageLocators(page, config);
    }
    /**
     * Get authentication configuration using EnvironmentManager
     */
    getAuthConfig(environment = 'qa') {
        return (0, EnvironmentManager_1.getEnvironmentManager)().getAuthConfig(environment);
    }
    /**
     * Navigate to application
     */
    async navigateToApplication(environment = 'qa') {
        const authConfig = this.getAuthConfig(environment);
        await this.page.goto(authConfig.baseUrl);
        await this.page.waitForLoadState('domcontentloaded');
    }
    /**
     * Start Microsoft login flow
     */
    async startMicrosoftLogin() {
        const hasDashboard = await this.microsoftLoginPage.dashboardIndicator.isVisible().catch(() => false);
        const hasLogout = await this.microsoftLoginPage.logoutButton.isVisible().catch(() => false);
        if (hasDashboard || hasLogout) {
            this.logger.info('User already logged in, skipping login flow');
            return;
        }
        await (0, test_1.expect)(this.microsoftLoginPage.loginButton).toBeVisible({ timeout: 10000 });
        await this.microsoftLoginPage.loginButton.click();
        await this.page.waitForURL(/login\.microsoftonline\.com/, { timeout: 15000 });
        await this.page.waitForLoadState('domcontentloaded');
    }
    /**
     * Submit username for Microsoft login
     */
    async submitUsername(username) {
        await (0, test_1.expect)(this.microsoftLoginPage.usernameInput).toBeVisible({ timeout: 10000 });
        await this.microsoftLoginPage.usernameInput.fill(username);
        await this.microsoftLoginPage.nextButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
    /**
     * Submit password for Microsoft login
     */
    async submitPassword(password) {
        await (0, test_1.expect)(this.microsoftLoginPage.passwordInput).toBeVisible({ timeout: 10000 });
        await this.microsoftLoginPage.passwordInput.fill(password);
        await this.microsoftLoginPage.signInButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
    /**
     * Handle OTP if present
     */
    async handleOtpChallenge(otpSecret) {
        try {
            await (0, test_1.expect)(this.microsoftLoginPage.otpInput).toBeVisible({ timeout: 10000 });
            const otpCode = (0, generateOtp_1.generateOTP)(otpSecret);
            await this.microsoftLoginPage.otpInput.fill(otpCode);
            await this.microsoftLoginPage.signInButton.click();
            await this.page.waitForLoadState('domcontentloaded');
        }
        catch {
            // No OTP required - continue
        }
    }
    /**
     * Handle stay signed in prompt
     */
    async handleStaySignedInPrompt() {
        try {
            await (0, test_1.expect)(this.microsoftLoginPage.staySignedInPrompt).toBeVisible({ timeout: 10000 });
            await this.microsoftLoginPage.yesButton.click();
            await this.page.waitForLoadState('domcontentloaded');
        }
        catch {
            // Prompt not present
        }
    }
    /**
     * Complete authentication flow (navigate + login)
     */
    async authenticateUser(options = {}) {
        const environment = options.environment || 'qa';
        await this.navigateToApplication(environment);
        await this.performLogin(options);
    }
    /**
     * Login flow (can be used standalone or by authenticateUser)
     */
    async performLogin(options = {}) {
        const environment = options.environment || 'qa';
        const authConfig = this.getAuthConfig(environment);
        // Check if already logged in
        const hasDashboard = await this.microsoftLoginPage.dashboardIndicator.isVisible().catch(() => false);
        const hasLogout = await this.microsoftLoginPage.logoutButton.isVisible().catch(() => false);
        if (hasDashboard || hasLogout) {
            this.logger.info('User already logged in, skipping entire login flow');
            return;
        }
        await this.startMicrosoftLogin();
        const username = options.customCredentials?.username || authConfig.username;
        const password = options.customCredentials?.password || authConfig.password;
        await this.submitUsername(username);
        await this.submitPassword(password);
        if (!options.skipOtp && authConfig.otpSecret) {
            await this.handleOtpChallenge(authConfig.otpSecret);
        }
        await this.handleStaySignedInPrompt();
        await this.page.waitForURL('**/dashboard/**', { timeout: 15000 });
        await this.page.waitForLoadState('networkidle');
    }
}
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=AuthenticationService.js.map