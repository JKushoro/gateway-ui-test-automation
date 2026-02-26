import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { expect, Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';

export class KycSavingsAndInvestmentsPageSteps extends BaseKYCSteps {
  /* -------------------- Services -------------------- */

  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
  }

  /* -------------------- Verification -------------------- */
  /** Verify the Property & Assets heading is visible */
  public async verifySavingsAndInvestmentsHeading(): Promise<void> {
    await this.assert.assertPageURLContains('page=savings-and-investments');

    await expect(this.heading).toBeVisible({ timeout: 15_000 });
    await expect(this.heading).toHaveText('Savings & Investments');
  }

  /* -------------------- Main Flow  -------------------- */
  /** Complete the KYC Property & Assets section */
  public async completeKYC_SavingsAndInvestments(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');

    await this.verifySavingsAndInvestmentsHeading();
    await this.answerSavingsAndInvestmentsQuestions();
    await this.action.clickButtonByText('Save & Continue');
  }

  private async answerSavingsAndInvestmentsQuestions(): Promise<void> {
    await this.answerCashSavingsOutsideFairstone();
    await this.answerInvestmentsOutsideFairstone();
    await this.answerPaidIntoIsaThisTaxYear();
  }

  /* -------------------- Questions (split into methods) -------------------- */

  private async answerCashSavingsOutsideFairstone(answer: string = 'No'): Promise<void> {
    await this.action.setRadioByQuestion(
      'Do you have any cash savings outside of Fairstone?',
      answer
    );
    this.logInfo(`✓ Answered cash savings outside Fairstone: ${answer}`);
  }

  private async answerInvestmentsOutsideFairstone(answer: string = 'No'): Promise<void> {
    await this.action.setRadioByQuestion(
      'Do you have any investments outside of Fairstone?',
      answer
    );
    this.logInfo(`✓ Answered investments outside Fairstone: ${answer}`);
  }

  private async answerPaidIntoIsaThisTaxYear(answer: string = 'No'): Promise<void> {
    await this.action.setRadioByQuestion(
      'Have you paid into an ISA in the current tax year?',
      answer
    );
    this.logInfo(`✓ Answered ISA contribution this tax year: ${answer}`);
  }
}
