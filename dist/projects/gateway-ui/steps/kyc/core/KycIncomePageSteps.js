"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycIncomePageSteps = void 0;
const BaseKYCSteps_1 = require("@steps/kyc/BaseKYCSteps");
/**
 * KYC Income Page Steps - handles all income-related questions
 * Refactored to follow DRY principles and standardized patterns
 * Uses the enhanced BaseKYCSteps for consistent behavior
 */
class KycIncomePageSteps extends BaseKYCSteps_1.BaseKYCSteps {
    constructor(page, config) {
        super(page, config);
    }
    /**
     * Main method to complete the entire Income page
     * Uses the standardized KYC page completion flow
     */
    async completeKYC_Income() {
        await this.assert.assertPageURLContains('page=income');
        await this.assert.assertHeadingVisible('Income', 15000);
        await this.answerAllIncomeQuestions();
        this.logInfo('✓ Completed all KYC Income questions');
        await this.action.clickButtonByText('Save & Continue');
    }
    /**
     * Answer all income-related questions
     * Each method handles one specific question using standardized patterns
     */
    async answerAllIncomeQuestions() {
        await this.answerOtherIncomeSourceQuestion('Yes');
        await this.answerEarnerTypeQuestion('Joint');
        await this.selectIncomeSourceOption('Employed Salary');
        await this.fillGrossAnnualIncomeField('£90,000');
    }
    /**
     * Answer: "Do you have any other income source?"
     * Uses the standardized radio question pattern
     */
    async answerOtherIncomeSourceQuestion(answer) {
        await this.answerRadioQuestionIfExists('Do you have any other income source?', answer);
    }
    /**
     * Answer: "Earner" question
     * Uses the standardized radio question pattern
     */
    async answerEarnerTypeQuestion(answer) {
        await this.answerRadioQuestionIfExists('Earner', answer);
    }
    /**
     * Select income source from dropdown
     * Uses the standardized dropdown selection pattern
     */
    async selectIncomeSourceOption(value) {
        try {
            return this.action.chooseFromQuestionReactSelectDropdown('Income source', value);
        }
        catch (error) {
            throw new Error(`Failed to select Income source: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    /**
     * Fill gross annual income field
     * Uses the standardized input filling pattern
     */
    async fillGrossAnnualIncomeField(value) {
        await this.fillInputIfExists('Gross annual income', value);
    }
}
exports.KycIncomePageSteps = KycIncomePageSteps;
//# sourceMappingURL=KycIncomePageSteps.js.map