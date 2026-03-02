import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';

/**
 * KYC Savings and Investments Page Steps - handles all savings and investment-related questions
 * Refactored to follow DRY principles and standardized patterns
 * Uses the enhanced BaseKYCSteps for consistent behavior
 */
export class KycSavingsAndInvestmentsPageSteps extends BaseKYCSteps {
  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
  }

  /**
   * Main method to complete the entire Savings & Investments page
   * Uses the standardized KYC page completion flow
   */
  public async completeKYC_SavingsAndInvestments(): Promise<void> {
    await this.completeKYCPageStandard(
      'page=savings-and-investments',
      'Savings & Investments',
      () => this.answerAllSavingsAndInvestmentsQuestions()
    );
  }

  /**
   * Answer all savings and investments-related questions
   * Each method handles one specific question using standardized patterns
   */
  private async answerAllSavingsAndInvestmentsQuestions(): Promise<void> {
    await this.answerCashSavingsOutsideFairstoneQuestion('No');
    await this.answerInvestmentsOutsideFairstoneQuestion('No');
    await this.answerIsaContributionQuestion('No');
  }

  /**
   * Answer: "Do you have any cash savings outside of Fairstone?"
   * Uses the standardized radio question pattern
   */
  private async answerCashSavingsOutsideFairstoneQuestion(answer?: string): Promise<void> {
    await this.answerRadioQuestionIfExists(
      'Do you have any cash savings outside of Fairstone?',
      answer
    );
  }

  /**
   * Answer: "Do you have any investments outside of Fairstone?"
   * Uses the standardized radio question pattern
   */
  private async answerInvestmentsOutsideFairstoneQuestion(answer?: string): Promise<void> {
    await this.answerRadioQuestionIfExists(
      'Do you have any investments outside of Fairstone?',
      answer
    );
  }

  /**
   * Answer: "Have you paid into an ISA in the current tax year?"
   * Uses the standardized radio question pattern
   */
  private async answerIsaContributionQuestion(answer?: string): Promise<void> {
    await this.answerRadioQuestionIfExists(
      'Have you paid into an ISA in the current tax year?',
      answer
    );
  }
}
