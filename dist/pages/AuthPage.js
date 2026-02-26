"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthPage = void 0;
const BasePage_1 = require("../core/BasePage");
/**
 * AuthPage - Page Object Model for OAuth authentication
 * Handles Microsoft OAuth login flow that redirects to Development Dashboard
 */
class AuthPage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
    }
    // Locators
    get locators() {
        return {
            // Microsoft OAuth login button (from your HTML)
            microsoftLoginButton: this.locatorHelper.getLocator('a.btn.btn-success.btn-lg.btn-block.ladda-btn.ladda-button') ||
                this.locatorHelper.getLocator('a[href*="login.microsoftonline.com"]') ||
                this.locatorHelper.getButtonByText('Login'),
            // Loading states
            loadingSpinner: this.locatorHelper.getLocator('.ladda-spinner') ||
                this.locatorHelper.getLocator('.loading, .spinner'),
            // Fairstone branding elements to confirm we're on the right page
            fairstoneLogo: this.locatorHelper.getByText('Fairstone') ||
                this.locatorHelper.getLocator('img[alt*="Fairstone"]'),
            fairstoneGroup: this.locatorHelper.getByText('Fairstone Group ©2025'),
        };
    }
    /**
     * Navigate to the QA authentication page
     */
    async navigate() {
        await this.navigateToPath('/');
    }
    /**
     * Wait for authentication page to load
     */
    async waitForPageLoad() {
        await this.waitHelper.waitForElement(this.locators.microsoftLoginButton);
        await this.waitHelper.waitForElement(this.locators.fairstoneLogo);
    }
    /**
     * Check if we're on the authentication page
     */
    async isPageLoaded() {
        try {
            await this.waitForPageLoad();
            return true;
        }
        catch {
            return false;
        }
    }
    /**
     * Click the Microsoft OAuth login button
     */
    async clickLogin() {
        await this.actionHelper.clickLocator(this.locators.microsoftLoginButton);
    }
    /**
     * Wait for loading spinner to appear and disappear
     */
    async waitForLoadingToComplete() {
        try {
            // Wait for spinner to appear (optional)
            await this.waitHelper.waitForElement(this.locators.loadingSpinner, 2000);
            // Wait for spinner to disappear
            await this.waitHelper.waitForElementToBeHidden(this.locators.loadingSpinner);
        }
        catch {
            // Spinner might not appear, continue
        }
    }
    /**
     * Check if loading spinner is displayed
     */
    async isLoadingSpinnerDisplayed() {
        return await this.actionHelper.isVisible(this.locators.loadingSpinner.toString());
    }
    /**
     * Perform OAuth login and wait for redirect to dashboard
     */
    async performOAuthLogin() {
        await this.waitForPageLoad();
        const originalUrl = this.page.url();
        console.log(`🔗 Starting OAuth from URL: ${originalUrl}`);
        // Click login and handle potential redirects
        await this.clickLogin();
        await this.waitForLoadingToComplete();
        // Wait for URL to change (Microsoft OAuth redirect)
        console.log('⏳ Waiting for Microsoft OAuth redirect...');
        try {
            await this.waitHelper.waitForUrlToChangeFrom(originalUrl, 60000); // Increased timeout for OAuth
            console.log(`✅ URL changed to: ${this.page.url()}`);
            // If we're redirected to Microsoft login, we need to handle that
            const currentUrl = this.page.url();
            if (currentUrl.includes('login.microsoftonline.com')) {
                console.log('🔐 Detected Microsoft OAuth page, handling authentication...');
                await this.handleMicrosoftOAuth();
            }
            else if (currentUrl.includes('/dashboard/development/dash')) {
                console.log('✅ Already on dashboard - OAuth completed successfully');
            }
            else {
                console.log(`⚠️ Unexpected URL after OAuth: ${currentUrl}`);
            }
        }
        catch (error) {
            console.error('❌ OAuth redirect failed:', error);
            console.log(`Current URL: ${this.page.url()}`);
            throw error;
        }
    }
    /**
     * Handle Microsoft OAuth authentication flow
     */
    async handleMicrosoftOAuth() {
        // Wait for Microsoft OAuth page to load
        await this.page.waitForLoadState('domcontentloaded');
        // Check if we need to enter credentials or if SSO is available
        const currentUrl = this.page.url();
        console.log(`🔐 Microsoft OAuth URL: ${currentUrl}`);
        // Wait for either dashboard redirect or error page
        try {
            await this.page.waitForURL((url) => url.toString().includes('/dashboard/development/dash') ||
                url.toString().includes('error'), { timeout: 60000 });
            const finalUrl = this.page.url();
            if (finalUrl.includes('/dashboard/development/dash')) {
                console.log('✅ Microsoft OAuth completed successfully');
            }
            else if (finalUrl.includes('error')) {
                throw new Error(`OAuth failed - redirected to error page: ${finalUrl}`);
            }
        }
        catch (error) {
            console.error('❌ Microsoft OAuth handling failed:', error);
            throw error;
        }
    }
    /**
     * Get the current page URL
     */
    getCurrentUrl() {
        return this.page.url();
    }
    /**
     * Check if we're still on the auth page (login failed)
     */
    async isStillOnAuthPage() {
        const currentUrl = await this.getCurrentUrl();
        return !currentUrl.includes('/dashboard/development/dash');
    }
}
exports.AuthPage = AuthPage;
//# sourceMappingURL=AuthPage.js.map