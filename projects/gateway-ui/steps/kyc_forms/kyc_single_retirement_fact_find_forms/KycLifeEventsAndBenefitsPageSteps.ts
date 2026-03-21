//KycLifeEventsAndBenefitsPageSteps

import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';

export class KycKycLifeEventsAndBenefitsPageSteps extends BaseKYCSteps {
  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
  }

  /* -------------------- Main Flow -------------------- */

  public async completeKYCKycLifeEventsAndBenefits(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.assert.assertPageURLContains('page=life-events-benefits');
    await this.assert.assertHeadingVisible('Life Events & Benefits', 15_000);

    await this.answerLifeEventsAndBenefitsQuestions();
    this.logInfo('✓ Completed all KYC Life Events And Benefits questions');

    await this.action.clickButtonByText('Save & Continue');
  }

  private async answerLifeEventsAndBenefitsQuestions(): Promise<void> {
    await this.selectMaximumStatePension('No');
    await this.fillProvideFurtherInformation(
      'Please provide further information',
      'This is to test Further Information field works'
    );

    await this.fillShortfallAmount(2);
    await this.selectMeansTestedBenefitsReceipt('Yes');

    await this.fillPostStatePensionDetails(
      'Please give details and if these are likely to continue post State Pension Age (where relevant)',
      'This is to test Post State Pension field works'
    );
    await this.selectFutureInheritanceOrWindfalls('Yes');

    await this.fillAmountAndTimescaleDetails(
      'Please give us more information on the amount and likely timescales',
      'This is to test Amount And Timescale field works'
    );
    await this.fillPensionDeathBenefitPlans(
      'What are your plans for any remaining pension benefits on death? Please provide details',
      'This is to test Pension Death Benefit Plans field works'
    );
  }

  /* -------------------- State Pension & Benefits Question Methods -------------------- */

  private async selectMaximumStatePension(answer?: string): Promise<void> {
    await this.answerRadioQuestionIfExists('Are you due the maximum State Pension?', answer);
  }

  // When 'No' is selected for maximum State Pension question
  private async fillProvideFurtherInformation(label: string, value: string): Promise<void> {
    if (await this.elementNotExists(label)) return;
    await this.action.fillInputByLabelAndAssert(label, value);
  }

  // When 'No' is selected for maximum State Pension question
  private async fillShortfallAmount(value: string | number): Promise<void> {
    const label = 'What is the shortfall?';
    const input = await this.action.findInputFieldByLabel(label);

    if (!(await this.action.ensureVisibleOrSkip(input, label))) return;
    await this.action.fillFormattedNumberInput(input, value, label);
  }

  private async selectMeansTestedBenefitsReceipt(answer?: string): Promise<void> {
    await this.answerRadioQuestionIfExists(
      'Are you in receipt of any means tested benefits?',
      answer
    );
  }

  private async fillPostStatePensionDetails(label: string, value: string): Promise<void> {
    if (await this.elementNotExists(label)) return;
    await this.action.fillInputByLabelAndAssert(label, value);
  }

  /* -------------------- Inheritance & Windfalls Question Methods -------------------- */

  private async selectFutureInheritanceOrWindfalls(answer?: string): Promise<void> {
    await this.answerRadioQuestionIfExists(
      'Are you expecting any inheritances or windfalls in the future?',
      answer
    );
  }

  private async fillAmountAndTimescaleDetails(label: string, value: string): Promise<void> {
    if (await this.elementNotExists(label)) return;
    await this.action.fillInputByLabelAndAssert(label, value);
  }

  /* -------------------- Death Question Methods -------------------- */

  private async fillPensionDeathBenefitPlans(label: string, value: string): Promise<void> {
    if (await this.elementNotExists(label)) return;
    await this.action.fillInputByLabelAndAssert(label, value);
  }
}