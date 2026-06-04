
import { BaseKYCSteps } from '@steps/kyc/BaseKYCSteps';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';

export class KycAnnuityPageSteps extends BaseKYCSteps {
  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
  }

  /* -------------------- Main Flow -------------------- */

  public async completeKYCAnnuity(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.assert.assertPageURLContains('page=personalised-annuity-quotes');
    await this.assert.assertHeadingVisible('Annuity', 15_000);

    await this.answerAnnuityQuestions();
    this.logInfo('✓ Completed all KYC Annuity questions');

    await this.action.clickButtonByText('Save and Submit');
    await this.verifyFactFindCompleted();
  }

  public async answerAnnuityQuestions(): Promise<void> {
    await this.selectPersonalisedAnnuityQuote('Yes');
    await this.fillEscalationRequirements(
      'Escalation requirements',
      'This is to test Escalation requirements field works'
    );

    await this.fillIncomeFrequency(
      'Income Frequency',
      'This is to test Income Frequency field works'
    );
    await this.fillAdvanceOrArrearsWithProportion(
      'Advanced/arrears (inc proportion)',
      'This is to test Advance Or Arrears With Proportion field works'
    );

    await this.fillGuaranteedPeriod(
      'Guaranteed period',
      'This is to test Guaranteed period field works'
    );
    await this.fillOverlapDetails(
      'Overlap (if relevant)',
      'This is to test Overlap Details field works'
    );

    await this.fillValueProtection(
      'Value Protection',
      'This is to test Value Protection field works'
    );

  }

  /* -------------------- Personalised Annuity Quotes Question Methods -------------------- */

  public async selectPersonalisedAnnuityQuote(answer?: string): Promise<void> {
    await this.answerRadioQuestionIfExists(
      'Are we considering a personalised annuity quote for the client at this time?',
      answer
    );
  }

  public async fillEscalationRequirements(label: string, value: string): Promise<void> {
    if (await this.elementNotExists(label)) {
      return;
    }
    await this.action.fillInputByLabelAndAssert(label, value);
  }

  public async fillIncomeFrequency(label: string, value: string): Promise<void> {
    if (await this.elementNotExists(label)) {
      return;
    }
    await this.action.fillInputByLabelAndAssert(label, value);
  }

  public async fillAdvanceOrArrearsWithProportion(label: string, value: string): Promise<void> {
    if (await this.elementNotExists(label)) {
      return;
    }
    await this.action.fillInputByLabelAndAssert(label, value);
  }

  public async fillGuaranteedPeriod(label: string, value: string): Promise<void> {
    if (await this.elementNotExists(label)) {
      return;
    }
    await this.action.fillInputByLabelAndAssert(label, value);
  }

  public async fillOverlapDetails(label: string, value: string): Promise<void> {
    if (await this.elementNotExists(label)) {
      return;
    }
    await this.action.fillInputByLabelAndAssert(label, value);
  }

  public async fillValueProtection(label: string, value: string): Promise<void> {
    if (await this.elementNotExists(label)) {
      return;
    }
    await this.action.fillInputByLabelAndAssert(label, value);
  }
}
