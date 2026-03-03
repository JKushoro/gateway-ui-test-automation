"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycPensionsPageSteps = void 0;
const BaseKYCSteps_1 = require("@steps/kyc_forms/BaseKYCSteps");
/**
 * KYC Pensions Page Steps - handles all pension-related questions
 * Refactored to follow DRY principles and standardized patterns
 * Uses the enhanced BaseKYCSteps for consistent behavior
 */
class KycPensionsPageSteps extends BaseKYCSteps_1.BaseKYCSteps {
    constructor(page, config) {
        super(page, config);
    }
    /**
     * Main method to complete the entire Pensions page
     * Uses the standardized KYC page completion flow
     */
    async completeKYC_Pensions() {
        await this.completeKYCPageStandard('page=pensions', 'Pensions', () => this.answerAllPensionQuestions());
    }
    /**
     * Answer all pension-related questions
     * Each method handles one specific question using standardized patterns
     */
    async answerAllPensionQuestions() {
        await this.answerWorkplacePensionQuestion('No');
        await this.answerPreviousEmploymentPensionsQuestion('No');
        await this.answerOtherPensionsQuestion('No');
        await this.answerStatePensionForecastQuestion('No');
    }
    /**
     * Answer: "Are you an active member of a workplace pension scheme?"
     * Uses the standardized radio question pattern with verification
     */
    async answerWorkplacePensionQuestion(answer) {
        await this.answerRadioQuestionWithVerificationIfPresent('Are you an active member of a workplace pension scheme?', answer);
    }
    /**
     * Answer: "Do you have any pensions from previous employment?"
     * Uses the standardized radio question pattern with verification
     */
    async answerPreviousEmploymentPensionsQuestion(answer) {
        await this.answerRadioQuestionWithVerificationIfPresent('Do you have any pensions from previous employment?', answer);
    }
    /**
     * Answer: "Do you have any other pensions?"
     * Uses the standardized radio question pattern with verification
     */
    async answerOtherPensionsQuestion(answer) {
        await this.answerRadioQuestionWithVerificationIfPresent('Do you have any other pensions?', answer);
    }
    /**
     * Answer: "Have you requested a state pension forecast?"
     * Uses the standardized radio question pattern with verification
     */
    async answerStatePensionForecastQuestion(answer) {
        await this.answerRadioQuestionWithVerificationIfPresent('Have you requested a state pension forecast?', answer);
    }
}
exports.KycPensionsPageSteps = KycPensionsPageSteps;
//# sourceMappingURL=KycPensionsPageSteps.js.map