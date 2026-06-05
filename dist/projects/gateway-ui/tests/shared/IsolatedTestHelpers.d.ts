import { Browser } from '@playwright/test';
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
export declare function setupIsolatedTestClient(): Promise<IsolatedTestSetup>;
/**
 * Cleans up the test client
 * Use this in test.afterAll() hooks
 */
export declare function cleanupIsolatedTestClient(setup: IsolatedTestSetup): Promise<void>;
/**
 * Common test setup that creates BaseTest instance and navigates to the specified KYC page
 * @param browser - Playwright browser instance
 * @param pageName - Name of the KYC page to navigate to (e.g., 'Income', 'Property & Assets')
 * @returns Object containing testBase, kycPage, and actionHelper
 */
export declare function setupKycPageTest(browser: Browser, pageName: string): Promise<{
    testBase: BaseTest;
    kycPage: import("playwright-core").Page;
    actionHelper: ActionHelper;
}>;
/**
 * Common test cleanup
 * @param testBase - BaseTest instance to cleanup
 * @param kycPage - KYC page to close
 */
export declare function cleanupKycPageTest(testBase: BaseTest, kycPage: any): Promise<void>;
/**
 * Common test configuration for isolated tests
 * Use this to wrap your test.describe() calls
 */
export declare function configureIsolatedTest(testName: string, testCallback: () => void): void;
//# sourceMappingURL=IsolatedTestHelpers.d.ts.map