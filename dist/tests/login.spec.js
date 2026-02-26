"use strict";
// import { test, expect } from '@playwright/test';
//
// test.describe('Click Login Button and Verify Navigation', () => {
//   test('should click the login button and land on Development Dashboard', async ({ page }) => {
//     console.log('Navigating to QA environment...');
//     await page.goto('https://qa-fairstonegateway.fairstone.co.uk/', {
//       waitUntil: 'domcontentloaded',
//       timeout: 45000
//     });
//
//     console.log('Waiting for page to load...');
//     await page.waitForTimeout(2000); // short wait to let dynamic UI render
//
//     // Optional: Screenshot before clicking
//     await page.screenshot({ path: 'before-click.png', fullPage: true });
//
//     // Multiple selectors for resilience
//     const loginSelectors = [
//       'a.btn.btn-success.btn-lg.btn-block.ladda-btn.ladda-button',
//       'a[href*="login.microsoftonline.com"]',
//       '.ladda-label:has-text("Login")',
//       'a:has-text("Login")'
//     ];
//
//     let loginButton = null;
//     for (const selector of loginSelectors) {
//       try {
//         const candidate = page.locator(selector).first();
//         if (await candidate.isVisible({ timeout: 5000 })) {
//           loginButton = candidate;
//           console.log(`✅ Found login button using selector: ${selector}`);
//           break;
//         }
//       } catch (e) {
//         console.log(`❌ Selector failed: ${selector}`);
//       }
//     }
//
//     if (!loginButton) {
//       console.error('🚫 Login button not found.');
//       await page.screenshot({ path: 'login-fail-debug.png', fullPage: true });
//       return;
//     }
//
//     console.log('🖱️ Clicking login button...');
//     await Promise.all([
//       page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 20000 }),
//       loginButton.click()
//     ]);
//
//     // Optional wait for dashboard page to stabilize
//     await page.waitForTimeout(3000);
//
//     // Screenshot after click
//     await page.screenshot({ path: 'after-click.png', fullPage: true });
//
//     // ✅ Final verification
//     const dashboardHeader = page.locator('h5', { hasText: 'Development Dashboard' });
//     await expect(dashboardHeader).toBeVisible({ timeout: 10000 });
//     console.log('✅ Navigation successful: Development Dashboard is visible.');
//   });
// });
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const AAD = {
    email: process.env.AAD_EMAIL,
    password: process.env.AAD_PASSWORD,
};
(0, test_1.test)('login and land on Development Dashboard', async ({ page, context }) => {
    // Start from a clean context so AAD cookies don’t leak between tests
    await context.clearCookies();
    await page.goto('https://qa-fairstonegateway.fairstone.co.uk/', { waitUntil: 'domcontentloaded' });
    // Click the app Login button (your existing selector logic is fine)
    await page.locator('a[href*="login.microsoftonline.com"]').first().click();
    // --- Handle Azure AD variations ---
    // Helper to safely check and click if visible
    const clickIfVisible = async (selector) => {
        const el = page.locator(selector).first();
        if (await el.isVisible({ timeout: 2000 }).catch(() => false)) {
            await el.click();
            return true;
        }
        return false;
    };
    // Sometimes you land on the account picker
    // Try clicking your account tile OR "Use another account"
    const accountPicker = page.locator('text=Pick an account');
    if (await accountPicker.isVisible({ timeout: 5000 }).catch(() => false)) {
        // Prefer clicking your known account tile if it’s present
        const myAccountTile = page.getByRole('button', { name: new RegExp(AAD.email, 'i') });
        if (await myAccountTile.isVisible({ timeout: 2000 }).catch(() => false)) {
            await myAccountTile.click();
        }
        else {
            await clickIfVisible('text=Use another account');
        }
    }
    // Email page (#i0116 + Next #idSIButton9)
    if (await page.locator('#i0116').isVisible({ timeout: 3000 }).catch(() => false)) {
        await page.fill('#i0116', AAD.email);
        await page.click('#idSIButton9');
    }
    // Password page (#i0118 + Sign in #idSIButton9)
    if (await page.locator('#i0118').isVisible({ timeout: 5000 }).catch(() => false)) {
        await page.fill('#i0118', AAD.password);
        await page.click('#idSIButton9');
    }
    // “Stay signed in?” prompt – choose Yes or No (both usually fine)
    // Yes -> #idSIButton9, No -> #idBtn_Back
    if (await page.locator('text=Stay signed in?').isVisible({ timeout: 4000 }).catch(() => false)) {
        await page.click('#idSIButton9'); // or '#idBtn_Back' if you prefer
    }
    // Wait to come back to app and assert
    await page.waitForURL(/qa-fairstonegateway\.fairstone\.co\.uk/i, { timeout: 30000 });
    await (0, test_1.expect)(page.locator('h5', { hasText: 'Development Dashboard' })).toBeVisible({ timeout: 15000 });
});
//# sourceMappingURL=login.spec.js.map