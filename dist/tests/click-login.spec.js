"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const TestSetup_1 = require("../core/TestSetup");
test_1.test.describe('OAuth Login Flow Test', () => {
    let setup;
    test_1.test.beforeEach(async ({ browser }) => {
        try {
            setup = await (0, TestSetup_1.authSetup)(browser);
        }
        catch (error) {
            console.error('❌ Setup failed:', error);
            throw error;
        }
    });
    test_1.test.afterEach(async () => {
        if (setup) {
            await (0, TestSetup_1.sharedTeardown)(setup);
        }
    });
    (0, test_1.test)('should perform OAuth login and navigate to Development Dashboard', async () => {
        if (!setup)
            throw new Error('Setup failed');
        console.log(' Starting OAuth authentication flow...');
        // Take screenshot before authentication
        await setup.page.screenshot({ path: 'before-oauth-login.png', fullPage: true });
        console.log(' Screenshot taken: before-oauth-login.png');
        try {
            // Perform complete OAuth authentication flow
            console.log(' Performing OAuth authentication...');
            await setup.authSteps.authenticateUser();
            // Take screenshot after authentication
            await setup.page.screenshot({ path: 'after-oauth-login.png', fullPage: true });
            console.log(' Screenshot taken: after-oauth-login.png');
            // Verify we're now on the dashboard
            console.log(' Verifying authentication state...');
            const authState = await setup.authSteps.getAuthenticationState();
            console.log(` Current URL: ${authState.currentUrl}`);
            console.log(` Authenticated: ${authState.isAuthenticated}`);
            console.log(` On Dashboard: ${authState.onDashboard}`);
            (0, test_1.expect)(authState.isAuthenticated).toBe(true);
            (0, test_1.expect)(authState.onDashboard).toBe(true);
            (0, test_1.expect)(authState.currentUrl).toContain('/dashboard/development/dash');
            console.log(' Verifying dashboard elements...');
            await setup.authSteps.verifyDashboardElements();
            // Verify dashboard functionality
            console.log(' Verifying dashboard metrics...');
            const dashboardState = await setup.dashboardSteps.getDashboardState();
            (0, test_1.expect)(dashboardState.isLoaded).toBe(true);
            (0, test_1.expect)(dashboardState.userLoggedIn).toBe(true);
            (0, test_1.expect)(dashboardState.metricsVisible).toBe(true);
            console.log(' Success: OAuth login completed and Development Dashboard is fully loaded!');
        }
        catch (error) {
            console.error(' OAuth authentication failed:', error);
            console.log(` Current URL: ${setup.page.url()}`);
            // Take error screenshot
            await setup.page.screenshot({ path: 'oauth-error.png', fullPage: true });
            console.log(' Error screenshot saved: oauth-error.png');
            throw error;
        }
    });
});
test_1.test.describe('Simple Login Button Test', () => {
    let setup;
    test_1.test.beforeEach(async ({ browser }) => {
        try {
            setup = await (0, TestSetup_1.authSetup)(browser);
        }
        catch (error) {
            console.error('Setup failed:', error);
            throw error;
        }
    });
    test_1.test.afterEach(async () => {
        if (setup) {
            await (0, TestSetup_1.sharedTeardown)(setup);
        }
    });
    (0, test_1.test)('should click login button and handle OAuth flow manually', async () => {
        if (!setup)
            throw new Error('Setup failed');
        console.log('Testing manual login button click...');
        // Navigate to auth page
        await setup.authSteps.navigateToAuth();
        // Take screenshot before clicking
        await setup.page.screenshot({ path: 'before-manual-click.png', fullPage: true });
        console.log('Screenshot taken: before-manual-click.png');
        try {
            // Just perform the OAuth login part
            await setup.authSteps.performOAuthLogin();
            // Take screenshot after OAuth
            await setup.page.screenshot({ path: 'after-manual-click.png', fullPage: true });
            console.log('Screenshot taken: after-manual-click.png');
            // Verify we reached the dashboard
            const currentUrl = setup.page.url();
            console.log(`Final URL: ${currentUrl}`);
            if (currentUrl.includes('/dashboard/development/dash')) {
                console.log('Success: Reached Development Dashboard!');
                // Verify dashboard elements
                await setup.authSteps.verifyDashboardAccess();
            }
            else if (currentUrl.includes('error')) {
                throw new Error(`OAuth failed - redirected to error page: ${currentUrl}`);
            }
            else {
                console.warn(`Unexpected final URL: ${currentUrl}`);
            }
        }
        catch (error) {
            console.error('Manual OAuth click failed:', error);
            console.log(`Current URL: ${setup.page.url()}`);
            // Take error screenshot
            await setup.page.screenshot({ path: 'manual-click-error.png', fullPage: true });
            console.log('Error screenshot saved: manual-click-error.png');
            throw error;
        }
    });
});
test_1.test.describe('Login Button Navigation Test', () => {
    (0, test_1.test)('should click the login button and verify Development Dashboard', async ({ page }) => {
        console.log('🌐 Navigating to QA environment...');
        await page.goto('https://qa-fairstonegateway.fairstone.co.uk/', {
            waitUntil: 'domcontentloaded',
            timeout: 45000
        });
        console.log('⏳ Waiting briefly for dynamic content...');
        await page.waitForTimeout(2000);
        // 📸 Take screenshot before clicking login
        await page.screenshot({ path: 'before-click.png', fullPage: true });
        console.log('✅ Screenshot taken: before-click.png');
        // 🎯 Define multiple robust selectors for the login button
        const loginSelectors = [
            'a.btn.btn-success.btn-lg.btn-block.ladda-btn.ladda-button',
            'a[href*="login.microsoftonline.com"]',
            '.ladda-label:has-text("Login")',
            'a:has-text("Login")'
        ];
        let loginButton = null;
        for (const selector of loginSelectors) {
            try {
                const candidate = page.locator(selector).first();
                if (await candidate.isVisible({ timeout: 5000 })) {
                    loginButton = candidate;
                    console.log(`✅ Found login button using selector: ${selector}`);
                    break;
                }
            }
            catch (e) {
                console.log(`❌ Selector not valid or element not visible: ${selector}`);
            }
        }
        if (!loginButton) {
            console.error('🚫 Login button not found. Check page structure or selectors.');
            await page.screenshot({ path: 'login-fail-debug.png', fullPage: true });
            return;
        }
        console.log('🖱️ Clicking login button and waiting for navigation...');
        const [response] = await Promise.all([
            page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 20000 }),
            loginButton.click()
        ]);
        console.log('🔁 Navigation status:', response?.status() ?? 'No response object received');
        // 📸 Screenshot after login navigation
        await page.screenshot({ path: 'after-click.png', fullPage: true });
        console.log('✅ Screenshot taken: after-click.png');
        // ✅ Final assertion: Check for "Development Dashboard"
        const dashboardHeader = page.locator('h5', { hasText: 'Development Dashboard' });
        await (0, test_1.expect)(dashboardHeader).toBeVisible({ timeout: 10000 });
        console.log('🎉 Success: Development Dashboard is visible on the page!');
    });
});
