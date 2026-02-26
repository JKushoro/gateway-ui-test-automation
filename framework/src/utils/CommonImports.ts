// framework/src/utils/CommonImports.ts
// Centralized imports to reduce duplication across the project

// Playwright core imports
export { Page, Locator, expect } from '@playwright/test';

// Framework core imports
export { BasePage } from '../core/BasePage';
export { FrameworkConfig } from '../types';

// Framework utilities
export { dataStore } from './DataStore';
export { TestDataGenerator } from './TestDataGenerator';
export { createLogger, ILogger } from './Logger';

// Framework helpers
export { ActionHelper } from '../helpers/ActionHelper';
export { AssertionHelper } from '../helpers/AssertionHelper';
export { ElementHelper } from '../helpers/ElementHelper';
export { LocatorHelper } from '../helpers/LocatorHelper';
export { TableHelper } from '../helpers/TableHelper';
export { TextHelper } from '../helpers/TextHelper';
export { WaitHelper } from '../helpers/WaitHelper';