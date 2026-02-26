"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//projects/gateway-ui/utils/saveAuthSession.ts
const test_1 = require("@playwright/test");
const EnvManager_1 = require("@framework/config/EnvManager");
(async () => {
    try {
        console.log('Starting authentication session setup...');
        // Initialize environment manager
        const envManager = EnvManager_1.EnvManager.getInstance();
        const baseUrl = envManager.getBaseUrl();
        const timeout = envManager.getTimeout();
        const slowMo = envManager.getSlowMo();
        const headless = envManager.isHeadless();
        console.log(`Environment: ${envManager.getCurrentEnvironment()}`);
        console.log(`Base URL: ${baseUrl}`);
        const browser = await test_1.chromium.launch({
            headless: headless,
            slowMo: slowMo
        });
        const context = await browser.newContext({
            viewport: { width: 1280, height: 720 }
        });
        const page = await context.newPage();
        console.log('Navigating to application...');
        await page.goto(baseUrl, {
            waitUntil: 'domcontentloaded',
            timeout: timeout
        });
        console.log('Page loaded successfully');
        console.log('Page title:', await page.title());
        console.log('Current URL:', page.url());
        // Wait a bit for the page to fully render
        await page.waitForTimeout(3000);
        // Take a screenshot to see what's on the page
        await page.screenshot({ path: 'current-page.png', fullPage: true });
        console.log('Screenshot saved as current-page.png');
        // Look for login button with a more flexible approach
        console.log('Looking for login elements...');
        // Check if we're already on a login page or if there's a login button
        const pageContent = await page.content();
        console.log('Page contains "login":', pageContent.toLowerCase().includes('login'));
        console.log('Page contains "sign in":', pageContent.toLowerCase().includes('sign in'));
        // Try to find and click login button
        const loginButton = page.locator('a:has-text("Login"), button:has-text("Login"), [href*="login"], .btn-success');
        const buttonCount = await loginButton.count();
        console.log(`Found ${buttonCount} potential login elements`);
        if (buttonCount > 0) {
            console.log('Clicking login button...');
            await loginButton.first().click();
            await page.waitForTimeout(2000);
            console.log('URL after click:', page.url());
        }
        else {
            console.log('WARNING: No login button found. You may need to navigate manually.');
        }
        console.log('MANUAL STEP: Please complete the login process in the browser window.');
        console.log('   1. If not already there, navigate to the login page');
        console.log('   2. Enter your email and password');
        console.log('   3. Complete any MFA steps');
        console.log('   4. Wait until you reach the dashboard');
        console.log('   5. Then press any key in this terminal to continue...');
        // Wait for user input instead of using page.pause()
        process.stdin.setRawMode(true);
        process.stdin.resume();
        await new Promise(resolve => {
            process.stdin.once('data', () => {
                process.stdin.setRawMode(false);
                resolve(void 0);
            });
        });
        console.log('Saving authentication session...');
        await context.storageState({ path: 'storageState.json' });
        console.log('SUCCESS: Login session saved to storageState.json');
        await browser.close();
        console.log('Authentication setup completed successfully!');
    }
    catch (error) {
        console.error('ERROR: Error during authentication setup:', error instanceof Error ? error.message : String(error));
        process.exit(1);
    }
})();
//# sourceMappingURL=saveAuthSession.js.map