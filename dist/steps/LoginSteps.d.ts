import { Page } from '@playwright/test';
/**
 * LoginSteps - Legacy wrapper for backward compatibility
 * This class wraps AuthSteps to maintain compatibility with existing tests
 * that were written before the OAuth migration
 *
 * @deprecated Use AuthSteps directly for new tests
 */
export declare class LoginSteps {
    private page;
    private authSteps;
    constructor(page: Page);
    /**
     * Legacy login method - now uses OAuth authentication
     * @param username - Not used in OAuth flow, kept for compatibility
     * @param password - Not used in OAuth flow, kept for compatibility
     */
    loginSuccessfully(username: string, password: string): Promise<void>;
    /**
     * Navigate to login page (now auth page)
     */
    navigateToLogin(): Promise<void>;
    /**
     * Fill login form - OAuth doesn't use traditional forms
     * @param username - Not used in OAuth flow
     * @param password - Not used in OAuth flow
     */
    fillLoginForm(username: string, password: string): Promise<void>;
    /**
     * Submit login form - now triggers OAuth flow
     */
    submitLogin(): Promise<void>;
    /**
     * Verify login success - checks dashboard access
     */
    verifyLoginSuccess(): Promise<void>;
    /**
     * Check if user is logged in
     */
    isLoggedIn(): Promise<boolean>;
    /**
     * Logout user
     */
    logout(): Promise<void>;
    /**
     * Get current authentication state
     */
    getAuthenticationState(): Promise<{
        isAuthenticated: boolean;
        currentUrl: string;
        onDashboard: boolean;
    }>;
    /**
     * Authenticate user (direct OAuth method)
     */
    authenticateUser(): Promise<void>;
    /**
     * Verify dashboard elements
     */
    verifyDashboardElements(): Promise<void>;
    /**
     * Navigate to different sections
     */
    navigateToSection(sectionName: string): Promise<void>;
    /**
     * Perform search from dashboard
     */
    searchFromDashboard(searchTerm: string): Promise<void>;
    /**
     * Get dashboard metrics
     */
    getDashboardMetrics(): Promise<{
        totalLiveUsers: string;
        liveAdvisers: string;
        policies: string;
        documents: string;
    }>;
    /**
     * Ensure user is authenticated
     */
    ensureAuthenticated(): Promise<void>;
    /**
     * @deprecated Use authenticateUser() instead
     */
    performLogin(username: string, password: string): Promise<void>;
    /**
     * @deprecated Use verifyDashboardAccess() instead
     */
    verifySuccessfulLogin(): Promise<void>;
    /**
     * @deprecated Use getAuthenticationState() instead
     */
    getLoginState(): Promise<boolean>;
    /**
     * Handle login errors (OAuth handles errors automatically)
     */
    handleLoginError(): Promise<void>;
    /**
     * Verify login form elements (not applicable to OAuth)
     */
    verifyLoginFormElements(): Promise<void>;
    /**
     * Clear login form (not applicable to OAuth)
     */
    clearLoginForm(): Promise<void>;
    /**
     * Test invalid credentials (not applicable to OAuth)
     */
    testInvalidCredentials(username: string, password: string): Promise<void>;
}
//# sourceMappingURL=LoginSteps.d.ts.map