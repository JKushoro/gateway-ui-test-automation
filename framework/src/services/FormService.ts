// framework/src/services/FormService.ts
import { Locator, Page } from '@playwright/test';
import { IFormService, BaseOptions, FillOptions } from '../interfaces/IUIServices';
import { FrameworkConfig } from '../types';
import { createLogger, ILogger } from '../utils/Logger';

/**
 * FormService - Clean implementation for form interactions
 * 
 * SOLID Principles Applied:
 * - Single Responsibility: Only handles form operations
 * - Interface Segregation: Implements only IFormService methods
 * - Dependency Inversion: Depends on abstractions (interfaces)
 * - Open/Closed: Open for extension via interface, closed for modification
 */
export class FormService implements IFormService {
  private readonly logger: ILogger;
  private readonly defaultTimeout: number;

  constructor(
    private readonly page: Page,
    config: Partial<FrameworkConfig> = {}
  ) {
    this.logger = createLogger('FormService');
    this.defaultTimeout = config.timeout ?? 30000;
  }

  async fillInput(locator: Locator, value: string, options: FillOptions = {}): Promise<void> {
    const timeout = options.timeout ?? this.defaultTimeout;
    const shouldClear = options.clear ?? true;
    
    try {
      await this.waitForElementReady(locator, timeout);
      
      if (shouldClear) {
        await locator.clear({ timeout });
      }
      
      await locator.fill(value, { timeout });
      this.logger.debug(`Successfully filled input with: "${value}"`);
      
    } catch (error) {
      this.handleError('fillInput', error, { value });
    }
  }

  async selectByValue(locator: Locator, value: string, options: BaseOptions = {}): Promise<void> {
    const timeout = options.timeout ?? this.defaultTimeout;
    
    try {
      await this.waitForElementReady(locator, timeout);
      await locator.selectOption({ value }, { timeout });
      this.logger.debug(`Successfully selected option by value: "${value}"`);
      
    } catch (error) {
      this.handleError('selectByValue', error, { value });
    }
  }

  async selectByText(locator: Locator, text: string, options: BaseOptions = {}): Promise<void> {
    const timeout = options.timeout ?? this.defaultTimeout;
    
    try {
      await this.waitForElementReady(locator, timeout);
      await locator.selectOption({ label: text }, { timeout });
      this.logger.debug(`Successfully selected option by text: "${text}"`);
      
    } catch (error) {
      this.handleError('selectByText', error, { text });
    }
  }

  async check(locator: Locator, options: BaseOptions = {}): Promise<void> {
    const timeout = options.timeout ?? this.defaultTimeout;
    
    try {
      await this.waitForElementReady(locator, timeout);
      await locator.check({ timeout });
      this.logger.debug('Successfully checked checkbox');
      
    } catch (error) {
      this.handleError('check', error);
    }
  }

  async uncheck(locator: Locator, options: BaseOptions = {}): Promise<void> {
    const timeout = options.timeout ?? this.defaultTimeout;
    
    try {
      await this.waitForElementReady(locator, timeout);
      await locator.uncheck({ timeout });
      this.logger.debug('Successfully unchecked checkbox');
      
    } catch (error) {
      this.handleError('uncheck', error);
    }
  }

  // Private helper methods (following Single Responsibility)
  private async waitForElementReady(locator: Locator, timeout: number): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.waitFor({ state: 'attached', timeout });
  }

  private handleError(operation: string, error: unknown, context?: Record<string, any>): never {
    const contextStr = context ? ` Context: ${JSON.stringify(context)}` : '';
    const message = `FormService.${operation} failed: ${error}${contextStr}`;
    
    this.logger.error(message);
    throw new Error(message);
  }
}