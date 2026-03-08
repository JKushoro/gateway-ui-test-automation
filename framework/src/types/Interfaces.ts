/**
 * 🏗️ Core Framework Interfaces
 * 
 * This file defines all interfaces following SOLID principles:
 * - Interface Segregation: Small, focused interfaces
 * - Dependency Inversion: Abstractions for dependency injection
 * - Single Responsibility: Each interface has one clear purpose
 * 
 * @fileoverview Core interfaces for dependency injection and abstraction
 * @author Framework Team
 * @since 1.0.0
 */

import { Page, Locator } from '@playwright/test';
import { FrameworkConfig, WaitOptions, ActionOptions, ClickOptions, SelectOptions, OperationResult, ValidationResult } from './index';

// ==========================================
// CORE SERVICE INTERFACES
// ==========================================

/**
 * Interface for logging services
 * Follows Single Responsibility Principle - only handles logging
 */
export interface Logger {
  /**
   * Log debug information
   * @param message - Debug message
   * @param context - Additional context data
   */
  debug(message: string, context?: Record<string, unknown>): void;

  /**
   * Log informational message
   * @param message - Info message
   * @param context - Additional context data
   */
  info(message: string, context?: Record<string, unknown>): void;

  /**
   * Log warning message
   * @param message - Warning message
   * @param context - Additional context data
   */
  warn(message: string, context?: Record<string, unknown>): void;

  /**
   * Log error message
   * @param message - Error message
   * @param context - Additional context data
   */
  error(message: string, context?: Record<string, unknown>): void;
}

/**
 * Interface for configuration management
 * Follows Single Responsibility Principle - only handles configuration
 */
export interface ConfigurationProvider {
  /**
   * Get configuration value by key
   * @param key - Configuration key
   * @returns Configuration value or undefined if not found
   */
  get<T = unknown>(key: string): T | undefined;

  /**
   * Set configuration value
   * @param key - Configuration key
   * @param value - Configuration value
   */
  set<T = unknown>(key: string, value: T): void;

  /**
   * Check if configuration key exists
   * @param key - Configuration key
   * @returns True if key exists
   */
  has(key: string): boolean;

  /**
   * Get all configuration as object
   * @returns Complete configuration object
   */
  getAll(): Record<string, unknown>;
}

/**
 * Interface for data storage and retrieval
 * Follows Single Responsibility Principle - only handles data operations
 */
export interface DataStore {
  /**
   * Store data with a key
   * @param key - Storage key
   * @param value - Data to store
   */
  store<T = unknown>(key: string, value: T): void;

  /**
   * Retrieve data by key
   * @param key - Storage key
   * @returns Stored data or undefined if not found
   */
  retrieve<T = unknown>(key: string): T | undefined;

  /**
   * Check if key exists in storage
   * @param key - Storage key
   * @returns True if key exists
   */
  exists(key: string): boolean;

  /**
   * Remove data by key
   * @param key - Storage key
   */
  remove(key: string): void;

  /**
   * Clear all stored data
   */
  clear(): void;

  /**
   * Get all stored keys
   * @returns Array of all keys
   */
  keys(): string[];
}

// ==========================================
// UI INTERACTION INTERFACES
// ==========================================

/**
 * Interface for element waiting operations
 * Follows Single Responsibility Principle - only handles waiting
 */
export interface ElementWaiter {
  /**
   * Wait for element to be visible
   * @param locator - Element locator
   * @param options - Wait options
   */
  waitForVisible(locator: Locator, options?: WaitOptions): Promise<void>;

  /**
   * Wait for element to be hidden
   * @param locator - Element locator
   * @param options - Wait options
   */
  waitForHidden(locator: Locator, options?: WaitOptions): Promise<void>;

  /**
   * Wait for element to be enabled
   * @param locator - Element locator
   * @param options - Wait options
   */
  waitForEnabled(locator: Locator, options?: WaitOptions): Promise<void>;

  /**
   * Wait for element to contain text
   * @param locator - Element locator
   * @param text - Expected text
   * @param options - Wait options
   */
  waitForText(locator: Locator, text: string, options?: WaitOptions): Promise<void>;

