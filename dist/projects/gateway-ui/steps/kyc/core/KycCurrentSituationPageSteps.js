"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycCurrentSituationPageSteps = void 0;
// projects/gateway-ui/steps/kyc_forms/KycCurrentSituationPageSteps.ts
const BaseKYCSteps_1 = require("@steps/kyc/BaseKYCSteps");
const src_1 = require("@/framework/src");
const DataStore_1 = require("@framework/utils/DataStore");
/**
 * 🎯 KYC Current Situation Page Steps
 *
 * This class handles all interactions with the KYC Current Situation page.
 * It follows a simple pattern: validate page → answer questions → save data → continue.
 *
 * Key Features:
 * - Clear method names that describe what they do
 * - Proper error handling and validation
 * - Data persistence for later use
 * - Junior developer friendly structure
 *
 * @example Basic usage
 * ```typescript
 * const currentSituationSteps = new KycCurrentSituationPageSteps(page);
 * await currentSituationSteps.completeKYCCurrentSituation();
 * ```
 */
class KycCurrentSituationPageSteps extends BaseKYCSteps_1.BaseKYCSteps {
    constructor(page, config) {
        super(page, config);
    }
    // ==========================================
    // 🎯 MAIN WORKFLOW METHOD
    // ==========================================
    /**
     * 🎯 Complete the entire KYC Current Situation page
     *
     * This is the main method that orchestrates the entire page completion.
     * It follows a clear sequence: validate → answer → save → continue.
     */
    async completeKYCCurrentSituation() {
        // Step 1: Validate we're on the correct page
        await this.validateCurrentSituationPage();
        // Step 2: Answer all the questions on the page
        await this.answerAllCurrentSituationQuestions();
        // Step 3: Save and continue to next page
        await this.saveAndContinue();
    }
    // ==========================================
    // 🎯 PAGE VALIDATION
    // ==========================================
    /**
     * 🎯 Validate that we're on the Current Situation page
     *
     * This ensures we're on the right page before proceeding with form filling.
     */
    async validateCurrentSituationPage() {
        await this.assert.assertPageURLContains('page=current-situation');
        await this.assert.assertHeadingVisible('Current situation', 15000);
        this.logInfo('✓ Current Situation page validated');
    }
    // ==========================================
    // 🎯 QUESTION ANSWERING WORKFLOW
    // ==========================================
    /**
     * 🎯 Answer all questions on the Current Situation page
     *
     * This method breaks down the complex form into logical sections.
     * Each section is handled by a separate method for better readability.
     */
    async answerAllCurrentSituationQuestions() {
        // Employment related questions
        await this.handleEmploymentQuestions();
        // Retirement related questions
        await this.handleRetirementQuestions();
        // Health related questions
        await this.handleHealthQuestions();
        // Personal details (occupation, employer)
        await this.handlePersonalDetailsQuestions();
        // Legal documents questions
        await this.handleLegalDocumentQuestions();
        this.logInfo('✓ Completed all KYC Current Situation questions');
    }
    /**
     * 🎯 Handle employment-related questions
     */
    async handleEmploymentQuestions() {
        await this.selectEmploymentStatus('Unemployed');
        await this.selectEmploymentContract();
        await this.selectEmploymentChangeExpected();
        this.logInfo('✓ Employment questions completed');
    }
    /**
     * 🎯 Handle retirement-related questions
     */
    async handleRetirementQuestions() {
        await this.answerRetirementAndAge('No');
        await this.fillRetirementAge('When do you plan to retire?', '75');
        this.logInfo('✓ Retirement questions completed');
    }
    /**
     * 🎯 Handle health-related questions
     */
    async handleHealthQuestions() {
        await this.selectOverallHealth();
        await this.answerMedicalConditions();
        await this.answerSmoking12Months();
        this.logInfo('✓ Health questions completed');
    }
    /**
     * 🎯 Handle personal details questions and save the data
     */
    async handlePersonalDetailsQuestions() {
        const occupation = await this.fillOccupation('What is your occupation?', DataStore_1.dataStore.getValue('kyc.currentSituation.occupation'));
        const currentEmployer = await this.fillCurrentEmployer('Who is your current employer?', DataStore_1.dataStore.getValue('kyc.currentSituation.currentEmployer'));
        // Save the data for later use
        this.savePersonalDetailsData(occupation, currentEmployer);
        this.logInfo('✓ Personal details questions completed and data saved');
    }
    /**
     * 🎯 Handle legal document questions
     */
    async handleLegalDocumentQuestions() {
        await this.answerWillQuestion('Yes');
        await this.answerPowerOfAttorney('Yes');
        await this.selectPowerOfAttorneyType('Enduring POA', 'Lasting POA Both', 'Ordinary POA');
        this.logInfo('✓ Legal document questions completed');
    }
    /**
     * 🎯 Save personal details data to the data store
     *
     * @param occupation - The occupation value to save
     * @param currentEmployer - The current employer value to save
     */
    savePersonalDetailsData(occupation, currentEmployer) {
        // Save individual values (recommended for easy access)
        DataStore_1.dataStore.setValue('kyc.currentSituation.occupation', occupation);
        DataStore_1.dataStore.setValue('kyc.currentSituation.currentEmployer', currentEmployer);
        // Save combined object (useful for bulk operations)
        DataStore_1.dataStore.setValue('kyc.currentSituation', {
            occupation,
            currentEmployer,
        });
    }
    /**
     * 🎯 Save the form and continue to the next page
     */
    async saveAndContinue() {
        await this.action.clickButtonByText('Save & Continue');
        this.logInfo('✓ Current Situation form saved and continuing to next page');
    }
    /* -------------------- Question Methods -------------------- */
    async selectEmploymentStatus(answer) {
        try {
            return this.action.chooseFromQuestionReactSelectDropdown('What is your current employment status?', answer);
        }
        catch (error) {
            throw new Error(`Failed to select employment status: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async selectEmploymentContract(answer) {
        if (await this.elementNotExists('What type of employment contract do you have?'))
            return '';
        return this.action.chooseFromQuestionReactSelectDropdown('What type of employment contract do you have?', answer);
    }
    async answerRetirementAndAge(answer) {
        const question = 'Do you plan to retire at this age?';
        // Use verification method to ensure selection is successful
        await this.answerRadioQuestionWithVerificationIfPresent(question, answer);
    }
    async fillRetirementAge(label, value) {
        if (await this.elementNotExists(label))
            return;
        await this.action.fillInputByLabelAndAssert(label, value);
    }
    /* -------------------- Occupation / Employer -------------------- */
    async fillOccupation(label, value) {
        const occupation = value ?? (await src_1.TestDataGenerator.occupationAsync());
        if (await this.elementNotExists(label))
            return occupation;
        await this.action.fillInputByLabelAndAssert(label, occupation);
        return occupation;
    }
    async fillCurrentEmployer(label, value) {
        const employer = value ?? (await src_1.TestDataGenerator.employerAsync());
        if (await this.elementNotExists(label))
            return employer;
        await this.action.fillInputByLabelAndAssert(label, employer);
        return employer;
    }
    /* -------------------- Remaining Questions -------------------- */
    async selectEmploymentChangeExpected() {
        const question = 'Are there any expected changes to your employment in the near future?';
        if (!(await this.page.getByText(question, { exact: false }).count()))
            return '';
        return this.action.chooseFromQuestionReactSelectDropdown(question);
    }
    async selectOverallHealth() {
        await this.action.chooseFromQuestionReactSelectDropdown('How would you describe your overall health?');
    }
    async answerMedicalConditions(answer = 'No') {
        const question = 'Do you have any known medical conditions?';
        // Use verification method to ensure selection is successful
        await this.answerRadioQuestionWithVerificationIfPresent(question, answer);
    }
    async answerSmoking12Months(answer = 'Yes') {
        const question = 'Do you smoke or vape, or have you done so in the past 12 months?';
        // Use verification method to ensure selection is successful
        await this.answerRadioQuestionWithVerificationIfPresent(question, answer);
    }
    async answerWillQuestion(answer) {
        // Use verification method to ensure selection is successful
        await this.answerRadioQuestionWithVerificationIfPresent('Do you have an up to date Will that reflects your current wishes?', answer);
    }
    async answerPowerOfAttorney(answer) {
        // Use verification method to ensure selection is successful
        await this.answerRadioQuestionWithVerificationIfPresent('Do you have a Power of Attorney in place?', answer);
    }
    async selectPowerOfAttorneyType(...values) {
        const selected = await this.action.selectFromCheckboxGroupByLabel('Type of Power of Attorney', values.length ? values : undefined);
        this.logInfo(`✓ Selected Power of Attorney: ${selected.join(', ')}`);
    }
}
exports.KycCurrentSituationPageSteps = KycCurrentSituationPageSteps;
//# sourceMappingURL=KycCurrentSituationPageSteps.js.map