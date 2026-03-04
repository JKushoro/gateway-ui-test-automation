// projects/gateway-ui/shared/SharedImports.ts
// 🎯 SINGLE SOURCE OF TRUTH for all Gateway UI imports
// 📚 All step files should import from here to eliminate duplication
// 🔧 Following DRY principles and making code easier for junior developers

// ==========================================
// PLAYWRIGHT CORE IMPORTS
// ==========================================
export { Page, Locator, expect, test } from '@playwright/test';

// ==========================================
// FRAMEWORK CORE IMPORTS
// ==========================================
export { BasePage } from '@framework/core/BasePage';
export { AuthenticationService } from '@framework/services/AuthenticationService';

// Framework Helpers (most commonly used)
export { ActionHelper } from '@framework/helpers/ActionHelper';
export { AssertionHelper } from '@framework/helpers/AssertionHelper';
export { WaitHelper } from '@framework/helpers/WaitHelper';
export { LocatorHelper } from '@framework/helpers/LocatorHelper';
export { TextHelper } from '@framework/helpers/TextHelper';
export { TableHelper } from '@framework/helpers/TableHelper';

// Framework Utils (most commonly used)
export { dataStore, DataStore } from '@framework/utils/DataStore';
export { TestDataGenerator } from '@framework/utils/TestDataGenerator';
export { FormDataHelper } from '@framework/utils/FormDataHelper';
export { KYCHelper } from '@framework/utils/KYCHelper';
export { QuestionHelper } from '@framework/utils/QuestionHelper';
export { createLogger, logger, ILogger } from '@framework/utils/Logger';

// Framework Constants
export { UI_SELECTORS, MESSAGES } from '@framework/constants/CommonConstants';

// ==========================================
// FRAMEWORK TYPES
// ==========================================
export type { FrameworkConfig } from '@framework/types';
export type { Environment } from '@framework/types/Environment';
export type { Address, Dependent, ThirdParty } from '@framework/types/KYCTypes';
export type {
  AuthConfig,
  AuthenticationOptions,
  AuthenticationResult
} from '@framework/types/AuthTypes';

// ==========================================
// PROJECT-SPECIFIC BASE CLASSES
// ==========================================
export { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';

// ==========================================
// PROJECT-SPECIFIC SERVICES
// ==========================================
export { PostcodeLookupService } from '@steps/components/PostcodeLookup';
export { KYCDatePickerService } from '@steps/components/KYCDatePickerService';
export { AlertService } from '@steps/components/AlertService';
export { NavBarService } from '@steps/components/NavBar';
export { SideNavService } from '@steps/components/SideNav';

// ==========================================
// PROJECT-SPECIFIC UTILITIES
// ==========================================
export { getEnvironmentManager, EnvironmentManager } from '@utils/EnvironmentManager';

// ==========================================
// COMMONLY USED PAGE LOCATORS
// ==========================================
export { LoginPageLocators } from '@pages/LoginPageLocators';
export { KYCDatePickerLocators } from '@pages/componentsLocator/KYCDatePickerLocators';

// ==========================================
// FOR JUNIOR DEVELOPERS - QUICK REFERENCE
// ==========================================
/*
🚀 QUICK START GUIDE:

1. CREATING A NEW STEP FILE:
   import { Page, BaseKYCSteps, dataStore } from '@shared/SharedImports';

2. CREATING A NEW PAGE LOCATOR:
   import { Page, Locator, BasePage } from '@shared/SharedImports';

3. CREATING A NEW TEST:
   import { test, expect, Page } from '@shared/SharedImports';

4. COMMON PATTERNS:
   - Use dataStore for sharing data between steps
   - Extend BaseKYCSteps for KYC-related functionality
   - Use createLogger for debugging
   - Use TestDataGenerator for test data

5. NEED HELP?
   - Check existing step files for patterns
   - Look at BaseKYCSteps for common methods
   - Use the logger for debugging: createLogger('YourClass')
*/