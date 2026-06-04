//projects/gateway-ui/steps/kyc_forms/KycPropertyAndAssetsSteps.ts
import { Page } from '@playwright/test';
import { dataStore, FrameworkConfig } from '@/framework/src';
import { BaseKYCSteps } from '@steps/kyc/BaseKYCSteps';
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

    await this.answerPropertyAndAssetQuestions();
    this.logInfo('✓ Completed all KYC Property & assets questions');

    await this.action.clickButtonByText('Save & Continue');
  }

  public async answerPropertyAndAssetQuestions(): Promise<void> {
    await this.answerOwnOrRentPropertyQuestion('Owner');
    await this.answerAssetOwnerQuestion();
    await this.fillPropertyValue('£250,000');
    await this.fillPurchaseHomeDate(5, 15);
    await this.answerOtherPropertiesOrAssets();
  }

  /* -------------------- Questions (split into methods) -------------------- */
  public async answerOwnOrRentPropertyQuestion(answer?: string): Promise<void> {
    const selected = await this.action.setRadioByQuestionPattern(
      /do you own or rent .+\?/i,
      answer
    );
    this.logInfo(`✓ Answered own or rent property question: ${selected}`);
  }

  /* -------------------- Supporting methods -------------------- */
  /** ---- (2) Answer: Asset owner */
  public async answerAssetOwnerQuestion(answer: string = 'Joint'): Promise<void> {
    const label = 'Asset owner';

    if (await this.elementNotExists(label)) {
      this.logInfo('Asset owner question not present, skipping');
      return;
    }

    await this.action.setRadioByQuestion(label, answer);
    this.logInfo(`✓ Answered asset owner question: ${answer}`);
  }

  /** ---- (3) Fill the current property value field */
  public async fillPropertyValue(value: string): Promise<void> {
    const label = 'Current property value';

    if (await this.elementNotExists(label)) {
      this.logInfo('Property value field not present, skipping');
      return;
    }

    await this.action.fillInputByLabel(label, value);
    this.logInfo(`✓ Filled property value: ${value}`);
  }

  public async fillPurchaseHomeDate(minYears: number, maxYears: number): Promise<void> {
    const label = 'When did you purchase your home?';

    if (await this.elementNotExists(label)) {
      this.logInfo('Purchase home date field not present, skipping');
      return;
    }

    let moveInDate = dataStore.getValue('kyc.address1.moveInDate');

    if (!moveInDate) {
      moveInDate = this.purchaseHomeDatePicker.generateRandomPastDate(minYears, maxYears);
      this.logInfo(`Move in date not found in dataStore, generated random date: ${moveInDate}`);
    }

    await this.purchaseHomeDatePicker.setDateByLabelOrFallback(
      label,
      this.page.getByLabel(label),
      moveInDate
    );

    this.logInfo(`✓ Filled purchase home date: ${moveInDate}`);
  }

  public async answerOtherPropertiesOrAssets(answer: string = 'No'): Promise<void> {
    await this.action.setRadioByQuestion('Do you have any other properties or assets?', answer);
    this.logInfo(`✓ Answered other properties or assets: ${answer}`);
  }
}
