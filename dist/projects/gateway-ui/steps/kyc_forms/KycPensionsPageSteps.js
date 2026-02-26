"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycPensionsPageSteps = void 0;
const BaseKYCSteps_1 = require("@steps/kyc_forms/BaseKYCSteps");
const test_1 = require("@playwright/test");
class KycPensionsPageSteps extends BaseKYCSteps_1.BaseKYCSteps {
    constructor(page, config) {
        super(page, config);
    }
    /* -------------------- Verification -------------------- */
    /** Verify the Pensions heading is visible */
    async verifyPensionsHeading() {
        await this.assert.assertPageURLContains('page=pensions');
        await (0, test_1.expect)(this.heading).toBeVisible({ timeout: 15000 });
        await (0, test_1.expect)(this.heading).toHaveText('Pensions');
    }
    /* -------------------- Main Flow  -------------------- */
    /** Complete the KYC Pensions section */
    async completeKYC_Pensions() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.verifyPensionsHeading();
        await this.answerPensionQuestions();
        await this.action.clickButtonByText('Save & Continue');
    }
    async answerPensionQuestions() {
        await this.answerPensionsFromPreviousEmployment();
        await this.answerOtherPensions();
        await this.answerRequestedStatePensionForecast();
    }
    /* -------------------- Questions (split into methods) -------------------- */
    async answerPensionsFromPreviousEmployment(answer = 'No') {
        await this.action.setRadioByQuestion('Do you have any pensions from previous employment?', answer);
        this.logger.info?.(`✓ Answered pensions from previous employment: ${answer}`);
    }
    async answerOtherPensions(answer = 'No') {
        await this.action.setRadioByQuestion('Do you have any other pensions?', answer);
        this.logger.info?.(`✓ Answered other pensions: ${answer}`);
    }
    async answerRequestedStatePensionForecast(answer = 'No') {
        await this.action.setRadioByQuestion('Have you requested a state pension forecast?', answer);
        this.logger.info?.(`✓ Answered state pension forecast requested: ${answer}`);
    }
}
exports.KycPensionsPageSteps = KycPensionsPageSteps;
//# sourceMappingURL=KycPensionsPageSteps.js.map