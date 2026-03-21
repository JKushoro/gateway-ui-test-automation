// projects/gateway-ui/tests/regression/login_validation.spec.ts
import { test } from '@playwright/test';
import { setupLoginValidationTest, setupTest } from '../shared/TestUtils';
import { LoginSteps } from '@steps/gateway/LoginSteps';
import { DashboardSteps } from '@steps/gateway/DashboardSteps';
import { LoginValidationSteps } from '@steps/gateway/LoginValidationSteps';
import { clearWorkerDataStore } from '@framework/utils/DataStore';

test.describe('Login Tests', () => {
  test.beforeEach(async () => {
    clearWorkerDataStore();
  });

  /* -------------------- Positive Login Tests -------------------- */

  test('Login with valid credentials from environment (via LoginSteps)', async ({ browser }) => {
    const setup = await setupTest(browser, 'qa');
    const loginSteps = new LoginSteps(setup.page);
    const dashboardSteps = new DashboardSteps(setup.page);

    await loginSteps.performValidLogin();
    await dashboardSteps.verifyDashboard();
    await setup.page.close();
  });

  test('Verify dashboard is accessible after login (via GatewaySetup)', async ({ browser }) => {
    const setup = await setupTest(browser, 'qa');
    const dashboardSteps = new DashboardSteps(setup.page);

    await dashboardSteps.verifyDashboard();
    await setup.page.close();
  });

  /* -------------------- UI Validation Tests -------------------- */

  test('Verify login button is present and clickable', async ({ browser }) => {
    const setup = await setupLoginValidationTest(browser, 'qa');
    const loginTestSteps = new LoginValidationSteps(setup.page);

    await loginTestSteps.verifyLoginButtonPresent();
    await setup.context.close();
  });

  test('Verify redirect to Microsoft login', async ({ browser }) => {
    const setup = await setupLoginValidationTest(browser, 'qa');
    const loginTestSteps = new LoginValidationSteps(setup.page);

    await loginTestSteps.verifyRedirectToMicrosoftLogin();
    await setup.context.close();
  });

  /* -------------------- Negative Login Tests - Invalid Credentials -------------------- */

  test('Attempt login with invalid username', async ({ browser }) => {
    const setup = await setupLoginValidationTest(browser, 'qa');
    const loginTestSteps = new LoginValidationSteps(setup.page);

    await loginTestSteps.attemptLoginWithInvalidUsername();
    await setup.context.close();
  });

  test('Attempt login with invalid password', async ({ browser }) => {
    const setup = await setupLoginValidationTest(browser, 'qa');
    const loginTestSteps = new LoginValidationSteps(setup.page);

    await loginTestSteps.attemptLoginWithInvalidPassword();
    await setup.context.close();
  });

  /* -------------------- Negative Login Tests - Empty Fields -------------------- */

  test('Attempt login with empty username', async ({ browser }) => {
    const setup = await setupLoginValidationTest(browser, 'qa');
    const loginTestSteps = new LoginValidationSteps(setup.page);

    await loginTestSteps.attemptLoginWithEmptyUsername();
    await setup.context.close();
  });

  test('Attempt login with empty password', async ({ browser }) => {
    const setup = await setupLoginValidationTest(browser, 'qa');
    const loginTestSteps = new LoginValidationSteps(setup.page);

    await loginTestSteps.attemptLoginWithEmptyPassword();
    await setup.context.close();
  });

  /* -------------------- Negative Login Tests - Malformed Input -------------------- */

  test('Attempt login with malformed email', async ({ browser }) => {
    const setup = await setupLoginValidationTest(browser, 'qa');
    const loginTestSteps = new LoginValidationSteps(setup.page);

    await loginTestSteps.attemptLoginWithMalformedEmail();
    await setup.context.close();
  });

  /* -------------------- Security Tests -------------------- */

  test('Attempt login with SQL injection in username', async ({ browser }) => {
    const setup = await setupLoginValidationTest(browser, 'qa');
    const loginTestSteps = new LoginValidationSteps(setup.page);

    await loginTestSteps.attemptLoginWithSQLInjection();
    await setup.context.close();
  });

  test('Attempt login with XSS payload in username', async ({ browser }) => {
    const setup = await setupLoginValidationTest(browser, 'qa');
    const loginTestSteps = new LoginValidationSteps(setup.page);

    await loginTestSteps.attemptLoginWithXSSPayload();
    await setup.context.close();
  });

  /* -------------------- Edge Case Tests -------------------- */

  test('Attempt login with very long username', async ({ browser }) => {
    const setup = await setupLoginValidationTest(browser, 'qa');
    const loginTestSteps = new LoginValidationSteps(setup.page);

    await loginTestSteps.attemptLoginWithLongUsername();
    await setup.context.close();
  });

  test('Attempt login with special characters in username', async ({ browser }) => {
    const setup = await setupLoginValidationTest(browser, 'qa');
    const loginTestSteps = new LoginValidationSteps(setup.page);

    await loginTestSteps.attemptLoginWithSpecialCharacters();
    await setup.context.close();
  });

  test('Attempt login with whitespace only username', async ({ browser }) => {
    const setup = await setupLoginValidationTest(browser, 'qa');
    const loginTestSteps = new LoginValidationSteps(setup.page);

    await loginTestSteps.attemptLoginWithWhitespaceUsername();
    await setup.context.close();
  });

  test('Attempt login with whitespace only password', async ({ browser }) => {
    const setup = await setupLoginValidationTest(browser, 'qa');
    const loginTestSteps = new LoginValidationSteps(setup.page);

    await loginTestSteps.attemptLoginWithWhitespacePassword();
    await setup.context.close();
  });

  /* -------------------- Browser Behavior Tests -------------------- */

  test('Verify login form elements are properly focused', async ({ browser }) => {
    const setup = await setupLoginValidationTest(browser, 'qa');
    const loginTestSteps = new LoginValidationSteps(setup.page);

    await loginTestSteps.verifyLoginFormFocus();
    await setup.context.close();
  });

  test('Verify login form handles browser back button', async ({ browser }) => {
    const setup = await setupLoginValidationTest(browser, 'qa');
    const loginTestSteps = new LoginValidationSteps(setup.page);

    await loginTestSteps.verifyBrowserBackButton();
    await setup.context.close();
  });
});