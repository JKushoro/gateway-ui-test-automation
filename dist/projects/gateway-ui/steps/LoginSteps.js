"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSteps = void 0;
const LoginPageLocators_1 = require("@pages/LoginPageLocators");
const BasePage_1 = require("@framework/core/BasePage");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
/**
 * LoginSteps - Simple login functionality
 * Now extends BaseSteps to eliminate helper duplication
 */
class LoginSteps extends BasePage_1.BasePage {
    constructor(page, config) {
        super(page, config);
        this.envSettings = {};
        this.loginPage = new LoginPageLocators_1.LoginPageLocators(page, config);
    }
    /**
     * Load environment settings from .env file
     */
    loadEnvironment(environment) {
        const envFile = path.join(__dirname, '..', 'environments', `.env.${environment}`);
        if (!fs.existsSync(envFile)) {
            throw new Error(`Environment file not found: .env.${environment}`);
        }
        const content = fs.readFileSync(envFile, 'utf8');
        content.split('\n').forEach(line => {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#')) {
                const [key, ...parts] = trimmed.split('=');
                if (key && parts.length > 0) {
                    this.envSettings[key.trim()] = parts.join('=').trim();
                }
            }
        });
    }
    /**
     * Get credentials from environment settings
     */
    getCredentials() {
        if (Object.keys(this.envSettings).length === 0) {
            this.loadEnvironment('qa'); // Default to qa environment
        }
        const username = this.envSettings['USER_NAME'];
        const password = this.envSettings['PASSWORD'];
        if (!username || !password) {
            throw new Error('USER_NAME and PASSWORD must be set in environment file');
        }
        return { username, password };
    }
    /**
     * Click the login button and handle the complete authentication flow
     */
    async clickLogin(username, password) {
        // Click the initial login button
        await this.action.clickLocator(this.loginPage.loginButton);
        // Wait for the AAD redirect to complete
        await this.wait.waitForDOMContentLoaded();
        await this.wait.waitForNetworkIdle();
        // Get credentials from parameters or environment settings
        let loginUsername = username;
        let loginPassword = password;
        if (!loginUsername || !loginPassword) {
            const credentials = this.getCredentials();
            loginUsername = loginUsername || credentials.username;
            loginPassword = loginPassword || credentials.password;
        }
        // Enter username and click next
        await this.loginPage.usernameInput.fill(loginUsername);
        await this.action.clickLocator(this.loginPage.nextButton);
        // Wait for password page to load
        await this.wait.waitForDOMContentLoaded();
        // Enter password and click sign in
        await this.loginPage.passwordInput.fill(loginPassword);
        await this.action.clickLocator(this.loginPage.signInButton);
        // Wait for login to complete
        await this.wait.waitForDOMContentLoaded();
        await this.wait.waitForNetworkIdle();
    }
    /**
     * Private helper method to navigate to application
     */
    async navigateToApplication() {
        if (Object.keys(this.envSettings).length === 0) {
            this.loadEnvironment('qa'); // Default to qa environment
        }
        const baseUrl = this.envSettings['BASE_URL'] || 'https://qa-fairstonegateway.fairstone.co.uk';
        await this.page.goto(baseUrl);
        await this.wait.waitForLoadingToComplete();
    }
    /**
     * Private helper method to initiate login flow
     */
    async initiateLoginFlow() {
        await this.action.clickLocator(this.loginPage.loginButton);
        await this.wait.waitForDOMContentLoaded();
        await this.wait.waitForNetworkIdle();
    }
    /**
     * Private helper method to capture and verify exact error message
     */
    async verifySpecificErrorMessage(expectedErrorText) {
        await this.wait.waitForDOMContentLoaded();
        await this.assert.assertElementVisible(this.loginPage.errorMessage);
        await this.assert.assertElementHasText(this.loginPage.errorMessage, expectedErrorText);
    }
    /**
     * Private helper method to enter username and proceed
     */
    async enterUsernameAndProceed(username) {
        await this.loginPage.usernameInput.fill(username);
        await this.action.clickLocator(this.loginPage.nextButton);
        await this.wait.waitForDOMContentLoaded();
    }
    /**
     * Private helper method to enter password and submit
     */
    async enterPasswordAndSubmit(password) {
        await this.loginPage.passwordInput.fill(password);
        await this.action.clickLocator(this.loginPage.signInButton);
    }
    /**
     * Private helper method for complete login flow with specific error verification
     */
    async attemptLoginWithCredentials(username, password, expectedError) {
        await this.navigateToApplication();
        await this.initiateLoginFlow();
        if (username !== undefined) {
            await this.enterUsernameAndProceed(username);
        }
        else {
            await this.action.clickLocator(this.loginPage.nextButton);
        }
        if (password !== undefined) {
            await this.enterPasswordAndSubmit(password);
        }
        else {
            await this.action.clickLocator(this.loginPage.signInButton);
        }
        if (expectedError) {
            await this.verifySpecificErrorMessage(expectedError);
        }
    }
    /**
     * Perform successful login using environment credentials
     */
    async performValidLogin() {
        await this.navigateToApplication();
        await this.clickLogin();
    }
    /**
     * Attempt login with invalid username and verify specific error message
     */
    async attemptLoginWithInvalidUsername() {
        const expectedError = "This username may be incorrect. Make sure you typed it correctly. Otherwise, contact your admin.";
        await this.attemptLoginWithCredentials('invalid.user@fairstone.co.uk', undefined, expectedError);
    }
    /**
     * Attempt login with valid username but invalid password and verify specific error message
     */
    async attemptLoginWithInvalidPassword() {
        const credentials = this.getCredentials();
        const expectedError = "Your account or password is incorrect. If you don't remember your password, reset it now.";
        await this.attemptLoginWithCredentials(credentials.username, 'InvalidPassword123', expectedError);
    }
    /**
     * Attempt login with empty username and verify specific error message
     */
    async attemptLoginWithEmptyUsername() {
        const expectedError = "Enter a valid email address, phone number, or Skype name.";
        await this.attemptLoginWithCredentials(undefined, undefined, expectedError);
    }
    /**
     * Attempt login with empty password and verify specific error message
     */
    async attemptLoginWithEmptyPassword() {
        const credentials = this.getCredentials();
        const expectedError = "Please enter your password.";
        await this.attemptLoginWithCredentials(credentials.username, undefined, expectedError);
    }
    /**
     * Attempt login with malformed email and verify specific error message
     */
    async attemptLoginWithMalformedEmail() {
        const expectedError = "We couldn't find an account with that username.";
        await this.attemptLoginWithCredentials('invalid-email-format', undefined, expectedError);
    }
    /**
     * Verify login button is present and clickable
     */
    async verifyLoginButtonPresent() {
        await this.navigateToApplication();
        await this.assert.assertElementVisible(this.loginPage.loginButton);
        await this.assert.assertElementEnabled(this.loginPage.loginButton);
    }
    /**
     * Navigate to application and verify redirect to Microsoft login
     */
    async verifyRedirectToMicrosoftLogin() {
        await this.navigateToApplication();
        await this.action.clickLocator(this.loginPage.loginButton);
        await this.wait.waitForDOMContentLoaded();
        await this.page.waitForURL(/login\.microsoftonline\.com/);
    }
    /**
     * Attempt login with SQL injection payload and verify error
     */
    async attemptLoginWithSQLInjection() {
        const expectedError = "Enter a valid email address, phone number, or Skype name.";
        await this.attemptLoginWithCredentials("admin'; DROP TABLE users; --", undefined, expectedError);
    }
    /**
     * Attempt login with XSS payload and verify error
     */
    async attemptLoginWithXSSPayload() {
        const expectedError = "Enter a valid email address, phone number, or Skype name.";
        await this.attemptLoginWithCredentials("<script>alert('XSS')</script>", undefined, expectedError);
    }
    /**
     * Attempt login with very long username and verify error
     */
    async attemptLoginWithLongUsername() {
        const longUsername = "a".repeat(500) + "@fairstone.co.uk";
        const expectedError = "We couldn't find an account with that username.";
        await this.attemptLoginWithCredentials(longUsername, undefined, expectedError);
    }
    /**
     * Attempt login with special characters in username and verify error
     */
    async attemptLoginWithSpecialCharacters() {
        const expectedError = "We couldn't find an account with that username.";
        await this.attemptLoginWithCredentials("user@#$%^&*()fairstone.co.uk", undefined, expectedError);
    }
    /**
     * Attempt login with whitespace only username and verify error
     */
    async attemptLoginWithWhitespaceUsername() {
        const expectedError = "Enter a valid email address, phone number, or Skype name.";
        await this.attemptLoginWithCredentials("   ", undefined, expectedError);
    }
    /**
     * Attempt login with whitespace only password and verify error
     */
    async attemptLoginWithWhitespacePassword() {
        const credentials = this.getCredentials();
        const expectedError = "Your account or password is incorrect. If you don't remember your password, reset it now.";
        await this.attemptLoginWithCredentials(credentials.username, "   ", expectedError);
    }
    /**
     * Verify login form elements are properly focused
     */
    async verifyLoginFormFocus() {
        await this.navigateToApplication();
        await this.action.clickLocator(this.loginPage.loginButton);
        await this.wait.waitForDOMContentLoaded();
        await this.wait.waitForNetworkIdle();
        // Verify username input is focused after page load
        await this.assert.assertElementVisible(this.loginPage.usernameInput);
        const isFocused = await this.loginPage.usernameInput.evaluate(el => el === document.activeElement);
        if (!isFocused) {
            throw new Error('Username input should be focused on page load');
        }
    }
    /**
     * Verify login form handles browser back button correctly
     */
    async verifyBrowserBackButton() {
        await this.navigateToApplication();
        await this.action.clickLocator(this.loginPage.loginButton);
        await this.wait.waitForDOMContentLoaded();
        await this.wait.waitForNetworkIdle();
        // Go back using browser back button
        await this.page.goBack();
        await this.wait.waitForDOMContentLoaded();
        // Verify we're back to the main application page
        await this.assert.assertElementVisible(this.loginPage.loginButton);
    }
}
exports.LoginSteps = LoginSteps;
//# sourceMappingURL=LoginSteps.js.map