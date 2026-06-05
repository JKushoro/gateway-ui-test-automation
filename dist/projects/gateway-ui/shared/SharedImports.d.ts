export { Page, Locator, expect, test } from '@playwright/test';
export { BasePage } from '@framework/core/BasePage';
export { AuthenticationService } from '@framework/services/AuthenticationService';
export { ActionHelper } from '@framework/helpers/ActionHelper';
export { AssertionHelper } from '@framework/helpers/AssertionHelper';
export { WaitHelper } from '@framework/helpers/WaitHelper';
export { LocatorHelper } from '@framework/helpers/LocatorHelper';
export { TextHelper } from '@framework/helpers/TextHelper';
export { TableHelper } from '@framework/helpers/TableHelper';
export { dataStore, DataStore } from '@framework/utils/DataStore';
export { TestDataGenerator } from '@framework/utils/TestDataGenerator';
export { FormDataHelper } from '@framework/utils/FormDataHelper';
export { KYCHelper } from '@framework/utils/KYCHelper';
export { QuestionHelper } from '@framework/utils/QuestionHelper';
export { createLogger, logger, ILogger } from '@framework/utils/Logger';
export { UI_SELECTORS, MESSAGES } from '@framework/constants/CommonConstants';
export type { FrameworkConfig } from '@framework/types';
export type { Environment } from '@framework/types/Environment';
export type { Address, Dependent, ThirdParty } from '@framework/types/KYCTypes';
export type { AuthConfig, AuthenticationOptions, AuthenticationResult } from '@framework/types/AuthTypes';
export { BaseKYCSteps } from '@steps/kyc/BaseKYCSteps';
export { PostcodeLookupService } from '@steps/components/PostcodeLookup';
export { KYCDatePickerService } from '@steps/components/KYCDatePickerService';
export { AlertService } from '@steps/components/AlertService';
export { NavBarService } from '@steps/components/NavBar';
export { SideNavService } from '@steps/components/SideNav';
export { getEnvironmentManager, EnvironmentManager } from '@framework/utils/EnvironmentManager';
import { Browser } from '@playwright/test';
import { GatewayManagementSteps } from '@steps/gateway/GatewayManagementSteps';
import type { Environment } from '@framework/types/Environment';
/**
 * Common test setup interface to eliminate duplicated code
 */
export interface TestSetup {
    page: import('@playwright/test').Page;
    factFindManagementSteps: GatewayManagementSteps;
    sideNav: import('@steps/components/SideNav').SideNavService;
    navBar: import('@steps/components/NavBar').NavBarService;
}
/**
 * Creates a standardized test setup to eliminate code duplication across test files
 * @param browser - Playwright browser instance
 * @param environment - Test environment (default: 'qa')
 * @returns Promise<TestSetup> - Configured test setup with common services
 */
export declare function createTestSetup(browser: Browser, environment?: Environment): Promise<TestSetup>;
export { LoginPage } from '@pages/auth/LoginPageLocators';
export { KYCDatePickerLocators } from '@pages/componentsLocator/KYCDatePickerLocators';
//# sourceMappingURL=SharedImports.d.ts.map