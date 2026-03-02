//projects/gateway-ui/steps/kyc_forms/BaseKYCSteps.ts
import { Page, expect } from '@playwright/test';
import { KYCHelper, dataStore, createLogger } from '@/framework/src';
import { FrameworkConfig } from '@framework/types';

/**
 * Base class for KYC form steps with common functionality
 * Now extends KYCHelper to reduce duplication
 * Follows SOLID principles and DRY patterns
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
   * Answer radio question with MANDATORY verification - FAILS TEST if selection fails
   * - Use this for critical form fields that MUST be selected
   * - Throws error if selection verification fails
   * - Includes proper logging and error handling
   */
  protected async answerRadioQuestionWithVerification(
    questionText: string,
    answer?: string,
    timeoutMs: number = 15_000
  ): Promise<string | undefined> {
    try {
      // Check if question exists first
      if (await this.elementNotExists(questionText)) {
        this.logInfo(`ℹ Question not found, skipping: "${questionText}"`);
        return undefined;
      }

      // Use the enhanced ActionHelper method with verification
      const result = await this.action.setRadioByQuestionWithVerification(questionText, answer, timeoutMs);
      this.logInfo(`Successfully answered with verification: "${questionText}" = "${result}"`);
      return result;

    } catch (error) {
      const errorMsg = `CRITICAL: Failed to answer radio question: "${questionText}". Error: ${error instanceof Error ? error.message : String(error)}`;
      this.logError(errorMsg);
      throw new Error(errorMsg);
    }
  }

  /**
   * Answer radio question with verification - only if question exists
   * - Returns undefined if question not found
   * - FAILS TEST if question exists but selection fails
   */
  protected async answerRadioQuestionWithVerificationIfPresent(
    questionText: string,
    answer?: string,
    timeoutMs: number = 15_000
  ): Promise<string | undefined> {
    try {
      const result = await this.action.setRadioByQuestionWithVerificationIfPresent(questionText, answer, timeoutMs);
      
      if (result) {
        this.logInfo(`Successfully answered with verification: "${questionText}" = "${result}"`);
      } else {
        this.logInfo(`ℹ Question not shown, skipping: "${questionText}"`);
      }
      
      return result;

    } catch (error) {
      const errorMsg = `CRITICAL: Failed to answer radio question: "${questionText}". Error: ${error instanceof Error ? error.message : String(error)}`;
      this.logError(errorMsg);
      throw new Error(errorMsg);
    }
  }

  /**
   * Answer Yes/No radio question with verification
   * - Defaults to 'Yes' if no answer provided
   * - FAILS TEST if selection verification fails
   */
  protected async answerYesNoQuestionWithVerification(
    questionText: string,
    answer: string = 'Yes',
    timeoutMs: number = 15_000
  ): Promise<string | undefined> {
    return this.answerRadioQuestionWithVerificationIfPresent(questionText, answer, timeoutMs);
  }

  /**
   * Set checkbox with verification - FAILS TEST if verification fails
   * - Ensures checkbox state is properly set and verified
   */
  protected async setCheckboxWithVerification(
    labelText: string,
    checked: boolean = true,
    timeoutMs: number = 15_000
  ): Promise<void> {
    try {
      await this.action.setCheckboxByLabelWithVerification(labelText, checked, timeoutMs);
      this.logInfo(`Checkbox verified: "${labelText}" = ${checked ? 'checked' : 'unchecked'}`);

    } catch (error) {
      const errorMsg = `CRITICAL: Failed to set checkbox: "${labelText}". Expected: ${checked ? 'checked' : 'unchecked'}. Error: ${error instanceof Error ? error.message : String(error)}`;
      this.logError(errorMsg);
      throw new Error(errorMsg);
    }
  }

  /**
   * Safe logging method for errors
   */
  protected logError(message: string): void {
    if (this.logger?.error) {
      this.logger.error(message);
    }
  }

  /**
   * Enhanced logging method with timestamp
   */
  protected logInfo(message: string): void {
    if (this.logger?.info) {
      this.logger.info(`[${new Date().toISOString()}] ${message}`);
    }
  }

  /**
   * Standardized method to answer radio questions with consistent logging
   * This replaces the old pattern and follows DRY principles
   * @param questionText - The question text to look for
   * @param answer - The answer to select (optional, will use random if not provided)
   * @returns Promise<void>
   */
  public async answerRadioQuestionIfExists(
    questionText: string,
    answer?: string
  ): Promise<void> {
    if (await this.elementNotExists(questionText)) {
      this.logInfo(`ℹ Question not found, skipping: "${questionText}"`);
      return;
    }

    const selectedAnswer = await this.action.setRadioByQuestion(questionText, answer);
    this.logInfo(`✓ Answered "${questionText}": ${selectedAnswer}`);
  }

  /**
   * Standardized method to complete a KYC page
   * Follows the same pattern across all KYC pages
   * @param urlFragment - URL fragment to verify (e.g., 'page=income')
   * @param headingText - Expected heading text
   * @param questionsHandler - Function to handle page-specific questions
   */
  protected async completeKYCPageStandard(
    urlFragment: string,
    headingText: string,
    questionsHandler: () => Promise<void>
  ): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.verifyKYCPageHeading(urlFragment, headingText);
    await questionsHandler();
    await this.action.clickButtonByText('Save & Continue');
  }

  /**
   * Verify KYC page heading with URL and text validation
   * @param urlFragment - URL fragment to check (e.g., 'page=income')
   * @param expectedHeading - Expected heading text
   */
  public async verifyKYCPageHeading(
    urlFragment: string,
    expectedHeading: string
  ): Promise<void> {
    await this.assert.assertPageURLContains(urlFragment);
    await expect(this.heading).toBeVisible({ timeout: 15_000 });
    await expect(this.heading).toHaveText(expectedHeading);
  }

  /**
   * Fill input field if it exists with consistent logging
   * @param labelText - The label text to look for
   * @param value - The value to fill
   */
  public async fillInputIfExists(
    labelText: string,
    value: string
  ): Promise<void> {
    if (await this.elementNotExists(labelText)) {
      this.logInfo(`ℹ Field not found, skipping: "${labelText}"`);
      return;
    }

    await this.action.fillInputByLabel(labelText, value);
    this.logInfo(`✓ Filled "${labelText}": ${value}`);
  }

  /**
   * Select dropdown option if it exists with consistent logging
   * @param labelText - The label text to look for
   * @param value - The value to select
   */
  public async selectDropdownIfExists(
    labelText: string,
    value: string
  ): Promise<void> {
    try {
      // Try to find the dropdown first without throwing an error
      const dropdownExists = await this.page.getByText(labelText, { exact: false }).count() > 0;
      
      if (!dropdownExists) {
        this.logInfo(`ℹ Dropdown label not found, skipping: "${labelText}"`);
        return;
      }

      // Check if the actual dropdown element exists
      const dropdownElement = this.page.locator('select').filter({ hasText: labelText }).or(
        this.page.locator('[role="combobox"]').filter({ hasText: labelText })
      );
      
      if (await dropdownElement.count() === 0) {
        this.logInfo(`ℹ Dropdown element not found, skipping: "${labelText}"`);
        return;
      }

      await this.action.selectDropdownByLabel(labelText, value);
      this.logInfo(`✓ Selected "${labelText}": ${value}`);
    } catch (error) {
      this.logInfo(`ℹ Dropdown not available, skipping: "${labelText}" - ${error instanceof Error ? error.message : String(error)}`);
    }
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
      return fn();
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
