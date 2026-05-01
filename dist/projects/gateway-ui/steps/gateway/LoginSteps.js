"use strict";
// projects/gateway-ui/steps/LoginSteps.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSteps = void 0;
const SharedImports_1 = require("../../shared/SharedImports");
const LoginPageLocators_1 = require("@pages/gatewayElementLocators/LoginPageLocators");
const DashboardSteps_1 = require("@steps/gateway/DashboardSteps");
/**
 * LoginSteps - Complete Login Engine and Setup
 * - Loads environment settings
 * - Resolves BASE_URL
 * - Performs Microsoft login flow (AAD) with OTP support
 * - Provides complete setup functionality (replaces GatewaySetup)
 */
class LoginSteps extends SharedImports_1.BasePage {
    constructor(page, config) {
        super(page, config);
        this.envManager = (0, SharedImports_1.getEnvironmentManager)();
        this.loginPage = new LoginPageLocators_1.LoginPage(page, config);
        this.dashboardSteps = new DashboardSteps_1.DashboardSteps(page);
        this.authService = new SharedImports_1.AuthenticationService(page, config);
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
        await this.authService.navigateToApplication(environment);
    }
    /* -------------------- Login Flow -------------------- */
    /**
     * Start AAD login flow by clicking app login button.
     */
    async startMicrosoftLogin() {
        await this.authService.startMicrosoftLogin();
    }
    /**
     * Perform a full login with OTP support.
     * If username/password not provided, uses env credentials.
     */
    async login(username, password, environment = 'qa') {
        const options = {
            environment,
            customCredentials: username && password ? { username, password } : undefined
        };
        await this.authService.performLogin(options);
    }
    /**
     * Convenience: Navigate + login using env credentials with OTP support.
     */
    async performValidLogin(environment = 'qa') {
        await this.authService.authenticateUser({ environment });
    }
    /**
     * Login with OTP support
     */
    async loginWithOtp(username, password, environment = 'qa') {
        const options = {
            environment,
            skipOtp: false,
            customCredentials: username && password ? { username, password } : undefined
        };
        await this.authService.performLogin(options);
    }
    /**
     * Login without OTP (skip OTP step)
     */
    async loginWithoutOtp(username, password, environment = 'qa') {
        const options = {
            environment,
            skipOtp: true,
            customCredentials: username && password ? { username, password } : undefined
        };
        await this.authService.performLogin(options);
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