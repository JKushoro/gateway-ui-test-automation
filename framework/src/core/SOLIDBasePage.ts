// framework/src/core/SOLIDBasePage.ts
import { Page } from '@playwright/test';
import { FrameworkConfig } from '../types';
import { createLogger, ILogger } from '../utils/Logger';
import { UIServices, createUIServices } from './ServiceContainer';

/**
 * SOLIDBasePage - Refactored BasePage following SOLID principles
 * 
 * SOLID Principles Applied:
 * - Single Responsibility: Only provides core page functionality and service access
 * - Open/Closed: Open for extension, closed for modification
 * - Liskov Substitution: Can be substituted by any subclass without breaking functionality
 * - Interface Segregation: Clients only depend on interfaces they use (via UIServices)
 * - Dependency Inversion: Depends on abstractions (interfaces) not concretions
 * 
 * What this class DOES NOT do (following SRP):
 * - Screenshot taking (moved to ScreenshotService)
 * - Navigation logic (moved to NavigationService)
 * - Retry mechanisms (moved to RetryService)
 * - Complex helper initialization (moved to ServiceContainer)
 */
export class SOLIDBasePage {
  protected readonly page: Page;
  protected readonly config: Partial<FrameworkConfig>;
  protected readonly logger: ILogger;
  protected readonly ui: UIServices;

  constructor(page: Page, config: Partial<FrameworkConfig> = {}) {
    // Input validation
    if (!page) {
      throw new Error('Page instance is required');
    }

    // Core initialization only
    this.page = page;
    this.config = {
      timeout: 30000,
      ...config,
    };

    // Single responsibility: logging for this class only
    this.logger = createLogger(this.constructor.name);
    
    // Dependency injection: UI services from container
    this.ui = createUIServices(page, this.config);
    
    this.logger.debug(`${this.constructor.name} initialized successfully`);
  }

  /**
   * Get the current page instance
   * Clean accessor following encapsulation principles
   */
  getPage(): Page {
    return this.page;
  }

  /**
   * Get the current configuration
   * Clean accessor following encapsulation principles
   */
  getConfig(): Partial<FrameworkConfig> {
    return { ...this.config }; // Return copy to prevent mutation
  }

  /**
   * Get page URL - simple delegation to Playwright
   * Single responsibility: just expose Playwright functionality
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Get page title - simple delegation to Playwright
   * Single responsibility: just expose Playwright functionality
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Wait for page load state - simple delegation to Playwright
   * Single responsibility: just expose Playwright functionality
   */
  async waitForLoadState(state: 'load' | 'domcontentloaded' | 'networkidle' = 'domcontentloaded'): Promise<void> {
    await this.page.waitForLoadState(state, { timeout: this.config.timeout });
  }

  // Removed methods that violate SRP:
  // - tryAction() -> moved to RetryService
  // - retryAction() -> moved to RetryService  
  // - navigateTo() -> moved to NavigationService
  // - takeScreenshot() -> moved to ScreenshotService
  // - waitForPageLoad() -> simplified to waitForLoadState()
}

/**
 * Backward compatibility adapter
 * Allows existing code to work while migrating to SOLID architecture
 * 
 * @deprecated Use SOLIDBasePage directly for new code
 */
export class BasePage extends SOLIDBasePage {
  // Legacy helper properties for backward compatibility
  protected get action() {
    this.logger.warn('Using deprecated action helper. Use this.ui.click or this.ui.form instead');
    return {
      clickLocator: (locator: any, options?: any) => this.ui.click.click(locator, options),
      fillInput: (locator: any, value: string, options?: any) => this.ui.form.fillInput(locator, value, options),
    };
  }

  protected get wait() {
    this.logger.warn('Using deprecated wait helper. Use page.waitFor methods or dedicated services instead');
    return {
      waitForLoadingToComplete: () => this.waitForLoadState('networkidle'),
    };
  }

  // Other legacy helpers would be implemented here as needed
  // Each one logs deprecation warning to encourage migration
}