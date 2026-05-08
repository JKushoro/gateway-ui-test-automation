// framework/src/services/ClickService.ts
import { Locator, Page } from '@playwright/test';
import { FrameworkConfig } from '../types';
import { createLogger, ILogger } from '../utils/Logger';
import { WaitHelper } from '../helpers/WaitHelper';

/**
 * ClickService - Handles all click-related interactions
 * Single Responsibility: Click operations only
 */
export class ClickService {
  private readonly logger: ILogger;
  private readonly waitHelper: WaitHelper;

  constructor(
    private readonly page: Page,
    private readonly config: Partial<FrameworkConfig>
  ) {
    this.logger = createLogger('ClickService');
    this.waitHelper = new WaitHelper(page, config);
  }

  /**
   * Click a locator with proper waiting and error handling
   */
  async click(locator: Locator, options?: { timeout?: number; force?: boolean }): Promise<void> {
    const timeout = options?.timeout || this.config.timeout || 30000;
    
    try {
      await locator.waitFor({ state: 'visible', timeout });
      await locator.waitFor({ state: 'attached', timeout });
      
      // Check if element is enabled before clicking (unless force is true)
      if (!options?.force) {
        const isEnabled = await locator.isEnabled({ timeout });
        if (!isEnabled) {
          throw new Error('Element is not enabled');
        }
      }
      
      await locator.click({ timeout, force: options?.force });
      this.logger.debug('Click successful');
      
    } catch (error) {
      this.logger.error(`Click failed: ${error}`);
      throw new Error(`Unable to click element: ${error}`);
    }
  }

  /**
   * Double-click a locator
   */
  async doubleClick(locator: Locator, options?: { timeout?: number }): Promise<void> {
    const timeout = options?.timeout || this.config.timeout || 30000;
    
    try {
      await locator.waitFor({ state: 'visible', timeout });
      await locator.dblclick({ timeout });
      this.logger.debug('Double-click successful');
      
    } catch (error) {
      this.logger.error(`Double-click failed: ${error}`);
      throw new Error(`Unable to double-click element: ${error}`);
    }
  }

  /**
   * Right-click (context menu) on a locator
   */
  async rightClick(locator: Locator, options?: { timeout?: number }): Promise<void> {
    const timeout = options?.timeout || this.config.timeout || 30000;
    
    try {
      await locator.waitFor({ state: 'visible', timeout });
      await locator.click({ button: 'right', timeout });
      this.logger.debug('Right-click successful');
      
    } catch (error) {
      this.logger.error(`Right-click failed: ${error}`);
      throw new Error(`Unable to right-click element: ${error}`);
    }
  }

  /**
   * Click at specific coordinates
   */
  async clickAt(x: number, y: number): Promise<void> {
    try {
      await this.page.mouse.click(x, y);
      this.logger.debug(`Clicked at coordinates (${x}, ${y})`);
      
    } catch (error) {
      this.logger.error(`Click at coordinates failed: ${error}`);
      throw new Error(`Unable to click at coordinates (${x}, ${y}): ${error}`);
    }
  }
}