"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSteps = void 0;
const AuthSteps_1 = require("./AuthSteps");
/**
 * LoginSteps - Legacy wrapper for backward compatibility
 * This class wraps AuthSteps to maintain compatibility with existing tests
 * that were written before the OAuth migration
 *
 * @deprecated Use AuthSteps directly for new tests
 */
class LoginSteps {
    constructor(page) {
        this.page = page;
        this.authSteps = new AuthSteps_1.AuthSteps(page);
    }
    /**
     * Legacy login method - now uses OAuth authentication
     * @param username - Not used in OAuth flow, kept for compatibility
     * @param password - Not used in OAuth flow, kept for compatibility
     */
    async loginSuccessfully(username, password) {
        console.log('Legacy login method called - redirecting to OAuth authentication');
        console.log(`Note: Username (${username}) and password are ignored in OAuth flow`);
        // Use OAuth authentication instead of traditional login
        await this.authSteps.authenticateUser();
    }
    /**
     * Navigate to login page (now auth page)
     */
    async navigateToLogin() {
        await this.authSteps.navigateToAuth();
    }
    /**
     * Fill login form - OAuth doesn't use traditional forms
     * @param username - Not used in OAuth flow
     * @param password - Not used in OAuth flow
     */
    async fillLoginForm(username, password) {
        console.log('Legacy fillLoginForm called - OAuth handles authentication automatically');
        console.log(`Note: Username (${username}) and password are ignored in OAuth flow`);
        // Navigate to auth page as preparation
        await this.authSteps.navigateToAuth();
    }
    /**
     * Submit login form - now triggers OAuth flow
     */
    async submitLogin() {
        console.log('Legacy submitLogin called - triggering OAuth authentication');
        await this.authSteps.performOAuthLogin();
    }
    /**
     * Verify login success - checks dashboard access
     */
    async verifyLoginSuccess() {
        await this.authSteps.verifyDashboardAccess();
    }
    /**
     * Check if user is logged in
     */
    async isLoggedIn() {
        return await this.authSteps.isUserAuthenticated();
    }
    /**
     * Logout user
     */
    async logout() {
        await this.authSteps.logout();
    }
    /**
     * Get current authentication state
     */
    async getAuthenticationState() {
        return await this.authSteps.getAuthenticationState();
    }
    /**
     * Authenticate user (direct OAuth method)
     */
    async authenticateUser() {
        await this.authSteps.authenticateUser();
    }
    /**
     * Verify dashboard elements
     */
    async verifyDashboardElements() {
        await this.authSteps.verifyDashboardElements();
    }
    /**
     * Navigate to different sections
     */
    async navigateToSection(sectionName) {
        await this.authSteps.navigateToSection(sectionName);
    }
    /**
     * Perform search from dashboard
     */
    async searchFromDashboard(searchTerm) {
        await this.authSteps.searchFromDashboard(searchTerm);
    }
    /**
     * Get dashboard metrics
     */
    async getDashboardMetrics() {
        return await this.authSteps.getDashboardMetrics();
    }
    /**
     * Ensure user is authenticated
     */
    async ensureAuthenticated() {
        await this.authSteps.ensureAuthenticated();
    }
    // Legacy methods for backward compatibility
    /**
     * @deprecated Use authenticateUser() instead
     */
    async performLogin(username, password) {
        console.log('Legacy performLogin called - use authenticateUser() instead');
        await this.loginSuccessfully(username, password);
    }
    /**
     * @deprecated Use verifyDashboardAccess() instead
     */
    async verifySuccessfulLogin() {
        console.log('Legacy verifySuccessfulLogin called - use verifyDashboardAccess() instead');
        await this.verifyLoginSuccess();
    }
    /**
     * @deprecated Use getAuthenticationState() instead
     */
    async getLoginState() {
        console.log('Legacy getLoginState called - use getAuthenticationState() instead');
        return await this.isLoggedIn();
    }
    /**
     * Handle login errors (OAuth handles errors automatically)
     */
    async handleLoginError() {
        console.log('Legacy handleLoginError called - OAuth handles errors automatically');
        // Check current state and provide helpful information
        const authState = await this.getAuthenticationState();
        console.log('Current authentication state:', authState);
        if (!authState.isAuthenticated) {
            console.log('User is not authenticated - try calling authenticateUser()');
        }
    }
    /**
     * Verify login form elements (not applicable to OAuth)
     */
    async verifyLoginFormElements() {
        console.log('Legacy verifyLoginFormElements called - OAuth does not use traditional forms');
        console.log('OAuth authentication is handled by Microsoft Azure AD');
        // Navigate to auth page to show OAuth login button
        await this.authSteps.navigateToAuth();
    }
    /**
     * Clear login form (not applicable to OAuth)
     */
    async clearLoginForm() {
        console.log('Legacy clearLoginForm called - OAuth does not use traditional forms');
        console.log('OAuth authentication state is managed by the browser and Azure AD');
    }
    /**
     * Test invalid credentials (not applicable to OAuth)
     */
    async testInvalidCredentials(username, password) {
        console.log('Legacy testInvalidCredentials called - OAuth handles authentication validation');
        console.log(`Note: Username (${username}) and password are ignored in OAuth flow`);
        console.log('Invalid credentials are handled by Microsoft Azure AD during OAuth flow');
    }
}
exports.LoginSteps = LoginSteps;
//# sourceMappingURL=LoginSteps.js.map