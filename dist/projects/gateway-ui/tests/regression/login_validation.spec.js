"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// projects/gateway-ui/tests/regression/login_validation.spec.ts
const test_1 = require("@playwright/test");
const LoginSteps_1 = require("@steps/LoginSteps");
const DashboardSteps_1 = require("@steps/DashboardSteps");
const LoginValidationSteps_1 = require("@steps/LoginValidationSteps");
test_1.test.describe('Login Tests', () => {
    let page;
    let loginSteps;
    let loginTestSteps;
    let dashboardSteps;
    test_1.test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        loginSteps = new LoginSteps_1.LoginSteps(page);
        loginTestSteps = new LoginValidationSteps_1.LoginValidationSteps(page);
        dashboardSteps = new DashboardSteps_1.DashboardSteps(page);
    });
    /* -------------------- Positive Login Tests -------------------- */
    (0, test_1.test)('Login with valid credentials from environment (via LoginSteps)', async () => {
        await loginSteps.performValidLogin();
        await dashboardSteps.verifyDashboard();
    });
    (0, test_1.test)('Verify dashboard is accessible after login (via GatewaySetup)', async () => {
        await LoginSteps_1.LoginSteps.setupForEnvironment(page, 'qa');
        await dashboardSteps.verifyDashboard();
    });
    /* -------------------- UI Validation Tests -------------------- */
    (0, test_1.test)('Verify login button is present and clickable', async () => {
        await loginTestSteps.verifyLoginButtonPresent();
    });
    (0, test_1.test)('Verify redirect to Microsoft login', async () => {
        await loginTestSteps.verifyRedirectToMicrosoftLogin();
    });
    /* -------------------- Negative Login Tests - Invalid Credentials -------------------- */
    (0, test_1.test)('Attempt login with invalid username', async () => {
        await loginTestSteps.attemptLoginWithInvalidUsername();
    });
    (0, test_1.test)('Attempt login with invalid password', async () => {
        await loginTestSteps.attemptLoginWithInvalidPassword();
    });
    /* -------------------- Negative Login Tests - Empty Fields -------------------- */
    (0, test_1.test)('Attempt login with empty username', async () => {
        await loginTestSteps.attemptLoginWithEmptyUsername();
    });
    (0, test_1.test)('Attempt login with empty password', async () => {
        await loginTestSteps.attemptLoginWithEmptyPassword();
    });
    /* -------------------- Negative Login Tests - Malformed Input -------------------- */
    (0, test_1.test)('Attempt login with malformed email', async () => {
        await loginTestSteps.attemptLoginWithMalformedEmail();
    });
    /* -------------------- Security Tests -------------------- */
    (0, test_1.test)('Attempt login with SQL injection in username', async () => {
        await loginTestSteps.attemptLoginWithSQLInjection();
    });
    (0, test_1.test)('Attempt login with XSS payload in username', async () => {
        await loginTestSteps.attemptLoginWithXSSPayload();
    });
    /* -------------------- Edge Case Tests -------------------- */
    (0, test_1.test)('Attempt login with very long username', async () => {
        await loginTestSteps.attemptLoginWithLongUsername();
    });
    (0, test_1.test)('Attempt login with special characters in username', async () => {
        await loginTestSteps.attemptLoginWithSpecialCharacters();
    });
    (0, test_1.test)('Attempt login with whitespace only username', async () => {
        await loginTestSteps.attemptLoginWithWhitespaceUsername();
    });
    (0, test_1.test)('Attempt login with whitespace only password', async () => {
        await loginTestSteps.attemptLoginWithWhitespacePassword();
    });
    /* -------------------- Browser Behavior Tests -------------------- */
    (0, test_1.test)('Verify login form elements are properly focused', async () => {
        await loginTestSteps.verifyLoginFormFocus();
    });
    (0, test_1.test)('Verify login form handles browser back button', async () => {
        await loginTestSteps.verifyBrowserBackButton();
    });
    test_1.test.afterEach(async () => {
        await page?.close();
    });
});
//# sourceMappingURL=login_validation.spec.js.map