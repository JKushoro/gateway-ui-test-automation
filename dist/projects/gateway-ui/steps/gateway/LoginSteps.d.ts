import { Page, BasePage, FrameworkConfig, Environment } from '../../shared/SharedImports';
/**
 * LoginSteps - Complete Login Engine and Setup
 * - Loads environment settings
 * - Resolves BASE_URL
 * - Performs Microsoft login flow (AAD) with OTP support
 * - Provides complete setup functionality (replaces GatewaySetup)
 */
export declare class LoginSteps extends BasePage {
    private readonly loginPage;
    private readonly dashboardSteps;
    private readonly envManager;
    private readonly authService;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Resolve base URL from env file.
     */
    private getBaseUrl;
    /**
     * Get credentials from environment or process.env
     * Uses ADVISOR_EMAIL and ADVISOR_PASSWORD only
     */
    private getCredentials;
    /**
     * Navigate to Gateway application landing page.
     */
    navigateToApplication(environment?: Environment): Promise<void>;
    /**
     * Start AAD login flow by clicking app login button.
     */
    startMicrosoftLogin(): Promise<void>;
    /**
     * Perform a full login with OTP support.
     * If username/password not provided, uses env credentials.
     */
    login(username?: string, password?: string, environment?: Environment): Promise<void>;
    /**
     * Convenience: Navigate + login using env credentials with OTP support.
     */
    performValidLogin(environment?: Environment): Promise<void>;
    /**
     * Login with OTP support
     */
    loginWithOtp(username?: string, password?: string, environment?: Environment): Promise<void>;
    /**
     * Login without OTP (skip OTP step)
     */
    loginWithoutOtp(username?: string, password?: string, environment?: Environment): Promise<void>;
    /**
     * Complete Gateway setup for testing - Navigate, login and verify dashboard
     * This replaces the old GatewaySetup.setupForEnvironment method
     */
    static setupForEnvironment(page: Page, environment?: Environment): Promise<void>;
    /**
     * Verify dashboard is loaded after login
     */
    verifyDashboard(): Promise<void>;
    /**
     * Legacy method for backward compatibility
     * @deprecated Use login() instead
     */
    clickLogin(username?: string, password?: string): Promise<void>;
}
//# sourceMappingURL=LoginSteps.d.ts.map