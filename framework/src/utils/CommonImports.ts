// framework/src/utils/CommonImports.ts
// Centralized imports to reduce duplication across the project
// Following DRY principles and providing a single source of truth for common imports

// Playwright core imports
export { Page, Locator, expect } from '@playwright/test';

// Framework core imports
export { BasePage } from '../core/BasePage';
export { FrameworkConfig } from '../types';

// Framework utilities
export { dataStore } from './DataStore';
export { TestDataGenerator } from './TestDataGenerator';
export { createLogger, ILogger } from './Logger';
export { KYCHelper } from './KYCHelper';
export { QuestionHelper } from './QuestionHelper';
export { FormDataHelper } from './FormDataHelper';

// Framework helpers
export { ActionHelper } from '../helpers/ActionHelper';
export { AssertionHelper } from '../helpers/AssertionHelper';
export { LocatorHelper } from '../helpers/LocatorHelper';
export { TableHelper } from '../helpers/TableHelper';
export { TextHelper } from '../helpers/TextHelper';
export { WaitHelper } from '../helpers/WaitHelper';

// Framework constants
export { UI_SELECTORS, MESSAGES } from '../constants/CommonConstants';

// Framework types
export type { Environment } from '../types/Environment';
export type { Address, Dependent, ThirdParty } from '../types/KYCTypes';