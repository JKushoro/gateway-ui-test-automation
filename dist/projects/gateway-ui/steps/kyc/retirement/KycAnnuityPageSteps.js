"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycAnnuityPageSteps = void 0;
const BaseKYCSteps_1 = require("@steps/kyc/BaseKYCSteps");
class KycAnnuityPageSteps extends BaseKYCSteps_1.BaseKYCSteps {
    constructor(page, config) {
        super(page, config);
    }
    /* -------------------- Main Flow -------------------- */
    async completeKYCAnnuity() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.assert.assertPageURLContains('page=personalised-annuity-quotes');
        await this.assert.assertHeadingVisible('Annuity', 15000);
        await this.answerAnnuityQuestions();
        this.logInfo('✓ Completed all KYC Annuity questions');
        await this.action.clickButtonByText('Save and Submit');
        await this.verifyFactFindCompleted();
    }
    async answerAnnuityQuestions() {
        await this.selectPersonalisedAnnuityQuote('Yes');
        await this.fillEscalationRequirements('Escalation requirements', 'This is to test Escalation requirements field works');
        await this.fillIncomeFrequency('Income Frequency', 'This is to test Income Frequency field works');
        await this.fillAdvanceOrArrearsWithProportion('Advanced/arrears (inc proportion)', 'This is to test Advance Or Arrears With Proportion field works');
        await this.fillGuaranteedPeriod('Guaranteed period', 'This is to test Guaranteed period field works');
        await this.fillOverlapDetails('Overlap (if relevant)', 'This is to test Overlap Details field works');
        await this.fillValueProtection('Value Protection', 'This is to test Value Protection field works');
    }
    /* -------------------- Personalised Annuity Quotes Question Methods -------------------- */
    async selectPersonalisedAnnuityQuote(answer) {
        await this.answerRadioQuestionIfExists('Are we considering a personalised annuity quote for the client at this time?', answer);
    }
    async fillEscalationRequirements(label, value) {
        if (await this.elementNotExists(label)) {
            return;
        }
        await this.action.fillInputByLabelAndAssert(label, value);
    }
    async fillIncomeFrequency(label, value) {
        if (await this.elementNotExists(label)) {
            return;
        }
        await this.action.fillInputByLabelAndAssert(label, value);
    }
    async fillAdvanceOrArrearsWithProportion(label, value) {
        if (await this.elementNotExists(label)) {
            return;
        }
        await this.action.fillInputByLabelAndAssert(label, value);
    }
    async fillGuaranteedPeriod(label, value) {
        if (await this.elementNotExists(label)) {
            return;
        }
        await this.action.fillInputByLabelAndAssert(label, value);
    }
    async fillOverlapDetails(label, value) {
        if (await this.elementNotExists(label)) {
            return;
        }
        await this.action.fillInputByLabelAndAssert(label, value);
    }
    async fillValueProtection(label, value) {
        if (await this.elementNotExists(label)) {
            return;
        }
        await this.action.fillInputByLabelAndAssert(label, value);
    }
}
exports.KycAnnuityPageSteps = KycAnnuityPageSteps;
//# sourceMappingURL=KycAnnuityPageSteps.js.map