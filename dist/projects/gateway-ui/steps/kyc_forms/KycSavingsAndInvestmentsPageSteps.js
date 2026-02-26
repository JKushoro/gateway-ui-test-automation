"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycSavingsAndInvestmentsPageSteps = void 0;
const BaseKYCSteps_1 = require("@steps/kyc_forms/BaseKYCSteps");
const test_1 = require("@playwright/test");
class KycSavingsAndInvestmentsPageSteps extends BaseKYCSteps_1.BaseKYCSteps {
    /* -------------------- Services -------------------- */
    constructor(page, config) {
        super(page, config);
    }
    /* -------------------- Verification -------------------- */
    /** Verify the Property & Assets heading is visible */
    async verifySavingsAndInvestmentsHeading() {
        await this.assert.assertPageURLContains('page=savings-and-investments');
        await (0, test_1.expect)(this.heading).toBeVisible({ timeout: 15000 });
        await (0, test_1.expect)(this.heading).toHaveText('Savings & Investments');
    }
    /* -------------------- Main Flow  -------------------- */
    /** Complete the KYC Property & Assets section */
    async completeKYC_SavingsAndInvestments() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.verifySavingsAndInvestmentsHeading();
        await this.answerSavingsAndInvestmentsQuestions();
        await this.action.clickButtonByText('Save & Continue');
    }
    async answerSavingsAndInvestmentsQuestions() {
        await this.answerCashSavingsOutsideFairstone();
        await this.answerInvestmentsOutsideFairstone();
        await this.answerPaidIntoIsaThisTaxYear();
    }
    /* -------------------- Questions (split into methods) -------------------- */
    async answerCashSavingsOutsideFairstone(answer = 'No') {
        await this.action.setRadioByQuestion('Do you have any cash savings outside of Fairstone?', answer);
        this.logger.info?.(`✓ Answered cash savings outside Fairstone: ${answer}`);
    }
    async answerInvestmentsOutsideFairstone(answer = 'No') {
        await this.action.setRadioByQuestion('Do you have any investments outside of Fairstone?', answer);
        this.logger.info?.(`✓ Answered investments outside Fairstone: ${answer}`);
    }
    async answerPaidIntoIsaThisTaxYear(answer = 'No') {
        await this.action.setRadioByQuestion('Have you paid into an ISA in the current tax year?', answer);
        this.logger.info?.(`✓ Answered ISA contribution this tax year: ${answer}`);
    }
}
exports.KycSavingsAndInvestmentsPageSteps = KycSavingsAndInvestmentsPageSteps;
//# sourceMappingURL=KycSavingsAndInvestmentsPageSteps.js.map