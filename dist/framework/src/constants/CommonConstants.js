"use strict";
// framework/src/constants/CommonConstants.ts
// Centralized constants to eliminate magic strings and improve maintainability
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGES = exports.UI_SELECTORS = void 0;
/**
 * Common UI element selectors and test IDs
 * Following the Single Responsibility Principle - each constant has one clear purpose
 */
exports.UI_SELECTORS = {
// Reserved for future UI selectors if needed
};
/**
 * Common dropdown options
 * Centralized to ensure consistency across the application
 */
/**
 * Error messages and logging constants
 * Centralized for consistency and easier maintenance
 */
exports.MESSAGES = {
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
};
//# sourceMappingURL=CommonConstants.js.map