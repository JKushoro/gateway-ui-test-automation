"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycPropertyAndAssetsSteps = void 0;
const src_1 = require("@/framework/src");
const BaseKYCSteps_1 = require("@steps/kyc_forms/BaseKYCSteps");
const KYCDatePickerService_1 = require("@steps/components/KYCDatePickerService");
class KycPropertyAndAssetsSteps extends BaseKYCSteps_1.BaseKYCSteps {
    constructor(page, config) {
        super(page, config);
        this.purchaseHomeDatePicker = new KYCDatePickerService_1.KYCDatePickerService(page);
    }
    /* -------------------- Main Flow  -------------------- */
    /**
     * Main method to complete the entire Property & Assets page
     * Uses the standardized KYC page completion flow
     */
    async completeKYC_PropertyAndAssets() {
        await this.completeKYCPageStandard('page=property-and-assets', 'Property & assets', () => this.answerPropertyAndAssetQuestions());
    }
    async answerPropertyAndAssetQuestions() {
        await this.answerOwnOrRentPropertyQuestion('Owner');
        await this.answerAssetOwnerQuestion();
        await this.fillPropertyValue();
        await this.fillPurchaseHomeDate();
        await this.answerOtherPropertiesOrAssets();
    }
    /* -------------------- Questions (split into methods) -------------------- */
    async answerOwnOrRentPropertyQuestion(answer) {
        const selected = await this.action.setRadioByQuestionPattern(/do you own or rent .+\?/i, answer);
        this.logInfo(`✓ Answered own or rent property question: ${selected}`);
    }
    /* -------------------- Supporting methods -------------------- */
    /** ---- (2) Answer: Asset owner */
    async answerAssetOwnerQuestion(answer = 'Joint') {
        const label = 'Asset owner';
        if (await this.elementNotExists(label)) {
            this.logInfo('Asset owner question not present, skipping');
            return;
        }
        await this.action.setRadioByQuestion(label, answer);
        this.logInfo(`✓ Answered asset owner question: ${answer}`);
    }
    /** ---- (3) Fill the current property value field */
    async fillPropertyValue() {
        const label = 'Current property value';
        const value = '£250,000';
        if (await this.elementNotExists(label)) {
            this.logInfo('Property value field not present, skipping');
            return;
        }
        await this.action.fillInputByLabel(label, value);
        this.logInfo(`✓ Filled property value: ${value}`);
    }
    async fillPurchaseHomeDate() {
        const label = 'When did you purchase your home?';
        if (await this.elementNotExists(label)) {
            this.logInfo('Purchase home date field not present, skipping');
            return;
        }
        const moveInDate = src_1.dataStore.getValue('kyc.address1.moveInDate');
        if (!moveInDate) {
            throw new Error('Move in date not found in dataStore (kyc.address1.moveInDate)');
        }
        await this.purchaseHomeDatePicker.setDateByLabelOrFallback(label, label, moveInDate);
        this.logInfo(`✓ Filled purchase home date using stored move-in date: ${moveInDate}`);
    }
    async answerOtherPropertiesOrAssets(answer = 'No') {
        await this.action.setRadioByQuestion('Do you have any other properties or assets?', answer);
        this.logInfo(`✓ Answered other properties or assets: ${answer}`);
    }
}
exports.KycPropertyAndAssetsSteps = KycPropertyAndAssetsSteps;
//# sourceMappingURL=KycPropertyAndAssetsSteps.js.map