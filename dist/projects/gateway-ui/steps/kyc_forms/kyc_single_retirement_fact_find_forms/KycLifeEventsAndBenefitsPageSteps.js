"use strict";
//KycLifeEventsAndBenefitsPageSteps
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycKycLifeEventsAndBenefitsPageSteps = void 0;
const BaseKYCSteps_1 = require("@steps/kyc_forms/BaseKYCSteps");
class KycKycLifeEventsAndBenefitsPageSteps extends BaseKYCSteps_1.BaseKYCSteps {
    constructor(page, config) {
        super(page, config);
    }
    /* -------------------- Main Flow -------------------- */
    async completeKYCKycLifeEventsAndBenefits() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.assert.assertPageURLContains('page=life-events-benefits');
        await this.assert.assertHeadingVisible('Life Events & Benefits', 15000);
        await this.answerLifeEventsAndBenefitsQuestions();
        this.logInfo('✓ Completed all KYC Life Events And Benefits questions');
        await this.action.clickButtonByText('Save & Continue');
    }
    async answerLifeEventsAndBenefitsQuestions() {
        await this.selectMaximumStatePension('No');
        await this.fillProvideFurtherInformation('Please provide further information', 'This is to test Further Information field works');
        await this.fillShortfallAmount(2);
        await this.selectMeansTestedBenefitsReceipt('Yes');
        await this.fillPostStatePensionDetails('Please give details and if these are likely to continue post State Pension Age (where relevant)', 'This is to test Post State Pension field works');
        await this.selectFutureInheritanceOrWindfalls('Yes');
        await this.fillAmountAndTimescaleDetails('Please give us more information on the amount and likely timescales', 'This is to test Amount And Timescale field works');
        await this.fillPensionDeathBenefitPlans('What are your plans for any remaining pension benefits on death? Please provide details', 'This is to test Pension Death Benefit Plans field works');
    }
    /* -------------------- State Pension & Benefits Question Methods -------------------- */
    async selectMaximumStatePension(answer) {
        await this.answerRadioQuestionIfExists('Are you due the maximum State Pension?', answer);
    }
    // When 'No' is selected for maximum State Pension question
    async fillProvideFurtherInformation(label, value) {
        if (await this.elementNotExists(label))
            return;
        await this.action.fillInputByLabelAndAssert(label, value);
    }
    // When 'No' is selected for maximum State Pension question
    async fillShortfallAmount(value) {
        const label = 'What is the shortfall?';
        const input = await this.action.findInputFieldByLabel(label);
        if (!(await this.action.ensureVisibleOrSkip(input, label)))
            return;
        await this.action.fillFormattedNumberInput(input, value, label);
    }
    async selectMeansTestedBenefitsReceipt(answer) {
        await this.answerRadioQuestionIfExists('Are you in receipt of any means tested benefits?', answer);
    }
    async fillPostStatePensionDetails(label, value) {
        if (await this.elementNotExists(label))
            return;
        await this.action.fillInputByLabelAndAssert(label, value);
    }
    /* -------------------- Inheritance & Windfalls Question Methods -------------------- */
    async selectFutureInheritanceOrWindfalls(answer) {
        await this.answerRadioQuestionIfExists('Are you expecting any inheritances or windfalls in the future?', answer);
    }
    async fillAmountAndTimescaleDetails(label, value) {
        if (await this.elementNotExists(label))
            return;
        await this.action.fillInputByLabelAndAssert(label, value);
    }
    /* -------------------- Death Question Methods -------------------- */
    async fillPensionDeathBenefitPlans(label, value) {
        if (await this.elementNotExists(label))
            return;
        await this.action.fillInputByLabelAndAssert(label, value);
    }
}
exports.KycKycLifeEventsAndBenefitsPageSteps = KycKycLifeEventsAndBenefitsPageSteps;
//# sourceMappingURL=KycLifeEventsAndBenefitsPageSteps.js.map