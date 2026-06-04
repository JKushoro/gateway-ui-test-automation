import { test, Browser } from '@playwright/test';
import { TestIsolationApiClient } from '@framework/utils/TestIsolationApiClient';
import BaseTest from './TestUtils';
import { ActionHelper } from '@framework/helpers/ActionHelper';

/**
 * Common setup and teardown utilities for isolated KYC form tests
 * This eliminates the duplicated code patterns across isolated test files
 */

export interface IsolatedTestSetup {
  clientId: string;
  clientEmail: string;
  api: TestIsolationApiClient;
}

/**
 * Sets up test isolation API client and creates a test client
 * Use this in test.beforeAll() hooks
 */
export async function setupIsolatedTestClient(): Promise<IsolatedTestSetup> {
  const api = new TestIsolationApiClient('qa');
  const clientEmail = `testuser${Date.now()}@example.com`;

  const response = await api.api.createClient({
    forename: 'Pipeline',
    surname: 'Automation',
    emailAddress: clientEmail,
    migrated: true,
  });

  return {
    clientId: response.id,
    clientEmail,
    api,
  };
}

/**
 * Cleans up the test client
 * Use this in test.afterAll() hooks
 */
export async function cleanupIsolatedTestClient(setup: IsolatedTestSetup): Promise<void> {
  if (setup.clientId && setup.api) {
    await setup.api.cleanupClient(setup.clientId);
  }
}

/**
 * Common test setup that creates BaseTest instance and navigates to the specified KYC page
 * @param browser - Playwright browser instance
 * @param pageName - Name of the KYC page to navigate to (e.g., 'Income', 'Property & Assets')
 * @returns Object containing testBase, kycPage, and actionHelper
 */
export async function setupKycPageTest(browser: Browser, pageName: string) {
  const testBase = await BaseTest.create(browser, 'qa');

  await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
    testBase.sideNav,
    testBase.navBar
  );

  const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');

  // Navigate to the specified page
  const actionHelper = new ActionHelper(kycPage);
  await actionHelper.selectCustomRadioOptionByLabel(pageName);

  return { testBase, kycPage, actionHelper };
}

/**
 * Common test cleanup
 * @param testBase - BaseTest instance to cleanup
 * @param kycPage - KYC page to close
 */
export async function cleanupKycPageTest(testBase: BaseTest, kycPage: any): Promise<void> {
  await kycPage.close();
  await testBase.cleanup();
}

/**
 * Common test configuration for isolated tests
 * Use this to wrap your test.describe() calls
 */
export function configureIsolatedTest(testName: string, testCallback: () => void): void {
  test.describe(testName, () => {
    test.use({ storageState: 'playwright/.auth/user.json' });
    testCallback();
  });
}
