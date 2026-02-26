// framework/src/utils/QuestionHelper.ts
// Utility class to handle common question visibility and interaction patterns

import { Page, Locator } from '@playwright/test';
import { ILogger } from './Logger';

export class QuestionHelper {
  constructor(
    private page: Page,
    private logger?: ILogger
  ) {}

  /**
   * Check if a question/field is visible on the page
   * @param labelText - The text to search for
   * @param exact - Whether to use exact matching (default: false)
   * @returns Promise<boolean> - true if visible, false otherwise
   */
  public async isQuestionVisible(labelText: string, exact: boolean = false): Promise<boolean> {
    const count = await this.page.getByText(labelText, { exact }).count();
    return count > 0;
  }

  /**
   * Check if a question is visible and log if not present
   * @param labelText - The text to search for
   * @param skipMessage - Message to log if question is not present
   * @param exact - Whether to use exact matching (default: false)
   * @returns Promise<boolean> - true if visible, false if should skip
   */
  public async isQuestionVisibleOrSkip(
    labelText: string, 
    skipMessage?: string,
    exact: boolean = false
  ): Promise<boolean> {
    const isVisible = await this.isQuestionVisible(labelText, exact);
    
    if (!isVisible && skipMessage) {
      this.logger?.info?.(skipMessage);
    }
    
    return isVisible;
  }

  /**
   * Get a question locator by text
   * @param questionText - The question text to find
   * @param exact - Whether to use exact matching (default: false)
   * @returns Locator - The question locator
   */
  public getQuestionLocator(questionText: string, exact: boolean = false): Locator {
    return this.page.getByText(questionText, { exact });
  }

  /**
   * Check if a question exists and return early if not
   * @param labelText - The text to search for
   * @param methodName - Name of the calling method for logging
   * @param exact - Whether to use exact matching (default: false)
   * @returns Promise<boolean> - true if should continue, false if should return early
   */
  public async checkQuestionExistsOrReturn(
    labelText: string,
    methodName?: string,
    exact: boolean = false
  ): Promise<boolean> {
    const exists = await this.isQuestionVisible(labelText, exact);
    
    if (!exists && methodName) {
      this.logger?.info?.(`${methodName}: Question "${labelText}" not present, skipping`);
    }
    
    return exists;
  }

  /**
   * Wait for a question to be visible
   * @param questionText - The question text to wait for
   * @param timeout - Timeout in milliseconds (default: 5000)
   * @param exact - Whether to use exact matching (default: false)
   * @returns Promise<Locator> - The visible question locator
   */
  public async waitForQuestion(
    questionText: string,
    timeout: number = 5000,
    exact: boolean = false
  ): Promise<Locator> {
    const locator = this.getQuestionLocator(questionText, exact);
    await locator.waitFor({ state: 'visible', timeout });
    return locator;
  }
}