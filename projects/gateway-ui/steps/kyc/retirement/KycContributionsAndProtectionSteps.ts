
import { BaseKYCSteps } from '@steps/kyc/BaseKYCSteps';
import { expect, Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';
import {
  KycPersonalDetailsPageLocators
} from '@pages/kycElementLocators/kyc_core_fact_find_locators/KycPersonalDetailsPageLocators';
import {
  KycContributionsAndProtectionPageLocators
} from '@pages/kycElementLocators/kyc_retirement_fact_find_locator/KycContributionsAndProtectionPageLocators';

export class KycContributionsAndProtectionSteps extends BaseKYCSteps {
  private readonly locators: KycContributionsAndProtectionPageLocators;

  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);

    this.locators = new KycContributionsAndProtectionPageLocators(page);
  }

  /* -------------------- Main Flow -------------------- */

  public async completeKycContributionsAllowancesAndProtection(): Promise<void> {
    await this.assert.assertPageURLContains('page=contributions-allowances-protection');

    await this.answerContributionsAllowancesAndProtectionQuestions();
    this.logInfo('✓ Completed all KYC Contributions Allowances And Protection questions');

    await this.action.clickButtonByText('Save & Continue');
  }

  public async answerContributionsAllowancesAndProtectionQuestions(): Promise<void> {
    await this.selectPensionContributionIntent('Yes');
    await this.enterContributionDetails('This is to test Contribution field works');

    await this.selectAnnualAllowanceExceedance('Yes');
    await this.enterAnnualAllowanceDetails('This is to test Annual Allowance field works');

    await this.selectCarryForward('Yes');
    await this.enterCarryForwardDetails('This is to test Carry Forward field works');
  }

  /* -------------------- Question Methods -------------------- */

  public async selectPensionContributionIntent(answer?: string): Promise<void> {
    await this.answerRadioQuestionIfExists(
      'Are you planning to contribute to/remain an active member of a pension scheme?',
      answer
    );
  }

  public async enterContributionDetails(value: string): Promise<void> {
    const input = this.locators.contributeDetails;
    const label = 'Contribute Details';

    if (!(await this.action.ensureVisibleOrSkip(input, label))) return;

    await input.fill(value);
    await expect(input).toHaveValue(value);
  }

  public async selectAnnualAllowanceExceedance(answer?: string): Promise<void> {
    await this.answerRadioQuestionIfExists(
      'Are you in a position to contribute more than your annual allowance in the current tax year?',
      answer
    );
  }

  public async enterAnnualAllowanceDetails(value: string): Promise<void> {
    const input = this.locators.annualAllowanceDetails;
    const label = 'Annual Allowance Details';

    if (!(await this.action.ensureVisibleOrSkip(input, label))) return;

    await input.fill(value);
    await expect(input).toHaveValue(value);
  }

  public async selectCarryForward(answer?: string): Promise<void> {
    await this.answerRadioQuestionIfExists(
      'Have you made use of carry forward in the last three years?',
      answer
    );
  }

  public async enterCarryForwardDetails(value: string): Promise<void> {
    const input = this.locators.carryForwardDetails;
    const label = 'Carry Forward Details';

    if (!(await this.action.ensureVisibleOrSkip(input, label))) return;

    await input.fill(value);
    await expect(input).toHaveValue(value);
  }
}
