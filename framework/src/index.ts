// ==========================================
// FRAMEWORK EXPORTS
// ==========================================

// Core exports
export { BasePage } from './core/BasePage';

// Service exports
export { AuthenticationService } from './services/AuthenticationService';

// Helper exports
export { ActionHelper } from './helpers/ActionHelper';
export { AssertionHelper } from './helpers/AssertionHelper';
export { LocatorHelper } from './helpers/LocatorHelper';
export { TextHelper } from './helpers/TextHelper';
export { TableHelper } from './helpers/TableHelper';
export { WaitHelper } from './helpers/WaitHelper';

// Utility exports
export { dataStore, DataStore } from './utils/DataStore';
export { TestDataGenerator } from './utils/TestDataGenerator';
export { FormDataHelper } from './utils/FormDataHelper';
export { Logger, createLogger, logger } from './utils/Logger';
export type { ILogger } from './utils/Logger';
export { QuestionHelper } from './utils/QuestionHelper';
export { KYCHelper } from './utils/KYCHelper';

// Type exports
export type * from './types';
export type { Environment } from './types/Environment';
export type { FrameworkConfig, ActionOptions, ClickOptions, WaitOptions, SelectOptions } from './types';
export type { Address, Dependent, ThirdParty } from './types/KYCTypes';
export type {
  AuthConfig,
  AuthenticationOptions,
  AuthenticationResult,
  OtpConfig
} from './types/AuthTypes';

// Constants exports
export * from './constants/CommonConstants';

// Common imports utility - re-export everything for convenience
export * from './utils/CommonImports';

// Re-export Playwright types directly for convenience
export type { Page, Locator, Response, expect as ExpectType } from '@playwright/test';