"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycInvestmentKnowledgeAndPreferencesPageSteps = void 0;
// projects/gateway-ui/steps/kyc_forms/KycInvestmentKnowledgeAndPreferencesPageSteps.ts
const BaseKYCSteps_1 = require("@steps/kyc_forms/BaseKYCSteps");
const test_1 = require("@playwright/test");
const TextHelper_1 = require("@framework/helpers/TextHelper");
const KycInvestmentKnowledgeAndPreferencesPageLocators_1 = require("@pages/kycElementLocators/KycInvestmentKnowledgeAndPreferencesPageLocators");
/**
 * KycInvestmentKnowledgeAndPreferencesPageSteps
 * - Completes the "Investment Knowledge & Preferences" KYC page
 * - Avoids any class-level state (no sustainabilityAwarenessIsYes flag)
 * - Avoids custom union types (no TriBool)
 * - Uses returned boolean | undefined to drive conditional assertions
 */
class KycInvestmentKnowledgeAndPreferencesPageSteps extends BaseKYCSteps_1.BaseKYCSteps {
    constructor(page, config) {
        super(page, config);
        this.locators = new KycInvestmentKnowledgeAndPreferencesPageLocators_1.KycInvestmentKnowledgeAndPreferencesPageLocators(page);
    }
    /* -------------------- Main Flow -------------------- */
    /**
     * Complete the entire Investment Knowledge & Preferences page
     * Uses the standardized KYC page completion flow with custom submit button
     */
    async completeKYC_InvestmentKnowledgeAndPreferences() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.verifyKYCPageHeading('page=investment-knowledge-and-preferences', 'Investment Knowledge & Preferences');
        await this.answerInvestmentKnowledgeAndPreferencesQuestions();
        await this.verifyFactFindCompleted();
    }
    /**
     * Answers all questions on the page, safely skipping those not shown.
     */
    async answerInvestmentKnowledgeAndPreferencesQuestions() {
        await this.answerInvestmentKnowledgeAndPreference('Yes');
        await this.answerClientClassification('Retail');
        await this.answerInvestmentExperience('Basic');
        await this.answerSustainabilityRequirements('They require a solution that has an objective to invest in assets that are environmentally and/or socially sustainable');
        // Key refactor: we return awareness answer (true/false) or undefined (question not shown)
        await this.answerSustainabilityAwareness('Yes - they are comfortable proceeding');
        // Assert the Responsible Investment Framework based on awareness (or skip if undefined)
        await this.assertResponsibleInvestmentFramework();
        await this.answerResponsibleInvestmentFramework('No');
        await this.answerFaithBasedRequirements('No');
        await this.answerNegativeScreens('Yes');
        await this.selectNegativeScreens();
        await this.answerSustainableInvestmentStatement();
        await this.action.clickButtonByText('Save and Submit');
    }
    /* -------------------- Questions -------------------- */
    /**
     * Q: Do you need to provide or update Investment Knowledge & Preference?
     */
    async answerInvestmentKnowledgeAndPreference(value) {
        if (!value)
            throw new Error('answerInvestmentKnowledgeAndPreference requires a value');
        // Use verification method to ensure selection is successful
        await this.answerRadioQuestionWithVerification('Do you need to provide or update your Investment Knowledge & Preference?', value);
    }
    /**
     * Q: What is the client's classification?
     */
    async answerClientClassification(answer) {
        if (!answer)
            throw new Error('answerClientClassification requires a value');
        // Use verification method to ensure selection is successful
        await this.answerRadioQuestionWithVerificationIfPresent("What is the client's classification?", answer);
    }
    /**
     * Q: What's the client's level of investment experience?
     */
    async answerInvestmentExperience(value) {
        // Use verification method to ensure selection is successful
        await this.answerRadioQuestionWithVerificationIfPresent("What's the client's level of investment experience?", value);
    }
    /**
     * Q: Do you have sustainability linked requirements...?
     */
    async answerSustainabilityRequirements(value) {
        // Use verification method to ensure selection is successful
        await this.answerRadioQuestionWithVerificationIfPresent('Do you have sustainability linked requirements, that need to be considered in addition to your financial objectives?', value);
    }
    /**
     * Q: Is the client aware that in applying sustainability preferences...?
     *
     * If the question is displayed, selects the provided value.
     * If not displayed, logs and safely skips.
     */
    async answerSustainabilityAwareness(value) {
        const questionText = 'Is the client aware that in applying sustainability preferences they will be reducing their investable universe ' +
            'and this can have an effect on financial returns as well as increasing investment costs?';
        const questionPattern = TextHelper_1.TextHelper.toRegExp(questionText);
        const result = await this.action.setRadioByQuestionPatternIfPresent(questionPattern, value);
        if (result) {
            this.logInfo(`✓ Answered sustainability awareness: ${result}`);
        }
        else {
            this.logInfo('ℹ Sustainability awareness question not shown - skipping');
        }
    }
    /**
     * Assert Responsible Investment Framework section
     * - Skips if section is not displayed
     * - Fails clearly if text changes
     */
    async assertResponsibleInvestmentFramework() {
        const box = this.locators.responsibleInvestmentFrameworkBox;
        // Optional section: skip if not present
        if ((await box.count()) === 0) {
            this.logInfo('ℹ RIF section not shown - skipping');
            return;
        }
        // Main heading - exact text match (will show expected vs actual on failure)
        await (0, test_1.expect)(this.locators.responsibleInvestmentFrameworkTitle).toHaveText("Fairstone's Responsible Investment Framework", { timeout: 15000 });
        await (0, test_1.expect)(this.locators.negativeScreensHeading).toContainText('Negative Screens');
        await (0, test_1.expect)(this.locators.carbonReductionHeading).toContainText('Carbon Reduction');
        await (0, test_1.expect)(this.locators.positiveOutcomesHeading).toContainText('Positive Outcomes');
    }
    /**
     * Q: Does Fairstone's Responsible Investment Framework align...?
     */
    async answerResponsibleInvestmentFramework(value) {
        // Use verification method to ensure selection is successful
        await this.answerRadioQuestionWithVerificationIfPresent("Does the Fairstone's Responsible Investment Framework align with their sustainability linked requirements?", value);
    }
    /**
     * Q: Are the client's requirements faith based?
     */
    async answerFaithBasedRequirements(value) {
        // Use verification method to ensure selection is successful
        await this.answerRadioQuestionWithVerificationIfPresent("Are the client's requirements faith based?", value);
    }
    /**
     * Q: Does the client have specific negative screens...?
     */
    async answerNegativeScreens(value) {
        // Use verification method to ensure selection is successful
        await this.answerRadioQuestionWithVerificationIfPresent('Does the client have specific negative screens that need to be employed?', value);
    }
    /**
     * Select negative screens checkboxes if the aria-group is shown.
     */
    async selectNegativeScreens(...values) {
        await this.waitHelper.waitForElement(this.locators.negativeScreensFieldset, 5000).catch(() => { });
        if (!(await this.locators.negativeScreensFieldset.isVisible()))
            return [];
        const selected = await this.action.selectCheckboxGroup(this.locators.negativeScreensFieldset, ...values);
        this.logInfo(`✓ Negative Screens selected: ${selected.join(', ')}`);
        return selected;
    }
    /**
     * Q: Which statement aligns with the client's sustainable investment requirements?
     */
    async answerSustainableInvestmentStatement(value) {
        if (await this.elementNotExists("Which of the below statements most closely aligns with the client's sustainable investment requirements?"))
            return;
        const chosen = await this.action.setRadioByQuestion("Which of the below statements most closely aligns with the client's sustainable investment requirements?", value);
        await this.assert.assertElementVisible(this.page.getByText(chosen, { exact: false }).first());
        this.logInfo(`✓ Answered sustainable investment statement: ${chosen}`);
    }
    /* -------------------- Final Fact Find Completed -------------------- */
    /**
     * Verify KYC completes successfully and we land on the success page.
     */
    async verifyFactFindCompleted() {
        await this.page.waitForURL(/\/kyc-ff\/success/i, { timeout: 15000 });
        await (0, test_1.expect)(this.page.getByText(/Fact Find Successfully Completed/i)).toBeVisible({
            timeout: 15000,
        });
    }
}
exports.KycInvestmentKnowledgeAndPreferencesPageSteps = KycInvestmentKnowledgeAndPreferencesPageSteps;
//# sourceMappingURL=KycInvestmentKnowledgeAndPreferencesPageSteps.js.map