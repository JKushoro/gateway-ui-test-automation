// framework/src/constants/CommonConstants.ts
// Centralized constants to eliminate magic strings and improve maintainability

/**
 * Common UI element selectors and test IDs
 * Following the Single Responsibility Principle - each constant has one clear purpose
 */
export const UI_SELECTORS = {
  // Form elements
  FORM_HEADING: 'definition-form-active-page-title',
  SAVE_CONTINUE: 'Save & Continue',
  
  // Default values
  DEFAULTS: {
    TIMEOUT: 15000,
    WAIT_TIMEOUT: 5000,
    GROSS_INCOME: '50000',
  },
} as const;

/**
 * Common dropdown options
 * Centralized to ensure consistency across the application
 */

/**
 * Error messages and logging constants
 * Centralized for consistency and easier maintenance
 */
export const MESSAGES = {
  ERRORS: {
    QUESTION_NOT_FOUND: 'Question not found on page',
    FIELD_NOT_VISIBLE: 'Field is not visible',
    TIMEOUT_EXCEEDED: 'Operation timed out',
  },
  
  INFO: {
    QUESTION_SKIPPED: 'Question not present, skipping',
    FIELD_FILLED: 'Field filled successfully',
    OPTION_SELECTED: 'Option selected successfully',
    PAGE_COMPLETED: 'Page completed successfully',
  },
} as const;