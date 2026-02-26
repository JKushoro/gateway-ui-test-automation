"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycIncomePageSteps = void 0;
const BaseKYCSteps_1 = require("@steps/kyc_forms/BaseKYCSteps");
const test_1 = require("@playwright/test");
class KycIncomePageSteps extends BaseKYCSteps_1.BaseKYCSteps {
    constructor(page, config) {
        super(page, config);
    }
    /* -------------------- Verification -------------------- */
    /** Verify the Income heading is visible */
    async verifyIncomeHeading() {
        await this.assert.assertPageURLContains('page=income');
        await (0, test_1.expect)(this.heading).toBeVisible({ timeout: 15000 });
        await (0, test_1.expect)(this.heading).toHaveText('Income');
    }
    /* -------------------- Main Flow  -------------------- */
    /** Complete the KYC Income section */
    async completeKYC_Income() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.verifyIncomeHeading();
        await this.answerIncomeQuestions();
        await this.action.clickButtonByText('Save & Continue');
    }
    async answerIncomeQuestions() {
        await this.answerOtherIncomeSource();
        await this.answerEarner();
        await this.selectIncomeSource();
        await this.fillGrossAnnualIncomeValue();
    }
    /* -------------------- Questions (split into methods) -------------------- */
    async answerOtherIncomeSource(answer = 'Yes') {
        await this.action.setRadioByQuestion('Do you have any other income source?', answer);
        this.logger.info?.(`✓ Answered other income source: ${answer}`);
    }
    async answerEarner(answer = 'Joint') {
        const label = 'Earner';
        const questionVisible = (await this.page.getByText(label, { exact: false }).count()) > 0;
        if (!questionVisible) {
            this.logger.info?.('Earner question not present, skipping');
            return;
        }
        await this.action.setRadioByQuestion(label, answer);
        this.logger.info?.(`✓ Answered earner question: ${answer}`);
    }
    async selectIncomeSource() {
        const question = 'Income source';
        if (!(await this.page
            .getByText(question, { exact: false })
            .count()
            .catch(() => 0)))
            return '';
        const selected = await this.action.chooseFromLabeledReactSelectDropdown(question);
        this.logger.info?.(`Selected Income source: ${selected}`);
        return selected;
    }
    async fillGrossAnnualIncomeValue() {
        const label = 'Gross annual income';
        const value = '£90,000';
        const fieldVisible = (await this.page.getByText(label, { exact: false }).count()) > 0;
        if (!fieldVisible) {
            this.logger.info?.('Gross annual income, skipping');
            return;
        }
        await this.action.fillInputByLabel(label, value);
        this.logger.info?.(`✓ Filled Gross annual income value: ${value}`);
    }
}
exports.KycIncomePageSteps = KycIncomePageSteps;
//# sourceMappingURL=KycIncomePageSteps.js.map