"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationHelper = void 0;
const ActionHelper_1 = require("./ActionHelper");
const WaitHelper_1 = require("./WaitHelper");
/**
 * Simplified Authentication Helper
 * Contains only essential authentication methods for your project
 */
class AuthenticationHelper {
    constructor(page, config = {}) {
        this.page = page;
        this.actionHelper = new ActionHelper_1.ActionHelper(page, config);
        this.waitHelper = new WaitHelper_1.WaitHelper(page, config);
    }
    /**
     * Handle Microsoft OAuth flow (your main authentication method)
     */
    async authenticateWithMicrosoft(username, password) {
        // Wait for Microsoft login page
        await this.waitHelper.waitForVisible('input[type="email"]');
        // Enter email
        await this.actionHelper.fill('input[type="email"]', username);
        await this.actionHelper.clickButtonByText('Next');
        // Wait for password field
        await this.waitHelper.waitForVisible('input[type="password"]');
        // Enter password
        await this.actionHelper.fill('input[type="password"]', password);
        await this.actionHelper.clickButtonByText('Sign in');
        // Handle "Stay signed in?" prompt
        try {
            await this.waitHelper.waitForVisible('input[type="submit"][value="Yes"]', 5000);
            await this.actionHelper.click('input[type="submit"][value="Yes"]');
        }
        catch {
            // Prompt might not appear, continue
        }
        await this.waitForAuthenticationComplete();
    }
    /**
     * Check if user is authenticated
     */
    async isAuthenticated() {
        try {
            // Check URL for authenticated paths
            const currentUrl = this.page.url();
            return currentUrl.includes('/dashboard');
        }
        catch {
            return false;
        }
    }
    /**
     * Save authentication session
     */
    async saveAuthSession() {
        const storageState = await this.page.context().storageState();
        process.env.AUTH_SESSION = JSON.stringify(storageState);
    }
    /**
     * Load authentication session
     */
    async loadAuthSession() {
        try {
            const sessionData = process.env.AUTH_SESSION;
            if (sessionData) {
                const storageState = JSON.parse(sessionData);
                await this.page.context().addCookies(storageState.cookies);
                return true;
            }
        }
        catch (error) {
            console.warn('Failed to load auth session:', error);
        }
        return false;
    }
    /**
     * Wait for authentication to complete
     */
    async waitForAuthenticationComplete() {
        try {
            await this.waitHelper.waitForUrlToMatch('**/dashboard/**');
        }
        catch (error) {
            console.warn('Authentication completion detection failed:', error);
        }
    }
}
exports.AuthenticationHelper = AuthenticationHelper;
//# sourceMappingURL=AuthenticationHelper.js.map