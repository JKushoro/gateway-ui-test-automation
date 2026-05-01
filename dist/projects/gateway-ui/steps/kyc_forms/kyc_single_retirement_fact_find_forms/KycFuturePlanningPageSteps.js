"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycFuturePlanningPageSteps = void 0;
const BaseKYCSteps_1 = require("@steps/kyc_forms/BaseKYCSteps");
const test_1 = require("@playwright/test");
const KYCKycFuturePlanningPageLocator_1 = require("@pages/kycElementLocators/kyc_retirement_fact_find_locator/KYCKycFuturePlanningPageLocator");
const KYCDatePickerService_1 = require("@steps/components/KYCDatePickerService");
class KycFuturePlanningPageSteps extends BaseKYCSteps_1.BaseKYCSteps {
    constructor(page, config) {
        super(page, config);
        this.locators = new KYCKycFuturePlanningPageLocator_1.KYCKycFuturePlanningPageLocator(page);
        this.datePicker = new KYCDatePickerService_1.KYCDatePickerService(page);
    }
    /* -------------------- Main Flow -------------------- */
    async completeKYCKycFuturePlanning() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.assert.assertPageURLContains('page=futureplanning');
        await this.assert.assertHeadingVisible('Future Planning', 15000);
        await this.answerFuturePlanningQuestions();
        this.logInfo('✓ Completed all KYC Future Planning questions');
        await this.action.clickButtonByText('Save & Continue');
    }
    async answerFuturePlanningQuestions() {
        await this.fillRetirementPlans('What are your retirement plans? Please provide details of short and longer term plans', 'This is to test Retirement Plans field works');
        await this.selectRetirementMoveIntent('Yes');
        await this.fillFurtherInformation('Please provide further information', 'This is to test Further Information field works');
        await this.fillEssentialExpenditureChanges('What changes do you expect to your Essential Expenditure? Please provide details', 'This is to test Essential Expenditure Changes field works');
        await this.fillDiscretionaryExpenditureChanges('What changes do you expect to your Discretionary Expenditure? Please provide details', 'This is to test Discretionary Expenditure Changes field works');
        await this.selectOneOffEventsPlanning('Yes');
        await this.setRetirementOneOffEventDate(0, 1, 1);
        await this.fillFirstRetirementAmount(200000);
        await this.fillRetirementIncomeSourcesDetails('What sources of income and/ or capital do you wish to designate for your retirement? Please provide details', 'This is to test Retirement IncomeSources field works');
        await this.fillGuaranteedIncomeEssentialExpenditureDetails('How do you feel about securing a guaranteed income to meet your Essential expenditure in retirement? Please provide details', 'This is to test Guaranteed Income Essential Expenditure field works');
        await this.fillGuaranteedIncomeForOtherExpenditureDetails('How do you feel about securing guaranteed income to meet other expenditure in retirement? Please provide details', 'This is to test Guaranteed Income For Other Expenditure field works');
    }
    /* -------------------- Retirement Planning Question Methods -------------------- */
    async fillRetirementPlans(label, value) {
        if (await this.elementNotExists(label))
            return;
        await this.action.fillInputByLabelAndAssert(label, value);
    }
    async selectRetirementMoveIntent(answer) {
        await this.answerRadioQuestionIfExists('Do you intend to move in retirement?', answer);
    }
    async fillFurtherInformation(label, value) {
        if (await this.elementNotExists(label))
            return;
        await this.action.fillInputByLabelAndAssert(label, value);
    }
    async fillEssentialExpenditureChanges(label, value) {
        if (await this.elementNotExists(label))
            return;
        await this.action.fillInputByLabelAndAssert(label, value);
    }
    async fillDiscretionaryExpenditureChanges(label, value) {
        if (await this.elementNotExists(label))
            return;
        await this.action.fillInputByLabelAndAssert(label, value);
    }
    async selectOneOffEventsPlanning(answer) {
        await this.answerRadioQuestionIfExists('Do you have any specific one-off events to plan for?', answer);
    }
    async setRetirementOneOffEventDate(rowIndex, minYearsAgo, maxYearsAgo) {
        const input = this.locators.getRetirementOneOffEventDateInput(rowIndex);
        if (!(await this.action.ensureVisibleOrSkip(input, 'Retirement one-off event date'))) {
            return undefined;
        }
        const date = this.datePicker.generateRandomPastDate(minYearsAgo, maxYearsAgo);
        await input.fill(date);
        await (0, test_1.expect)(input).toHaveValue(date);
        return date;
    }
    async fillFirstRetirementAmount(value) {
        const input = this.locators.firstRetirementAmount(0);
        if (!(await this.action.ensureVisibleOrSkip(input, 'First retirement amount')))
            return;
        await this.action.fillFormattedNumberInput(input, value, 'First retirement amount');
    }
    async fillRetirementIncomeSourcesDetails(label, value) {
        if (await this.elementNotExists(label))
            return;
        await this.action.fillInputByLabelAndAssert(label, value);
    }
    async fillGuaranteedIncomeEssentialExpenditureDetails(label, value) {
        if (await this.elementNotExists(label))
            return;
        await this.action.fillInputByLabelAndAssert(label, value);
    }
    async fillGuaranteedIncomeForOtherExpenditureDetails(label, value) {
        if (await this.elementNotExists(label))
            return;
        await this.action.fillInputByLabelAndAssert(label, value);
    }
}
exports.KycFuturePlanningPageSteps = KycFuturePlanningPageSteps;
//# sourceMappingURL=KycFuturePlanningPageSteps.js.map