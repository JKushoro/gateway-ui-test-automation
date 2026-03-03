"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycCurrentSituationPageSteps = void 0;
// projects/gateway-ui/steps/kyc_forms/KycCurrentSituationPageSteps.ts
const BaseKYCSteps_1 = require("@steps/kyc_forms/BaseKYCSteps");
const src_1 = require("@/framework/src");
const DataStore_1 = require("@framework/utils/DataStore");
class KycCurrentSituationPageSteps extends BaseKYCSteps_1.BaseKYCSteps {
    constructor(page, config) {
        super(page, config);
    }
    /* -------------------- Main Flow -------------------- */
    async completeKYCCurrentSituation() {
        await this.completeKYCPageStandard('page=current-situation', 'Current situation', async () => {
            await this.answerCurrentSituationQuestions();
            this.logInfo('✓ Completed all KYC Current Situation questions');
        });
    }
    async answerCurrentSituationQuestions() {
        //await this.selectEmploymentStatus('Semi-Retired');
        await this.selectEmploymentStatus('Unemployed');
        await this.selectEmploymentContract();
        await this.answerRetirementAndAge('No');
        await this.fillRetirementAge('When do you plan to retire?', '75');
        await this.selectOverallHealth();
        await this.answerMedicalConditions();
        const occupation = await this.fillOccupation('What is your occupation?', DataStore_1.dataStore.getValue('kyc.currentSituation.occupation'));
        const currentEmployer = await this.fillCurrentEmployer('Who is your current employer?', DataStore_1.dataStore.getValue('kyc.currentSituation.currentEmployer'));
        await this.selectEmploymentChangeExpected();
        await this.answerSmoking12Months();
        await this.answerWillQuestion('Yes');
        await this.answerPowerOfAttorney('Yes');
        await this.selectPowerOfAttorneyType('Enduring POA', 'Lasting POA Both', 'Ordinary POA');
        // Persist both individually (recommended)
        DataStore_1.dataStore.setValue('kyc.currentSituation.occupation', occupation);
        DataStore_1.dataStore.setValue('kyc.currentSituation.currentEmployer', currentEmployer);
        // Optional: store combined object
        DataStore_1.dataStore.setValue('kyc.currentSituation', {
            occupation,
            currentEmployer,
        });
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