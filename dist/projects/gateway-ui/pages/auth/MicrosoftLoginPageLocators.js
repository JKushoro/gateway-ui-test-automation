"use strict";
// projects/gateway-ui/pages/MicrosoftLoginPageLocators.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicrosoftLoginPageLocators = void 0;
const BasePage_1 = require("@framework/core/BasePage");
/**
 * Microsoft Login Page Locators
 * Contains all element selectors for Microsoft AAD login flow
 */
class MicrosoftLoginPageLocators extends BasePage_1.BasePage {
    constructor(page, config) {
        super(page, config);
    }
    // Login button on main application page
    get loginButton() {
        return this.page.locator('button:has-text("Login"), a:has-text("Login")').first();
    }
    // Username input field
    get usernameInput() {
        return this.page.locator('input[name="loginfmt"], #i0116').first();
    }
    // Password input field
    get passwordInput() {
        return this.page.locator('input[type="password"], input[name="passwd"], #i0118').first();
    }
    // Next/Submit buttons
    get nextButton() {
        return this.page.locator('#idSIButton9, input[type="submit"]').first();
    }
    get signInButton() {
        return this.page.locator('#idSIButton9, input[type="submit"]').first();
    }
    // OTP input field
    get otpInput() {
        return this.page.locator('input[type="tel"], input[placeholder*="code"]').first();
    }
    // Stay signed in prompt
    get staySignedInPrompt() {
        return this.page.locator('text="Stay signed in?"');
    }
    get noButton() {
        return this.page.locator('input[value="No"], button:has-text("No")').first();
    }
    get yesButton() {
        return this.page.locator('input[value="Yes"], button:has-text("Yes")').first();
    }
    // Dashboard and session indicators
    get dashboardIndicator() {
        return this.page.locator('text=Dashboard');
    }
    get logoutButton() {
        return this.page.locator('text=Log out');
    }
}
exports.MicrosoftLoginPageLocators = MicrosoftLoginPageLocators;
//# sourceMappingURL=MicrosoftLoginPageLocators.js.map