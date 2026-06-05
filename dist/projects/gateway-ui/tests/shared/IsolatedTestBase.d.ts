import { Browser } from '@playwright/test';
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
export declare abstract class IsolatedTestBase {
    protected static clientId: string;
    protected static clientEmail: string;
    protected static api: TestIsolationApiClient;
    /**
     * Sets up the test describe block with common configuration
     * @param testName - Name for the test describe block
     * @param testCallback - Callback containing the actual test implementation
     */
    static setupTest(testName: string, testCallback: () => void): void;
    /**
     * Common test setup that creates BaseTest instance and navigates to the specified KYC page
     * @param browser - Playwright browser instance
     * @param pageName - Name of the KYC page to navigate to (e.g., 'Income', 'Property & Assets')
     * @returns Object containing testBase, kycPage, and actionHelper
     */
    static setupKycPageTest(browser: Browser, pageName: string): Promise<{
        testBase: BaseTest;
        kycPage: import("playwright-core").Page;
        actionHelper: ActionHelper;
    }>;
    /**
     * Common test cleanup
     * @param testBase - BaseTest instance to cleanup
     * @param kycPage - KYC page to close
     */
    static cleanup(testBase: BaseTest, kycPage: any): Promise<void>;
}
//# sourceMappingURL=IsolatedTestBase.d.ts.map