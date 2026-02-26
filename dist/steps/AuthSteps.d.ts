import { Page } from '@playwright/test';
/**
 * AuthSteps - Business logic for OAuth authentication flow
 * Handles the complete authentication process from login page to dashboard
 */
export declare class AuthSteps {
    private page;
    private authPage;
    private dashboardPage;
    private assertionHelper;
    private waitHelper;
    private authHelper;
    constructor(page: Page);
    /**
     * Navigate to authentication page and wait for it to load
     */
    navigateToAuth(): Promise<void>;
    /**
     * Perform complete OAuth authentication flow
     * This is the main method that should be used in test setup
     */
    authenticateUser(): Promise<void>;
    /**
     * Click the OAuth login button and handle the authentication flow
     */
    performOAuthLogin(): Promise<void>;
    /**
     * Verify that user successfully landed on the Development Dashboard
     */
    verifyDashboardAccess(): Promise<void>;
    /**
     * Check if user is currently authenticated (on dashboard)
     */
    isUserAuthenticated(): Promise<boolean>;
    /**
     * Verify specific dashboard elements are present
     */
    verifyDashboardElements(): Promise<void>;
    /**
     * Get dashboard metrics for verification
     */
    getDashboardMetrics(): Promise<{
        totalLiveUsers: string;
        liveAdvisers: string;
        policies: string;
        documents: string;
    }>;
    /**
     * Navigate to a specific section from the dashboard
     */
    navigateToSection(sectionName: string): Promise<void>;
    /**
     * Perform search from dashboard
     */
    searchFromDashboard(searchTerm: string): Promise<void>;
    /**
     * Logout from the application
     */
    logout(): Promise<void>;
    /**
     * Quick authentication check - use this in beforeEach if user should already be authenticated
     */
    ensureAuthenticated(): Promise<void>;
    /**
     * Get current authentication state
     */
    getAuthenticationState(): Promise<{
        isAuthenticated: boolean;
        currentUrl: string;
        onDashboard: boolean;
    }>;
}
//# sourceMappingURL=AuthSteps.d.ts.map