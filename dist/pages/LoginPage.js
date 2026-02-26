"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPage = void 0;
const BasePage_1 = require("../core/BasePage");
/**
 * LoginPage - Page Object Model for login functionality
 * Contains all locators and basic interactions for the login page
 */
class LoginPage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
    }
    // Locators
    get locators() {
        return {
            // Form elements
            usernameInput: this.locatorHelper.getByTestId('username-input') ||
                this.locatorHelper.getInputByLabel('Username') ||
                this.locatorHelper.getLocator('#username'),
            passwordInput: this.locatorHelper.getByTestId('password-input') ||
                this.locatorHelper.getInputByLabel('Password') ||
                this.locatorHelper.getLocator('#password'),
            loginButton: this.locatorHelper.getByTestId('login-button') ||
                this.locatorHelper.getButtonByText('Login') ||
                this.locatorHelper.getLocator('button[type="submit"]'),
            // Links
            forgotPasswordLink: this.locatorHelper.getLinkByText('Forgot Password') ||
                this.locatorHelper.getByTestId('forgot-password-link'),
            signUpLink: this.locatorHelper.getLinkByText('Sign Up') ||
                this.locatorHelper.getByTestId('signup-link'),
            // Messages
            errorMessage: this.locatorHelper.getByTestId('error-message') ||
                this.locatorHelper.getLocator('.error-message, .alert-error'),
            successMessage: this.locatorHelper.getByTestId('success-message') ||
                this.locatorHelper.getLocator('.success-message, .alert-success'),
            // Form validation
            usernameError: this.locatorHelper.getByTestId('username-error') ||
                this.locatorHelper.getLocator('#username-error'),
            passwordError: this.locatorHelper.getByTestId('password-error') ||
                this.locatorHelper.getLocator('#password-error'),
            // Loading states
            loadingSpinner: this.locatorHelper.getByTestId('loading-spinner') ||
                this.locatorHelper.getLocator('.loading, .spinner'),
            // Remember me
            rememberMeCheckbox: this.locatorHelper.getByTestId('remember-me') ||
                this.locatorHelper.getInputByLabel('Remember me'),
            // Social login (if applicable)
            googleLoginButton: this.locatorHelper.getByTestId('google-login') ||
                this.locatorHelper.getButtonByText('Sign in with Google'),
            facebookLoginButton: this.locatorHelper.getByTestId('facebook-login') ||
                this.locatorHelper.getButtonByText('Sign in with Facebook'),
        };
    }
    /**
     * Navigate to login page
     */
    async navigate() {
        await this.navigateToPath('/login');
    }
    /**
     * Wait for login page to load
     */
    async waitForPageLoad() {
        await this.waitHelper.waitForElement(this.locators.usernameInput);
        await this.waitHelper.waitForElement(this.locators.passwordInput);
        await this.waitHelper.waitForElement(this.locators.loginButton);
    }
    /**
     * Check if we're on the login page
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
     * Fill username field
     */
    async fillUsername(username) {
        await this.actionHelper.fillInputByLabel('Username', username);
    }
    /**
     * Fill password field
     */
    async fillPassword(password) {
        await this.actionHelper.fillInputByLabel('Password', password);
    }
    /**
     * Click login button
     */
    async clickLogin() {
        await this.actionHelper.clickLocator(this.locators.loginButton);
    }
    /**
     * Click forgot password link
     */
    async clickForgotPassword() {
        await this.actionHelper.clickLocator(this.locators.forgotPasswordLink);
    }
    /**
     * Click sign up link
     */
    async clickSignUp() {
        await this.actionHelper.clickLocator(this.locators.signUpLink);
    }
    /**
     * Toggle remember me checkbox
     */
    async toggleRememberMe() {
        await this.actionHelper.clickLocator(this.locators.rememberMeCheckbox);
    }
    /**
     * Get error message text
     */
    async getErrorMessage() {
        await this.waitHelper.waitForElement(this.locators.errorMessage);
        return await this.actionHelper.getTrimmedText(this.locators.errorMessage);
    }
    /**
     * Get success message text
     */
    async getSuccessMessage() {
        await this.waitHelper.waitForElement(this.locators.successMessage);
        return await this.actionHelper.getTrimmedText(this.locators.successMessage);
    }
    /**
     * Check if error message is displayed
     */
    async isErrorMessageDisplayed() {
        return await this.actionHelper.isVisible(this.locators.errorMessage.toString());
    }
    /**
     * Check if success message is displayed
     */
    async isSuccessMessageDisplayed() {
        return await this.actionHelper.isVisible(this.locators.successMessage.toString());
    }
    /**
     * Check if loading spinner is displayed
     */
    async isLoadingSpinnerDisplayed() {
        return await this.actionHelper.isVisible(this.locators.loadingSpinner.toString());
    }
    /**
     * Wait for loading to complete
     */
    async waitForLoadingToComplete() {
        await this.waitHelper.waitForElementToBeHidden(this.locators.loadingSpinner);
    }
    /**
     * Check if login button is enabled
     */
    async isLoginButtonEnabled() {
        return await this.actionHelper.isEnabled(this.locators.loginButton.toString());
    }
    /**
     * Get username field value
     */
    async getUsernameValue() {
        return await this.actionHelper.getInputValue(this.locators.usernameInput.toString());
    }
    /**
     * Get password field value
     */
    async getPasswordValue() {
        return await this.actionHelper.getInputValue(this.locators.passwordInput.toString());
    }
    /**
     * Clear username field
     */
    async clearUsername() {
        await this.actionHelper.clear(this.locators.usernameInput.toString());
    }
    /**
     * Clear password field
     */
    async clearPassword() {
        await this.actionHelper.clear(this.locators.passwordInput.toString());
    }
    /**
     * Clear all form fields
     */
    async clearForm() {
        await this.clearUsername();
        await this.clearPassword();
    }
    /**
     * Check if remember me is checked
     */
    async isRememberMeChecked() {
        return await this.actionHelper.isChecked(this.locators.rememberMeCheckbox.toString());
    }
    /**
     * Get username validation error
     */
    async getUsernameError() {
        await this.waitHelper.waitForElement(this.locators.usernameError);
        return await this.actionHelper.getTrimmedText(this.locators.usernameError);
    }
    /**
     * Get password validation error
     */
    async getPasswordError() {
        await this.waitHelper.waitForElement(this.locators.passwordError);
        return await this.actionHelper.getTrimmedText(this.locators.passwordError);
    }
    /**
     * Check if form has validation errors
     */
    async hasValidationErrors() {
        const usernameErrorVisible = await this.actionHelper.isVisible(this.locators.usernameError.toString());
        const passwordErrorVisible = await this.actionHelper.isVisible(this.locators.passwordError.toString());
        return usernameErrorVisible || passwordErrorVisible;
    }
}
exports.LoginPage = LoginPage;
//# sourceMappingURL=LoginPage.js.map