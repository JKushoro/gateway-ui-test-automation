// projects/gateway-ui/steps/kyc_forms/KycIncomePageSteps.refactored.ts
// Refactored version - cleaner, less duplication, easier to understand

import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import {
  Page,
  FrameworkConfig,
} from '@/framework/src';

/**
 * KYC Income Page Steps - handles all income-related questions
 * Simple, clean implementation with no code duplication
 */
export class KycIncomePageSteps extends BaseKYCSteps {
  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
  }

  /**
   * Main method to complete the entire Income page
   * Uses the standardized KYC page completion flow
   */
  public async completeIncomeSection(): Promise<void> {
    await this.completeKYCPage(
      'page=income',
      'Income',
      () => this.answerAllIncomeQuestions()
    );
  }

  /**
   * Answer all income-related questions
   * Each method handles one specific question
   */
  private async answerAllIncomeQuestions(): Promise<void> {
    await this.answerOtherIncomeSourceQuestion('No');
    await this.answerEarnerTypeQuestion('Joint');
    await this.selectIncomeSourceOption('Employment');
    await this.fillGrossAnnualIncomeField('£90,000');
  }

  /**
   * Answer: "Do you have any other income source?"
   * Can specify 'Yes', 'No', or leave blank for random selection
   */
  private async answerOtherIncomeSourceQuestion(answer?: string): Promise<void> {
    await this.answerRadioQuestionIfExists(
      'Do you have any other income source?',
      answer
    );
  }

  /**
   * Answer the earner type question (Single/Joint)
   * Uses the helper method to avoid duplication
   */
  private async answerEarnerTypeQuestion(answer?: string): Promise<void> {
    await this.answerRadioQuestionIfExists('Earner', answer);
  }

  /**
   * Select income source from dropdown
   * Uses the helper method to avoid duplication
   */
  private async selectIncomeSourceOption(value?: string): Promise<void> {
    await this.selectDropdownIfExists('Income source', value);
  }

  /**
   * Fill the gross annual income field
   * Uses the helper method to avoid duplication
   */
  private async fillGrossAnnualIncomeField(value: string): Promise<void> {
    await this.fillInputIfExists('Gross annual income', value);
  }
}