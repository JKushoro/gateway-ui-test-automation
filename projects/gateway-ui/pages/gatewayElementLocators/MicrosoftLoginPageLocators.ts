// projects/gateway-ui/pages/MicrosoftLoginPageLocators.ts

import { Page, Locator } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';

/**
 * Microsoft Login Page Locators
 * Contains all element selectors for Microsoft AAD login flow
 */
export class MicrosoftLoginPageLocators extends BasePage {
  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
  }

  // Login button on main application page
  get loginButton(): Locator {
    return this.page.locator('button:has-text("Login"), a:has-text("Login")').first();
  }

  // Username input field
  get usernameInput(): Locator {
    return this.page.locator('input[name="loginfmt"], #i0116').first();
  }

  // Password input field
  get passwordInput(): Locator {
    return this.page.locator('input[name="passwd"], #i0118').first();
  }

  // Next/Submit buttons
  get nextButton(): Locator {
    return this.page.locator('#idSIButton9, input[type="submit"]').first();
  }

  get signInButton(): Locator {
    return this.page.locator('#idSIButton9, input[type="submit"]').first();
  }

  // OTP input field
  get otpInput(): Locator {
    return this.page.locator('input[type="tel"], input[placeholder*="code"]').first();
  }

  // Stay signed in prompt
  get staySignedInPrompt(): Locator {
    return this.page.locator('text="Stay signed in?"');
  }

  get noButton(): Locator {
    return this.page.locator('input[value="No"], button:has-text("No")').first();
  }
}