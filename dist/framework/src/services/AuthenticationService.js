"use strict";
// framework/src/services/AuthenticationService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const test_1 = require("@playwright/test");
const generateOtp_1 = require("../utils/generateOtp");
const BasePage_1 = require("../core/BasePage");
/**
 * Clean Authentication Service
 * Uses proper page locators, Playwright assertions, and eliminates all duplication
 */
class AuthenticationService extends BasePage_1.BasePage {
    constructor(page, config) {
        super(page, config);
        const { MicrosoftLoginPageLocators } = require('@gateway/pages/gatewayElementLocators/MicrosoftLoginPageLocators');
        this.microsoftLoginPage = new MicrosoftLoginPageLocators(page, config);
    }
    /**
     * Get authentication configuration using EnvironmentManager
     */
    getAuthConfig(environment = 'qa') {
        const { getEnvironmentManager } = require('../utils/EnvironmentManager');
        return getEnvironmentManager().getAuthConfig(environment);
    }
    /**
     * Navigate to application
     */
    async navigateToApplication(environment = 'qa') {
        const authConfig = this.getAuthConfig(environment);
        await this.page.goto(authConfig.baseUrl);
        await this.wait.waitForLoadingToComplete();
    }
    /**
     * Start Microsoft login flow
     */
    async startMicrosoftLogin() {
        // Check if already logged in by looking for dashboard elements
        const hasDashboard = await this.page.locator('text=Dashboard').isVisible().catch(() => false);
        const hasLogout = await this.page.locator('text=Log out').isVisible().catch(() => false);
        if (hasDashboard || hasLogout) {
            this.logger.info('User already logged in, skipping login flow');
            return;
        }
        await (0, test_1.expect)(this.microsoftLoginPage.loginButton).toBeVisible({ timeout: 10000 });
        await this.action.clickLocator(this.microsoftLoginPage.loginButton);
        await this.page.waitForURL(/login\.microsoftonline\.com/);
        await this.wait.waitForDOMContentLoaded();
    }
    /**
     * Submit username for Microsoft login
     */
    async submitUsername(username) {
        await (0, test_1.expect)(this.microsoftLoginPage.usernameInput).toBeVisible();
        await this.microsoftLoginPage.usernameInput.fill(username);
        await this.action.clickLocator(this.microsoftLoginPage.nextButton);
        await this.wait.waitForDOMContentLoaded();
    }
    /**
     * Submit password for Microsoft login
     */
    async submitPassword(password) {
        await (0, test_1.expect)(this.microsoftLoginPage.passwordInput).toBeVisible();
        await this.microsoftLoginPage.passwordInput.fill(password);
        await this.action.clickLocator(this.microsoftLoginPage.signInButton);
        await this.wait.waitForDOMContentLoaded();
    }
    /**
     * Handle OTP if present
     */
    async handleOtpChallenge(otpSecret) {
        try {
            await (0, test_1.expect)(this.microsoftLoginPage.otpInput).toBeVisible({ timeout: 10000 });
            const otpCode = (0, generateOtp_1.generateOTP)(otpSecret);
            await this.microsoftLoginPage.otpInput.fill(otpCode);
            await this.action.clickLocator(this.microsoftLoginPage.signInButton);
            await this.wait.waitForDOMContentLoaded();
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
            await this.action.clickLocator(this.microsoftLoginPage.noButton);
            await this.wait.waitForDOMContentLoaded();
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
        // Check if already logged in first
        const hasDashboard = await this.page.locator('text=Dashboard').isVisible().catch(() => false);
        const hasLogout = await this.page.locator('text=Log out').isVisible().catch(() => false);
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
        await this.wait.waitForNetworkIdle();
    }
}
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=AuthenticationService.js.map