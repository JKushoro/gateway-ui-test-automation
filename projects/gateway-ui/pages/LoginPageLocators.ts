// projects/gateway-ui/pages/LoginPageLocators.ts
import { Locator, Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';

/**
 * LoginPageLocators - Page Object Model for the login functionality
 * Implements proper OOP principles with encapsulation and abstraction
 */
export class LoginPageLocators extends BasePage {
  constructor(page: Page, config: Partial<FrameworkConfig> = {}) {
    super(page, config);
  }

  // Private locators
  private readonly loginButtonLocator: Locator = this.page.getByRole('link', { name: 'Login' });
  private readonly usernameInputLocator: Locator = this.page.locator('input#i0116');
  private readonly passwordInputLocator: Locator = this.page.locator('input#i0118');
  private readonly primaryButtonLocator: Locator = this.page.locator('input#idSIButton9');
  private readonly errorMessageLocator: Locator = this.page.locator('[data-bind*="error"]').first();


  // Public getters
  get loginButton(): Locator {
    return this.loginButtonLocator;
  }

  get usernameInput(): Locator {
    return this.usernameInputLocator;
  }

  get nextButton(): Locator {
    return this.primaryButtonLocator;
  }

  get passwordInput(): Locator {
    return this.passwordInputLocator;
  }

  get signInButton(): Locator {
    return this.primaryButtonLocator;
  }

  get errorMessage(): Locator {
    return this.errorMessageLocator;
  }
}
