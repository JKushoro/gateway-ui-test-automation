/**
 * Common UI element selectors and test IDs
 * Following the Single Responsibility Principle - each constant has one clear purpose
 */
export declare const UI_SELECTORS: {
    readonly FORM_HEADING: "definition-form-active-page-title";
    readonly SAVE_CONTINUE: "Save & Continue";
    readonly ADD_THIRD_PARTY: "Add Third Party";
    readonly ADD_ANOTHER_ADDRESS: "Add another address";
    readonly FIRST_NAME: "First Name";
    readonly SURNAME: "Surname";
    readonly TITLE: "Title";
    readonly RELATIONSHIP: "Relationship";
    readonly CONTACT_NUMBER: "Contact number";
    readonly ADDRESS_1: "Address 1";
    readonly TOWN_CITY: "Town or City";
    readonly COUNTY: "County";
    readonly POSTCODE: "Postcode";
    readonly COUNTRY: "Country";
    readonly NOTES: "Notes";
    readonly VENUE: "Venue";
};
/**
 * KYC specific constants
 * Organized by functional area for better maintainability
 */
export declare const KYC_CONSTANTS: {
    readonly URL_FRAGMENTS: {
        readonly CURRENT_SITUATION: "page=current-situation";
        readonly INCOME: "page=income";
        readonly PERSONAL_DETAILS: "page=personal-details";
        readonly PROPERTY_ASSETS: "page=property-assets";
        readonly LIABILITIES: "page=liabilities";
        readonly INVESTMENT_KNOWLEDGE: "page=investment-knowledge";
        readonly FACT_FIND_DETAILS: "page=fact-find-details";
        readonly PENSIONS: "page=pensions";
        readonly PROTECTION: "page=protection";
        readonly SAVINGS_INVESTMENTS: "page=savings-investments";
    };
    readonly HEADINGS: {
        readonly CURRENT_SITUATION: "Current situation";
        readonly INCOME: "Income";
        readonly PERSONAL_DETAILS: "Personal details";
        readonly PROPERTY_ASSETS: "Property & assets";
        readonly LIABILITIES: "Liabilities & expenditures";
        readonly INVESTMENT_KNOWLEDGE: "Investment knowledge & preferences";
        readonly FACT_FIND_DETAILS: "Fact find details";
        readonly PENSIONS: "Pensions";
        readonly PROTECTION: "Protection";
        readonly SAVINGS_INVESTMENTS: "Savings & investments";
    };
    readonly QUESTIONS: {
        readonly OTHER_INCOME_SOURCE: "Do you have any other income source?";
        readonly UK_NATIONAL: "Are you a UK national?";
        readonly UK_RESIDENT: "Are you a UK resident?";
        readonly CHILDREN_DEPENDANTS: "Do you have any children or dependants?";
        readonly RETIREMENT_AGE: "Do you plan to retire at this age?";
        readonly OCCUPATION: "What is your occupation?";
        readonly CURRENT_EMPLOYER: "Who is your current employer?";
    };
    readonly DEFAULTS: {
        readonly TIMEOUT: 15000;
        readonly WAIT_TIMEOUT: 5000;
        readonly GROSS_INCOME: "50000";
        readonly CURRENCY_INCOME: "£90,000";
    };
};
/**
 * Common dropdown options
 * Centralized to ensure consistency across the application
 */
export declare const DROPDOWN_OPTIONS: {
    readonly EMPLOYMENT_STATUS: {
        readonly EMPLOYED: "Employed";
        readonly SELF_EMPLOYED: "Self-employed";
        readonly UNEMPLOYED: "Unemployed";
        readonly RETIRED: "Retired";
    };
    readonly INCOME_SOURCE: {
        readonly EMPLOYMENT: "Employment";
        readonly SELF_EMPLOYMENT: "Self-employment";
        readonly PENSION: "Pension";
        readonly INVESTMENTS: "Investments";
    };
    readonly EARNER_TYPE: {
        readonly SINGLE: "Single";
        readonly JOINT: "Joint";
    };
    readonly YES_NO: {
        readonly YES: "Yes";
        readonly NO: "No";
    };
};
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