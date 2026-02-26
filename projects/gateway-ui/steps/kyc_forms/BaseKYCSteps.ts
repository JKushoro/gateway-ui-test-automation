//projects/gateway-ui/steps/kyc_forms/BaseKYCSteps.ts
import { Page } from '@playwright/test';
import { KYCHelper, dataStore, createLogger } from '@/framework/src';
import { FrameworkConfig } from '@framework/types';

/**
 * Base class for KYC form steps with common functionality
 * Now extends KYCHelper to reduce duplication
 */
export class BaseKYCSteps extends KYCHelper {

  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    // Initialize with a logger to prevent undefined errors
    const logger = createLogger('BaseKYCSteps');
    super(page, logger, config);
  }

  /**
   * Persist key/value pairs under a prefix in the data store
   */
  protected persist(prefix: string, obj: Record<string, unknown>): void {
    for (const [key, value] of Object.entries(obj)) {
      dataStore.setValue(`${prefix}.${key}`, value);
    }
  }

  /**
   * Check if an element with the given text exists on the page
   * @param text - The text to search for
   * @param exact - Whether to match exactly (default: false)
   * @returns Promise<boolean> - True if element exists, false otherwise
   */
  protected async elementExists(text: string, exact: boolean = false): Promise<boolean> {
    try {
      const count = await this.page.getByText(text, { exact }).count();
      return count > 0;
    } catch {
      return false;
    }
  }

  /**
   * Check if an element with the given text does NOT exist on the page
   * @param text - The text to search for
   * @param exact - Whether to match exactly (default: false)
   * @returns Promise<boolean> - True if element does NOT exist, false otherwise
   */
  protected async elementNotExists(text: string, exact: boolean = false): Promise<boolean> {
    return !(await this.elementExists(text, exact));
  }

  /**
   * Execute a function only if an element with the given text exists
   * @param text - The text to search for
   * @param fn - The function to execute if element exists
   * @param exact - Whether to match exactly (default: false)
   */
  protected async ifElementExists<T>(
    text: string,
    fn: () => Promise<T> | T,
    exact: boolean = false
  ): Promise<T | undefined> {
    if (await this.elementExists(text, exact)) {
      return await fn();
    }
    return undefined;
  }

  /**
   * Return early from a function if an element with the given text does NOT exist
   * @param text - The text to search for
   * @param returnValue - The value to return if element doesn't exist
   * @param exact - Whether to match exactly (default: false)
   */
  protected async returnIfElementNotExists<T>(
    text: string,
    returnValue?: T,
    exact: boolean = false
  ): Promise<T | undefined> {
    if (await this.elementNotExists(text, exact)) {
      return returnValue;
    }
    return undefined;
  }
}
