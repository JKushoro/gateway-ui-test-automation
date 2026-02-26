"use strict";
// projects/gateway-ui/steps/kyc_forms/KycIncomePageSteps.refactored.ts
// Refactored version - cleaner, less duplication, easier to understand
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycIncomePageSteps = void 0;
const BaseKYCSteps_1 = require("@steps/kyc_forms/BaseKYCSteps");
const src_1 = require("@/framework/src");
/**
 * KYC Income Page Steps - handles all income-related questions
 * Simple, clean implementation with no code duplication
 */
class KycIncomePageSteps extends BaseKYCSteps_1.BaseKYCSteps {
    constructor(page, config) {
        super(page, config);
    }
    /**
     * Main method to complete the entire Income page
     * Uses the standardized KYC page completion flow
     */
    async completeIncomeSection() {
        await this.completeKYCPage(src_1.KYC_CONSTANTS.URL_FRAGMENTS.INCOME, src_1.KYC_CONSTANTS.HEADINGS.INCOME, () => this.answerAllIncomeQuestions());
    }
    /**
     * Answer all income-related questions
     * Each method handles one specific question
     */
    async answerAllIncomeQuestions() {
        await this.answerOtherIncomeSourceQuestion();
        await this.answerEarnerTypeQuestion();
        await this.selectIncomeSourceOption();
        await this.fillGrossAnnualIncomeField();
    }
    /**
     * Answer: "Do you have any other income source?"
     * Can specify 'Yes', 'No', or leave blank for random selection
     */
    async answerOtherIncomeSourceQuestion(answer) {
        await this.answerYesNoQuestionIfExists(src_1.KYC_CONSTANTS.QUESTIONS.OTHER_INCOME_SOURCE, answer);
    }
    /**
     * Answer the earner type question (Single/Joint)
     * Uses the helper method to avoid duplication
     */
    async answerEarnerTypeQuestion(answer = src_1.DROPDOWN_OPTIONS.EARNER_TYPE.JOINT) {
        await this.answerRadioQuestionIfExists('Earner', answer);
    }
    /**
     * Select income source from dropdown
     * Uses the helper method to avoid duplication
     */
    async selectIncomeSourceOption(value = src_1.DROPDOWN_OPTIONS.INCOME_SOURCE.EMPLOYMENT) {
        await this.selectDropdownIfExists('Income source', value);
    }
    /**
     * Fill the gross annual income field
     * Uses the helper method to avoid duplication
     */
    async fillGrossAnnualIncomeField(value = src_1.KYC_CONSTANTS.DEFAULTS.CURRENCY_INCOME) {
        await this.fillInputIfExists('Gross annual income', value);
    }
}
exports.KycIncomePageSteps = KycIncomePageSteps;
//# sourceMappingURL=KycIncomePageSteps.refactored.js.map