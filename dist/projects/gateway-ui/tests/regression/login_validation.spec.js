"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// projects/gateway-ui/tests/regression/login_validation.spec.ts
const test_1 = require("@playwright/test");
const GatewaySetup_1 = require("@setup/GatewaySetup");
const LoginSteps_1 = require("@steps/LoginSteps");
const DashboardSteps_1 = require("@steps/DashboardSteps");
test_1.test.describe('Login Tests', () => {
    let page;
    let loginSteps;
    let dashboardSteps;
    test_1.test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        // Initialize services once - eliminates duplication
        loginSteps = new LoginSteps_1.LoginSteps(page);
        dashboardSteps = new DashboardSteps_1.DashboardSteps(page);
    });
    // Positive Login Tests
    (0, test_1.test)('Login with valid credentials from environment', async () => {
        await GatewaySetup_1.GatewaySetup.setupForEnvironment(page, 'qa');
    });
    (0, test_1.test)('Verify dashboard is accessible after login', async () => {
        await GatewaySetup_1.GatewaySetup.setupForEnvironment(page, 'qa');
        await dashboardSteps.verifyDashboard();
    });
    (0, test_1.test)('Perform valid login using environment credentials', async () => {
        await loginSteps.performValidLogin();
    });
    // UI Validation Tests
    (0, test_1.test)('Verify login button is present and clickable', async () => {
        await loginSteps.verifyLoginButtonPresent();
    });
    (0, test_1.test)('Verify redirect to Microsoft login', async () => {
        await loginSteps.verifyRedirectToMicrosoftLogin();
    });
    // Negative Login Tests - Invalid Credentials
    (0, test_1.test)('Attempt login with invalid username', async () => {
        await loginSteps.attemptLoginWithInvalidUsername();
    });
    (0, test_1.test)('Attempt login with invalid password', async () => {
        await loginSteps.attemptLoginWithInvalidPassword();
    });
    // Negative Login Tests - Empty Fields
    (0, test_1.test)('Attempt login with empty username', async () => {
        await loginSteps.attemptLoginWithEmptyUsername();
    });
    (0, test_1.test)('Attempt login with empty password', async () => {
        await loginSteps.attemptLoginWithEmptyPassword();
    });
    // Negative Login Tests - Malformed Input
    (0, test_1.test)('Attempt login with malformed email', async () => {
        await loginSteps.attemptLoginWithMalformedEmail();
    });
    // Security Tests
    (0, test_1.test)('Attempt login with SQL injection in username', async () => {
        await loginSteps.attemptLoginWithSQLInjection();
    });
    (0, test_1.test)('Attempt login with XSS payload in username', async () => {
        await loginSteps.attemptLoginWithXSSPayload();
    });
    // Edge Case Tests
    (0, test_1.test)('Attempt login with very long username', async () => {
        await loginSteps.attemptLoginWithLongUsername();
    });
    (0, test_1.test)('Attempt login with special characters in username', async () => {
        await loginSteps.attemptLoginWithSpecialCharacters();
    });
    (0, test_1.test)('Attempt login with whitespace only username', async () => {
        await loginSteps.attemptLoginWithWhitespaceUsername();
    });
    (0, test_1.test)('Attempt login with whitespace only password', async () => {
        await loginSteps.attemptLoginWithWhitespacePassword();
    });
    // Browser Behavior Tests
    (0, test_1.test)('Verify login form elements are properly focused', async () => {
        await loginSteps.verifyLoginFormFocus();
    });
    (0, test_1.test)('Verify login form handles browser back button', async () => {
        await loginSteps.verifyBrowserBackButton();
    });
    test_1.test.afterEach(async () => {
        await page?.close();
    });
});
//# sourceMappingURL=login_validation.spec.js.map