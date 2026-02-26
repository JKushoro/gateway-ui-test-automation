import { WaitHelper } from '../helpers/WaitHelper';
import { ActionHelper } from '../helpers/ActionHelper';
import { AssertionHelper } from '../helpers/AssertionHelper';
import { LocatorHelper } from '../helpers/LocatorHelper';
import { FrameworkConfig } from '../types';
import { Page } from '@playwright/test';
import { createLogger, ILogger } from '../utils/Logger';
import { TableHelper } from '@framework/helpers/TableHelper';

/**
 * Unified Base Page Class
 * Combines functionality of BaseSteps and BaseUIPage into a single comprehensive base class
 * Pre-instantiates all helpers to eliminate code duplication across page and step classes
 * Provides consistent patterns for both page objects and test scenarios
 */
export class BasePage {
  protected page: Page;
  protected readonly config: Partial<FrameworkConfig>;

  // Pre-instantiated helpers - eliminates duplication in all classes
  protected readonly action: ActionHelper;
  protected readonly wait: WaitHelper;
  protected readonly assert: AssertionHelper;
  protected readonly locate: LocatorHelper;
  protected readonly table: TableHelper;
  protected readonly logger: ILogger;

  constructor(page: Page, config: Partial<FrameworkConfig> = {}) {
    this.page = page;
    this.config = {
      timeout: 30000,
      ...config,
    };

    // Initialize all helpers once - no more duplication in derived classes
    this.action = new ActionHelper(page, this.config);
    this.wait = new WaitHelper(page, this.config);
    this.assert = new AssertionHelper(page, this.config);
    this.locate = new LocatorHelper(page);
    this.table = new TableHelper(page, this.wait);
    this.logger = createLogger(this.constructor.name);
  }

  /**
   * Run an async action and ignore errors (for optional UI elements).
   * Useful for handling optional form fields or UI elements that may not be present.
   */
  protected async try(fn: () => Promise<void>, _context?: string): Promise<void> {
    try {
      await fn();
    } catch (error) {
      // Intentionally empty
    }
  }

  /**
   * Batch version of try() for question radios.
   * Attempts to set multiple radio button options, ignoring failures for optional elements.
   */
  // protected async tryOptionalRadios(pairs: ReadonlyArray<[string, string]>): Promise<void> {
  //   for (const [q, opt] of pairs) {
  //     await this.try(() => this.action.setRadioByQuestion(q, opt));
  //   }
  // }

  protected async tryOptionalRadios(pairs: ReadonlyArray<[string, string]>): Promise<void> {
    for (const [q, opt] of pairs) {
      await this.try(async () => {
        await this.action.setRadioByQuestion(q, opt);
      });
    }
  }
}