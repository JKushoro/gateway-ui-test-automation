"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycPurposePageSteps = void 0;
const BaseKYCSteps_1 = require("@steps/kyc_forms/BaseKYCSteps");
class KycPurposePageSteps extends BaseKYCSteps_1.BaseKYCSteps {
    constructor(page, config) {
        super(page, config);
    }
    /* -------------------- Main Flow -------------------- */
    async completeKYCPurpose() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.assert.assertHeadingVisible('Purpose', 15000);
        await this.answerPurposeQuestions();
        this.logInfo('✓ Completed all KYC Purpose questions');
        await this.action.clickButtonByText('Save & Continue');
    }
    async answerPurposeQuestions() {
        await this.fillPensionDiscussionPurpose('What is the purpose of this pension discussion?', 'This is to test Pension Discussion Purpose field works');
    }
    /* -------------------- Question Methods -------------------- */
    async fillPensionDiscussionPurpose(label, value) {
        if (await this.elementNotExists(label))
            return;
        await this.action.fillInputByLabelAndAssert(label, value);
    }
}
exports.KycPurposePageSteps = KycPurposePageSteps;
//# sourceMappingURL=KycPurposePageSteps.js.map