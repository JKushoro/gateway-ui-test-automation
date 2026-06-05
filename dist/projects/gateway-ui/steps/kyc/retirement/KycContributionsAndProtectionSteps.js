"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycContributionsAndProtectionSteps = void 0;
const BaseKYCSteps_1 = require("@steps/kyc/BaseKYCSteps");
const test_1 = require("@playwright/test");
const KycContributionsAndProtectionPageLocators_1 = require("@pages/kycElementLocators/kyc_retirement_fact_find_locator/KycContributionsAndProtectionPageLocators");
class KycContributionsAndProtectionSteps extends BaseKYCSteps_1.BaseKYCSteps {
    constructor(page, config) {
        super(page, config);
        this.locators = new KycContributionsAndProtectionPageLocators_1.KycContributionsAndProtectionPageLocators(page);
    }
    /* -------------------- Main Flow -------------------- */
    async completeKycContributionsAllowancesAndProtection() {
        await this.assert.assertPageURLContains('page=contributions-allowances-protection');
        await this.answerContributionsAllowancesAndProtectionQuestions();
        this.logInfo('✓ Completed all KYC Contributions Allowances And Protection questions');
        await this.action.clickButtonByText('Save & Continue');
    }
    async answerContributionsAllowancesAndProtectionQuestions() {
        await this.selectPensionContributionIntent('Yes');
        await this.enterContributionDetails('This is to test Contribution field works');
        await this.selectAnnualAllowanceExceedance('Yes');
        await this.enterAnnualAllowanceDetails('This is to test Annual Allowance field works');
        await this.selectCarryForward('Yes');
        await this.enterCarryForwardDetails('This is to test Carry Forward field works');
    }
    /* -------------------- Question Methods -------------------- */
    async selectPensionContributionIntent(answer) {
        await this.answerRadioQuestionIfExists('Are you planning to contribute to/remain an active member of a pension scheme?', answer);
    }
    async enterContributionDetails(value) {
        const input = this.locators.contributeDetails;
        const label = 'Contribute Details';
        if (!(await this.action.ensureVisibleOrSkip(input, label)))
            return;
        await input.fill(value);
        await (0, test_1.expect)(input).toHaveValue(value);
    }
    async selectAnnualAllowanceExceedance(answer) {
        await this.answerRadioQuestionIfExists('Are you in a position to contribute more than your annual allowance in the current tax year?', answer);
    }
    async enterAnnualAllowanceDetails(value) {
        const input = this.locators.annualAllowanceDetails;
        const label = 'Annual Allowance Details';
        if (!(await this.action.ensureVisibleOrSkip(input, label)))
            return;
        await input.fill(value);
        await (0, test_1.expect)(input).toHaveValue(value);
    }
    async selectCarryForward(answer) {
        await this.answerRadioQuestionIfExists('Have you made use of carry forward in the last three years?', answer);
    }
    async enterCarryForwardDetails(value) {
        const input = this.locators.carryForwardDetails;
        const label = 'Carry Forward Details';
        if (!(await this.action.ensureVisibleOrSkip(input, label)))
            return;
        await input.fill(value);
        await (0, test_1.expect)(input).toHaveValue(value);
    }
}
exports.KycContributionsAndProtectionSteps = KycContributionsAndProtectionSteps;
//# sourceMappingURL=KycContributionsAndProtectionSteps.js.map