import { Page } from '@playwright/test';
import { BasePage } from '../core/BasePage';
/**
 * LoginPage - Page Object Model for login functionality
 * Contains all locators and basic interactions for the login page
 */
export declare class LoginPage extends BasePage {
    constructor(page: Page);
    get locators(): {
        usernameInput: import("playwright-core").Locator;
        passwordInput: import("playwright-core").Locator;
        loginButton: import("playwright-core").Locator;
        forgotPasswordLink: import("playwright-core").Locator;
        signUpLink: import("playwright-core").Locator;
        errorMessage: import("playwright-core").Locator;
        successMessage: import("playwright-core").Locator;
        usernameError: import("playwright-core").Locator;
        passwordError: import("playwright-core").Locator;
        loadingSpinner: import("playwright-core").Locator;
        rememberMeCheckbox: import("playwright-core").Locator;
        googleLoginButton: import("playwright-core").Locator;
        facebookLoginButton: import("playwright-core").Locator;
    };
    /**
     * Navigate to login page
     */
    navigate(): Promise<void>;
    /**
     * Wait for login page to load
     */
    waitForPageLoad(): Promise<void>;
    /**
     * Check if we're on the login page
     */
    isPageLoaded(): Promise<boolean>;
    /**
     * Fill username field
     */
    fillUsername(username: string): Promise<void>;
    /**
     * Fill password field
     */
    fillPassword(password: string): Promise<void>;
    /**
     * Click login button
     */
    clickLogin(): Promise<void>;
    /**
     * Click forgot password link
     */
    clickForgotPassword(): Promise<void>;
    /**
     * Click sign up link
     */
    clickSignUp(): Promise<void>;
    /**
     * Toggle remember me checkbox
     */
    toggleRememberMe(): Promise<void>;
    /**
     * Get error message text
     */
    getErrorMessage(): Promise<string>;
    /**
     * Get success message text
     */
    getSuccessMessage(): Promise<string>;
    /**
     * Check if error message is displayed
     */
    isErrorMessageDisplayed(): Promise<boolean>;
    /**
     * Check if success message is displayed
     */
    isSuccessMessageDisplayed(): Promise<boolean>;
    /**
     * Check if loading spinner is displayed
     */
    isLoadingSpinnerDisplayed(): Promise<boolean>;
    /**
     * Wait for loading to complete
     */
    waitForLoadingToComplete(): Promise<void>;
    /**
     * Check if login button is enabled
     */
    isLoginButtonEnabled(): Promise<boolean>;
    /**
     * Get username field value
     */
    getUsernameValue(): Promise<string>;
    /**
     * Get password field value
     */
    getPasswordValue(): Promise<string>;
    /**
     * Clear username field
     */
    clearUsername(): Promise<void>;
    /**
     * Clear password field
     */
    clearPassword(): Promise<void>;
    /**
     * Clear all form fields
     */
    clearForm(): Promise<void>;
    /**
     * Check if remember me is checked
     */
    isRememberMeChecked(): Promise<boolean>;
    /**
     * Get username validation error
     */
    getUsernameError(): Promise<string>;
    /**
     * Get password validation error
     */
    getPasswordError(): Promise<string>;
    /**
     * Check if form has validation errors
     */
    hasValidationErrors(): Promise<boolean>;
}
//# sourceMappingURL=LoginPage.d.ts.map