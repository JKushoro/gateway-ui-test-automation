// projects/gateway-ui/tests/regression/login_validation.spec.ts
import { test, Page } from '@playwright/test';
import { GatewaySetup } from '@setup/GatewaySetup';
import { LoginSteps } from '@steps/LoginSteps';
import { DashboardSteps } from '@steps/DashboardSteps';

test.describe('Login Tests', () => {
  let page: Page;
  let loginSteps: LoginSteps;
  let dashboardSteps: DashboardSteps;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    
    // Initialize services once - eliminates duplication
    loginSteps = new LoginSteps(page);
    dashboardSteps = new DashboardSteps(page);
  });

  // Positive Login Tests
  test('Login with valid credentials from environment', async () => {
    await GatewaySetup.setupForEnvironment(page, 'qa');
  });

  test('Verify dashboard is accessible after login', async () => {
    await GatewaySetup.setupForEnvironment(page, 'qa');
    await dashboardSteps.verifyDashboard();
  });

  test('Perform valid login using environment credentials', async () => {
    await loginSteps.performValidLogin();
  });

  // UI Validation Tests
  test('Verify login button is present and clickable', async () => {
    await loginSteps.verifyLoginButtonPresent();
  });

  test('Verify redirect to Microsoft login', async () => {
    await loginSteps.verifyRedirectToMicrosoftLogin();
  });

  // Negative Login Tests - Invalid Credentials
  test('Attempt login with invalid username', async () => {
    await loginSteps.attemptLoginWithInvalidUsername();
  });

  test('Attempt login with invalid password', async () => {
    await loginSteps.attemptLoginWithInvalidPassword();
  });

  // Negative Login Tests - Empty Fields
  test('Attempt login with empty username', async () => {
    await loginSteps.attemptLoginWithEmptyUsername();
  });

  test('Attempt login with empty password', async () => {
    await loginSteps.attemptLoginWithEmptyPassword();
  });

  // Negative Login Tests - Malformed Input
  test('Attempt login with malformed email', async () => {
    await loginSteps.attemptLoginWithMalformedEmail();
  });

  // Security Tests
  test('Attempt login with SQL injection in username', async () => {
    await loginSteps.attemptLoginWithSQLInjection();
  });

  test('Attempt login with XSS payload in username', async () => {
    await loginSteps.attemptLoginWithXSSPayload();
  });

  // Edge Case Tests
  test('Attempt login with very long username', async () => {
    await loginSteps.attemptLoginWithLongUsername();
  });

  test('Attempt login with special characters in username', async () => {
    await loginSteps.attemptLoginWithSpecialCharacters();
  });

  test('Attempt login with whitespace only username', async () => {
    await loginSteps.attemptLoginWithWhitespaceUsername();
  });

  test('Attempt login with whitespace only password', async () => {
    await loginSteps.attemptLoginWithWhitespacePassword();
  });

  // Browser Behavior Tests
  test('Verify login form elements are properly focused', async () => {
    await loginSteps.verifyLoginFormFocus();
  });

  test('Verify login form handles browser back button', async () => {
    await loginSteps.verifyBrowserBackButton();
  });

  test.afterEach(async () => {
    await page?.close();
  });
});