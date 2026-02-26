import { Page } from '@playwright/test';
/**
 * Enhanced AuthenticationHelper for handling OAuth authentication
 * Specifically designed to handle Microsoft OAuth flow for Fairstone Gateway
 */
export declare class AuthenticationHelper {
    private page;
    private waitHelper;
    private actionHelper;
    constructor(page: Page);
    /**
     * Complete OAuth authentication flow with proper error handling
     */
    authenticateWithOAuth(username?: string, password?: string): Promise<void>;
    /**
     * Navigate to authentication page with proper error handling
     */
    private navigateToAuthPage;
    /**
     * Click OAuth login button with multiple fallback strategies
     */
    private clickOAuthLoginButton;
    /**
     * Handle Microsoft OAuth authentication flow
     */
    private handleMicrosoftOAuthFlow;
    /**
     * Handle email input in Microsoft OAuth flow
     */
    private handleEmailInput;
    /**
     * Handle password input in Microsoft OAuth flow
     */
    private handlePasswordInput;
    /**
     * Handle additional OAuth steps like MFA, consent, etc.
     */
    private handleAdditionalOAuthSteps;
    /**
     * Wait for redirect to dashboard
     */
    private waitForDashboardRedirect;
    /**
     * Take error screenshot for debugging
     */
    private takeErrorScreenshot;
    /**
     * Clear browser context for fresh authentication
     */
    clearAuthenticationContext(): Promise<void>;
    /**
     * Check if user is currently authenticated
     */
    isAuthenticated(): Promise<boolean>;
}
//# sourceMappingURL=AuthenticationHelper.d.ts.map