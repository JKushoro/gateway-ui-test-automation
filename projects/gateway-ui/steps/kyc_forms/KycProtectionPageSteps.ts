import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';

/**
 * KYC Protection Page Steps - handles all protection-related questions
 * Refactored to follow DRY principles and standardized patterns
 * Uses the enhanced BaseKYCSteps for consistent behavior
 */
export class KycProtectionPageSteps extends BaseKYCSteps {
  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
  }

  /**
   * Main method to complete the entire Protection page
   * Uses the standardized KYC page completion flow
   */
  public async completeKYC_Protection(): Promise<void> {
    await this.completeKYCPageStandard(
      'page=protection',
      'Protection',
      () => this.answerAllProtectionQuestions()
    );
  }

  /**
   * Answer all protection-related questions
   * Each method handles one specific question using standardized patterns
   */
  private async answerAllProtectionQuestions(): Promise<void> {
    await this.answerIncomeProtectionQuestion('No');
    await this.answerLifeOrCriticalIllnessCoverQuestion('No');
    await this.answerPrivateMedicalInsuranceQuestion('No');
  }

  /**
   * Answer: "Do you have any income protection (not provided by an employer)?"
   * Uses the standardized radio question pattern
   */
  private async answerIncomeProtectionQuestion(answer?: string): Promise<void> {
    await this.answerRadioQuestionIfExists(
      'Do you have any income protection (not provided by an employer)?',
      answer
    );
  }

  /**
   * Answer: "Do you have any life insurance or critical illness cover (not provided by an employer)?"
   * Uses the standardized radio question pattern
   */
  private async answerLifeOrCriticalIllnessCoverQuestion(answer?: string): Promise<void> {
    await this.answerRadioQuestionIfExists(
      'Do you have any life insurance or critical illness cover (not provided by an employer)?',
      answer
    );
  }

  /**
   * Answer: "Do you have any Private Medical Insurance (not provided by an employer)?"
   * Uses the standardized radio question pattern
   */
  private async answerPrivateMedicalInsuranceQuestion(answer?: string): Promise<void> {
    await this.answerRadioQuestionIfExists(
      'Do you have any Private Medical Insurance (not provided by an employer)?',
      answer
    );
  }
}