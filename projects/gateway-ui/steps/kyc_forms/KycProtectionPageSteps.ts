import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { expect, Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';

export class KycProtectionPageSteps extends BaseKYCSteps {
  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
  }

  /* -------------------- Verification -------------------- */
  /** Verify the Protection heading is visible */
  public async verifyProtectionHeading(): Promise<void> {
    await this.assert.assertPageURLContains('page=protection');

    await expect(this.heading).toBeVisible({ timeout: 15_000 });
    await expect(this.heading).toHaveText('Protection');
  }

  /* -------------------- Main Flow  -------------------- */
  /** Complete the KYC Protection section */
  public async completeKYC_Protection(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');

    await this.verifyProtectionHeading();
    await this.answerProtectionQuestions();
    await this.action.clickButtonByText('Save & Continue');
  }

  private async answerProtectionQuestions(): Promise<void> {
    await this.answerIncomeProtectionOutsideEmployer();
    await this.answerLifeOrCriticalIllnessCoverOutsideEmployer();
    await this.answerPrivateMedicalInsuranceOutsideEmployer();
  }

  /* -------------------- Questions (split into methods) -------------------- */

  private async answerIncomeProtectionOutsideEmployer(answer: string = 'No'): Promise<void> {
    await this.action.setRadioByQuestion(
      'Do you have any income protection (not provided by an employer)?',
      answer
    );
    this.logInfo(`✓ Answered income protection outside employer: ${answer}`);
  }

  private async answerLifeOrCriticalIllnessCoverOutsideEmployer(
    answer: string = 'No'
  ): Promise<void> {
    await this.action.setRadioByQuestion(
      'Do you have any life insurance or critical illness cover (not provided by an employer)?',
      answer
    );
    this.logInfo(`✓ Answered life or critical illness cover outside employer: ${answer}`);
  }

  private async answerPrivateMedicalInsuranceOutsideEmployer(answer: string = 'No'): Promise<void> {
    await this.action.setRadioByQuestion(
      'Do you have any Private Medical Insurance (not provided by an employer)?',
      answer
    );
    this.logInfo(`✓ Answered private medical insurance outside employer: ${answer}`);
  }
}