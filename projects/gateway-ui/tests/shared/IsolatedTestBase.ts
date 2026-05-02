import { test, Browser } from '@playwright/test';
import { TestIsolationApiClient } from '@framework/utils/TestIsolationApiClient';
import BaseTest from './TestUtils';
import { ActionHelper } from '@framework/helpers/ActionHelper';

/**
 * Base class for isolated KYC form tests that eliminates code duplication
 * Handles common setup patterns:
 * - Storage state configuration
 * - TestIsolationApiClient setup
 * - Client creation and cleanup
 * - Common test structure
 */
export abstract class IsolatedTestBase {
  protected static clientId: string;
  protected static clientEmail: string;
  protected static api: TestIsolationApiClient;

  /**
   * Sets up the test describe block with common configuration
   * @param testName - Name for the test describe block
   * @param testCallback - Callback containing the actual test implementation
   */
  static setupTest(testName: string, testCallback: () => void): void {
    test.describe(testName, () => {
      test.use({ storageState: 'playwright/.auth/user.json' });

      test.beforeAll(async () => {
        this.api = new TestIsolationApiClient('qa');
        this.clientEmail = `testuser${Date.now()}@example.com`;

        const response = await this.api.api.createClient({
          forename: 'Pipeline',
          surname: 'Automation',
          emailAddress: this.clientEmail,
          migrated: true,
        });

        this.clientId = response.id;
      });

      test.afterAll(async () => {
        if (this.clientId && this.api) {
          await this.api.cleanupClient(this.clientId);
        }
      });

      testCallback();
    });
  }

  /**
   * Common test setup that creates BaseTest instance and navigates to the specified KYC page
   * @param browser - Playwright browser instance
   * @param pageName - Name of the KYC page to navigate to (e.g., 'Income', 'Property & Assets')
   * @returns Object containing testBase, kycPage, and actionHelper
   */
  static async setupKycPageTest(browser: Browser, pageName: string) {
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
  static async cleanup(testBase: BaseTest, kycPage: any) {
    await kycPage.close();
    await testBase.cleanup();
  }
}