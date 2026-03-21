/**
 * 🎯 Framework Common Imports
 * 
 * Single source of truth for framework-level imports.
 * This file provides commonly used framework exports in one place.
 * 
 * @fileoverview Framework common imports utility
 * @author Framework Team
 * @since 1.0.0
 */

// ==========================================
// PLAYWRIGHT CORE IMPORTS
// ==========================================
export { Page, Locator, expect, test } from '@playwright/test';

// ==========================================
// FRAMEWORK CORE EXPORTS
// ==========================================
export { BasePage } from '../core/BasePage';

// ==========================================
// FRAMEWORK SERVICES
// ==========================================
export { AuthenticationService } from '../services/AuthenticationService';

// ==========================================
// FRAMEWORK HELPERS
// ==========================================
export { ActionHelper } from '../helpers/ActionHelper';
export { AssertionHelper } from '../helpers/AssertionHelper';
export { WaitHelper } from '../helpers/WaitHelper';
export { LocatorHelper } from '../helpers/LocatorHelper';
export { TextHelper } from '../helpers/TextHelper';
export { TableHelper } from '../helpers/TableHelper';

// ==========================================
// FRAMEWORK UTILITIES
// ==========================================
export { dataStore, DataStore } from './DataStore';
export { TestDataGenerator } from './TestDataGenerator';
export { FormDataHelper } from './FormDataHelper';
export { KYCHelper } from './KYCHelper';
export { QuestionHelper } from './QuestionHelper';
export { createLogger, logger } from './Logger';
export type { ILogger } from './Logger';

// ==========================================
// FRAMEWORK TYPES
// ==========================================
export type { FrameworkConfig, ActionOptions, ClickOptions, WaitOptions, SelectOptions } from '../types';
export type { Environment } from '../types/Environment';
export type { Address, Dependent, ThirdParty } from '../types/KYCTypes';
export type {
  AuthConfig,
  AuthenticationOptions,
  AuthenticationResult,
  OtpConfig
} from '../types/AuthTypes';

// ==========================================
// FRAMEWORK CONSTANTS
// ==========================================
export * from '../constants/CommonConstants';