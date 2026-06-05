import { Page, BasePage, FrameworkConfig, Environment } from '../../shared/SharedImports';
/**
 * LoginSteps - Orchestrates complete authentication flows
 *
 * Single Responsibility: Coordinates authentication workflows only
 * Delegates actual authentication logic to AuthenticationService
 */
export declare class LoginSteps extends BasePage {
    private readonly dashboardSteps;
    private readonly authService;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Navigate to Gateway application landing page
     */
    navigateToApplication(environment?: Environment): Promise<void>;
    /**
     * Start AAD login flow
     */
    startMicrosoftLogin(): Promise<void>;
    /**
     * Perform complete login flow with optional credentials and OTP control
     */
    login(username?: string, password?: string, environment?: Environment, skipOtp?: boolean): Promise<void>;
    /**
     * Complete authentication flow: Navigate + Login + Verify
     */
    performCompleteLogin(environment?: Environment): Promise<void>;
    /**
     * Verify dashboard is accessible after authentication
     */
    verifyDashboard(): Promise<void>;
    /**
     * Static factory method for test setup
     * Creates instance, performs complete login, and returns configured page
     */
    static setupForEnvironment(page: Page, environment?: Environment): Promise<void>;
}
//# sourceMappingURL=LoginSteps.d.ts.map