"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycSavingsAndInvestmentsPageSteps = void 0;
const BaseKYCSteps_1 = require("@steps/kyc_forms/BaseKYCSteps");
/**
 * KYC Savings and Investments Page Steps - handles all savings and investment-related questions
 * Refactored to follow DRY principles and standardized patterns
 * Uses the enhanced BaseKYCSteps for consistent behavior
 */
class KycSavingsAndInvestmentsPageSteps extends BaseKYCSteps_1.BaseKYCSteps {
    constructor(page, config) {
        super(page, config);
    }
    /**
     * Main method to complete the entire Savings & Investments page
     * Uses the standardized KYC page completion flow
     */
    async completeKYC_SavingsAndInvestments() {
        await this.completeKYCPageStandard('page=savings-and-investments', 'Savings & Investments', () => this.answerAllSavingsAndInvestmentsQuestions());
    }
    /**
     * Answer all savings and investments-related questions
     * Each method handles one specific question using standardized patterns
     */
    async answerAllSavingsAndInvestmentsQuestions() {
        await this.answerCashSavingsOutsideFairstoneQuestion('No');
        await this.answerInvestmentsOutsideFairstoneQuestion('No');
        await this.answerIsaContributionQuestion('No');
    }
    /**
     * Answer: "Do you have any cash savings outside of Fairstone?"
     * Uses the standardized radio question pattern
     */
    async answerCashSavingsOutsideFairstoneQuestion(answer) {
        await this.answerRadioQuestionIfExists('Do you have any cash savings outside of Fairstone?', answer);
    }
    /**
     * Answer: "Do you have any investments outside of Fairstone?"
     * Uses the standardized radio question pattern
     */
    async answerInvestmentsOutsideFairstoneQuestion(answer) {
        await this.answerRadioQuestionIfExists('Do you have any investments outside of Fairstone?', answer);
    }
    /**
     * Answer: "Have you paid into an ISA in the current tax year?"
     * Uses the standardized radio question pattern
     */
    async answerIsaContributionQuestion(answer) {
        await this.answerRadioQuestionIfExists('Have you paid into an ISA in the current tax year?', answer);
    }
}
exports.KycSavingsAndInvestmentsPageSteps = KycSavingsAndInvestmentsPageSteps;
//# sourceMappingURL=KycSavingsAndInvestmentsPageSteps.js.map