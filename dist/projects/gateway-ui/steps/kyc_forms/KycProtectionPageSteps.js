"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycProtectionPageSteps = void 0;
const BaseKYCSteps_1 = require("@steps/kyc_forms/BaseKYCSteps");
const test_1 = require("@playwright/test");
class KycProtectionPageSteps extends BaseKYCSteps_1.BaseKYCSteps {
    constructor(page, config) {
        super(page, config);
    }
    /* -------------------- Verification -------------------- */
    /** Verify the Protection heading is visible */
    async verifyProtectionHeading() {
        await this.assert.assertPageURLContains('page=protection');
        await (0, test_1.expect)(this.heading).toBeVisible({ timeout: 15000 });
        await (0, test_1.expect)(this.heading).toHaveText('Protection');
    }
    /* -------------------- Main Flow  -------------------- */
    /** Complete the KYC Protection section */
    async completeKYC_Protection() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.verifyProtectionHeading();
        await this.answerProtectionQuestions();
        await this.action.clickButtonByText('Save & Continue');
    }
    async answerProtectionQuestions() {
        await this.answerIncomeProtectionOutsideEmployer();
        await this.answerLifeOrCriticalIllnessCoverOutsideEmployer();
        await this.answerPrivateMedicalInsuranceOutsideEmployer();
    }
    /* -------------------- Questions (split into methods) -------------------- */
    async answerIncomeProtectionOutsideEmployer(answer = 'No') {
        await this.action.setRadioByQuestion('Do you have any income protection (not provided by an employer)?', answer);
        this.logger.info?.(`✓ Answered income protection outside employer: ${answer}`);
    }
    async answerLifeOrCriticalIllnessCoverOutsideEmployer(answer = 'No') {
        await this.action.setRadioByQuestion('Do you have any life insurance or critical illness cover (not provided by an employer)?', answer);
        this.logger.info?.(`✓ Answered life or critical illness cover outside employer: ${answer}`);
    }
    async answerPrivateMedicalInsuranceOutsideEmployer(answer = 'No') {
        await this.action.setRadioByQuestion('Do you have any Private Medical Insurance (not provided by an employer)?', answer);
        this.logger.info?.(`✓ Answered private medical insurance outside employer: ${answer}`);
    }
}
exports.KycProtectionPageSteps = KycProtectionPageSteps;
//# sourceMappingURL=KycProtectionPageSteps.js.map