// framework/src/helpers/actions/CoreActions.ts
import { Page, Locator } from '@playwright/test';
import { LocatorHelper } from '../LocatorHelper';
import { WaitHelper } from '../WaitHelper';
import { AssertionHelper } from '../AssertionHelper';
import { FrameworkConfig } from '../../types';
import { createLogger, ILogger } from '../../utils/Logger';

const DEFAULT_CONFIG: FrameworkConfig = {
  slowMo: 0,
  timeout: 30_000,
};

type LocatorStrategy = () => Locator | Promise<Locator | null>;

/**
 * 🔧 CoreActions - Base functionality for all action helpers
 * 
 * Provides shared utilities, timing, and locator resolution logic
 * used by all other action helper classes.
 */
export class CoreActions {
  public readonly locatorHelper: LocatorHelper;
  public readonly waitHelper: WaitHelper;
  public readonly assertionHelper: AssertionHelper;
  public readonly logger: ILogger;
  public config: FrameworkConfig;

  constructor(
    public readonly page: Page,
    config: Partial<FrameworkConfig> = {}
  ) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.locatorHelper = new LocatorHelper(page);
    this.waitHelper = new WaitHelper(page, this.config);
    this.assertionHelper = new AssertionHelper(page);
    this.logger = createLogger('CoreActions');
  }

  // ===========================================================================
  // Text & Regex utilities
  // ===========================================================================

  /** Escape regex special chars in a string */
  protected esc(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /** Exact match regex (trim + case-insensitive) */
  protected exactRx(text: string): RegExp {
    return new RegExp(`^\\s*${this.esc(text)}\\s*$`, 'i');
  }

  /** Contains match regex (case-insensitive) */
  protected containsRx(text: string): RegExp {
    return new RegExp(this.esc(text), 'i');
  }

  // ===========================================================================
  // Core timing / wait primitives 
  // ===========================================================================

  /** Optional slowMo after actions (useful for demo/debug) */
  protected async slowMo(): Promise<void> {
    const ms = this.config.slowMo ?? 0;
    if (ms > 0) {
      this.logger.debug(`SlowMo delay: ${ms}ms`);
      await this.page.waitForTimeout(ms);
    }
  }

  /**
   * Wait for element to be ready for interaction
   * @param locator The element to wait for
   * @param action Description of the action for errors
   */
  protected async waitForReady(locator: Locator, action: string): Promise<void> {
    try {
      await locator.waitFor({
        state: 'visible',
        timeout: this.config.timeout
      });
      await locator.waitFor({
        state: 'attached',
        timeout: this.config.timeout  
      });
    } catch (error) {
      throw new Error(`Failed to wait for element ready for ${action}: ${error}`);
    }
  }

  // ===========================================================================
  // Robust locator resolution utilities
  // ===========================================================================

  /**
   * Resolve locator from various input types
   * @param locatorOrStrategy Locator, string selector, or strategy function
   */
  protected async resolveLocator(
    locatorOrStrategy: Locator | string | LocatorStrategy
  ): Promise<Locator> {
    try {
      if (typeof locatorOrStrategy === 'string') {
        return this.page.locator(locatorOrStrategy);
      }
      
      if (typeof locatorOrStrategy === 'function') {
        const result = await locatorOrStrategy();
        if (!result) {
          throw new Error('Locator strategy returned null/undefined');
        }
        return result;
      }
      
      return locatorOrStrategy;
    } catch (error) {
      throw new Error(`Failed to resolve locator: ${error}`);
    }
  }

  /**
   * Get element with comprehensive error context
   * @param locatorOrStrategy Locator or strategy to find element
   * @param action Description of what we're trying to do
   */
  protected async getElement(
    locatorOrStrategy: Locator | string | LocatorStrategy,
    action: string
  ): Promise<Locator> {
    const locator = await this.resolveLocator(locatorOrStrategy);
    await this.waitForReady(locator, action);
    return locator;
  }

  // ===========================================================================
  // Static utilities
  // ===========================================================================

  /**
   * Generate a unique identifier for test data
   */
  public static generateId(): string {
    return `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Sleep for specified milliseconds
   * @param ms Milliseconds to sleep
   */
  public static async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Retry an operation with exponential backoff
   * @param operation Function to retry
   * @param maxRetries Maximum number of retries
   * @param baseDelay Base delay between retries in ms
   */
  public static async retry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        
        if (attempt === maxRetries) {
          throw new Error(`Operation failed after ${maxRetries} attempts: ${lastError.message}`);
        }
        
        const delay = baseDelay * Math.pow(2, attempt - 1);
        await this.sleep(delay);
      }
    }
    
    throw lastError!;
  }
}