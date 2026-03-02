import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';

/**
 * KYC Pensions Page Steps - handles all pension-related questions
 * Refactored to follow DRY principles and standardized patterns
 * Uses the enhanced BaseKYCSteps for consistent behavior
 */
export class KycPensionsPageSteps extends BaseKYCSteps {
  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
  }

  /**
   * Main method to complete the entire Pensions page
   * Uses the standardized KYC page completion flow
   */
  public async completeKYC_Pensions(): Promise<void> {
    await this.completeKYCPageStandard(
      'page=pensions',
      'Pensions',
      () => this.answerAllPensionQuestions()
    );
  }

  /**
   * Answer all pension-related questions
   * Each method handles one specific question using standardized patterns
   */
  private async answerAllPensionQuestions(): Promise<void> {
    await this.answerWorkplacePensionQuestion('No');
    await this.answerPreviousEmploymentPensionsQuestion('No');
    await this.answerOtherPensionsQuestion('No');
    await this.answerStatePensionForecastQuestion('No');
  }

  /**
   * Answer: "Are you an active member of a workplace pension scheme?"
   * Uses the standardized radio question pattern with verification
   */
  private async answerWorkplacePensionQuestion(answer?: string): Promise<void> {
    await this.answerRadioQuestionWithVerificationIfPresent(
      'Are you an active member of a workplace pension scheme?',
      answer
    );
  }

  /**
   * Answer: "Do you have any pensions from previous employment?"
   * Uses the standardized radio question pattern with verification
   */
  private async answerPreviousEmploymentPensionsQuestion(answer?: string): Promise<void> {
    await this.answerRadioQuestionWithVerificationIfPresent(
      'Do you have any pensions from previous employment?',
      answer
    );
  }

  /**
   * Answer: "Do you have any other pensions?"
   * Uses the standardized radio question pattern with verification
   */
  private async answerOtherPensionsQuestion(answer?: string): Promise<void> {
    await this.answerRadioQuestionWithVerificationIfPresent(
      'Do you have any other pensions?',
      answer
    );
  }

  /**
   * Answer: "Have you requested a state pension forecast?"
   * Uses the standardized radio question pattern with verification
   */
  private async answerStatePensionForecastQuestion(answer?: string): Promise<void> {
    await this.answerRadioQuestionWithVerificationIfPresent(
      'Have you requested a state pension forecast?',
      answer
    );
  }
}