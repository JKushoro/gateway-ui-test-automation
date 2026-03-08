import { Page } from '@playwright/test';
import { FrameworkConfig } from '../types';
import { WaitHelper } from '../helpers/WaitHelper';
import { ActionHelper } from '../helpers/ActionHelper';
import { AssertionHelper } from '../helpers/AssertionHelper';
import { LocatorHelper } from '../helpers/LocatorHelper';
import { TableHelper } from '../helpers/TableHelper';
import { createLogger, ILogger } from '../utils/Logger';

/**
 * 🏗️ Simple Base Page Class
 * 
 * A clean, easy-to-understand base class that follows SOLID principles:
 * - Single Responsibility: Provides core page functionality
 * - Open/Closed: Easy to extend with new functionality
 * - Simple to use: Pre-configured helpers for common tasks
 * 
 * This class eliminates code duplication and provides a consistent
 * foundation for all page objects and step classes.
 * 
 * @example Basic usage
 * ```typescript
 * class LoginPage extends BasePage {
 *   private emailInput = this.page.locator('#email');
 *   private passwordInput = this.page.locator('#password');
 *   private loginButton = this.page.locator('#login-button');
 *   
 *   async login(email: string, password: string): Promise<void> {
 *     await this.action.fillInput(this.emailInput, email);
 *     await this.action.fillInput(this.passwordInput, password);
 *     await this.action.clickLocator(this.loginButton);
 *   }
 * }
 * ```
 */
export class BasePage {
  // ==========================================
  // CORE PROPERTIES
  // ==========================================
  
  /** Playwright page instance */
  protected readonly page: Page;
  
  /** Framework configuration */
  protected readonly config: Partial<FrameworkConfig>;
  
  /** Logger for this class */
  protected readonly logger: ILogger;

  // ==========================================
  // HELPER SERVICES (Pre-configured for convenience)
  // ==========================================
  
  /** Wait for elements and conditions */
  protected readonly wait: WaitHelper;
  
  /** Perform UI actions (click, type, fill, etc.) */
  protected readonly action: ActionHelper;
  
  /** Find elements on the page */
  protected readonly locate: LocatorHelper;
  
  /** Assert element states and conditions */
  protected readonly assert: AssertionHelper;
  
  /** Work with tables and data grids */
  protected readonly table: TableHelper;

  // ==========================================
  // CONSTRUCTOR
  // ==========================================

  /**
   * Creates a new BasePage instance with all helpers pre-configured
   * 
   * @param page - Playwright page instance
   * @param config - Optional framework configuration
   * 
   * @example
   * ```typescript
   * const loginPage = new LoginPage(page, { timeout: 10000 });
   * ```
   */
  constructor(page: Page, config: Partial<FrameworkConfig> = {}) {
    if (!page) {
      throw new Error('Page instance is required');
    }

    this.page = page;
    this.config = {
      timeout: 30000,
      ...config,
    };

    // Initialize logger
    this.logger = createLogger(this.constructor.name)!;
    
    // Initialize all helper services
    this.wait = new WaitHelper(page, this.config);
    this.action = new ActionHelper(page, this.config);
    this.locate = new LocatorHelper(page);
    this.assert = new AssertionHelper(page, this.config);
    this.table = new TableHelper(page, this.wait);
    
    this.logger.debug(`${this.constructor.name} initialized successfully`);
  }

  // ==========================================
  // UTILITY METHODS
  // ==========================================

  /**
   * Try to perform an action, but don't fail if it doesn't work
   * Useful for optional UI elements that might not be present
   * 
   * @param action - The action to try
   * @param description - Description for logging (optional)
   * 
   * @example
   * ```typescript
   * // Try to close a popup that might not be there
   * await this.tryAction(
   *   () => this.action.clickLocator(this.page.locator('.popup-close')),
   *   'closing optional popup'
   * );
   * ```
   */
  protected async tryAction(action: () => Promise<void>, description?: string): Promise<void> {
    try {
      await action();
      if (description) {
        this.logger.debug(`Successfully executed: ${description}`);
      }
    } catch (error) {
      if (description) {
        this.logger.debug(`Optional action failed (ignored): ${description}`);
      }
    }
  }

