import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { expect, Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';

export class KycIncomePageSteps extends BaseKYCSteps {
  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
  }

  /* -------------------- Verification -------------------- */
  /** Verify the Income heading is visible */
  public async verifyIncomeHeading(): Promise<void> {
    await this.assert.assertPageURLContains('page=income');

    await expect(this.heading).toBeVisible({ timeout: 15_000 });
    await expect(this.heading).toHaveText('Income');
  }

  /* -------------------- Main Flow  -------------------- */
  /** Complete the KYC Income section */
  public async completeKYC_Income(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');

    await this.verifyIncomeHeading();
    await this.answerIncomeQuestions();
    await this.action.clickButtonByText('Save & Continue');
  }

  private async answerIncomeQuestions(): Promise<void> {
    await this.answerOtherIncomeSource('Yes');
    await this.answerEarner('Joint');
    await this.selectIncomeSource();
    await this.fillGrossAnnualIncomeValue('Gross annual income', '£90,000');
  }

  /* -------------------- Questions (split into methods) -------------------- */

  private async answerOtherIncomeSource(answer?: string): Promise<void> {
    await this.action.setRadioByQuestion('Do you have any other income source?', answer);
    this.logInfo(`✓ Answered other income source: ${answer}`);
  }

  private async answerEarner(answer?: string): Promise<void> {
    if (await this.elementNotExists('Earner')) return;
    this.logInfo(
      `✓ Answered earner question: ${await this.action.setRadioByQuestion('Earner', answer)}`
    );
  }

  private async selectIncomeSource(answer?: string): Promise<string> {
    if (await this.elementNotExists('Income source')) return '';
    return await this.action.chooseFromLabeledReactSelectDropdown('Income source', answer);
  }

  private async fillGrossAnnualIncomeValue(label: string, value: string): Promise<void> {
    if (await this.elementNotExists(label)) {
      this.logInfo(`${label} not present, skipping`);
      return;
    }

    await this.action.fillInputByLabel(label, value);
    this.logInfo(`✓ Filled ${label} value: ${value}`);
  }
}