//projects/gateway-ui/steps/kyc_forms/KycPropertyAndAssetsSteps.ts
import { Page } from '@playwright/test';
import { dataStore, FrameworkConfig } from '@/framework/src';
import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { KYCDatePickerService } from '@steps/components/KYCDatePickerService';

export class KycPropertyAndAssetsSteps extends BaseKYCSteps {
  /* -------------------- Services -------------------- */
  private purchaseHomeDatePicker: KYCDatePickerService;

  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
    this.purchaseHomeDatePicker = new KYCDatePickerService(page);
  }

  /* -------------------- Main Flow  -------------------- */
  
  /**
   * Main method to complete the entire Property & Assets page
   * Uses the standardized KYC page completion flow
   */
  public async completeKYC_PropertyAndAssets(): Promise<void> {
    await this.assert.assertPageURLContains('page=property-and-assets');
    await this.assert.assertHeadingVisible('Property & assets', 15_000);

    await this.answerPropertyAndAssetQuestions()
    this.logInfo('✓ Completed all KYC Property & assets questions');

    await this.action.clickButtonByText('Save & Continue');
  }

  private async answerPropertyAndAssetQuestions(): Promise<void> {
    await this.answerOwnOrRentPropertyQuestion('Owner');
    await this.answerAssetOwnerQuestion();
    await this.fillPropertyValue('£250,000');
    await this.fillPurchaseHomeDate();
    await this.answerOtherPropertiesOrAssets();
  }

  /* -------------------- Questions (split into methods) -------------------- */
  private async answerOwnOrRentPropertyQuestion(answer?: string): Promise<void> {
    const selected = await this.action.setRadioByQuestionPattern(/do you own or rent .+\?/i, answer);
    this.logInfo(`✓ Answered own or rent property question: ${selected}`);
  }

  /* -------------------- Supporting methods -------------------- */
  /** ---- (2) Answer: Asset owner */
  private async answerAssetOwnerQuestion(answer: string = 'Joint'): Promise<void> {
    const label = 'Asset owner';

    if (await this.elementNotExists(label)) {
      this.logInfo('Asset owner question not present, skipping');
      return;
    }

    await this.action.setRadioByQuestion(label, answer);
    this.logInfo(`✓ Answered asset owner question: ${answer}`);
  }

  /** ---- (3) Fill the current property value field */
  private async fillPropertyValue(value: string): Promise<void> {
    const label = 'Current property value';

    if (await this.elementNotExists(label)) {
      this.logInfo('Property value field not present, skipping');
      return;
    }

    await this.action.fillInputByLabel(label, value);
    this.logInfo(`✓ Filled property value: ${value}`);
  }

  private async fillPurchaseHomeDate(): Promise<void> {
    const label = 'When did you purchase your home?';

    if (await this.elementNotExists(label)) {
      this.logInfo('Purchase home date field not present, skipping');
      return;
    }

    const moveInDate = dataStore.getValue('kyc.address1.moveInDate');
    if (!moveInDate) {
      throw new Error('Move in date not found in dataStore (kyc.address1.moveInDate)');
    }

    await this.purchaseHomeDatePicker.setDateByLabelOrFallback(label, label, moveInDate);

    this.logInfo(`✓ Filled purchase home date using stored move-in date: ${moveInDate}`);
  }

  private async answerOtherPropertiesOrAssets(answer: string = 'No'): Promise<void> {
    await this.action.setRadioByQuestion('Do you have any other properties or assets?', answer);
    this.logInfo(`✓ Answered other properties or assets: ${answer}`);
  }
}