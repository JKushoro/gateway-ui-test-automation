"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactPage = void 0;
const BasePage_1 = require("../core/BasePage");
/**
 * ContactPage - Page Object Model for contact form functionality
 * Contains all locators and basic interactions for the contact page
 */
class ContactPage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
    }
    // Locators
    get locators() {
        return {
            // Form elements
            nameInput: this.locatorHelper.getByTestId('contact-name') ||
                this.locatorHelper.getInputByLabel('Name') ||
                this.locatorHelper.getLocator('#name'),
            emailInput: this.locatorHelper.getByTestId('contact-email') ||
                this.locatorHelper.getInputByLabel('Email') ||
                this.locatorHelper.getLocator('#email'),
            phoneInput: this.locatorHelper.getByTestId('contact-phone') ||
                this.locatorHelper.getInputByLabel('Phone') ||
                this.locatorHelper.getLocator('#phone'),
            subjectInput: this.locatorHelper.getByTestId('contact-subject') ||
                this.locatorHelper.getInputByLabel('Subject') ||
                this.locatorHelper.getLocator('#subject'),
            messageTextarea: this.locatorHelper.getByTestId('contact-message') ||
                this.locatorHelper.getInputByLabel('Message') ||
                this.locatorHelper.getLocator('#message'),
            submitButton: this.locatorHelper.getByTestId('contact-submit') ||
                this.locatorHelper.getButtonByText('Send Message') ||
                this.locatorHelper.getLocator('button[type="submit"]'),
            // Messages
            successMessage: this.locatorHelper.getByTestId('success-message') ||
                this.locatorHelper.getLocator('.success-message, .alert-success'),
            errorMessage: this.locatorHelper.getByTestId('error-message') ||
                this.locatorHelper.getLocator('.error-message, .alert-error'),
            // Validation errors
            nameError: this.locatorHelper.getByTestId('name-error') ||
                this.locatorHelper.getLocator('#name-error'),
            emailError: this.locatorHelper.getByTestId('email-error') ||
                this.locatorHelper.getLocator('#email-error'),
            phoneError: this.locatorHelper.getByTestId('phone-error') ||
                this.locatorHelper.getLocator('#phone-error'),
            subjectError: this.locatorHelper.getByTestId('subject-error') ||
                this.locatorHelper.getLocator('#subject-error'),
            messageError: this.locatorHelper.getByTestId('message-error') ||
                this.locatorHelper.getLocator('#message-error'),
            // Additional elements
            loadingSpinner: this.locatorHelper.getByTestId('loading-spinner') ||
                this.locatorHelper.getLocator('.loading, .spinner'),
            resetButton: this.locatorHelper.getByTestId('reset-button') ||
                this.locatorHelper.getButtonByText('Reset') ||
                this.locatorHelper.getLocator('button[type="reset"]'),
            // Contact information display
            contactInfo: this.locatorHelper.getByTestId('contact-info') ||
                this.locatorHelper.getLocator('.contact-info'),
            // Privacy policy/terms
            privacyCheckbox: this.locatorHelper.getByTestId('privacy-checkbox') ||
                this.locatorHelper.getInputByLabel('I agree to the privacy policy'),
        };
    }
    /**
     * Navigate to contact page
     */
    async navigate() {
        await this.navigateToPath('/contact');
    }
    /**
     * Wait for contact page to load
     */
    async waitForPageLoad() {
        await this.waitHelper.waitForElement(this.locators.nameInput);
        await this.waitHelper.waitForElement(this.locators.emailInput);
        await this.waitHelper.waitForElement(this.locators.messageTextarea);
        await this.waitHelper.waitForElement(this.locators.submitButton);
    }
    /**
     * Check if we're on the contact page
     */
    async isPageLoaded() {
        try {
            await this.waitForPageLoad();
            return true;
        }
        catch {
            return false;
        }
    }
    /**
     * Fill name field
     */
    async fillName(name) {
        await this.actionHelper.fillInputByLabel('Name', name);
    }
    /**
     * Fill email field
     */
    async fillEmail(email) {
        await this.actionHelper.fillInputByLabel('Email', email);
    }
    /**
     * Fill phone field
     */
    async fillPhone(phone) {
        await this.actionHelper.fillInputByLabel('Phone', phone);
    }
    /**
     * Fill subject field
     */
    async fillSubject(subject) {
        await this.actionHelper.fillInputByLabel('Subject', subject);
    }
    /**
     * Fill message field
     */
    async fillMessage(message) {
        await this.actionHelper.fillInputByLabel('Message', message);
    }
    /**
     * Click submit button
     */
    async clickSubmit() {
        await this.actionHelper.clickLocator(this.locators.submitButton);
    }
    /**
     * Click reset button
     */
    async clickReset() {
        await this.actionHelper.clickLocator(this.locators.resetButton);
    }
    /**
     * Check privacy policy checkbox
     */
    async checkPrivacyPolicy() {
        await this.actionHelper.checkCheckbox(this.locators.privacyCheckbox.toString());
    }
    /**
     * Get success message text
     */
    async getSuccessMessage() {
        await this.waitHelper.waitForElement(this.locators.successMessage);
        return await this.actionHelper.getTrimmedText(this.locators.successMessage);
    }
    /**
     * Get error message text
     */
    async getErrorMessage() {
        await this.waitHelper.waitForElement(this.locators.errorMessage);
        return await this.actionHelper.getTrimmedText(this.locators.errorMessage);
    }
    /**
     * Check if success message is displayed
     */
    async isSuccessMessageDisplayed() {
        return await this.actionHelper.isVisible(this.locators.successMessage.toString());
    }
    /**
     * Check if error message is displayed
     */
    async isErrorMessageDisplayed() {
        return await this.actionHelper.isVisible(this.locators.errorMessage.toString());
    }
    /**
     * Wait for loading to complete
     */
    async waitForLoadingToComplete() {
        await this.waitHelper.waitForElementToBeHidden(this.locators.loadingSpinner);
    }
    /**
     * Get all form field values
     */
    async getFormValues() {
        return {
            name: await this.actionHelper.getInputValue(this.locators.nameInput.toString()),
            email: await this.actionHelper.getInputValue(this.locators.emailInput.toString()),
            phone: await this.actionHelper.getInputValue(this.locators.phoneInput.toString()),
            subject: await this.actionHelper.getInputValue(this.locators.subjectInput.toString()),
            message: await this.actionHelper.getInputValue(this.locators.messageTextarea.toString()),
        };
    }
    /**
     * Clear all form fields
     */
    async clearForm() {
        await this.actionHelper.clear(this.locators.nameInput.toString());
        await this.actionHelper.clear(this.locators.emailInput.toString());
        await this.actionHelper.clear(this.locators.phoneInput.toString());
        await this.actionHelper.clear(this.locators.subjectInput.toString());
        await this.actionHelper.clear(this.locators.messageTextarea.toString());
    }
    /**
     * Check if form has validation errors
     */
    async hasValidationErrors() {
        const nameErrorVisible = await this.actionHelper.isVisible(this.locators.nameError.toString());
        const emailErrorVisible = await this.actionHelper.isVisible(this.locators.emailError.toString());
        const phoneErrorVisible = await this.actionHelper.isVisible(this.locators.phoneError.toString());
        const subjectErrorVisible = await this.actionHelper.isVisible(this.locators.subjectError.toString());
        const messageErrorVisible = await this.actionHelper.isVisible(this.locators.messageError.toString());
        return nameErrorVisible || emailErrorVisible || phoneErrorVisible || subjectErrorVisible || messageErrorVisible;
    }
    /**
     * Get specific validation error
     */
    async getValidationError(field) {
        const errorLocator = this.locators[`${field}Error`];
        await this.waitHelper.waitForElement(errorLocator);
        return await this.actionHelper.getTrimmedText(errorLocator);
    }
    /**
     * Check if submit button is enabled
     */
    async isSubmitButtonEnabled() {
        return await this.actionHelper.isEnabled(this.locators.submitButton.toString());
    }
    /**
     * Check if privacy policy is checked
     */
    async isPrivacyPolicyChecked() {
        return await this.actionHelper.isChecked(this.locators.privacyCheckbox.toString());
    }
}
exports.ContactPage = ContactPage;
//# sourceMappingURL=ContactPage.js.map