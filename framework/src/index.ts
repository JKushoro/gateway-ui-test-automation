// Core exports
export { BasePage } from './core/BasePage';

// Component exports
export { AlertService } from '../../projects/gateway-ui/steps/components/AlertService';

// Helper exports
export { ActionHelper } from './helpers/ActionHelper';
export { AssertionHelper } from './helpers/AssertionHelper';
export { ElementHelper } from './helpers/ElementHelper';
export { LocatorHelper } from './helpers/LocatorHelper';
export { TextHelper } from './helpers/TextHelper';
export { WaitHelper } from './helpers/WaitHelper';

// Configuration exports
export { EnvManager } from './config/EnvManager';

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

// Constants exports
export * from './constants/CommonConstants';

// Re-export Playwright types directly for convenience
export type { Page, Locator, Response, expect as ExpectType } from '@playwright/test';