  /**
   * Wait for page to load completely
   * @param options - Wait options
   */
  waitForPageLoad(options?: WaitOptions): Promise<void>;
}

/**
 * Interface for UI actions
 * Follows Single Responsibility Principle - only handles UI interactions
 */
export interface UIActionPerformer {
  /**
   * Click on an element
   * @param locator - Element locator
   * @param options - Click options
   */
  click(locator: Locator, options?: ClickOptions): Promise<void>;

  /**
   * Type text into an element
   * @param locator - Element locator
   * @param text - Text to type
   * @param options - Action options
   */
  type(locator: Locator, text: string, options?: ActionOptions): Promise<void>;

  /**
   * Fill an input field
   * @param locator - Element locator
   * @param value - Value to fill
   * @param options - Action options
   */
  fill(locator: Locator, value: string, options?: ActionOptions): Promise<void>;

  /**
   * Select option from dropdown
   * @param locator - Element locator
   * @param value - Value to select
   * @param options - Select options
   */
  select(locator: Locator, value: string, options?: SelectOptions): Promise<void>;

  /**
   * Check a checkbox
   * @param locator - Element locator
   * @param options - Action options
   */
  check(locator: Locator, options?: ActionOptions): Promise<void>;

  /**
   * Uncheck a checkbox
   * @param locator - Element locator
   * @param options - Action options
   */
  uncheck(locator: Locator, options?: ActionOptions): Promise<void>;
}

/**
 * Interface for element location and querying
 * Follows Single Responsibility Principle - only handles element location
 */
export interface ElementLocator {
  /**
   * Find element by text content
   * @param text - Text to search for
   * @param exact - Whether to match exactly
   * @returns Element locator
   */
  byText(text: string, exact?: boolean): Locator;

  /**
   * Find element by placeholder text
   * @param placeholder - Placeholder text
   * @returns Element locator
   */
  byPlaceholder(placeholder: string): Locator;

  /**
   * Find element by label text
   * @param label - Label text
   * @returns Element locator
   */
  byLabel(label: string): Locator;

  /**
   * Find element by role
   * @param role - ARIA role
   * @param name - Optional accessible name
   * @returns Element locator
   */
  byRole(role: string, name?: string): Locator;

  /**
   * Find element by test ID
   * @param testId - Test ID attribute value
   * @returns Element locator
   */
  byTestId(testId: string): Locator;

  /**
   * Find element by CSS selector
   * @param selector - CSS selector
   * @returns Element locator
   */
  bySelector(selector: string): Locator;
}

/**
 * Interface for assertions and validations
 * Follows Single Responsibility Principle - only handles assertions
 */
export interface AssertionProvider {
  /**
   * Assert element is visible
   * @param locator - Element locator
   * @param options - Wait options
   */
  isVisible(locator: Locator, options?: WaitOptions): Promise<void>;

  /**
   * Assert element is hidden
   * @param locator - Element locator
   * @param options - Wait options
   */
  isHidden(locator: Locator, options?: WaitOptions): Promise<void>;

  /**
   * Assert element contains text
   * @param locator - Element locator
   * @param text - Expected text
   * @param options - Wait options
   */
  hasText(locator: Locator, text: string, options?: WaitOptions): Promise<void>;

  /**
   * Assert element has value
   * @param locator - Element locator
   * @param value - Expected value
   * @param options - Wait options
   */
  hasValue(locator: Locator, value: string, options?: WaitOptions): Promise<void>;

  /**
   * Assert element is enabled
   * @param locator - Element locator
   * @param options - Wait options
   */
  isEnabled(locator: Locator, options?: WaitOptions): Promise<void>;

  /**
   * Assert element is disabled
   * @param locator - Element locator
   * @param options - Wait options
   */
  isDisabled(locator: Locator, options?: WaitOptions): Promise<void>;
}

// ==========================================
// TABLE INTERACTION INTERFACES
// ==========================================

