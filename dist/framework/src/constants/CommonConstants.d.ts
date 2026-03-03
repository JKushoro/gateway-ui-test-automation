/**
 * Common UI element selectors and test IDs
 * Following the Single Responsibility Principle - each constant has one clear purpose
 */
export declare const UI_SELECTORS: {
    readonly FORM_HEADING: "definition-form-active-page-title";
    readonly SAVE_CONTINUE: "Save & Continue";
    readonly DEFAULTS: {
        readonly TIMEOUT: 15000;
        readonly WAIT_TIMEOUT: 5000;
        readonly GROSS_INCOME: "50000";
    };
};
/**
 * Common dropdown options
 * Centralized to ensure consistency across the application
 */
/**
 * Error messages and logging constants
 * Centralized for consistency and easier maintenance
 */
export declare const MESSAGES: {
    readonly ERRORS: {
        readonly QUESTION_NOT_FOUND: "Question not found on page";
        readonly FIELD_NOT_VISIBLE: "Field is not visible";
        readonly TIMEOUT_EXCEEDED: "Operation timed out";
    };
    readonly INFO: {
        readonly QUESTION_SKIPPED: "Question not present, skipping";
        readonly FIELD_FILLED: "Field filled successfully";
        readonly OPTION_SELECTED: "Option selected successfully";
        readonly PAGE_COMPLETED: "Page completed successfully";
    };
};
//# sourceMappingURL=CommonConstants.d.ts.map