import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';

/**
 * KYC Income Page Steps - handles all income-related questions
 * Refactored to follow DRY principles and standardized patterns
 * Uses the enhanced BaseKYCSteps for consistent behavior
 */
export class KycIncomePageSteps extends BaseKYCSteps {
  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
  }

  /**
   * Main method to complete the entire Income page
   * Uses the standardized KYC page completion flow
   */
  public async completeKYC_Income(): Promise<void> {
    await this.assert.assertPageURLContains('page=income');
    await this.assert.assertHeadingVisible('Income', 15_000);

    await this.answerAllIncomeQuestions();
    this.logInfo('✓ Completed all KYC Income questions');

    await this.action.clickButtonByText('Save & Continue');
  }

  /**
   * Answer all income-related questions
   * Each method handles one specific question using standardized patterns
   */
  private async answerAllIncomeQuestions(): Promise<void> {
    await this.answerOtherIncomeSourceQuestion('No');
    await this.answerEarnerTypeQuestion('Joint');
    await this.selectIncomeSourceOption('Employed Salary');
    await this.fillGrossAnnualIncomeField('£90,000');
  }

  /**
   * Answer: "Do you have any other income source?"
   * Uses the standardized radio question pattern
   */
  private async answerOtherIncomeSourceQuestion(answer?: string): Promise<void> {
    await this.answerRadioQuestionIfExists(
      'Do you have any other income source?',
      answer
    );
  }

  /**
   * Answer: "Earner" question
   * Uses the standardized radio question pattern
   */
  private async answerEarnerTypeQuestion(answer?: string): Promise<void> {
    await this.answerRadioQuestionIfExists('Earner', answer);
  }

  /**
   * Select income source from dropdown
   * Uses the standardized dropdown selection pattern
   */
  private async selectIncomeSourceOption(answer: string): Promise<void> {
    await this.selectDropdownIfExists('Income source', answer);
  }

  /**
   * Fill gross annual income field
   * Uses the standardized input filling pattern
   */
  private async fillGrossAnnualIncomeField(value: string): Promise<void> {
    await this.fillInputIfExists('Gross annual income', value);
  }
}