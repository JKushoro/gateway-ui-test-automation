import { Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';
/**
 * LoginSteps - Simple login functionality
 * Now extends BaseSteps to eliminate helper duplication
 */
export declare class LoginSteps extends BasePage {
    private loginPage;
    private envSettings;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Load environment settings from .env file
     */
    private loadEnvironment;
    /**
     * Get credentials from environment settings
     */
    private getCredentials;
    /**
     * Click the login button and handle the complete authentication flow
     */
    clickLogin(username?: string, password?: string): Promise<void>;
    /**
     * Private helper method to navigate to application
     */
    private navigateToApplication;
    /**
     * Private helper method to initiate login flow
     */
    private initiateLoginFlow;
    /**
     * Private helper method to capture and verify exact error message
     */
    private verifySpecificErrorMessage;
    /**
     * Private helper method to enter username and proceed
     */
    private enterUsernameAndProceed;
    /**
     * Private helper method to enter password and submit
     */
    private enterPasswordAndSubmit;
    /**
     * Private helper method for complete login flow with specific error verification
     */
    private attemptLoginWithCredentials;
    /**
     * Perform successful login using environment credentials
     */
    performValidLogin(): Promise<void>;
    /**
     * Attempt login with invalid username and verify specific error message
     */
    attemptLoginWithInvalidUsername(): Promise<void>;
    /**
     * Attempt login with valid username but invalid password and verify specific error message
     */
    attemptLoginWithInvalidPassword(): Promise<void>;
    /**
     * Attempt login with empty username and verify specific error message
     */
    attemptLoginWithEmptyUsername(): Promise<void>;
    /**
     * Attempt login with empty password and verify specific error message
     */
    attemptLoginWithEmptyPassword(): Promise<void>;
    /**
     * Attempt login with malformed email and verify specific error message
     */
    attemptLoginWithMalformedEmail(): Promise<void>;
    /**
     * Verify login button is present and clickable
     */
    verifyLoginButtonPresent(): Promise<void>;
    /**
     * Navigate to application and verify redirect to Microsoft login
     */
    verifyRedirectToMicrosoftLogin(): Promise<void>;
    /**
     * Attempt login with SQL injection payload and verify error
     */
    attemptLoginWithSQLInjection(): Promise<void>;
    /**
     * Attempt login with XSS payload and verify error
     */
    attemptLoginWithXSSPayload(): Promise<void>;
    /**
     * Attempt login with very long username and verify error
     */
    attemptLoginWithLongUsername(): Promise<void>;
    /**
     * Attempt login with special characters in username and verify error
     */
    attemptLoginWithSpecialCharacters(): Promise<void>;
    /**
     * Attempt login with whitespace only username and verify error
     */
    attemptLoginWithWhitespaceUsername(): Promise<void>;
    /**
     * Attempt login with whitespace only password and verify error
     */
    attemptLoginWithWhitespacePassword(): Promise<void>;
    /**
     * Verify login form elements are properly focused
     */
    verifyLoginFormFocus(): Promise<void>;
    /**
     * Verify login form handles browser back button correctly
     */
    verifyBrowserBackButton(): Promise<void>;
}
//# sourceMappingURL=LoginSteps.d.ts.map