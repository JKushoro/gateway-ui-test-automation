"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationHelper = void 0;
const WaitHelper_1 = require("./WaitHelper");
const ActionHelper_1 = require("./ActionHelper");
/**
 * Enhanced AuthenticationHelper for handling OAuth authentication
 * Specifically designed to handle Microsoft OAuth flow for Fairstone Gateway
 */
class AuthenticationHelper {
    constructor(page) {
        this.page = page;
        this.waitHelper = new WaitHelper_1.WaitHelper(page);
        this.actionHelper = new ActionHelper_1.ActionHelper(page);
    }
    /**
     * Complete OAuth authentication flow with proper error handling
     */
    async authenticateWithOAuth(username = 'john.kushoro@fairstone.co.uk', password = 'Mugaji1967#') {
        console.log('Starting OAuth authentication flow...');
        try {
            // Step 1: Navigate to QA environment
            await this.navigateToAuthPage();
            // Step 2: Click OAuth login button
            await this.clickOAuthLoginButton();
            // Step 3: Handle Microsoft OAuth flow
            await this.handleMicrosoftOAuthFlow(username, password);
            // Step 4: Wait for dashboard redirect
            await this.waitForDashboardRedirect();
            console.log('OAuth authentication completed successfully');
        }
        catch (error) {
            console.error('OAuth authentication failed:', error);
            await this.takeErrorScreenshot();
            throw error;
        }
    }
    /**
     * Navigate to authentication page with proper error handling
     */
    async navigateToAuthPage() {
        console.log('Navigating to authentication page...');
        await this.page.goto('https://qa-fairstonegateway.fairstone.co.uk/', {
            waitUntil: 'domcontentloaded',
            timeout: 45000
        });
        // Wait for page to stabilize
        await this.page.waitForTimeout(2000);
        // Verify we're on the correct page
        const currentUrl = this.page.url();
        if (!currentUrl.includes('qa-fairstonegateway.fairstone.co.uk')) {
            throw new Error(`Failed to navigate to auth page. Current URL: ${currentUrl}`);
        }
        console.log('Successfully navigated to authentication page');
    }
    /**
     * Click OAuth login button with multiple fallback strategies
     */
    async clickOAuthLoginButton() {
        console.log('Locating and clicking OAuth login button...');
        const loginSelectors = [
            'a.btn.btn-success.btn-lg.btn-block.ladda-btn.ladda-button',
            'a[href*="login.microsoftonline.com"]',
            '.ladda-label:has-text("Login")',
            'a:has-text("Login")',
            'button:has-text("Login")',
            '[data-testid="login-button"]',
            '.btn:has-text("Login")'
        ];
        let loginButton = null;
        for (const selector of loginSelectors) {
            try {
                const candidate = this.page.locator(selector).first();
                if (await candidate.isVisible({ timeout: 3000 })) {
                    loginButton = candidate;
                    console.log(`Found login button with selector: ${selector}`);
                    break;
                }
            }
            catch (e) {
                console.log(`Selector failed: ${selector}`);
            }
        }
        if (!loginButton) {
            await this.page.screenshot({
                path: 'login-button-not-found.png',
                fullPage: true
            });
            throw new Error('Login button not found with any selector');
        }
        // Click the login button and wait for navigation
        const originalUrl = this.page.url();
        await loginButton.click();
        // Wait for URL to change
        await this.waitHelper.waitForUrlToChangeFrom(originalUrl, 30000);
        console.log('Login button clicked successfully');
    }
    /**
     * Handle Microsoft OAuth authentication flow
     */
    async handleMicrosoftOAuthFlow(username, password) {
        console.log('Handling Microsoft OAuth flow...');
        const currentUrl = this.page.url();
        if (currentUrl.includes('login.microsoftonline.com')) {
            console.log('Detected Microsoft OAuth page');
            // Wait for OAuth page to load
            await this.page.waitForLoadState('domcontentloaded');
            await this.page.waitForTimeout(2000);
            // Handle email input
            await this.handleEmailInput(username);
            // Handle password input
            await this.handlePasswordInput(password);
            // Handle additional OAuth steps (MFA, consent, etc.)
            await this.handleAdditionalOAuthSteps();
        }
        else if (currentUrl.includes('/dashboard/development/dash')) {
            console.log('Already redirected to dashboard - OAuth completed');
        }
        else if (currentUrl.includes('error')) {
            throw new Error(`OAuth failed - redirected to error page: ${currentUrl}`);
        }
        else {
            console.log(`Unexpected URL after login click: ${currentUrl}`);
            // Continue and see if we get redirected
            await this.page.waitForTimeout(5000);
        }
    }
    /**
     * Handle email input in Microsoft OAuth flow
     */
    async handleEmailInput(username) {
        const emailSelectors = [
            'input[type="email"]',
            'input[name="loginfmt"]',
            '#i0116',
            'input[placeholder*="email"]',
            'input[placeholder*="Email"]'
        ];
        let emailInput = null;
        for (const selector of emailSelectors) {
            try {
                const candidate = this.page.locator(selector);
                if (await candidate.isVisible({ timeout: 3000 })) {
                    emailInput = candidate;
                    console.log(`Found email input with selector: ${selector}`);
                    break;
                }
            }
            catch (e) {
                // Continue to next selector
            }
        }
        if (emailInput) {
            console.log('Entering email address...');
            await emailInput.fill(username);
            // Click Next button or press Enter
            const nextButton = this.page.locator('input[type="submit"], button:has-text("Next"), #idSIButton9');
            if (await nextButton.isVisible({ timeout: 2000 })) {
                await nextButton.click();
            }
            else {
                await this.page.keyboard.press('Enter');
            }
            // Wait for navigation to password page
            await this.page.waitForTimeout(3000);
        }
        else {
            console.log('No email input found - might be SSO or already authenticated');
        }
    }
    /**
     * Handle password input in Microsoft OAuth flow
     */
    async handlePasswordInput(password) {
        const passwordSelectors = [
            'input[type="password"]',
            'input[name="passwd"]',
            '#i0118',
            'input[placeholder*="password"]',
            'input[placeholder*="Password"]'
        ];
        let passwordInput = null;
        for (const selector of passwordSelectors) {
            try {
                const candidate = this.page.locator(selector);
                if (await candidate.isVisible({ timeout: 5000 })) {
                    passwordInput = candidate;
                    console.log(`Found password input with selector: ${selector}`);
                    break;
                }
            }
            catch (e) {
                // Continue to next selector
            }
        }
        if (passwordInput) {
            console.log('Entering password...');
            await passwordInput.fill(password);
            // Click Sign in button or press Enter
            const signInButton = this.page.locator('input[type="submit"], button:has-text("Sign in"), #idSIButton9');
            if (await signInButton.isVisible({ timeout: 2000 })) {
                await signInButton.click();
            }
            else {
                await this.page.keyboard.press('Enter');
            }
            // Wait for authentication to process
            await this.page.waitForTimeout(3000);
        }
        else {
            console.log('No password input found - might be SSO or already authenticated');
        }
    }
    /**
     * Handle additional OAuth steps like MFA, consent, etc.
     */
    async handleAdditionalOAuthSteps() {
        console.log('Checking for additional OAuth steps...');
        // Wait a bit for any additional pages to load
        await this.page.waitForTimeout(3000);
        const currentUrl = this.page.url();
        // Handle "Stay signed in?" prompt
        if (currentUrl.includes('login.microsoftonline.com') && await this.page.locator('text=Stay signed in?').isVisible({ timeout: 3000 })) {
            console.log('Handling "Stay signed in?" prompt...');
            const yesButton = this.page.locator('input[type="submit"]:has-text("Yes"), button:has-text("Yes"), #idSIButton9');
            if (await yesButton.isVisible({ timeout: 2000 })) {
                await yesButton.click();
                await this.page.waitForTimeout(2000);
            }
        }
        // Handle consent/permissions page
        if (currentUrl.includes('login.microsoftonline.com') && await this.page.locator('text=Permissions requested').isVisible({ timeout: 3000 })) {
            console.log('Handling permissions consent...');
            const acceptButton = this.page.locator('input[type="submit"]:has-text("Accept"), button:has-text("Accept")');
            if (await acceptButton.isVisible({ timeout: 2000 })) {
                await acceptButton.click();
                await this.page.waitForTimeout(2000);
            }
        }
        // Handle MFA if present (this would need to be customized based on your MFA setup)
        if (currentUrl.includes('login.microsoftonline.com') && await this.page.locator('text=Verify your identity').isVisible({ timeout: 3000 })) {
            console.log('MFA detected - this may require manual intervention');
            // For automated testing, you might want to skip MFA or use a test account without MFA
        }
    }
    /**
     * Wait for redirect to dashboard
     */
    async waitForDashboardRedirect() {
        console.log('Waiting for dashboard redirect...');
        try {
            await this.page.waitForURL((url) => url.toString().includes('/dashboard/development/dash'), { timeout: 60000 });
            console.log('Successfully redirected to dashboard');
            // Wait for dashboard to load
            await this.page.waitForLoadState('domcontentloaded');
            await this.page.waitForTimeout(2000);
            // Verify dashboard elements
            const dashboardTitle = this.page.locator('h5:has-text("Development Dashboard")');
            await dashboardTitle.waitFor({ state: 'visible', timeout: 10000 });
        }
        catch (error) {
            const currentUrl = this.page.url();
            console.error(`Dashboard redirect failed. Current URL: ${currentUrl}`);
            if (currentUrl.includes('error')) {
                throw new Error(`OAuth failed - redirected to error page: ${currentUrl}`);
            }
            else if (currentUrl.includes('login.microsoftonline.com')) {
                throw new Error('Still on Microsoft OAuth page - authentication may have failed');
            }
            else {
                throw new Error(`Unexpected URL after OAuth: ${currentUrl}`);
            }
        }
    }
    /**
     * Take error screenshot for debugging
     */
    async takeErrorScreenshot() {
        try {
            const timestamp = Date.now();
            await this.page.screenshot({
                path: `oauth-error-${timestamp}.png`,
                fullPage: true
            });
            console.log(`Error screenshot saved: oauth-error-${timestamp}.png`);
        }
        catch (e) {
            console.error('Failed to take error screenshot:', e);
        }
    }
    /**
     * Clear browser context for fresh authentication
     */
    async clearAuthenticationContext() {
        console.log('Clearing authentication context...');
        try {
            // Clear cookies
            await this.page.context().clearCookies();
            // Clear local and session storage
            await this.page.evaluate(() => {
                localStorage.clear();
                sessionStorage.clear();
            });
            console.log('Authentication context cleared');
        }
        catch (error) {
            console.error('Failed to clear authentication context:', error);
        }
    }
    /**
     * Check if user is currently authenticated
     */
    async isAuthenticated() {
        try {
            const currentUrl = this.page.url();
            if (currentUrl.includes('/dashboard/development/dash')) {
                // Check if dashboard elements are present
                const dashboardTitle = this.page.locator('h5:has-text("Development Dashboard")');
                return await dashboardTitle.isVisible({ timeout: 5000 });
            }
            return false;
        }
        catch {
            return false;
        }
    }
}
exports.AuthenticationHelper = AuthenticationHelper;
//# sourceMappingURL=AuthenticationHelper.js.map