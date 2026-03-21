
import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { expect, Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';
import {
  KYCKycFuturePlanningPageLocator
} from '@pages/kycElementLocators/kyc_retirement_fact_find_locator/KYCKycFuturePlanningPageLocator';
import { KYCDatePickerService } from '@steps/components/KYCDatePickerService';

export class KycFuturePlanningPageSteps extends BaseKYCSteps {
  private readonly locators: KYCKycFuturePlanningPageLocator;
  private readonly datePicker: KYCDatePickerService;
  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);

    this.locators = new KYCKycFuturePlanningPageLocator(page);
    this.datePicker = new KYCDatePickerService(page);
  }

  /* -------------------- Main Flow -------------------- */

  public async completeKYCKycFuturePlanning(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.assert.assertPageURLContains('page=futureplanning');
    await this.assert.assertHeadingVisible('Future Planning', 15_000);

    await this.answerFuturePlanningQuestions();
    this.logInfo('✓ Completed all KYC Future Planning questions');

    await this.action.clickButtonByText('Save & Continue');
  }

  private async answerFuturePlanningQuestions(): Promise<void> {
    await this.fillRetirementPlans(
      'What are your retirement plans? Please provide details of short and longer term plans',
      'This is to test Retirement Plans field works'
    );
    await this.selectRetirementMoveIntent('Yes');

    await this.fillFurtherInformation(
      'Please provide further information',
      'This is to test Further Information field works'
    );
    await this.fillEssentialExpenditureChanges(
      'What changes do you expect to your Essential Expenditure? Please provide details',
      'This is to test Essential Expenditure Changes field works'
    );

    await this.fillDiscretionaryExpenditureChanges(
      'What changes do you expect to your Discretionary Expenditure? Please provide details',
      'This is to test Discretionary Expenditure Changes field works'
    );

    await this.selectOneOffEventsPlanning('Yes');
    await this.setRetirementOneOffEventDate(0, 1, 1);

    await this.fillFirstRetirementAmount(200000);
    await this.fillRetirementIncomeSourcesDetails(
      'What sources of income and/ or capital do you wish to designate for your retirement? Please provide details',
      'This is to test Retirement IncomeSources field works'
    );

    await this.fillGuaranteedIncomeEssentialExpenditureDetails(
      'How do you feel about securing a guaranteed income to meet your Essential expenditure in retirement? Please provide details',
      'This is to test Guaranteed Income Essential Expenditure field works'
    );
    await this.fillGuaranteedIncomeForOtherExpenditureDetails(
      'How do you feel about securing guaranteed income to meet other expenditure in retirement? Please provide details',
      'This is to test Guaranteed Income For Other Expenditure field works'
    );
  }

  /* -------------------- Retirement Planning Question Methods -------------------- */

  private async fillRetirementPlans(label: string, value: string): Promise<void> {
    if (await this.elementNotExists(label)) return;
    await this.action.fillInputByLabelAndAssert(label, value);
  }

  private async selectRetirementMoveIntent(answer?: string): Promise<void> {
    await this.answerRadioQuestionIfExists('Do you intend to move in retirement?', answer);
  }

  private async fillFurtherInformation(label: string, value: string): Promise<void> {
    if (await this.elementNotExists(label)) return;
    await this.action.fillInputByLabelAndAssert(label, value);
  }

  private async fillEssentialExpenditureChanges(label: string, value: string): Promise<void> {
    if (await this.elementNotExists(label)) return;
    await this.action.fillInputByLabelAndAssert(label, value);
  }

  private async fillDiscretionaryExpenditureChanges(label: string, value: string): Promise<void> {
    if (await this.elementNotExists(label)) return;
    await this.action.fillInputByLabelAndAssert(label, value);
  }

  private async selectOneOffEventsPlanning(answer?: string): Promise<void> {
    await this.answerRadioQuestionIfExists(
      'Do you have any specific one-off events to plan for?',
      answer
    );
  }

  public async setRetirementOneOffEventDate(
    rowIndex: number,
    minYearsAgo: number,
    maxYearsAgo: number
  ): Promise<string | undefined> {
    const input = this.locators.getRetirementOneOffEventDateInput(rowIndex);

    if (!(await this.action.ensureVisibleOrSkip(input, 'Retirement one-off event date'))) {
      return undefined;
    }

    const date = this.datePicker.generateRandomPastDate(minYearsAgo, maxYearsAgo);

    await input.fill(date);
    await expect(input).toHaveValue(date);

    return date;
  }

  private async fillFirstRetirementAmount(value: string | number): Promise<void> {
    const input = this.locators.firstRetirementAmount(0);

    if (!(await this.action.ensureVisibleOrSkip(input, 'First retirement amount'))) return;
    await this.action.fillFormattedNumberInput(input, value, 'First retirement amount');
  }

  private async fillRetirementIncomeSourcesDetails(label: string, value: string): Promise<void> {
    if (await this.elementNotExists(label)) return;
    await this.action.fillInputByLabelAndAssert(label, value);
  }

  private async fillGuaranteedIncomeEssentialExpenditureDetails(
    label: string,
    value: string
  ): Promise<void> {
    if (await this.elementNotExists(label)) return;
    await this.action.fillInputByLabelAndAssert(label, value);
  }

  private async fillGuaranteedIncomeForOtherExpenditureDetails(
    label: string,
    value: string
  ): Promise<void> {
    if (await this.elementNotExists(label)) return;
    await this.action.fillInputByLabelAndAssert(label, value);
  }
}