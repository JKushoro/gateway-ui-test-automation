import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';

export class KycPurposePageSteps extends BaseKYCSteps {
  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
  }

  /* -------------------- Main Flow -------------------- */

  public async completeKYCPurpose(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');

    await this.assert.assertHeadingVisible('Purpose', 15_000);

     await this.answerPurposeQuestions();
    this.logInfo('✓ Completed all KYC Purpose questions');

    await this.action.clickButtonByText('Save & Continue');
  }

  private async answerPurposeQuestions(): Promise<void> {
    await this.fillPensionDiscussionPurpose(
      'What is the purpose of this pension discussion?',
      'This is to test this field works'
    );
  }

  /* -------------------- Question Methods -------------------- */

  private async fillPensionDiscussionPurpose(label: string, value: string): Promise<void> {
    if (await this.elementNotExists(label)) return;
    await this.action.fillInputByLabelAndAssert(label, value);
  }
}