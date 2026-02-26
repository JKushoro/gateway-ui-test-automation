"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycPropertyAndAssetsSteps = void 0;
//projects/gateway-ui/steps/kyc_forms/KycPropertyAndAssetsSteps.ts
const test_1 = require("@playwright/test");
const src_1 = require("@/framework/src");
const BaseKYCSteps_1 = require("@steps/kyc_forms/BaseKYCSteps");
const KYCDatePickerService_1 = require("@steps/components/KYCDatePickerService");
class KycPropertyAndAssetsSteps extends BaseKYCSteps_1.BaseKYCSteps {
    constructor(page, config) {
        super(page, config);
        this.purchaseHomeDatePicker = new KYCDatePickerService_1.KYCDatePickerService(page);
    }
    /* -------------------- Verification -------------------- */
    /** Verify the Property & Assets heading is visible */
    async verifyPropertyAndAssetsHeading() {
        await this.assert.assertPageURLContains('page=property-and-assets');
        await (0, test_1.expect)(this.heading).toBeVisible({ timeout: 15000 });
        await (0, test_1.expect)(this.heading).toHaveText('Property & assets');
    }
    /* -------------------- Main Flow  -------------------- */
    /** Complete the KYC Property & Assets section */
    async completeKYC_PropertyAndAssets() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.verifyPropertyAndAssetsHeading();
        await this.answerPropertyAndAssetQuestions();
        await this.action.clickButtonByText('Save & Continue');
    }
    async answerPropertyAndAssetQuestions() {
        await this.answerOwnOrRentPropertyQuestion();
        await this.answerAssetOwnerQuestion();
        await this.fillPropertyValue();
        await this.fillPurchaseHomeDate();
        await this.answerOtherPropertiesOrAssets();
    }
    /* -------------------- Questions (split into methods) -------------------- */
    //
    // // Question 1 – Do you own or rent your [DYNAMIC ADDRESS]?
    // private async answerOwnOrRentPropertyQuestion(answer: string = 'Owner'): Promise<void> {
    //   const questionPattern = /do you own or rent .+\?/i;
    //
    //   await this.action.setRadioByQuestionPattern(questionPattern, answer);
    //   this.logger.info?.(`✓ Answered own or rent property question: ${answer}`);
    // }
    async answerOwnOrRentPropertyQuestion(answer) {
        await this.action.setRadioByQuestionPattern(/do you own or rent .+\?/i, answer);
        this.logger.info?.(`✓ Answered own or rent property question: ${answer ?? 'auto'}`);
    }
    /* -------------------- Supporting methods -------------------- */
    /** ---- (2) Answer: Asset owner */
    async answerAssetOwnerQuestion(answer = 'Joint') {
        const label = 'Asset owner';
        const questionVisible = (await this.page.getByText(label, { exact: false }).count()) > 0;
        if (!questionVisible) {
            this.logger.info?.('Asset owner question not present, skipping');
            return;
        }
        await this.action.setRadioByQuestion(label, answer);
        this.logger.info?.(`✓ Answered asset owner question: ${answer}`);
    }
    /** ---- (3) Fill the current property value field */
    async fillPropertyValue() {
        const label = 'Current property value';
        const value = '£250,000';
        const fieldVisible = (await this.page.getByText(label, { exact: false }).count()) > 0;
        if (!fieldVisible) {
            this.logger.info?.('Property value field not present, skipping');
            return;
        }
        await this.action.fillInputByLabel(label, value);
        this.logger.info?.(`✓ Filled property value: ${value}`);
    }
    // private async fillPurchaseHomeDate(): Promise<void> {
    //   const label = 'When did you purchase your home?';
    //
    //   if (!(await this.page.getByText(label, { exact: false }).count())) {
    //     this.logger.info?.('Purchase home date field not present, skipping');
    //     return;
    //   }
    //   const moveInDate = dataStore.getValue('kyc.address.moveInDate');
    //   if (!moveInDate) {
    //     throw new Error('Move in date not found in dataStore (kyc.address.moveInDate)');
    //   }
    //
    //   const dateUsed = await this.purchaseHomeDatePicker.setAddressMoveInDate(label, moveInDate);
    //   this.logger.info?.(`✓ Filled purchase home date: ${dateUsed}`);
    // }
    async fillPurchaseHomeDate() {
        const label = 'When did you purchase your home?';
        if (!(await this.page.getByText(label, { exact: false }).count())) {
            this.logger.info?.('Purchase home date field not present, skipping');
            return;
        }
        const moveInDate = src_1.dataStore.getValue('kyc.address1.moveInDate');
        if (!moveInDate) {
            throw new Error('Move in date not found in dataStore (kyc.address1.moveInDate)');
        }
        await this.purchaseHomeDatePicker.setDateByLabelOrFallback(label, label, moveInDate);
        this.logger.info?.(`✓ Filled purchase home date using stored move-in date: ${moveInDate}`);
    }
    async answerOtherPropertiesOrAssets(answer = 'No') {
        await this.action.setRadioByQuestion('Do you have any other properties or assets?', answer);
        this.logger.info?.(`✓ Answered other properties or assets: ${answer}`);
    }
}
exports.KycPropertyAndAssetsSteps = KycPropertyAndAssetsSteps;
//# sourceMappingURL=KycPropertyAndAssetsSteps.js.map