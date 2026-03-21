// projects/gateway-ui/pages/gatewayElementLocators/LoginPageLocators.ts
import { Locator } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';

export class LoginPage extends BasePage {
  // ==========================================
  // PRIVATE LOCATORS
  // ==========================================

  private readonly loginButton = this.page.getByRole('link', { name: 'Login' });
  private readonly usernameInput = this.page.locator('input#i0116');
  private readonly passwordInput = this.page.locator('input#i0118');
  private readonly primaryButton = this.page.locator('input#idSIButton9');
  private readonly microsoftErrorMessage = this.page.locator('[role="alert"]');
  private readonly loadingIndicator = this.page.locator('.loading, .spinner');
  private readonly dashboardIndicator = this.page.locator('[data-testid="dashboard"]');
  private readonly userMenuIndicator = this.page.locator('[data-testid="user-menu"]');
  private readonly logoutButton = this.page.getByRole('link', { name: 'Log out' });

  // ==========================================
  // PAGE IDENTIFICATION
  // ==========================================

  // ==========================================
  // LOCATOR GETTERS
  // ==========================================

  public getLoginButtonLocator(): Locator {
    return this.loginButton;
  }

  public getUsernameInputLocator(): Locator {
    return this.usernameInput;
  }

  public getLogoutButtonLocator(): Locator {
    return this.logoutButton;
  }

  public getPasswordInputLocator(): Locator {
    return this.passwordInput;
  }

  public getPrimaryButtonLocator(): Locator {
    return this.primaryButton;
  }

  public getErrorMessageLocator(): Locator {
    return this.microsoftErrorMessage;
  }

  public getLoadingIndicatorLocator(): Locator {
    return this.loadingIndicator;
  }

  public getDashboardIndicatorLocator(): Locator {
    return this.dashboardIndicator;
  }

  public getUserMenuIndicatorLocator(): Locator {
    return this.userMenuIndicator;
  }
}
