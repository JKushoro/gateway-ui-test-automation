"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycCurrentSituationPageSteps = void 0;
// projects/gateway-ui/steps/kyc_forms/KycCurrentSituationPageSteps.ts
const BaseKYCSteps_1 = require("@steps/kyc_forms/BaseKYCSteps");
const test_1 = require("@playwright/test");
const src_1 = require("@/framework/src");
const DataStore_1 = require("@framework/utils/DataStore");
class KycCurrentSituationPageSteps extends BaseKYCSteps_1.BaseKYCSteps {
    constructor(page, config) {
        super(page, config);
    }
    /* -------------------- Verification -------------------- */
    async verifyCurrentSituationHeading() {
        await this.assert.assertPageURLContains('page=current-situation');
        await (0, test_1.expect)(this.heading).toBeVisible({ timeout: 15000 });
        await (0, test_1.expect)(this.heading).toHaveText('Current situation');
    }
    /* -------------------- Main Flow -------------------- */
    async completeKYCCurrentSituation() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.verifyCurrentSituationHeading();
        await this.answerCurrentSituationQuestions();
        this.logger.info?.('✓ Completed all KYC Current Situation questions');
    }
    async answerCurrentSituationQuestions() {
        await this.selectEmploymentStatus();
        await this.selectEmploymentContract();
        await this.answerRetirementAndAge('No');
        await this.fillRetirementAge();
        await this.selectOverallHealth();
        await this.answerMedicalConditions();
        const occupation = await this.fillOccupation();
        const currentEmployer = await this.fillCurrentEmployer();
        await this.selectEmploymentChangeExpected();
        await this.answerSmoking12Months();
        await this.answerWillQuestion();
        await this.answerPowerOfAttorney();
        await this.selectPowerOfAttorneyType('Enduring POA', 'Lasting POA Both', 'Ordinary POA');
        await this.action.clickButtonByText('Save & Continue');
        DataStore_1.dataStore.setValue('kyc.currentSituation', {
            occupation,
            currentEmployer,
        });
    }
    /* -------------------- Questions (split into methods) -------------------- */
    async selectEmploymentStatus() {
        const selectedValue = 'Unemployed';
        this.logger.info?.(`Selecting employment status: ${selectedValue}`);
        await this.action.chooseFromQuestionReactSelectDropdown('What is your current employment status?', selectedValue);
    }
    /** (1) Employment contract */
    async selectEmploymentContract() {
        const question = 'What type of employment contract do you have?';
        if (!(await this.page
            .getByText(question, { exact: false })
            .count()
            .catch(() => 0)))
            return '';
        const selected = await this.action.chooseFromQuestionReactSelectDropdown(question);
        this.logger.info?.(`Selected employment contract: ${selected}`);
        return selected;
    }
    /** () Retirement age question */
    async answerRetirementAndAge(answer) {
        const question = this.page
            .getByText('Do you plan to retire at this age?', { exact: false })
            .first();
        if (!(await question.count()))
            return;
        await (0, test_1.expect)(question).toBeVisible();
        await this.action.setRadioByQuestion('Do you plan to retire at this age?', answer);
        this.logger.info?.(`✓ Answered retirement age question:: ${answer}`);
    }
    /** () Retirement age input */
    async fillRetirementAge() {
        const label = 'When do you plan to retire?';
        const value = '75';
        if (!(await this.page
            .getByText(label, { exact: false })
            .count()
            .catch(() => 0)))
            return value;
        await this.action.fillInputByLabel(label, value);
        return value;
    }
    /** () Occupation */
    async fillOccupation() {
        const occupation = await src_1.TestDataGenerator.occupationAsync();
        this.logger.info?.(`Filling occupation: ${occupation}`);
        if (!(await this.page
            .getByText('What is your occupation?', { exact: false })
            .count()
            .catch(() => 0)))
            return occupation;
        await this.action.fillInputByLabel('What is your occupation?', occupation);
        return occupation;
    }
    /** () Current employer */
    async fillCurrentEmployer() {
        const employer = await src_1.TestDataGenerator.employerAsync();
        this.logger.info?.(`Filling current employer: ${employer}`);
        if (!(await this.page
            .getByText('Who is your current employer?', { exact: false })
            .count()
            .catch(() => 0)))
            return employer;
        await this.action.fillInputByLabel('Who is your current employer?', employer);
        return employer;
    }
    /** (4) Expected employment changes */
    async selectEmploymentChangeExpected() {
        const question = 'Are there any expected changes to your employment in the near future?';
        if (!(await this.page
            .getByText(question, { exact: false })
            .count()
            .catch(() => 0)))
            return '';
        const selected = await this.action.chooseFromLabeledReactSelectDropdown(question);
        this.logger.info?.(`Selected employment change expected: ${selected}`);
        return selected;
    }
    /** () Overall health */
    async selectOverallHealth() {
        const selectedValue = '';
        const chosen = await this.action.chooseFromQuestionReactSelectDropdown('How would you describe your overall health?', selectedValue);
        this.logger.info?.(`Your overall health description: ${chosen}`);
    }
    /** (7) Medical conditions */
    async answerMedicalConditions(answer = 'No') {
        const question = 'Do you have any known medical conditions?';
        if (!(await this.page
            .getByText(question, { exact: false })
            .count()
            .catch(() => 0))) {
            this.logger.info?.('↷ Skipped medical conditions question (not displayed)');
            return;
        }
        await this.action.setRadioByQuestion(question, answer);
        this.logger.info?.(`✓ Answered known medical conditions: ${answer}`);
    }
    /** (8) Smoking/Vaping in past 12 months */
    async answerSmoking12Months(answer = 'Yes') {
        const question = 'Do you smoke or vape, or have you done so in the past 12 months?';
        if (!(await this.page
            .getByText(question, { exact: false })
            .count()
            .catch(() => 0))) {
            this.logger.info?.('↷ Skipped smoking/vaping question (not displayed)');
            return;
        }
        await this.action.setRadioByQuestion(question, answer);
        this.logger.info?.(`✓ Answered smoking/vaping question ${answer}`);
    }
    /** (11a) Up-to-date Will */
    async answerWillQuestion(answer = 'Yes') {
        const question = 'Do you have an up to date Will that reflects your current wishes?';
        if (!(await this.page
            .getByText(question, { exact: false })
            .count()
            .catch(() => 0))) {
            this.logger.info?.('↷ Skipped Will question (not displayed)');
            return;
        }
        await this.action.setRadioByQuestion(question, answer);
        this.logger.info?.(`✓ Answered Will question ${answer}`);
    }
    /** (11b) Power of Attorney in place */
    async answerPowerOfAttorney(answer = 'Yes') {
        const question = 'Do you have a Power of Attorney in place?';
        if (!(await this.page
            .getByText(question, { exact: false })
            .count()
            .catch(() => 0))) {
            this.logger.info?.('↷ Skipped Power of Attorney question (not displayed)');
            return;
        }
        await this.action.setRadioByQuestion(question, answer);
        this.logger.info?.(`✓ Answered Power of Attorney question ${answer}`);
    }
    async selectPowerOfAttorneyType(...values) {
        const selected = await this.action.selectFromCheckboxGroupByLabel('Type of Power of Attorney', values.length ? values : undefined);
        this.logger.info?.(`✓ Selected Power of Attorney: ${selected.join(', ')}`);
    }
}
exports.KycCurrentSituationPageSteps = KycCurrentSituationPageSteps;
//# sourceMappingURL=KycCurrentSituationPageSteps.js.map