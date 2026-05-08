// projects/gateway-ui/tests/regression/login_validation.spec.ts
import { test } from '@playwright/test';
import { IsolatedTestFactory } from '../shared/TestUtils';
import { LoginValidationSteps } from '@steps/gateway/LoginValidationSteps';
import { clearWorkerDataStore } from '@framework/utils/DataStore';

test.describe('Login Tests', () => {
  test.beforeEach(async () => {
    clearWorkerDataStore();
  });

  /* -------------------- UI Validation Tests -------------------- */

  test('Verify login page loads and redirects to Microsoft', async ({ browser }) => {
    const setup = await IsolatedTestFactory.create(browser, 'qa');
    const loginTestSteps = new LoginValidationSteps(setup.page);

    await loginTestSteps.verifyRedirectToMicrosoftLogin();
    await setup.cleanup();
  });

  test('Verify login form focus and accessibility', async ({ browser }) => {
    const setup = await IsolatedTestFactory.create(browser, 'qa');
    const loginTestSteps = new LoginValidationSteps(setup.page);

    await loginTestSteps.verifyLoginFormFocus();
    await setup.cleanup();
  });

  test('Verify login button is present and clickable', async ({ browser }) => {
    const setup = await IsolatedTestFactory.create(browser, 'qa');
    const loginTestSteps = new LoginValidationSteps(setup.page);

    await loginTestSteps.verifyLoginButtonPresent();
    await setup.cleanup();
  });

  test('Verify redirect to Microsoft login', async ({ browser }) => {
    const setup = await IsolatedTestFactory.create(browser, 'qa');
    const loginTestSteps = new LoginValidationSteps(setup.page);

    await loginTestSteps.verifyRedirectToMicrosoftLogin();
    await setup.cleanup();
  });

  /* -------------------- Negative Login Tests - Invalid Credentials -------------------- */

  test('Attempt login with invalid username', async ({ browser }) => {
    const setup = await IsolatedTestFactory.create(browser, 'qa');
    const loginTestSteps = new LoginValidationSteps(setup.page);

    await loginTestSteps.attemptLoginWithInvalidUsername();
    await setup.cleanup();
  });

  test('Attempt login with invalid password', async ({ browser }) => {
    const setup = await IsolatedTestFactory.create(browser, 'qa');
    const loginTestSteps = new LoginValidationSteps(setup.page);

    await loginTestSteps.attemptLoginWithInvalidPassword();
    await setup.cleanup();
  });

  /* -------------------- Negative Login Tests - Empty Fields -------------------- */

  test('Attempt login with empty username', async ({ browser }) => {
    const setup = await IsolatedTestFactory.create(browser, 'qa');
    const loginTestSteps = new LoginValidationSteps(setup.page);

    await loginTestSteps.attemptLoginWithEmptyUsername();
    await setup.cleanup();
  });

  test('Attempt login with empty password', async ({ browser }) => {
    const setup = await IsolatedTestFactory.create(browser, 'qa');
    const loginTestSteps = new LoginValidationSteps(setup.page);

    await loginTestSteps.attemptLoginWithEmptyPassword();
    await setup.cleanup();
  });

  /* -------------------- Negative Login Tests - Malformed Input -------------------- */

  test('Attempt login with malformed email', async ({ browser }) => {
    const setup = await IsolatedTestFactory.create(browser, 'qa');
    const loginTestSteps = new LoginValidationSteps(setup.page);

    await loginTestSteps.attemptLoginWithMalformedEmail();
    await setup.cleanup();
  });

  /* -------------------- Security Tests -------------------- */

  test('Attempt login with SQL injection in username', async ({ browser }) => {
    const setup = await IsolatedTestFactory.create(browser, 'qa');
    const loginTestSteps = new LoginValidationSteps(setup.page);

    await loginTestSteps.attemptLoginWithSQLInjection();
    await setup.cleanup();
  });

  test('Attempt login with XSS payload in username', async ({ browser }) => {
    const setup = await IsolatedTestFactory.create(browser, 'qa');
    const loginTestSteps = new LoginValidationSteps(setup.page);

    await loginTestSteps.attemptLoginWithXSSPayload();
    await setup.cleanup();
  });

  /* -------------------- Edge Case Tests -------------------- */

  test('Attempt login with very long username', async ({ browser }) => {
    const setup = await IsolatedTestFactory.create(browser, 'qa');
    const loginTestSteps = new LoginValidationSteps(setup.page);

    await loginTestSteps.attemptLoginWithLongUsername();
    await setup.cleanup();
  });

  test('Attempt login with special characters in username', async ({ browser }) => {
    const setup = await IsolatedTestFactory.create(browser, 'qa');
    const loginTestSteps = new LoginValidationSteps(setup.page);

    await loginTestSteps.attemptLoginWithSpecialCharacters();
    await setup.cleanup();
  });

  test('Attempt login with whitespace only username', async ({ browser }) => {
    const setup = await IsolatedTestFactory.create(browser, 'qa');
    const loginTestSteps = new LoginValidationSteps(setup.page);

    await loginTestSteps.attemptLoginWithWhitespaceUsername();
    await setup.cleanup();
  });

  test('Attempt login with whitespace only password', async ({ browser }) => {
    const setup = await IsolatedTestFactory.create(browser, 'qa');
    const loginTestSteps = new LoginValidationSteps(setup.page);

    await loginTestSteps.attemptLoginWithWhitespacePassword();
    await setup.cleanup();
  });

  /* -------------------- Browser Behavior Tests -------------------- */

  test('Verify login form elements are properly focused', async ({ browser }) => {
    const setup = await IsolatedTestFactory.create(browser, 'qa');
    const loginTestSteps = new LoginValidationSteps(setup.page);

    await loginTestSteps.verifyLoginFormFocus();
    await setup.cleanup();
  });

  test('Verify login form handles browser back button', async ({ browser }) => {
    const setup = await IsolatedTestFactory.create(browser, 'qa');
    const loginTestSteps = new LoginValidationSteps(setup.page);

    await loginTestSteps.verifyBrowserBackButton();
    await setup.cleanup();
  });
});
