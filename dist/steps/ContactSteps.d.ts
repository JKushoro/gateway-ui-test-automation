import { Page } from '@playwright/test';
/**
 * ContactSteps - Business logic and user actions for contact form functionality
 * Contains high-level methods that combine page interactions with business logic
 */
export declare class ContactSteps {
    private page;
    private contactPage;
    private assertionHelper;
    private waitHelper;
    constructor(page: Page);
    /**
     * Navigate to contact page and wait for it to load
     */
    navigateToContact(): Promise<void>;
    /**
     * Fill complete contact form
     */
    fillContactForm(contactData: {
        name: string;
        email: string;
        phone?: string;
        subject: string;
        message: string;
    }): Promise<void>;
    /**
     * Submit contact form successfully
     */
    submitContactFormSuccessfully(contactData: {
        name: string;
        email: string;
        phone?: string;
        subject: string;
        message: string;
    }): Promise<void>;
    /**
     * Submit contact form with validation errors
     */
    submitContactFormWithErrors(contactData: {
        name?: string;
        email?: string;
        phone?: string;
        subject?: string;
        message?: string;
    }): Promise<void>;
    /**
     * Submit the contact form
     */
    submitForm(): Promise<void>;
    /**
     * Verify successful form submission
     */
    verifySubmissionSuccess(): Promise<void>;
    /**
     * Verify form submission failure
     */
    verifySubmissionFailure(): Promise<void>;
    /**
     * Verify validation errors are displayed
     */
    verifyValidationErrors(): Promise<void>;
    /**
     * Test form with empty required fields
     */
    testEmptyRequiredFields(): Promise<void>;
    /**
     * Test form with invalid email format
     */
    testInvalidEmailFormat(invalidEmail: string): Promise<void>;
    /**
     * Test form reset functionality
     */
    testFormReset(): Promise<void>;
    /**
     * Test form with maximum length inputs
     */
    testMaxLengthInputs(): Promise<void>;
    /**
     * Test form with special characters
     */
    testSpecialCharacters(): Promise<void>;
    /**
     * Test form accessibility
     */
    verifyFormAccessibility(): Promise<void>;
    /**
     * Test keyboard navigation through form
     */
    testKeyboardNavigation(): Promise<void>;
    /**
     * Test form submission with Enter key
     */
    submitWithEnterKey(contactData: {
        name: string;
        email: string;
        phone?: string;
        subject: string;
        message: string;
    }): Promise<void>;
    /**
     * Test privacy policy checkbox (if present)
     */
    testPrivacyPolicyCheckbox(): Promise<void>;
    /**
     * Get current form state
     */
    getFormState(): Promise<{
        values: {
            name: string;
            email: string;
            phone: string;
            subject: string;
            message: string;
        };
        submitButtonEnabled: boolean;
        hasValidationErrors: boolean;
        privacyPolicyChecked: boolean;
    }>;
    /**
     * Clear contact form
     */
    clearContactForm(): Promise<void>;
    /**
     * Test form with minimum required fields only
     */
    submitMinimalForm(): Promise<void>;
    /**
     * Test form field character limits
     */
    testFieldCharacterLimits(): Promise<void>;
}
//# sourceMappingURL=ContactSteps.d.ts.map