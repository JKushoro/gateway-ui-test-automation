"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// projects/gateway-ui/tests/regression/login_validation.spec.ts
const test_1 = require("@playwright/test");
const TestUtils_1 = require("../shared/TestUtils");
const LoginValidationSteps_1 = require("@steps/gateway/LoginValidationSteps");
const DataStore_1 = require("@framework/utils/DataStore");
test_1.test.describe('Login Tests', () => {
    test_1.test.beforeEach(async () => {
        (0, DataStore_1.clearWorkerDataStore)();
    });
    /* -------------------- UI Validation Tests -------------------- */
    (0, test_1.test)('Verify login page loads and redirects to Microsoft', async ({ browser }) => {
        const setup = await TestUtils_1.IsolatedTestFactory.create(browser, 'qa');
        const loginTestSteps = new LoginValidationSteps_1.LoginValidationSteps(setup.page);
        await loginTestSteps.verifyRedirectToMicrosoftLogin();
        await setup.cleanup();
    });
    (0, test_1.test)('Verify login form focus and accessibility', async ({ browser }) => {
        const setup = await TestUtils_1.IsolatedTestFactory.create(browser, 'qa');
        const loginTestSteps = new LoginValidationSteps_1.LoginValidationSteps(setup.page);
        await loginTestSteps.verifyLoginFormFocus();
        await setup.cleanup();
    });
    (0, test_1.test)('Verify login button is present and clickable', async ({ browser }) => {
        const setup = await TestUtils_1.IsolatedTestFactory.create(browser, 'qa');
        const loginTestSteps = new LoginValidationSteps_1.LoginValidationSteps(setup.page);
        await loginTestSteps.verifyLoginButtonPresent();
        await setup.cleanup();
    });
    (0, test_1.test)('Verify redirect to Microsoft login', async ({ browser }) => {
        const setup = await TestUtils_1.IsolatedTestFactory.create(browser, 'qa');
        const loginTestSteps = new LoginValidationSteps_1.LoginValidationSteps(setup.page);
        await loginTestSteps.verifyRedirectToMicrosoftLogin();
        await setup.cleanup();
    });
    /* -------------------- Negative Login Tests - Invalid Credentials -------------------- */
    (0, test_1.test)('Attempt login with invalid username', async ({ browser }) => {
        const setup = await TestUtils_1.IsolatedTestFactory.create(browser, 'qa');
        const loginTestSteps = new LoginValidationSteps_1.LoginValidationSteps(setup.page);
        await loginTestSteps.attemptLoginWithInvalidUsername();
        await setup.cleanup();
    });
    (0, test_1.test)('Attempt login with invalid password', async ({ browser }) => {
        const setup = await TestUtils_1.IsolatedTestFactory.create(browser, 'qa');
        const loginTestSteps = new LoginValidationSteps_1.LoginValidationSteps(setup.page);
        await loginTestSteps.attemptLoginWithInvalidPassword();
        await setup.cleanup();
    });
    /* -------------------- Negative Login Tests - Empty Fields -------------------- */
    (0, test_1.test)('Attempt login with empty username', async ({ browser }) => {
        const setup = await TestUtils_1.IsolatedTestFactory.create(browser, 'qa');
        const loginTestSteps = new LoginValidationSteps_1.LoginValidationSteps(setup.page);
        await loginTestSteps.attemptLoginWithEmptyUsername();
        await setup.cleanup();
    });
    (0, test_1.test)('Attempt login with empty password', async ({ browser }) => {
        const setup = await TestUtils_1.IsolatedTestFactory.create(browser, 'qa');
        const loginTestSteps = new LoginValidationSteps_1.LoginValidationSteps(setup.page);
        await loginTestSteps.attemptLoginWithEmptyPassword();
        await setup.cleanup();
    });
    /* -------------------- Negative Login Tests - Malformed Input -------------------- */
    (0, test_1.test)('Attempt login with malformed email', async ({ browser }) => {
        const setup = await TestUtils_1.IsolatedTestFactory.create(browser, 'qa');
        const loginTestSteps = new LoginValidationSteps_1.LoginValidationSteps(setup.page);
        await loginTestSteps.attemptLoginWithMalformedEmail();
        await setup.cleanup();
    });
    /* -------------------- Security Tests -------------------- */
    (0, test_1.test)('Attempt login with SQL injection in username', async ({ browser }) => {
        const setup = await TestUtils_1.IsolatedTestFactory.create(browser, 'qa');
        const loginTestSteps = new LoginValidationSteps_1.LoginValidationSteps(setup.page);
        await loginTestSteps.attemptLoginWithSQLInjection();
        await setup.cleanup();
    });
    (0, test_1.test)('Attempt login with XSS payload in username', async ({ browser }) => {
        const setup = await TestUtils_1.IsolatedTestFactory.create(browser, 'qa');
        const loginTestSteps = new LoginValidationSteps_1.LoginValidationSteps(setup.page);
        await loginTestSteps.attemptLoginWithXSSPayload();
        await setup.cleanup();
    });
    /* -------------------- Edge Case Tests -------------------- */
    (0, test_1.test)('Attempt login with very long username', async ({ browser }) => {
        const setup = await TestUtils_1.IsolatedTestFactory.create(browser, 'qa');
        const loginTestSteps = new LoginValidationSteps_1.LoginValidationSteps(setup.page);
        await loginTestSteps.attemptLoginWithLongUsername();
        await setup.cleanup();
    });
    (0, test_1.test)('Attempt login with special characters in username', async ({ browser }) => {
        const setup = await TestUtils_1.IsolatedTestFactory.create(browser, 'qa');
        const loginTestSteps = new LoginValidationSteps_1.LoginValidationSteps(setup.page);
        await loginTestSteps.attemptLoginWithSpecialCharacters();
        await setup.cleanup();
    });
    (0, test_1.test)('Attempt login with whitespace only username', async ({ browser }) => {
        const setup = await TestUtils_1.IsolatedTestFactory.create(browser, 'qa');
        const loginTestSteps = new LoginValidationSteps_1.LoginValidationSteps(setup.page);
        await loginTestSteps.attemptLoginWithWhitespaceUsername();
        await setup.cleanup();
    });
    (0, test_1.test)('Attempt login with whitespace only password', async ({ browser }) => {
        const setup = await TestUtils_1.IsolatedTestFactory.create(browser, 'qa');
        const loginTestSteps = new LoginValidationSteps_1.LoginValidationSteps(setup.page);
        await loginTestSteps.attemptLoginWithWhitespacePassword();
        await setup.cleanup();
    });
    /* -------------------- Browser Behavior Tests -------------------- */
    (0, test_1.test)('Verify login form elements are properly focused', async ({ browser }) => {
        const setup = await TestUtils_1.IsolatedTestFactory.create(browser, 'qa');
        const loginTestSteps = new LoginValidationSteps_1.LoginValidationSteps(setup.page);
        await loginTestSteps.verifyLoginFormFocus();
        await setup.cleanup();
    });
    (0, test_1.test)('Verify login form handles browser back button', async ({ browser }) => {
        const setup = await TestUtils_1.IsolatedTestFactory.create(browser, 'qa');
        const loginTestSteps = new LoginValidationSteps_1.LoginValidationSteps(setup.page);
        await loginTestSteps.verifyBrowserBackButton();
        await setup.cleanup();
    });
});
//# sourceMappingURL=login_validation.spec.js.map