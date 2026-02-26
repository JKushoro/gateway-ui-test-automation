"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const EnvManager_1 = require("../config/EnvManager");
test_1.test.only('🔍 Debug - just load contact page', async ({ page }) => {
    const baseUrl = EnvManager_1.envManager.getBaseUrl();
    const testId = `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    try {
        console.log(`[${testId}] Starting navigation to ${baseUrl}/contact`);
        await page.goto(`${baseUrl}/contact`, { waitUntil: 'domcontentloaded' });
        console.log(`[${testId}] Page loaded successfully`);
    }
    catch (err) {
        console.error(`[${testId}] Failed to load page:`, err);
    }
});
(0, test_1.test)('Minimal browser launch test', async ({ page }) => {
    const baseUrl = EnvManager_1.envManager.getBaseUrl();
    console.log('Using base URL:', baseUrl);
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await page.screenshot({ path: 'test-results/launch-check.png' });
    console.log('Page loaded and screenshot taken');
});
(0, test_1.test)('Log browser info - environment details', async ({ page }, testInfo) => {
    const baseUrl = EnvManager_1.envManager.getBaseUrl();
    const environment = EnvManager_1.envManager.getCurrentEnvironment();
    console.log(`Running test on: ${testInfo.project.name}`);
    console.log(`Environment: ${environment}`);
    console.log(`Base URL: ${baseUrl}`);
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
});
