import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { expect, Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';


export class KycPensionsPageSteps extends BaseKYCSteps {
  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
  }

  /* -------------------- Verification -------------------- */
  /** Verify the Pensions heading is visible */
  public async verifyPensionsHeading(): Promise<void> {
    await this.assert.assertPageURLContains('page=pensions');

    await expect(this.heading).toBeVisible({ timeout: 15_000 });
    await expect(this.heading).toHaveText('Pensions');
  }

  /* -------------------- Main Flow  -------------------- */
  /** Complete the KYC Pensions section */
  public async completeKYC_Pensions(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');

    await this.verifyPensionsHeading();
    await this.answerPensionQuestions();
    await this.action.clickButtonByText('Save & Continue');
  }

  private async answerPensionQuestions(): Promise<void> {
    await this.answerWorkplacePension('No');
    await this.answerPensionsFromPreviousEmployment('No');
    await this.answerOtherPensions('No');
    await this.answerRequestedStatePensionForecast('No');
  }

  /* -------------------- Questions (split into methods) -------------------- */

  //Are you an active member of a workplace pension scheme?

  private async answerWorkplacePension(answer?: string): Promise<void> {
    if (await this.elementNotExists('Are you an active member of a workplace pension scheme?'))
      return;
    this.logInfo(
      `✓ Answered an active member of a workplace pension question: ${await this.action.setRadioByQuestion('Are you an active member of a workplace pension scheme?', answer)}`
    );
  }

  private async answerPensionsFromPreviousEmployment(answer?: string): Promise<void> {
    await this.action.setRadioByQuestion('Do you have any pensions from previous employment?', answer);
    this.logInfo(`✓ Answered pensions from previous employment: ${answer}`);
  }

  private async answerOtherPensions(answer?: string): Promise<void> {
    await this.action.setRadioByQuestion('Do you have any other pensions?', answer);
    this.logInfo(`✓ Answered other pensions: ${answer}`);
  }

  private async answerRequestedStatePensionForecast(answer?: string): Promise<void> {
    await this.action.setRadioByQuestion('Have you requested a state pension forecast?', answer);
    this.logInfo(`✓ Answered state pension forecast requested: ${answer}`);
  }
}