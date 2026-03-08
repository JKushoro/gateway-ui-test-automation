// projects/gateway-ui/pages/gatewayElementLocators/LoginPageLocators.ts
import { Locator, Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';

/**
 * 🔐 Login Page Object
 *
 * Demonstrates proper OOP and POM implementation:
 * - Encapsulation: Private locators, public interface
 * - Single Responsibility: Only handles login page functionality
 * - Abstraction: Hides implementation details from users
 * - Clear API: Methods represent user actions and queries
 *
 * @example Basic usage
 * ```typescript
 * const loginPage = new LoginPage(page);
 * await loginPage.navigate();
 * await loginPage.loginWithCredentials('user@example.com', 'password123');
 * const isLoggedIn = await loginPage.isLoginSuccessful();
 * ```
 *
 * @example Error handling
 * ```typescript
 * const loginPage = new LoginPage(page);
 * await loginPage.loginWithCredentials('invalid@email.com', 'wrongpassword');
 * const errorMessage = await loginPage.getErrorMessage();
 * console.log(`Login failed: ${errorMessage}`);
 * ```
 */
export class LoginPage extends BasePage {
  // ==========================================
  // PRIVATE LOCATORS (Encapsulation)
  // ==========================================
  
  /** Main login button on the landing page */
  private readonly loginButton = this.page.getByRole('link', { name: 'Login' });
  
  /** Username/email input field */
  private readonly usernameInput = this.page.locator('input#i0116');
  
  /** Password input field */
  private readonly passwordInput = this.page.locator('input#i0118');
  
  /** Primary action button (Next/Sign In) */
  private readonly primaryButton = this.page.locator('input#idSIButton9');
  
  /** Error message display */
  private readonly errorMessageElement = this.page.locator('[data-bind*="error"]').first();
  
  /** Loading indicator */
  private readonly loadingIndicator = this.page.locator('.loading, .spinner');
  
  /** Success indicators */
  private readonly dashboardIndicator = this.page.locator('[data-testid="dashboard"]');
  private readonly userMenuIndicator = this.page.locator('[data-testid="user-menu"]');

  // ==========================================
  // PAGE IDENTIFICATION & NAVIGATION
  // ==========================================

  /**
   * Get the URL for this page
   */
  protected getPageUrl(): string {
    return '/login';
  }

  /**
   * Navigate to the login page
   *
   * @example
   * ```typescript
   * await loginPage.navigate();
   * ```
   */
  public async navigate(): Promise<void> {
    await this.navigateTo(this.getPageUrl());
    await this.waitForPageLoad();
  }

  /**
   * Check if the login page is currently loaded
   *
   * @returns True if login page is loaded
   *
   * @example
   * ```typescript
   * const isLoaded = await loginPage.isLoaded();
   * if (!isLoaded) {
   *   await loginPage.navigate();
   * }
   * ```
   */
  public async isLoaded(): Promise<boolean> {
    return await this.loginButton.isVisible();
  }

  // ==========================================
  // LOGIN ACTIONS (Public Interface)
  // ==========================================

  /**
   * Perform complete login with username and password
   *
   * @param username - User's email or username
   * @param password - User's password
   *
   * @example
   * ```typescript
   * await loginPage.loginWithCredentials('user@example.com', 'password123');
   * ```
   */
  public async loginWithCredentials(username: string, password: string): Promise<void> {
    this.logger.debug('Starting login process', { username });
    
    await this.clickLoginButton();
    await this.enterUsername(username);
    await this.clickNextButton();
    await this.enterPassword(password);
    await this.clickSignInButton();
    
    this.logger.debug('Login process completed');
  }

  /**
   * Click the main login button to start login process
   *
   * @example
   * ```typescript
   * await loginPage.clickLoginButton();
   * ```
   */
  public async clickLoginButton(): Promise<void> {
    await this.action.clickLocator(this.loginButton);
    await this.waitForUsernameField();
  }

  /**
   * Enter username in the username field
   *
   * @param username - Username to enter
   *
   * @example
   * ```typescript
   * await loginPage.enterUsername('user@example.com');
   * ```
   */
  public async enterUsername(username: string): Promise<void> {
    await this.action.fill('input[name="loginfmt"]', username);
  }

  /**
   * Click the Next button after entering username
   *
   * @example
   * ```typescript
   * await loginPage.clickNextButton();
   * ```
   */
  public async clickNextButton(): Promise<void> {
    await this.action.clickLocator(this.primaryButton);
    await this.waitForPasswordField();
  }

  /**
   * Enter password in the password field
   *
   * @param password - Password to enter
   *
   * @example
   * ```typescript
   * await loginPage.enterPassword('password123');
   * ```
   */
  public async enterPassword(password: string): Promise<void> {
    await this.action.fill('input[name="passwd"]', password);
  }

  /**
   * Click the Sign In button to complete login
   *
   * @example
   * ```typescript
   * await loginPage.clickSignInButton();
   * ```
   */
  public async clickSignInButton(): Promise<void> {
    await this.action.clickLocator(this.primaryButton);
    await this.waitForLoginCompletion();
  }

  // ==========================================
  // LOGIN QUERIES (Public Interface)
  // ==========================================

  /**
   * Check if login was successful
   *
   * @returns True if user is logged in
   *
   * @example
   * ```typescript
   * const isLoggedIn = await loginPage.isLoginSuccessful();
   * if (isLoggedIn) {
   *   console.log('Login successful!');
   * }
   * ```
   */
  public async isLoginSuccessful(): Promise<boolean> {
    try {
      // Check for dashboard or user menu indicators
      return await this.dashboardIndicator.isVisible({ timeout: 5000 }) ||
             await this.userMenuIndicator.isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  /**
   * Get error message if login failed
   *
   * @returns Error message text or empty string if no error
   *
   * @example
   * ```typescript
   * const error = await loginPage.getErrorMessage();
   * if (error) {
   *   console.log(`Login error: ${error}`);
   * }
   * ```
   */
  public async getErrorMessage(): Promise<string> {
    try {
      if (await this.errorMessageElement.isVisible({ timeout: 3000 })) {
        return await this.errorMessageElement.textContent() || '';
      }
      return '';
    } catch {
      return '';
    }
  }

  /**
   * Check if username field is visible and ready
   *
   * @returns True if username field is ready
   *
   * @example
   * ```typescript
   * const isReady = await loginPage.isUsernameFieldReady();
   * ```
   */
  public async isUsernameFieldReady(): Promise<boolean> {
    return await this.usernameInput.isVisible() && await this.usernameInput.isEnabled();
  }

  /**
   * Check if password field is visible and ready
   *
   * @returns True if password field is ready
   *
   * @example
   * ```typescript
   * const isReady = await loginPage.isPasswordFieldReady();
   * ```
   */
  public async isPasswordFieldReady(): Promise<boolean> {
    return await this.passwordInput.isVisible() && await this.passwordInput.isEnabled();
  }

  /**
   * Check if login is currently in progress
   *
   * @returns True if login is processing
   *
   * @example
   * ```typescript
   * const isLoading = await loginPage.isLoginInProgress();
   * if (isLoading) {
   *   console.log('Please wait, login in progress...');
   * }
   * ```
   */
  public async isLoginInProgress(): Promise<boolean> {
    return await this.loadingIndicator.isVisible();
  }

  // ==========================================
  // PRIVATE HELPER METHODS (Implementation Details)
  // ==========================================

  /**
   * Wait for username field to be ready
   */
  private async waitForUsernameField(): Promise<void> {
    await this.wait.waitForElement(this.usernameInput);
    await this.usernameInput.waitFor({ state: 'visible' });
  }

  /**
   * Wait for password field to be ready
   */
  private async waitForPasswordField(): Promise<void> {
    await this.wait.waitForElement(this.passwordInput);
    await this.passwordInput.waitFor({ state: 'visible' });
  }

  /**
   * Wait for login process to complete
   */
  private async waitForLoginCompletion(): Promise<void> {
    // Wait for either success indicators or error message
    try {
      await Promise.race([
        this.dashboardIndicator.waitFor({ state: 'visible', timeout: 10000 }),
        this.userMenuIndicator.waitFor({ state: 'visible', timeout: 10000 }),
        this.errorMessageElement.waitFor({ state: 'visible', timeout: 10000 })
      ]);
    } catch (error) {
      this.logger.warn('Login completion timeout', { error });
    }
  }

  // ==========================================
  // DEPRECATED METHODS (for backward compatibility)
  // ==========================================

  /**
   * @deprecated Use loginWithCredentials instead
   * @todo Remove in v2.0.0
   */
  public get loginButtonLocator(): Locator {
    this.logger.warn('loginButtonLocator is deprecated, use loginWithCredentials method instead');
    return this.loginButton;
  }

  /**
   * @deprecated Use enterUsername method instead
   * @todo Remove in v2.0.0
   */
  public get usernameInputLocator(): Locator {
    this.logger.warn('usernameInputLocator is deprecated, use enterUsername method instead');
    return this.usernameInput;
  }

  /**
   * @deprecated Use enterPassword method instead
   * @todo Remove in v2.0.0
   */
  public get passwordInputLocator(): Locator {
    this.logger.warn('passwordInputLocator is deprecated, use enterPassword method instead');
    return this.passwordInput;
  }

  /**
   * @deprecated Use getErrorMessage method instead
   * @todo Remove in v2.0.0
   */
  public get errorMessage(): Locator {
    this.logger.warn('errorMessage getter is deprecated, use getErrorMessage method instead');
    return this.errorMessageElement;
  }

  /**
   * @deprecated Use clickLoginButton method instead
   * @todo Remove in v2.0.0
   */
  public get loginButtonElement(): Locator {
    this.logger.warn('loginButtonElement getter is deprecated, use clickLoginButton method instead');
    return this.loginButton;
  }

  /**
   * @deprecated Use enterUsername method instead
   * @todo Remove in v2.0.0
   */
  public get usernameInputElement(): Locator {
    this.logger.warn('usernameInputElement getter is deprecated, use enterUsername method instead');
    return this.usernameInput;
  }
}

// ==========================================
// SUPPORTING TYPES
// ==========================================

/**
 * Login credentials interface
 */
export interface LoginCredentials {
  /** User's email or username */
  username: string;
  /** User's password */
  password: string;
}

/**
 * Login result interface
 */
export interface LoginResult {
  /** Whether login was successful */
  success: boolean;
  /** Error message if login failed */
  errorMessage?: string;
  /** Time taken for login process */
  duration?: number;
}

// ==========================================
// BACKWARD COMPATIBILITY ALIAS
// ==========================================

/**
 * @deprecated Use LoginPage instead
 * @todo Remove in v2.0.0
 */
export const LoginPageLocators = LoginPage;
