// projects/gateway-ui/steps/gateway/LoginUIInteractions.ts
import { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { LoginPage } from '@pages/auth/LoginPageLocators';
import { TIMEOUTS } from './LoginValidationConstants';

/**
 * Handles basic login UI interactions
 * Single Responsibility: UI form interactions only
 */
export class LoginUIInteractions {
  constructor(
    private readonly page: Page,
    private readonly loginPage: LoginPage
  ) {}

  async clickLoginButton(waitForMicrosoftPage = false): Promise<void> {
    await this.loginPage.getLoginButtonLocator().click();
    
    if (waitForMicrosoftPage) {
      await this.waitForMicrosoftLoginPage();
    }
  }

  async submitUsername(username = ''): Promise<void> {
    await expect(this.loginPage.getUsernameInputLocator())
      .toBeVisible({ timeout: TIMEOUTS.ELEMENT_VISIBILITY });
    
    await this.loginPage.getUsernameInputLocator().fill(username);
    await this.loginPage.getPrimaryButtonLocator().click();
    await this.page.waitForTimeout(TIMEOUTS.FORM_SUBMISSION);
  }

  async submitPassword(password = ''): Promise<void> {
    await expect(this.loginPage.getPasswordInputLocator())
      .toBeVisible({ timeout: TIMEOUTS.ELEMENT_VISIBILITY });
    
    await this.loginPage.getPasswordInputLocator().fill(password);
    await this.loginPage.getPrimaryButtonLocator().click();
    await this.page.waitForTimeout(TIMEOUTS.FORM_SUBMISSION);
  }

  async expectLoginButtonVisible(): Promise<void> {
    await expect(this.loginPage.getLoginButtonLocator()).toBeVisible();
  }

  async expectUsernameFieldReady(): Promise<void> {
    await expect(this.loginPage.getUsernameInputLocator()).toBeVisible();
    await expect(this.loginPage.getUsernameInputLocator()).toBeEnabled();
  }

  async expectErrorMessage(expectedText: string): Promise<void> {
    await expect(this.loginPage.getErrorMessageLocator()).toHaveText(expectedText);
  }

  private async waitForMicrosoftLoginPage(): Promise<void> {
    await this.page.waitForURL(/login\.microsoftonline\.com/, { 
      timeout: TIMEOUTS.URL_NAVIGATION 
    });
    await expect(this.loginPage.getUsernameInputLocator())
      .toBeVisible({ timeout: TIMEOUTS.ELEMENT_VISIBILITY });
  }
}