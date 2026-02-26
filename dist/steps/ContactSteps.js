"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactSteps = void 0;
const ContactPage_1 = require("../pages/ContactPage");
const AssertionHelper_1 = require("../helpers/AssertionHelper");
const WaitHelper_1 = require("../helpers/WaitHelper");
/**
 * ContactSteps - Business logic and user actions for contact form functionality
 * Contains high-level methods that combine page interactions with business logic
 */
class ContactSteps {
    constructor(page) {
        this.page = page;
        this.contactPage = new ContactPage_1.ContactPage(page);
        this.assertionHelper = new AssertionHelper_1.AssertionHelper(page);
        this.waitHelper = new WaitHelper_1.WaitHelper(page);
    }
    /**
     * Navigate to contact page and wait for it to load
     */
    async navigateToContact() {
        await this.contactPage.navigate();
        await this.contactPage.waitForPageLoad();
    }
    /**
     * Fill complete contact form
     */
    async fillContactForm(contactData) {
        await this.contactPage.fillName(contactData.name);
        await this.contactPage.fillEmail(contactData.email);
        if (contactData.phone) {
            await this.contactPage.fillPhone(contactData.phone);
        }
        await this.contactPage.fillSubject(contactData.subject);
        await this.contactPage.fillMessage(contactData.message);
    }
    /**
     * Submit contact form successfully
     */
    async submitContactFormSuccessfully(contactData) {
        await this.navigateToContact();
        await this.fillContactForm(contactData);
        await this.submitForm();
        await this.verifySubmissionSuccess();
    }
    /**
     * Submit contact form with validation errors
     */
    async submitContactFormWithErrors(contactData) {
        await this.navigateToContact();
        // Fill only provided fields (leaving others empty to trigger validation)
        if (contactData.name)
            await this.contactPage.fillName(contactData.name);
        if (contactData.email)
            await this.contactPage.fillEmail(contactData.email);
        if (contactData.phone)
            await this.contactPage.fillPhone(contactData.phone);
        if (contactData.subject)
            await this.contactPage.fillSubject(contactData.subject);
        if (contactData.message)
            await this.contactPage.fillMessage(contactData.message);
        await this.submitForm();
        await this.verifyValidationErrors();
    }
    /**
     * Submit the contact form
     */
    async submitForm() {
        await this.contactPage.clickSubmit();
        await this.contactPage.waitForLoadingToComplete();
    }
    /**
     * Verify successful form submission
     */
    async verifySubmissionSuccess() {
        await this.assertionHelper.assertElementVisible(this.contactPage.locators.successMessage);
        const successMessage = await this.contactPage.getSuccessMessage();
        if (!successMessage || successMessage.length === 0) {
            throw new Error('Expected success message but none was displayed');
        }
    }
    /**
     * Verify form submission failure
     */
    async verifySubmissionFailure() {
        await this.assertionHelper.assertElementVisible(this.contactPage.locators.errorMessage);
        const errorMessage = await this.contactPage.getErrorMessage();
        if (!errorMessage || errorMessage.length === 0) {
            throw new Error('Expected error message but none was displayed');
        }
    }
    /**
     * Verify validation errors are displayed
     */
    async verifyValidationErrors() {
        const hasErrors = await this.contactPage.hasValidationErrors();
        if (!hasErrors) {
            throw new Error('Expected validation errors but none were displayed');
        }
    }
    /**
     * Test form with empty required fields
     */
    async testEmptyRequiredFields() {
        await this.navigateToContact();
        await this.contactPage.clearForm();
        await this.submitForm();
        await this.verifyValidationErrors();
    }
    /**
     * Test form with invalid email format
     */
    async testInvalidEmailFormat(invalidEmail) {
        await this.navigateToContact();
        await this.fillContactForm({
            name: 'Test User',
            email: invalidEmail,
            subject: 'Test Subject',
            message: 'Test message content'
        });
        await this.submitForm();
        await this.verifyValidationErrors();
    }
    /**
     * Test form reset functionality
     */
    async testFormReset() {
        await this.navigateToContact();
        // Fill form with data
        await this.fillContactForm({
            name: 'Test User',
            email: 'test@example.com',
            phone: '1234567890',
            subject: 'Test Subject',
            message: 'Test message content'
        });
        // Reset form
        await this.contactPage.clickReset();
        // Verify form is cleared
        const formValues = await this.contactPage.getFormValues();
        const isEmpty = Object.values(formValues).every(value => value === '');
        if (!isEmpty) {
            throw new Error('Form was not properly reset');
        }
    }
    /**
     * Test form with maximum length inputs
     */
    async testMaxLengthInputs() {
        const longText = 'A'.repeat(1000); // Very long text
        await this.navigateToContact();
        await this.fillContactForm({
            name: longText,
            email: 'test@example.com',
            subject: longText,
            message: longText
        });
        await this.submitForm();
        // Verification depends on your app's behavior with long inputs
    }
    /**
     * Test form with special characters
     */
    async testSpecialCharacters() {
        await this.navigateToContact();
        await this.fillContactForm({
            name: 'Test User <script>alert("xss")</script>',
            email: 'test+special@example.com',
            subject: 'Subject with émojis 🚀 and spëcial chars!',
            message: 'Message with "quotes", \'apostrophes\', and <tags>'
        });
        await this.submitForm();
        // Verification depends on your app's handling of special characters
    }
    /**
     * Test form accessibility
     */
    async verifyFormAccessibility() {
        await this.navigateToContact();
        // Verify form elements have proper labels
        await this.assertionHelper.assertElementHasAttribute(this.contactPage.locators.nameInput, 'aria-label', 'Name');
        await this.assertionHelper.assertElementHasAttribute(this.contactPage.locators.emailInput, 'aria-label', 'Email');
        await this.assertionHelper.assertElementHasAttribute(this.contactPage.locators.messageTextarea, 'aria-label', 'Message');
    }
    /**
     * Test keyboard navigation through form
     */
    async testKeyboardNavigation() {
        await this.navigateToContact();
        // Tab through form elements
        await this.contactPage.locators.nameInput.focus();
        await this.page.keyboard.press('Tab');
        await this.assertionHelper.assertElementFocused(this.contactPage.locators.emailInput);
        await this.page.keyboard.press('Tab');
        await this.assertionHelper.assertElementFocused(this.contactPage.locators.phoneInput);
        await this.page.keyboard.press('Tab');
        await this.assertionHelper.assertElementFocused(this.contactPage.locators.subjectInput);
        await this.page.keyboard.press('Tab');
        await this.assertionHelper.assertElementFocused(this.contactPage.locators.messageTextarea);
    }
    /**
     * Test form submission with Enter key
     */
    async submitWithEnterKey(contactData) {
        await this.navigateToContact();
        await this.fillContactForm(contactData);
        // Press Enter to submit form
        await this.page.keyboard.press('Enter');
        await this.contactPage.waitForLoadingToComplete();
        await this.verifySubmissionSuccess();
    }
    /**
     * Test privacy policy checkbox (if present)
     */
    async testPrivacyPolicyCheckbox() {
        await this.navigateToContact();
        // Check if privacy checkbox exists
        const privacyCheckboxVisible = await this.contactPage.locators.privacyCheckbox.isVisible();
        if (privacyCheckboxVisible) {
            // Fill form
            await this.fillContactForm({
                name: 'Test User',
                email: 'test@example.com',
                subject: 'Test Subject',
                message: 'Test message'
            });
            // Try to submit without checking privacy policy
            await this.submitForm();
            await this.verifyValidationErrors();
            // Check privacy policy and submit again
            await this.contactPage.checkPrivacyPolicy();
            await this.submitForm();
            await this.verifySubmissionSuccess();
        }
    }
    /**
     * Get current form state
     */
    async getFormState() {
        const values = await this.contactPage.getFormValues();
        const submitButtonEnabled = await this.contactPage.isSubmitButtonEnabled();
        const hasValidationErrors = await this.contactPage.hasValidationErrors();
        const privacyPolicyChecked = await this.contactPage.isPrivacyPolicyChecked();
        return {
            values,
            submitButtonEnabled,
            hasValidationErrors,
            privacyPolicyChecked
        };
    }
    /**
     * Clear contact form
     */
    async clearContactForm() {
        await this.contactPage.clearForm();
        // Verify form is cleared
        const formValues = await this.contactPage.getFormValues();
        const isEmpty = Object.values(formValues).every(value => value === '');
        if (!isEmpty) {
            throw new Error('Contact form was not properly cleared');
        }
    }
    /**
     * Test form with minimum required fields only
     */
    async submitMinimalForm() {
        await this.navigateToContact();
        // Fill only required fields (name, email, message typically)
        await this.contactPage.fillName('Test User');
        await this.contactPage.fillEmail('test@example.com');
        await this.contactPage.fillMessage('Minimal test message');
        await this.submitForm();
        await this.verifySubmissionSuccess();
    }
    /**
     * Test form field character limits
     */
    async testFieldCharacterLimits() {
        await this.navigateToContact();
        // Test each field with text at or near character limits
        const shortText = 'Test';
        const mediumText = 'A'.repeat(100);
        const longText = 'A'.repeat(500);
        await this.fillContactForm({
            name: mediumText,
            email: 'test@example.com',
            phone: '1234567890',
            subject: mediumText,
            message: longText
        });
        // Verify form accepts the input lengths
        const formValues = await this.contactPage.getFormValues();
        // Check that values were properly set (not truncated unexpectedly)
        if (formValues.name.length === 0 || formValues.message.length === 0) {
            throw new Error('Form fields may have character limits that are too restrictive');
        }
    }
}
exports.ContactSteps = ContactSteps;
//# sourceMappingURL=ContactSteps.js.map