"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSteps = void 0;
// projects/gateway-ui/steps/gateway/LoginSteps.ts
const SharedImports_1 = require("../../shared/SharedImports");
const DashboardSteps_1 = require("@steps/gateway/DashboardSteps");
/**
 * LoginSteps - Orchestrates complete authentication flows
 *
 * Single Responsibility: Coordinates authentication workflows only
 * Delegates actual authentication logic to AuthenticationService
 */
class LoginSteps extends SharedImports_1.BasePage {
    constructor(page, config) {
        super(page, config);
        this.dashboardSteps = new DashboardSteps_1.DashboardSteps(page);
        this.authService = new SharedImports_1.AuthenticationService(page, config);
    }
    /**
     * Navigate to Gateway application landing page
     */
    async navigateToApplication(environment = 'qa') {
        await this.authService.navigateToApplication(environment);
    }
    /**
     * Start AAD login flow
     */
    async startMicrosoftLogin() {
        await this.authService.startMicrosoftLogin();
    }
    /**
     * Perform complete login flow with optional credentials and OTP control
     */
    async login(username, password, environment = 'qa', skipOtp = false) {
        const options = {
            environment,
            skipOtp,
            customCredentials: username && password ? { username, password } : undefined
        };
        await this.authService.performLogin(options);
    }
    /**
     * Complete authentication flow: Navigate + Login + Verify
     */
    async performCompleteLogin(environment = 'qa') {
        await this.authService.authenticateUser({ environment });
        await this.verifyDashboard();
    }
    /**
     * Verify dashboard is accessible after authentication
     */
    async verifyDashboard() {
        await this.dashboardSteps.verifyDashboard();
    }
    /**
     * Static factory method for test setup
     * Creates instance, performs complete login, and returns configured page
     */
    static async setupForEnvironment(page, environment = 'qa') {
        const loginSteps = new LoginSteps(page);
        await loginSteps.performCompleteLogin(environment);
    }
}
exports.LoginSteps = LoginSteps;
//# sourceMappingURL=LoginSteps.js.map