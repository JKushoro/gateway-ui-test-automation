"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycProtectionPageSteps = void 0;
const BaseKYCSteps_1 = require("@steps/kyc_forms/BaseKYCSteps");
/**
 * KYC Protection Page Steps - handles all protection-related questions
 * Refactored to follow DRY principles and standardized patterns
 * Uses the enhanced BaseKYCSteps for consistent behavior
 */
class KycProtectionPageSteps extends BaseKYCSteps_1.BaseKYCSteps {
    constructor(page, config) {
        super(page, config);
    }
    /**
     * Main method to complete the entire Protection page
     * Uses the standardized KYC page completion flow
     */
    async completeKYC_Protection() {
        await this.completeKYCPageStandard('page=protection', 'Protection', () => this.answerAllProtectionQuestions());
    }
    /**
     * Answer all protection-related questions
     * Each method handles one specific question using standardized patterns
     */
    async answerAllProtectionQuestions() {
        await this.answerIncomeProtectionQuestion('No');
        await this.answerLifeOrCriticalIllnessCoverQuestion('No');
        await this.answerPrivateMedicalInsuranceQuestion('No');
    }
    /**
     * Answer: "Do you have any income protection (not provided by an employer)?"
     * Uses the standardized radio question pattern
     */
    async answerIncomeProtectionQuestion(answer) {
        await this.answerRadioQuestionIfExists('Do you have any income protection (not provided by an employer)?', answer);
    }
    /**
     * Answer: "Do you have any life insurance or critical illness cover (not provided by an employer)?"
     * Uses the standardized radio question pattern
     */
    async answerLifeOrCriticalIllnessCoverQuestion(answer) {
        await this.answerRadioQuestionIfExists('Do you have any life insurance or critical illness cover (not provided by an employer)?', answer);
    }
    /**
     * Answer: "Do you have any Private Medical Insurance (not provided by an employer)?"
     * Uses the standardized radio question pattern
     */
    async answerPrivateMedicalInsuranceQuestion(answer) {
        await this.answerRadioQuestionIfExists('Do you have any Private Medical Insurance (not provided by an employer)?', answer);
    }
}
exports.KycProtectionPageSteps = KycProtectionPageSteps;
//# sourceMappingURL=KycProtectionPageSteps.js.map