/**
 * Interface for table operations
 * Follows Single Responsibility Principle - only handles table interactions
 */
export interface TableHandler {
  /**
   * Get cell value by row and column
   * @param table - Table locator
   * @param row - Row index (0-based)
   * @param column - Column index (0-based)
   * @returns Cell text content
   */
  getCellValue(table: Locator, row: number, column: number): Promise<string>;

  /**
   * Get cell by header name and row
   * @param table - Table locator
   * @param header - Column header text
   * @param row - Row index (0-based)
   * @returns Cell locator
   */
  getCellByHeader(table: Locator, header: string, row: number): Promise<Locator>;

  /**
   * Find row index by cell values
   * @param table - Table locator
   * @param criteria - Search criteria as key-value pairs
   * @returns Row index or -1 if not found
   */
  findRowIndex(table: Locator, criteria: Record<string, string>): Promise<number>;

  /**
   * Get all values from a column
   * @param table - Table locator
   * @param header - Column header text
   * @returns Array of cell values
   */
  getColumnValues(table: Locator, header: string): Promise<string[]>;

  /**
   * Get row count
   * @param table - Table locator
   * @returns Number of rows
   */
  getRowCount(table: Locator): Promise<number>;

  /**
   * Get column count
   * @param table - Table locator
   * @returns Number of columns
   */
  getColumnCount(table: Locator): Promise<number>;
}

// ==========================================
// VALIDATION INTERFACES
// ==========================================

/**
 * Interface for input validation
 * Follows Single Responsibility Principle - only handles validation
 */
export interface InputValidator {
  /**
   * Validate email format
   * @param email - Email to validate
   * @returns Validation result
   */
  validateEmail(email: string): ValidationResult;

  /**
   * Validate phone number format
   * @param phone - Phone number to validate
   * @param country - Country code for format validation
   * @returns Validation result
   */
  validatePhone(phone: string, country?: string): ValidationResult;

  /**
   * Validate required field
   * @param value - Value to validate
   * @param fieldName - Name of the field for error messages
   * @returns Validation result
   */
  validateRequired(value: string | null | undefined, fieldName: string): ValidationResult;

  /**
   * Validate string length
   * @param value - String to validate
   * @param minLength - Minimum length
   * @param maxLength - Maximum length
   * @param fieldName - Name of the field for error messages
   * @returns Validation result
   */
  validateLength(value: string, minLength: number, maxLength: number, fieldName: string): ValidationResult;

  /**
   * Validate against custom pattern
   * @param value - Value to validate
   * @param pattern - Regular expression pattern
   * @param fieldName - Name of the field for error messages
   * @param errorMessage - Custom error message
   * @returns Validation result
   */
  validatePattern(value: string, pattern: RegExp, fieldName: string, errorMessage: string): ValidationResult;
}

// ==========================================
// PAGE OBJECT INTERFACES
// ==========================================

/**
 * Base interface for page objects
 * Follows Single Responsibility Principle - defines page contract
 */
export interface PageObject {
  /**
   * Navigate to this page
   * @param options - Navigation options
   */
  navigate(options?: NavigationOptions): Promise<void>;

  /**
   * Wait for page to be loaded
   * @param options - Wait options
   */
  waitForLoad(options?: WaitOptions): Promise<void>;

  /**
   * Check if page is currently loaded
   * @returns True if page is loaded
   */
  isLoaded(): Promise<boolean>;

  /**
   * Get page title
   * @returns Page title
   */
  getTitle(): Promise<string>;

  /**
   * Get current URL
   * @returns Current page URL
   */
  getUrl(): Promise<string>;
}

/**
 * Interface for form page objects
 * Extends PageObject with form-specific functionality
 */
export interface FormPageObject extends PageObject {
  /**
   * Fill the entire form with data
   * @param data - Form data
   * @param options - Fill options
   */
  fillForm(data: Record<string, unknown>, options?: ActionOptions): Promise<void>;

  /**
   * Submit the form
   * @param options - Submit options
   */
  submit(options?: ClickOptions): Promise<void>;

