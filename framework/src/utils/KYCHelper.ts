// framework/src/utils/KYCHelper.ts
// Utility class for common KYC form patterns and operations
import { Page, Locator, expect } from '@playwright/test';
import { ILogger } from './Logger';
import { QuestionHelper } from './QuestionHelper';
import { ActionHelper } from '../helpers/ActionHelper';
import { AssertionHelper } from '../helpers/AssertionHelper';
import { FrameworkConfig } from '../types';
import { UI_SELECTORS } from '../constants/CommonConstants';

export class KYCHelper {
  protected questionHelper: QuestionHelper;
  protected action: ActionHelper;
  protected assert: AssertionHelper;

  constructor(
    protected page: Page,
    protected logger?: ILogger,
    config?: Partial<FrameworkConfig>
  ) {
    this.questionHelper = new QuestionHelper(page, logger);
    this.action = new ActionHelper(page, config);
    this.assert = new AssertionHelper(page, config);
  }

  /**
   * Safe logging method that handles undefined logger
   */
  protected logInfo(message: string): void {
    if (this.logger?.info) {
      this.logger.info(message);
    }
  }

  /**
   * Get the common KYC page heading locator
   */
  public get heading(): Locator {
    return this.page.getByTestId(UI_SELECTORS.FORM_HEADING);
  }

  /**
   * Verify KYC page heading with URL and text validation
   * @param urlFragment - URL fragment to check (e.g., 'page=income')
   * @param expectedHeading - Expected heading text
   * @param timeout - Timeout in milliseconds (uses default from constants)
   */
  public async verifyKYCPageHeading(
    urlFragment: string,
    expectedHeading: string,
    timeout: number = UI_SELECTORS.DEFAULTS.TIMEOUT
  ): Promise<void> {
    await this.assert.assertPageURLContains(urlFragment);
    await expect(this.heading).toBeVisible({ timeout });
    await expect(this.heading).toHaveText(expectedHeading);
  }

  /**
   * Standard KYC page completion flow
   * @param urlFragment - URL fragment to verify
   * @param headingText - Expected heading text
   * @param questionsHandler - Function to handle page-specific questions
   * @param continueButtonText - Text for continue button (uses default from constants)
   */
  public async completeKYCPage(
    urlFragment: string,
    headingText: string,
    questionsHandler: () => Promise<void>,
    continueButtonText: string = UI_SELECTORS.SAVE_CONTINUE
  ): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.verifyKYCPageHeading(urlFragment, headingText);
    await questionsHandler();
    await this.action.clickButtonByText(continueButtonText);
  }

  /**
   * Fill an input field if the label exists
   * @param labelText - The label text to look for
   * @param value - The value to fill
   * @param exact - Whether to use exact text matching (default: false)
   */
  public async fillInputIfExists(
    labelText: string,
    value: string,
    exact: boolean = false
  ): Promise<void> {
    if (await this.questionHelper.isQuestionVisible(labelText, exact)) {
      await this.action.fillInputByLabel(labelText, value);
      this.logInfo(`✓ Filled "${labelText}": ${value}`);
    } else {
      this.logInfo(`Field "${labelText}" not present, skipping`);
    }
  }

  /**
   * Select from dropdown if the label exists
   * @param labelText - The label text to look for
   * @param value - The value to select
   * @param exact - Whether to use exact text matching (default: false)
   */

  public async selectDropdownIfExists(
    labelText: string,
    value?: string,
    exact: boolean = false
  ): Promise<void> {
    if (await this.questionHelper.isQuestionVisible(labelText, exact)) {
      const chosen = await this.action.selectDropdownByLabel(labelText, value); // value can be undefined
      await expect(this.page.getByText(chosen, { exact: false }).first()).toBeVisible();
      this.logInfo(`✓ Selected "${labelText}": ${chosen}`);
    } else {
      this.logInfo(`Dropdown "${labelText}" not present, skipping`);
    }
  }

  /**
   * Answer a radio question if it exists on the page
   * @param questionText - The question text to look for
   * @param answer - The answer to select
   * @param exact - Whether to use exact text matching (default: false)
   */
  public async answerRadioQuestionIfExists(
    questionText: string,
    answer?: string,
    exact: boolean = false
  ): Promise<void> {
    if (await this.questionHelper.isQuestionVisible(questionText, exact)) {
      await this.action.setRadioByQuestion(questionText, answer);
      this.logInfo(`✓ Answered "${questionText}": ${answer}`);
    } else {
      this.logInfo(`Question "${questionText}" not present, skipping`);
    }
  }

  /**
   * Check if an aria group is visible
   * @param id - The aria-labelledby id
   */
  public async isAriaGroupVisible(id: string): Promise<boolean> {
    return this.page.locator(`[aria-labelledby="${id}"] label`).first().isVisible();
  }

  /**
   * Normalize date format from dd-MM-yyyy to dd/MM/yyyy
   * @param value - Date string to normalize
   */
  public normalizeDate(value?: string): string | undefined {
    return value ? value.trim().replace(/-/g, '/') : undefined;
  }

  /**
   * Click a button by text if it exists
   * @param buttonText - The button text to look for
   * @param exact - Whether to use exact text matching (default: false)
   */
  public async clickButtonIfExists(buttonText: string, exact: boolean = false): Promise<void> {
    const btn = this.page.getByText(buttonText, { exact }).first();
    if (await btn.count()) {
      await btn.click();
      this.logInfo(`✓ Clicked button: ${buttonText}`);
    } else {
      this.logInfo(`Button "${buttonText}" not present, skipping`);
    }
  }
}