import { Page } from '@playwright/test';
import { Environment } from '../types/Environment';
import { BasePage } from '../core/BasePage';
import { FrameworkConfig } from '../types';
import { AuthConfig, AuthenticationOptions } from '../types/AuthTypes';
/**
 * Clean Authentication Service
 * Uses proper page locators, Playwright assertions, and eliminates all duplication
 */
export declare class AuthenticationService extends BasePage {
    private microsoftLoginPage;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Get authentication configuration using EnvironmentManager
     */
    getAuthConfig(environment?: Environment): AuthConfig;
    /**
     * Navigate to application
     */
    navigateToApplication(environment?: Environment): Promise<void>;
    /**
     * Start Microsoft login flow
     */
    startMicrosoftLogin(): Promise<void>;
    /**
     * Submit username for Microsoft login
     */
    submitUsername(username: string): Promise<void>;
    /**
     * Submit password for Microsoft login
     */
    submitPassword(password: string): Promise<void>;
    /**
     * Handle OTP if present
     */
    handleOtpChallenge(otpSecret: string): Promise<void>;
    /**
     * Handle stay signed in prompt
     */
    handleStaySignedInPrompt(): Promise<void>;
    /**
     * Complete authentication flow (navigate + login)
     */
    authenticateUser(options?: AuthenticationOptions): Promise<void>;
    /**
     * Login flow (can be used standalone or by authenticateUser)
     */
    performLogin(options?: AuthenticationOptions): Promise<void>;
}
//# sourceMappingURL=AuthenticationService.d.ts.map