  /**
   * Reset/clear the form
   * @param options - Reset options
   */
  reset(options?: ActionOptions): Promise<void>;

  /**
   * Validate form data
   * @param data - Data to validate
   * @returns Validation result
   */
  validateForm(data: Record<string, unknown>): Promise<ValidationResult>;

  /**
   * Check if form is valid
   * @returns True if form is valid
   */
  isFormValid(): Promise<boolean>;
}

// ==========================================
// NAVIGATION INTERFACES
// ==========================================

/**
 * Navigation options interface
 */
export interface NavigationOptions {
  /** Whether to wait for page load */
  readonly waitForLoad?: boolean;
  /** Timeout for navigation */
  readonly timeout?: number;
  /** URL parameters to append */
  readonly params?: Record<string, string>;
}

/**
 * Interface for navigation services
 * Follows Single Responsibility Principle - only handles navigation
 */
export interface NavigationService {
  /**
   * Navigate to URL
   * @param url - Target URL
   * @param options - Navigation options
   */
  goto(url: string, options?: NavigationOptions): Promise<void>;

  /**
   * Go back in browser history
   * @param options - Navigation options
   */
  goBack(options?: NavigationOptions): Promise<void>;

  /**
   * Go forward in browser history
   * @param options - Navigation options
   */
  goForward(options?: NavigationOptions): Promise<void>;

  /**
   * Reload current page
   * @param options - Navigation options
   */
  reload(options?: NavigationOptions): Promise<void>;

  /**
   * Wait for navigation to complete
   * @param options - Wait options
   */
  waitForNavigation(options?: WaitOptions): Promise<void>;
}

// ==========================================
// TEST EXECUTION INTERFACES
// ==========================================

/**
 * Interface for test setup and teardown
 * Follows Single Responsibility Principle - only handles test lifecycle
 */
export interface TestLifecycleManager {
  /**
   * Setup before test execution
   * @param config - Test configuration
   */
  setup(config: FrameworkConfig): Promise<void>;

  /**
   * Cleanup after test execution
   */
  teardown(): Promise<void>;

  /**
   * Setup before each test
   */
  beforeEach(): Promise<void>;

  /**
   * Cleanup after each test
   */
  afterEach(): Promise<void>;
}

/**
 * Interface for test data management
 * Follows Single Responsibility Principle - only handles test data
 */
export interface TestDataProvider {
  /**
   * Get test data by key
   * @param key - Data key
   * @returns Test data
   */
  getData<T = unknown>(key: string): T | undefined;

  /**
   * Generate random test data
   * @param type - Type of data to generate
   * @returns Generated data
   */
  generateData(type: 'email' | 'name' | 'phone' | 'address'): string;

  /**
   * Load test data from file
   * @param filePath - Path to data file
   */
  loadFromFile(filePath: string): Promise<void>;

  /**
   * Save test data to file
   * @param filePath - Path to save data
   * @param data - Data to save
   */
  saveToFile(filePath: string, data: Record<string, unknown>): Promise<void>;
}

// ==========================================
// DEPENDENCY INJECTION INTERFACES
// ==========================================

/**
 * Interface for dependency injection container
 * Follows Dependency Inversion Principle
 */
export interface DIContainer {
  /**
   * Register a service in the container
   * @param token - Service token/identifier
   * @param implementation - Service implementation
   */
  register<T>(token: string | symbol, implementation: T): void;

  /**
   * Register a factory function for a service
   * @param token - Service token/identifier
   * @param factory - Factory function
   */
  registerFactory<T>(token: string | symbol, factory: () => T): void;

  /**
   * Resolve a service from the container
   * @param token - Service token/identifier
   * @returns Service instance
   */
  resolve<T>(token: string | symbol): T;

  /**
   * Check if service is registered
   * @param token - Service token/identifier
   * @returns True if service is registered
   */
  isRegistered(token: string | symbol): boolean;
}

/**
 * Interface for injectable services
 * Marker interface for dependency injection
 */
export interface Injectable {
  /** Service identifier for dependency injection */
  readonly serviceId: string | symbol;
}