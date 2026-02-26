"use strict";
// framework/src/constants/CommonConstants.ts
// Centralized constants to eliminate magic strings and improve maintainability
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGES = exports.DROPDOWN_OPTIONS = exports.KYC_CONSTANTS = exports.UI_SELECTORS = void 0;
/**
 * Common UI element selectors and test IDs
 * Following the Single Responsibility Principle - each constant has one clear purpose
 */
exports.UI_SELECTORS = {
    // Form elements
    FORM_HEADING: 'definition-form-active-page-title',
    // Button texts
    SAVE_CONTINUE: 'Save & Continue',
    ADD_THIRD_PARTY: 'Add Third Party',
    ADD_ANOTHER_ADDRESS: 'Add another address',
    // Common form labels
    FIRST_NAME: 'First Name',
    SURNAME: 'Surname',
    TITLE: 'Title',
    RELATIONSHIP: 'Relationship',
    CONTACT_NUMBER: 'Contact number',
    ADDRESS_1: 'Address 1',
    TOWN_CITY: 'Town or City',
    COUNTY: 'County',
    POSTCODE: 'Postcode',
    COUNTRY: 'Country',
    NOTES: 'Notes',
    VENUE: 'Venue',
};
/**
 * KYC specific constants
 * Organized by functional area for better maintainability
 */
exports.KYC_CONSTANTS = {
    // URL fragments for page verification
    URL_FRAGMENTS: {
        CURRENT_SITUATION: 'page=current-situation',
        INCOME: 'page=income',
        PERSONAL_DETAILS: 'page=personal-details',
        PROPERTY_ASSETS: 'page=property-assets',
        LIABILITIES: 'page=liabilities',
        INVESTMENT_KNOWLEDGE: 'page=investment-knowledge',
        FACT_FIND_DETAILS: 'page=fact-find-details',
        PENSIONS: 'page=pensions',
        PROTECTION: 'page=protection',
        SAVINGS_INVESTMENTS: 'page=savings-investments',
    },
    // Page headings
    HEADINGS: {
        CURRENT_SITUATION: 'Current situation',
        INCOME: 'Income',
        PERSONAL_DETAILS: 'Personal details',
        PROPERTY_ASSETS: 'Property & assets',
        LIABILITIES: 'Liabilities & expenditures',
        INVESTMENT_KNOWLEDGE: 'Investment knowledge & preferences',
        FACT_FIND_DETAILS: 'Fact find details',
        PENSIONS: 'Pensions',
        PROTECTION: 'Protection',
        SAVINGS_INVESTMENTS: 'Savings & investments',
    },
    // Common questions
    QUESTIONS: {
        OTHER_INCOME_SOURCE: 'Do you have any other income source?',
        UK_NATIONAL: 'Are you a UK national?',
        UK_RESIDENT: 'Are you a UK resident?',
        CHILDREN_DEPENDANTS: 'Do you have any children or dependants?',
        RETIREMENT_AGE: 'Do you plan to retire at this age?',
        OCCUPATION: 'What is your occupation?',
        CURRENT_EMPLOYER: 'Who is your current employer?',
    },
    // Default values
    DEFAULTS: {
        TIMEOUT: 15000,
        WAIT_TIMEOUT: 5000,
        GROSS_INCOME: '50000',
        CURRENCY_INCOME: '£90,000',
    },
};
/**
 * Common dropdown options
 * Centralized to ensure consistency across the application
 */
exports.DROPDOWN_OPTIONS = {
    EMPLOYMENT_STATUS: {
        EMPLOYED: 'Employed',
        SELF_EMPLOYED: 'Self-employed',
        UNEMPLOYED: 'Unemployed',
        RETIRED: 'Retired',
    },
    INCOME_SOURCE: {
        EMPLOYMENT: 'Employment',
        SELF_EMPLOYMENT: 'Self-employment',
        PENSION: 'Pension',
        INVESTMENTS: 'Investments',
    },
    EARNER_TYPE: {
        SINGLE: 'Single',
        JOINT: 'Joint',
    },
    YES_NO: {
        YES: 'Yes',
        NO: 'No',
    },
};
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