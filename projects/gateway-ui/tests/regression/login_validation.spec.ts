// projects/gateway-ui/tests/regression/login_validation.spec.ts
import { test, Page } from '@playwright/test';
import { LoginSteps } from '@steps/LoginSteps';
import { DashboardSteps } from '@steps/DashboardSteps';
import { LoginValidationSteps } from '@steps/LoginValidationSteps';

test.describe('Login Tests', () => {
  let page: Page;
  let loginSteps: LoginSteps;
  let loginTestSteps: LoginValidationSteps;
  let dashboardSteps: DashboardSteps;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();

    loginSteps = new LoginSteps(page);
    loginTestSteps = new LoginValidationSteps(page);
    dashboardSteps = new DashboardSteps(page);
  });

  /* -------------------- Positive Login Tests -------------------- */

  test('Login with valid credentials from environment (via LoginSteps)', async () => {
    await loginSteps.performValidLogin();
    await dashboardSteps.verifyDashboard();
  });

  test('Verify dashboard is accessible after login (via GatewaySetup)', async () => {
    await LoginSteps.setupForEnvironment(page, 'qa');
    await dashboardSteps.verifyDashboard();
  });

  /* -------------------- UI Validation Tests -------------------- */

  test('Verify login button is present and clickable', async () => {
    await loginTestSteps.verifyLoginButtonPresent();
  });

  test('Verify redirect to Microsoft login', async () => {
    await loginTestSteps.verifyRedirectToMicrosoftLogin();
  });

  /* -------------------- Negative Login Tests - Invalid Credentials -------------------- */

  test('Attempt login with invalid username', async () => {
    await loginTestSteps.attemptLoginWithInvalidUsername();
  });

  test('Attempt login with invalid password', async () => {
    await loginTestSteps.attemptLoginWithInvalidPassword();
  });

  /* -------------------- Negative Login Tests - Empty Fields -------------------- */

  test('Attempt login with empty username', async () => {
    await loginTestSteps.attemptLoginWithEmptyUsername();
  });

  test('Attempt login with empty password', async () => {
    await loginTestSteps.attemptLoginWithEmptyPassword();
  });

  /* -------------------- Negative Login Tests - Malformed Input -------------------- */

  test('Attempt login with malformed email', async () => {
    await loginTestSteps.attemptLoginWithMalformedEmail();
  });

  /* -------------------- Security Tests -------------------- */

  test('Attempt login with SQL injection in username', async () => {
    await loginTestSteps.attemptLoginWithSQLInjection();
  });

  test('Attempt login with XSS payload in username', async () => {
    await loginTestSteps.attemptLoginWithXSSPayload();
  });

  /* -------------------- Edge Case Tests -------------------- */

  test('Attempt login with very long username', async () => {
    await loginTestSteps.attemptLoginWithLongUsername();
  });

  test('Attempt login with special characters in username', async () => {
    await loginTestSteps.attemptLoginWithSpecialCharacters();
  });

  test('Attempt login with whitespace only username', async () => {
    await loginTestSteps.attemptLoginWithWhitespaceUsername();
  });

  test('Attempt login with whitespace only password', async () => {
    await loginTestSteps.attemptLoginWithWhitespacePassword();
  });

  /* -------------------- Browser Behavior Tests -------------------- */

  test('Verify login form elements are properly focused', async () => {
    await loginTestSteps.verifyLoginFormFocus();
  });

  test('Verify login form handles browser back button', async () => {
    await loginTestSteps.verifyBrowserBackButton();
  });

  test.afterEach(async () => {
    await page?.close();
  });
});