  /**
   * Retry an action multiple times if it fails
   * 
   * @param action - The action to retry
   * @param maxRetries - Maximum number of attempts (default: 3)
   * @param delayMs - Delay between retries in milliseconds (default: 1000)
   * @param description - Description for logging (optional)
   * 
   * @example
   * ```typescript
   * // Retry clicking a button that might be temporarily disabled
   * await this.retryAction(
   *   () => this.action.clickLocator(this.submitButton),
   *   3,
   *   1000,
   *   'clicking submit button'
   * );
   * ```
   */
  protected async retryAction(
    action: () => Promise<void>,
    maxRetries: number = 3,
    delayMs: number = 1000,
    description?: string
  ): Promise<void> {
    let lastError: Error | undefined;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await action();
        if (description && attempt > 1) {
          this.logger.debug(`${description} succeeded on attempt ${attempt}`);
        }
        return;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        if (attempt < maxRetries) {
          if (description) {
            this.logger.debug(`${description} failed on attempt ${attempt}, retrying...`);
          }
          await this.page.waitForTimeout(delayMs);
        }
      }
    }
    
    const errorMessage = description 
      ? `${description} failed after ${maxRetries} attempts: ${lastError?.message}`
      : `Action failed after ${maxRetries} attempts: ${lastError?.message}`;
    
    this.logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  /**
   * Navigate to a specific URL
   * 
   * @param url - URL to navigate to
   * @param waitForLoad - Whether to wait for page load (default: true)
   * 
   * @example
   * ```typescript
   * await this.navigateTo('/login');
   * await this.navigateTo('https://example.com', false); // Don't wait for load
   * ```
   */
  protected async navigateTo(url: string, waitForLoad: boolean = true): Promise<void> {
    this.logger.debug(`Navigating to: ${url}`);
    
    await this.page.goto(url, { 
      timeout: this.config.timeout,
      waitUntil: waitForLoad ? 'domcontentloaded' : undefined
    });
    
    if (waitForLoad) {
      await this.waitForPageLoad();
    }
  }

  /**
   * Wait for the page to fully load
   * 
   * @param timeoutMs - Custom timeout in milliseconds (optional)
   * 
   * @example
   * ```typescript
   * await this.waitForPageLoad();
   * await this.waitForPageLoad(10000); // Custom 10 second timeout
   * ```
   */
  protected async waitForPageLoad(timeoutMs?: number): Promise<void> {
    const timeout = timeoutMs || this.config.timeout || 30000;
    
    try {
      await this.page.waitForLoadState('domcontentloaded', { timeout });
      await this.page.waitForLoadState('networkidle', { timeout: Math.min(timeout, 5000) });
      this.logger.debug('Page loaded successfully');
    } catch (error) {
      this.logger.error(`Page failed to load within ${timeout}ms`);
      throw new Error(`Page load timeout after ${timeout}ms`);
    }
  }

  /**
   * Get the current page title
   * 
   * @returns The page title
   * 
   * @example
   * ```typescript
   * const title = await this.getPageTitle();
   * console.log(`Current page: ${title}`);
   * ```
   */
  protected async getPageTitle(): Promise<string> {
    try {
      const title = await this.page.title();
      this.logger.debug(`Page title: ${title}`);
      return title;
    } catch (error) {
      this.logger.error('Failed to get page title');
      throw new Error('Unable to retrieve page title');
    }
  }

  /**
   * Get the current page URL
   * 
   * @returns The current URL
   * 
   * @example
   * ```typescript
   * const url = await this.getCurrentUrl();
   * console.log(`Current URL: ${url}`);
   * ```
   */
  protected async getCurrentUrl(): Promise<string> {
    try {
      const url = this.page.url();
      this.logger.debug(`Current URL: ${url}`);
      return url;
    } catch (error) {
      this.logger.error('Failed to get current URL');
      throw new Error('Unable to retrieve current URL');
    }
  }

  /**
   * Take a screenshot for debugging
   * 
   * @param name - Name for the screenshot file (optional)
   * @returns Path to the screenshot file
   * 
   * @example
   * ```typescript
   * await this.takeScreenshot('login-page');
   * await this.takeScreenshot(); // Uses timestamp as name
   * ```
   */
  protected async takeScreenshot(name?: string): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = name ? `${name}-${timestamp}.png` : `screenshot-${timestamp}.png`;
    
    try {
      const path = await this.page.screenshot({ 
        path: `screenshots/${filename}`,
        fullPage: true 
      });
      
      this.logger.debug(`Screenshot saved: ${filename}`);
      return filename;
    } catch (error) {
      this.logger.error('Failed to take screenshot');
      throw new Error('Unable to take screenshot');
    }
  }

  // ==========================================
  // DEPRECATED METHODS (for backward compatibility)
  // ==========================================

  /**
   * @deprecated Use tryAction instead
   * @todo Remove in v2.0.0
   */
  protected async try(fn: () => Promise<void>, context?: string): Promise<void> {
    this.logger.warn('Method "try" is deprecated, use "tryAction" instead');
    await this.tryAction(fn, context);
  }
}