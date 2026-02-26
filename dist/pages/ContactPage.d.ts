import { Page } from '@playwright/test';
import { BasePage } from '../core/BasePage';
/**
 * ContactPage - Page Object Model for contact form functionality
 * Contains all locators and basic interactions for the contact page
 */
export declare class ContactPage extends BasePage {
    constructor(page: Page);
    get locators(): {
        nameInput: import("playwright-core").Locator;
        emailInput: import("playwright-core").Locator;
        phoneInput: import("playwright-core").Locator;
        subjectInput: import("playwright-core").Locator;
        messageTextarea: import("playwright-core").Locator;
        submitButton: import("playwright-core").Locator;
        successMessage: import("playwright-core").Locator;
        errorMessage: import("playwright-core").Locator;
        nameError: import("playwright-core").Locator;
        emailError: import("playwright-core").Locator;
        phoneError: import("playwright-core").Locator;
        subjectError: import("playwright-core").Locator;
        messageError: import("playwright-core").Locator;
        loadingSpinner: import("playwright-core").Locator;
        resetButton: import("playwright-core").Locator;
        contactInfo: import("playwright-core").Locator;
        privacyCheckbox: import("playwright-core").Locator;
    };
    /**
     * Navigate to contact page
     */
    navigate(): Promise<void>;
    /**
     * Wait for contact page to load
     */
    waitForPageLoad(): Promise<void>;
    /**
     * Check if we're on the contact page
     */
    isPageLoaded(): Promise<boolean>;
    /**
     * Fill name field
     */
    fillName(name: string): Promise<void>;
    /**
     * Fill email field
     */
    fillEmail(email: string): Promise<void>;
    /**
     * Fill phone field
     */
    fillPhone(phone: string): Promise<void>;
    /**
     * Fill subject field
     */
    fillSubject(subject: string): Promise<void>;
    /**
     * Fill message field
     */
    fillMessage(message: string): Promise<void>;
    /**
     * Click submit button
     */
    clickSubmit(): Promise<void>;
    /**
     * Click reset button
     */
    clickReset(): Promise<void>;
    /**
     * Check privacy policy checkbox
     */
    checkPrivacyPolicy(): Promise<void>;
    /**
     * Get success message text
     */
    getSuccessMessage(): Promise<string>;
    /**
     * Get error message text
     */
    getErrorMessage(): Promise<string>;
    /**
     * Check if success message is displayed
     */
    isSuccessMessageDisplayed(): Promise<boolean>;
    /**
     * Check if error message is displayed
     */
    isErrorMessageDisplayed(): Promise<boolean>;
    /**
     * Wait for loading to complete
     */
    waitForLoadingToComplete(): Promise<void>;
    /**
     * Get all form field values
     */
    getFormValues(): Promise<{
        name: string;
        email: string;
        phone: string;
        subject: string;
        message: string;
    }>;
    /**
     * Clear all form fields
     */
    clearForm(): Promise<void>;
    /**
     * Check if form has validation errors
     */
    hasValidationErrors(): Promise<boolean>;
    /**
     * Get specific validation error
     */
    getValidationError(field: 'name' | 'email' | 'phone' | 'subject' | 'message'): Promise<string>;
    /**
     * Check if submit button is enabled
     */
    isSubmitButtonEnabled(): Promise<boolean>;
    /**
     * Check if privacy policy is checked
     */
    isPrivacyPolicyChecked(): Promise<boolean>;
}
//# sourceMappingURL=ContactPage.d.ts.map