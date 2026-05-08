// projects/gateway-ui/pages/auth/LoginPageLocators.ts
import { Locator } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';

/**
 * LoginPageLocators - Provides element locators for login-related pages
 * 
 * Single Responsibility: Centralized locator management for login workflows
 * Covers both application login page and Microsoft OAuth page elements
 */
export class LoginPageLocators extends BasePage {
  
  /* ==================== APPLICATION LOGIN PAGE ==================== */
  
  private readonly loginButton = this.page.getByRole('link', { name: 'Login' });
  private readonly logoutButton = this.page.getByRole('link', { name: 'Log out' });

  /* ==================== MICROSOFT OAUTH PAGE ==================== */
  
  private readonly usernameInput = this.page.locator('input#i0116');
  private readonly passwordInput = this.page.locator('input#i0118');
  private readonly primaryButton = this.page.locator('input#idSIButton9');
  private readonly errorMessage = this.page.locator('[role="alert"]');

  /* ==================== DASHBOARD/SESSION INDICATORS ==================== */
  
  private readonly dashboardIndicator = this.page.locator('[data-testid="dashboard"]');
  private readonly userMenuIndicator = this.page.locator('[data-testid="user-menu"]');
  private readonly loadingIndicator = this.page.locator('.loading, .spinner');

  /* ==================== PUBLIC LOCATOR GETTERS ==================== */

  // Application Login Elements
  getLoginButtonLocator(): Locator {
    return this.loginButton;
  }

  getLogoutButtonLocator(): Locator {
    return this.logoutButton;
  }

  // Microsoft OAuth Elements
  getUsernameInputLocator(): Locator {
    return this.usernameInput;
  }

  getPasswordInputLocator(): Locator {
    return this.passwordInput;
  }

  getPrimaryButtonLocator(): Locator {
    return this.primaryButton;
  }

  getErrorMessageLocator(): Locator {
    return this.errorMessage;
  }

  // Session State Elements
  getDashboardIndicatorLocator(): Locator {
    return this.dashboardIndicator;
  }

  getUserMenuIndicatorLocator(): Locator {
    return this.userMenuIndicator;
  }

  getLoadingIndicatorLocator(): Locator {
    return this.loadingIndicator;
  }
}

// Backward compatibility - can be removed after updating all imports
export class LoginPage extends LoginPageLocators {}
