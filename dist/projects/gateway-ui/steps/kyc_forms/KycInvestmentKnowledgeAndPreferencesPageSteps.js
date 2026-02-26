"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycInvestmentKnowledgeAndPreferencesPageSteps = void 0;
const BaseKYCSteps_1 = require("@steps/kyc_forms/BaseKYCSteps");
const test_1 = require("@playwright/test");
class KycInvestmentKnowledgeAndPreferencesPageSteps extends BaseKYCSteps_1.BaseKYCSteps {
    constructor(page, config) {
        super(page, config);
        this.sustainabilityAwarenessIsYes = null;
    }
    /* -------------------- Verification -------------------- */
    async verifyInvestmentKnowledgeAndPreferencesHeading() {
        await this.assert.assertPageURLContains('page=investment-knowledge-and-preferences');
        await (0, test_1.expect)(this.heading).toBeVisible({ timeout: 15000 });
        await (0, test_1.expect)(this.heading).toHaveText('Investment Knowledge & Preferences');
    }
    /* -------------------- Main Flow -------------------- */
    async completeKYC_InvestmentKnowledgeAndPreferences() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.verifyInvestmentKnowledgeAndPreferencesHeading();
        await this.answerInvestmentKnowledgeAndPreferencesQuestions();
        await this.verifyFactFindCompleted();
    }
    async answerInvestmentKnowledgeAndPreferencesQuestions() {
        await this.answerInvestmentKnowledgeAndPreference('No');
        await this.answerClientClassification('Retail');
        await this.answerInvestmentExperience('Basic');
        await this.answerSustainabilityRequirements('Yes - relating to all of their objectives');
        await this.answerSustainabilityAwareness('Yes - they are comfortable proceeding');
        //   await this.answerSustainabilityAwareness(
        //     'No - Following discussion with their financial adviser, they have concluded that their financial objectives are more important.'
        //   );
        await this.assertResponsibleInvestmentFramework();
        await this.answerResponsibleInvestmentFramework('No');
        await this.answerFaithBasedRequirements('No');
        await this.answerNegativeScreens('Yes');
        await this.selectNegativeScreens();
        await this.answerSustainableInvestmentStatement('Neither of the above statements align');
        await this.action.clickButtonByText('Save and Submit');
    }
    /* -------------------- Questions -------------------- */
    /* Each question now only asserts: label must be visible. */
    async answerInvestmentKnowledgeAndPreference(value) {
        const label = 'Do you need to provide or update your Investment Knowledge & Preference?';
        const locator = this.page.getByText(label, { exact: false });
        if (!(await locator.count()))
            return;
        if (!value)
            throw new Error('answerInvestmentKnowledgeAndPreference requires a value');
        await (0, test_1.expect)(locator).toBeVisible();
        await this.action.setRadioByQuestion(label, value);
        this.logger.info?.(`✓ Answered investment knowledge & preference: ${value}`);
    }
    async answerClientClassification(value) {
        const label = "What is the client's classification?";
        const locator = this.page.getByText(label, { exact: false });
        if (!(await locator.count()))
            return;
        if (!value)
            throw new Error('answerClientClassification requires a value');
        await (0, test_1.expect)(locator).toBeVisible();
        await this.action.setRadioByQuestion(label, value);
        this.logger.info?.(`✓ Answered client classification: ${value}`);
    }
    async answerInvestmentExperience(value) {
        const label = "What's the client's level of investment experience?";
        const locator = this.page.getByText(label, { exact: false });
        if (!(await locator.count()))
            return;
        if (!value)
            throw new Error('answerInvestmentExperience requires a value');
        await (0, test_1.expect)(locator).toBeVisible();
        await this.action.setRadioByQuestion(label, value);
        this.logger.info?.(`✓ Answered investment experience: ${value}`);
    }
    async answerSustainabilityRequirements(value) {
        const label = 'Do you have sustainability linked requirements, that need to be considered in addition to your financial objectives?';
        const locator = this.page.getByText(label, { exact: false });
        if (!(await locator.count()))
            return;
        if (!value)
            throw new Error('answerSustainabilityRequirements requires a value');
        await (0, test_1.expect)(locator).toBeVisible();
        await this.action.setRadioByQuestion(label, value);
        this.logger.info?.(`✓ Answered sustainability requirements: ${value}`);
    }
    async answerSustainabilityAwareness(value) {
        const pattern = /Is the client aware that in applying sustainability preferences/i;
        const question = this.page.getByText(pattern).first();
        if (!(await question.count())) {
            this.sustainabilityAwarenessIsYes = null;
            this.logger.info?.('ℹ Sustainability awareness question not shown - skipping');
            return;
        }
        if (!value)
            throw new Error('answerSustainabilityAwareness requires a value');
        await (0, test_1.expect)(question, 'Missing sustainability awareness question').toBeVisible({
            timeout: 15000,
        });
        await this.action.setRadioByQuestionPattern(pattern, value);
        this.sustainabilityAwarenessIsYes = /^yes\b/i.test(value.trim());
        this.logger.info?.(`✓ Answered sustainability awareness: ${value}`);
    }
    async assertResponsibleInvestmentFramework() {
        if (this.sustainabilityAwarenessIsYes === undefined) {
            this.logger.info?.('ℹ Skipping Responsible Investment Framework checks (awareness not answered)');
            return;
        }
        const rifHeading = this.page.getByRole('heading', {
            name: /^Fairstone's Responsible Investment Framework$/i, // FULL match
        });
        if (this.sustainabilityAwarenessIsYes === true) {
            await (0, test_1.expect)(rifHeading).toBeVisible({ timeout: 15000 });
            await (0, test_1.expect)(this.page.getByRole('heading', { name: /^Negative Screens\b/i })).toBeVisible();
            await (0, test_1.expect)(this.page.getByRole('heading', { name: /^Carbon Reduction\b/i })).toBeVisible();
            await (0, test_1.expect)(this.page.getByRole('heading', { name: /^Positive Outcomes\b/i })).toBeVisible();
        }
        else {
            await (0, test_1.expect)(rifHeading).toHaveCount(0);
        }
    }
    async answerResponsibleInvestmentFramework(value) {
        const label = "Does the Fairstone's Responsible Investment Framework align with their sustainability linked requirements?";
        const locator = this.page.getByText(label, { exact: false });
        if (!(await locator.count()))
            return;
        if (!value)
            throw new Error('answerResponsibleInvestmentFramework requires a value');
        await (0, test_1.expect)(locator).toBeVisible();
        await this.action.setRadioByQuestion(label, value);
        this.logger.info?.(`✓ Answered responsible investment framework: ${value}`);
    }
    async answerFaithBasedRequirements(value) {
        const label = "Are the client's requirements faith based?";
        const locator = this.page.getByText(label, { exact: false });
        if (!(await locator.count()))
            return;
        if (!value)
            throw new Error('answerFaithBasedRequirements requires a value');
        await (0, test_1.expect)(locator).toBeVisible();
        await this.action.setRadioByQuestion(label, value);
        this.logger.info?.(`✓ Answered faith-based requirements: ${value}`);
    }
    async answerNegativeScreens(value) {
        const label = 'Does the client have specific negative screens that need to be employed?';
        const locator = this.page.getByText(label, { exact: false });
        if (!(await locator.count()))
            return;
        if (!value)
            throw new Error('answerNegativeScreens requires a value');
        await (0, test_1.expect)(locator).toBeVisible();
        await this.action.setRadioByQuestion(label, value);
        this.logger.info?.(`✓ Answered negative screens: ${value}`);
    }
    async selectNegativeScreens(selection) {
        const groupId = 'person.negativeScreens';
        if (!(await this.isAriaGroupVisible(groupId)))
            return [];
        return this.action.selectCheckboxesFromAriaGroup(groupId, selection);
    }
    async answerSustainableInvestmentStatement(value) {
        const label = "Which of the below statements most closely aligns with the client's sustainable investment requirements?";
        const locator = this.page.getByText(label, { exact: false });
        if (!(await locator.count()))
            return;
        if (!value)
            throw new Error('answerSustainableInvestmentStatement requires a value');
        await (0, test_1.expect)(locator).toBeVisible();
        await this.action.setRadioByQuestion(label, value);
        this.logger.info?.(`✓ Answered sustainable investment statement: ${value}`);
    }
    /* -------------------- Final Fact Find Completed -------------------- */
    async verifyFactFindCompleted() {
        await this.page.waitForURL(/\/kyc-ff\/success/i, { timeout: 15000 });
        await (0, test_1.expect)(this.page.getByText(/Fact Find Successfully Completed/i)).toBeVisible({
            timeout: 15000,
        });
    }
}
exports.KycInvestmentKnowledgeAndPreferencesPageSteps = KycInvestmentKnowledgeAndPreferencesPageSteps;
//# sourceMappingURL=KycInvestmentKnowledgeAndPreferencesPageSteps.js.map