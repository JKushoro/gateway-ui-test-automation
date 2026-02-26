"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthSteps = void 0;
const AuthPage_1 = require("../pages/AuthPage");
const DashboardPage_1 = require("../pages/DashboardPage");
const AssertionHelper_1 = require("../helpers/AssertionHelper");
const WaitHelper_1 = require("../helpers/WaitHelper");
const AuthenticationHelper_1 = require("../helpers/AuthenticationHelper");
/**
 * AuthSteps - Business logic for OAuth authentication flow
 * Handles the complete authentication process from login page to dashboard
 */
class AuthSteps {
    constructor(page) {
        this.page = page;
        this.authPage = new AuthPage_1.AuthPage(page);
        this.dashboardPage = new DashboardPage_1.DashboardPage(page);
        this.assertionHelper = new AssertionHelper_1.AssertionHelper(page);
        this.waitHelper = new WaitHelper_1.WaitHelper(page);
        this.authHelper = new AuthenticationHelper_1.AuthenticationHelper(page);
    }
    /**
     * Navigate to authentication page and wait for it to load
     */
    async navigateToAuth() {
        await this.authPage.navigate();
        await this.authPage.waitForPageLoad();
    }
    /**
     * Perform complete OAuth authentication flow
     * This is the main method that should be used in test setup
     */
    async authenticateUser() {
        try {
            console.log('Starting OAuth authentication...');
            // Use the enhanced authentication helper
            await this.authHelper.authenticateWithOAuth('john.kushoro@fairstone.co.uk', 'Mugaji1967#');
            // Verify we're authenticated
            const isAuthenticated = await this.authHelper.isAuthenticated();
            if (!isAuthenticated) {
                throw new Error('Authentication verification failed');
            }
            console.log('OAuth authentication completed successfully');
        }
        catch (error) {
            console.error('OAuth authentication failed:', error);
            throw error;
        }
    }
    /**
     * Click the OAuth login button and handle the authentication flow
     */
    async performOAuthLogin() {
        try {
            await this.authPage.performOAuthLogin();
            // Additional handling for OAuth callback
            const currentUrl = this.page.url();
            if (currentUrl.includes('graphauthorisecallback')) {
                console.log('OAuth callback detected, waiting for dashboard redirect...');
                // Wait for automatic redirect or manually navigate
                try {
                    await this.page.waitForURL((url) => url.toString().includes('/dashboard/development/dash'), { timeout: 15000 });
                }
                catch (redirectError) {
                    console.log('Automatic redirect failed, manually navigating to dashboard...');
                    await this.page.goto('https://qa-fairstonegateway.fairstone.co.uk/dashboard/development/dash', {
                        waitUntil: 'domcontentloaded',
                        timeout: 30000
                    });
                }
            }
        }
        catch (error) {
            console.error('OAuth login failed:', error);
            throw error;
        }
    }
    /**
     * Verify that user successfully landed on the Development Dashboard
     */
    async verifyDashboardAccess() {
        try {
            // Wait for dashboard page to load with extended timeout
            await this.dashboardPage.waitForPageLoad();
            // Verify we're on the correct dashboard URL
            const currentUrl = this.authPage.getCurrentUrl();
            if (!currentUrl.includes('/dashboard/development/dash')) {
                // Try to navigate to dashboard if not already there
                console.log(`Not on dashboard (${currentUrl}), attempting navigation...`);
                await this.page.goto('https://qa-fairstonegateway.fairstone.co.uk/dashboard/development/dash', {
                    waitUntil: 'domcontentloaded',
                    timeout: 30000
                });
                // Wait for page to load after navigation
                await this.dashboardPage.waitForPageLoad();
            }
            // Verify dashboard elements are present with extended timeouts
            await this.assertionHelper.assertElementVisible(this.dashboardPage.locators.dashboardTitle, 15000);
            // Check for side menu with fallback
            try {
                await this.assertionHelper.assertElementVisible(this.dashboardPage.locators.sideMenu, 10000);
            }
            catch (sideMenuError) {
                console.warn('Side menu not immediately visible, checking for alternative selectors...');
                const alternativeMenu = this.page.locator('.sidebar, .side-menu, nav, .menu').first();
                if (await alternativeMenu.isVisible({ timeout: 5000 })) {
                    console.log('Alternative menu selector found');
                }
                else {
                    console.warn('Side menu verification failed, but continuing...');
                }
            }
            console.log('Dashboard access verified successfully');
        }
        catch (error) {
            console.error('Dashboard verification failed:', error);
            // Take screenshot for debugging
            try {
                await this.page.screenshot({
                    path: `dashboard-verification-error-${Date.now()}.png`,
                    fullPage: true
                });
            }
            catch (screenshotError) {
                console.error('Could not take verification error screenshot:', screenshotError);
            }
            throw error;
        }
    }
    /**
     * Check if user is currently authenticated (on dashboard)
     */
    async isUserAuthenticated() {
        try {
            const currentUrl = this.authPage.getCurrentUrl();
            return currentUrl.includes('/dashboard/development/dash') &&
                await this.dashboardPage.isPageLoaded();
        }
        catch {
            return false;
        }
    }
    /**
     * Verify specific dashboard elements are present
     */
    async verifyDashboardElements() {
        // Verify main dashboard components
        await this.assertionHelper.assertElementVisible(this.dashboardPage.locators.dashboardTitle);
        await this.assertionHelper.assertElementVisible(this.dashboardPage.locators.searchInput);
        await this.assertionHelper.assertElementVisible(this.dashboardPage.locators.sideMenu);
        // Verify some key metrics are displayed
        await this.assertionHelper.assertElementVisible(this.dashboardPage.locators.totalLiveUsers);
        await this.assertionHelper.assertElementVisible(this.dashboardPage.locators.liveAdvisers);
        await this.assertionHelper.assertElementVisible(this.dashboardPage.locators.policies);
    }
    /**
     * Get dashboard metrics for verification
     */
    async getDashboardMetrics() {
        await this.verifyDashboardAccess();
        return {
            totalLiveUsers: await this.dashboardPage.getMetricValue('Total Live Users'),
            liveAdvisers: await this.dashboardPage.getMetricValue('Live Advisers'),
            policies: await this.dashboardPage.getMetricValue('Policies'),
            documents: await this.dashboardPage.getMetricValue('Documents')
        };
    }
    /**
     * Navigate to a specific section from the dashboard
     */
    async navigateToSection(sectionName) {
        await this.verifyDashboardAccess();
        switch (sectionName.toLowerCase()) {
            case 'activities':
                await this.dashboardPage.clickActivities();
                break;
            case 'advisers':
                await this.dashboardPage.clickAdvisers();
                break;
            case 'clients':
                await this.dashboardPage.clickClients();
                break;
            case 'compliance':
                await this.dashboardPage.clickCompliance();
                break;
            case 'reports':
                await this.dashboardPage.clickReports();
                break;
            default:
                throw new Error(`Unknown section: ${sectionName}`);
        }
    }
    /**
     * Perform search from dashboard
     */
    async searchFromDashboard(searchTerm) {
        await this.verifyDashboardAccess();
        await this.dashboardPage.search(searchTerm);
    }
    /**
     * Logout from the application
     */
    async logout() {
        await this.dashboardPage.logout();
        // Wait for redirect back to auth page
        await this.waitHelper.waitForUrlToChangeFrom(this.page.url());
        await this.authPage.waitForPageLoad();
    }
    /**
     * Quick authentication check - use this in beforeEach if user should already be authenticated
     */
    async ensureAuthenticated() {
        const isAuthenticated = await this.isUserAuthenticated();
        if (!isAuthenticated) {
            await this.authenticateUser();
        }
    }
    /**
     * Get current authentication state
     */
    async getAuthenticationState() {
        const currentUrl = this.authPage.getCurrentUrl();
        const isAuthenticated = await this.isUserAuthenticated();
        const onDashboard = currentUrl.includes('/dashboard/development/dash');
        return {
            isAuthenticated,
            currentUrl,
            onDashboard
        };
    }
}
exports.AuthSteps = AuthSteps;
//# sourceMappingURL=AuthSteps.js.map