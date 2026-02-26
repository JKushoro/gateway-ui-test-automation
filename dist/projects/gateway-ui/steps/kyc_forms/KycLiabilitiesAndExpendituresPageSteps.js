"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycLiabilitiesAndExpendituresPageSteps = void 0;
const BaseKYCSteps_1 = require("@steps/kyc_forms/BaseKYCSteps");
const test_1 = require("@playwright/test");
const src_1 = require("@/framework/src");
const KycLiabilitiesAndExpendituresPageLocators_1 = require("@pages/kycElementLocators/KycLiabilitiesAndExpendituresPageLocators");
const KYCDatePickerService_1 = require("@steps/components/KYCDatePickerService");
class KycLiabilitiesAndExpendituresPageSteps extends BaseKYCSteps_1.BaseKYCSteps {
    constructor(page, config) {
        super(page, config);
        this.locators = new KycLiabilitiesAndExpendituresPageLocators_1.KycLiabilitiesAndExpendituresPageLocators(page);
        this.datePicker = new KYCDatePickerService_1.KYCDatePickerService(page);
    }
    /* -------------------- Verification -------------------- */
    async verifyLiabilitiesAndExpendituresHeading() {
        await this.assert.assertPageURLContains('page=liabilities-and-expenditures');
        await (0, test_1.expect)(this.heading).toBeVisible({ timeout: 15000 });
        await (0, test_1.expect)(this.heading).toHaveText('Liabilities & Expenditures');
    }
    /* -------------------- Main Flow -------------------- */
    async completeKYC_LiabilitiesAndExpenditures() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.verifyLiabilitiesAndExpendituresHeading();
        await this.answerLiabilitiesAndExpendituresQuestions();
        await this.action.clickButtonByText('Save & Continue');
    }
    async answerLiabilitiesAndExpendituresQuestions() {
        await this.answerHasMortgageOnProperty('Yes');
        await this.selectCurrentMortgageEndTerm('I know the date');
        await this.setMortgageTermEndDate(2, 3);
        await this.selectMortgageLender();
        await this.selectTypeOfMortgage();
        await this.fillFirstOutstandingBalance('20,000');
        await this.fillMortgageAccountNumber();
        await this.selectMortgageRepaymentType();
        await this.fillFirstMonthlyPayment(12);
        await this.selectInterestType();
        await this.fillFixedLengthYears('15');
        await this.fillRemainingMortgageTermYears('4');
        await this.fillFirstCurrentInterestRate(12);
        await this.setProductStartDate(1, 1);
        await this.answerOtherLiabilities('Yes');
        await this.assertTotalLiabilitiesCalculatedCorrectly();
        await this.fillCommittedExpenditures();
    }
    /* -------------------- Questions -------------------- */
    async answerHasMortgageOnProperty(answer) {
        const question = /do you have a mortgage on this property\?/i;
        const selected = await this.action.setRadioByQuestionPattern(question, answer);
        (0, test_1.expect)(selected).toBeTruthy();
        this.logger.info?.(`✓ ${question}: ${answer}`);
    }
    async selectCurrentMortgageEndTerm(answer) {
        const question = 'When does your current mortgage term end?';
        const q = this.page.getByText(question, { exact: false }).first();
        if (!(await this.action.ensureVisibleOrSkip(q, question)))
            return;
        await (0, test_1.expect)(q).toBeVisible();
        await this.action.setRadioByQuestion(question, answer);
        this.logger.info?.(`✓ ${question}: ${answer}`);
    }
    async setMortgageTermEndDate(minYearsAhead, maxYearsAhead) {
        const input = this.locators.mortgageTermEndDate;
        if (!(await this.action.ensureVisibleOrSkip(input, 'Mortgage Term End Date')))
            return;
        const { month, year } = this.datePicker.generateRandomFutureMonthYear(minYearsAhead, maxYearsAhead);
        const selected = await this.datePicker.setMonthYearIntoInput(input, month, year);
        await this.assert.assertInputHasValue(input, selected);
        this.logger.info?.(`✓ Mortgage Term End Date set: ${selected}`);
        return selected;
    }
    async selectMortgageLender(value) {
        if (!(await this.page.getByText('Mortgage Lender', { exact: false }).count()))
            return;
        const chosen = await this.action.chooseFromLabeledReactSelectDropdown('Mortgage Lender', value);
        await (0, test_1.expect)(this.page.getByText(chosen, { exact: false }).first()).toBeVisible();
        this.logger.info?.(`✓ Mortgage Lender selected: ${chosen}`);
    }
    async selectTypeOfMortgage(value) {
        if (!(await this.page.getByText('Type of mortgage', { exact: false }).count()))
            return;
        const chosen = await this.action.chooseFromLabeledReactSelectDropdown('Type of mortgage', value);
        await (0, test_1.expect)(this.page.getByText(chosen, { exact: false }).first()).toBeVisible();
        this.logger.info?.(`✓ Type of mortgage selected: ${chosen}`);
    }
    async fillFirstOutstandingBalance(value) {
        const input = this.locators.firstOutstandingBalance;
        if (!(await this.action.ensureVisibleOrSkip(input, 'First outstanding balance')))
            return;
        await this.action.fillFormattedNumberInput(input, value, 'First outstanding balance');
    }
    async fillMortgageAccountNumber(value) {
        const input = await this.action.findInputFieldByLabel('Mortgage account number');
        if (!(await this.action.ensureVisibleOrSkip(input, 'Mortgage account number')))
            return;
        const finalValue = value ?? src_1.TestDataGenerator.randomNumericString();
        await this.action.fillInputByLabel('Mortgage account number', String(finalValue));
    }
    async selectMortgageRepaymentType(value) {
        if (!(await this.page.getByText('Mortgage repayment type', { exact: false }).count()))
            return;
        const chosen = await this.action.chooseFromLabeledReactSelectDropdown('Mortgage repayment type', value);
        await (0, test_1.expect)(this.page.getByText(chosen, { exact: false }).first()).toBeVisible();
        this.logger.info?.(`✓ Mortgage repayment type selected: ${chosen}`);
    }
    async fillFirstMonthlyPayment(value) {
        const input = this.locators.firstMonthlyPayment;
        if (!(await this.action.ensureVisibleOrSkip(input, 'First Monthly Payment')))
            return;
        await this.action.fillFormattedNumberInput(input, value, 'First Monthly Payment');
    }
    async selectInterestType(value) {
        if (!(await this.page.getByText('Interest type', { exact: false }).count()))
            return;
        const chosen = await this.action.chooseFromLabeledReactSelectDropdown('Interest type', value);
        await (0, test_1.expect)(this.page.getByText(chosen, { exact: false }).first()).toBeVisible();
        this.logger.info?.(`✓ Interest type selected: ${chosen}`);
    }
    async fillFixedLengthYears(value) {
        const label = 'Fixed length (years)';
        const input = this.page.getByLabel(label, { exact: false });
        if (!(await this.action.ensureVisibleOrSkip(input, label)))
            return;
        await this.action.fillInputByLabel(label, value);
        await (0, test_1.expect)(input).toHaveValue(value);
    }
    async fillRemainingMortgageTermYears(value) {
        const label = 'Remaining mortgage term (years)';
        const input = this.page.getByLabel(label, { exact: false });
        if (!(await this.action.ensureVisibleOrSkip(input, label)))
            return;
        await this.action.fillInputByLabel(label, value);
        await (0, test_1.expect)(input).toHaveValue(value);
    }
    async fillFirstCurrentInterestRate(value) {
        const input = this.locators.firstCurrentInterestRate;
        if (!(await this.action.ensureVisibleOrSkip(input, 'First Current interest Rate')))
            return;
        await this.action.fillFormattedNumberInput(input, value, 'First Current interest Rate');
    }
    async setProductStartDate(minYearsAgo, maxYearsAgo) {
        const label = 'Product start date';
        const input = this.page.getByLabel(label, { exact: false });
        if (!(await this.action.ensureVisibleOrSkip(input, label)))
            return;
        const date = this.datePicker.generateRandomPastDate(minYearsAgo, maxYearsAgo);
        await this.action.fillInputByLabel(label, date);
        await (0, test_1.expect)(input).toHaveValue(date);
        this.logger.info?.(`✓ ${label} set: ${date}`);
        return date;
    }
    async answerOtherLiabilities(answer) {
        const question = 'Do you have any other liabilities?';
        await (0, test_1.expect)(this.page.getByText(question, { exact: false }).first()).toBeVisible();
        await this.action.setRadioByQuestion(question, answer);
        this.logger.info?.(`✓ ${question}: ${answer}`);
    }
    /* =========================
     Total Liabilities Assertions
  ========================= */
    parseMoneyToNumber(raw) {
        if (!raw)
            return 0;
        const cleaned = raw.replace(/[^\d.-]/g, '');
        if (!cleaned)
            return 0;
        return Number(cleaned);
    }
    async readMoney(input) {
        const v = await input.inputValue();
        return this.parseMoneyToNumber(v);
    }
    async sumMoneyInputs(inputs) {
        const count = await inputs.count();
        let sum = 0;
        for (let i = 0; i < count; i++) {
            sum += await this.readMoney(inputs.nth(i));
        }
        return sum;
    }
    /**
     * Validates:
     * - Total balance = Mortgage outstanding + sum(other liabilities outstanding)
     * - Monthly total = Mortgage monthly + sum(other liabilities monthly)
     * - Yearly total = Monthly total * 12
     */
    async assertTotalLiabilitiesCalculatedCorrectly() {
        const totalsLabel = 'Total Liabilities';
        // -------------------------------------------------
        // Skip ENTIRE check if totals card not on screen
        // -------------------------------------------------
        if (!(await this.action.ensureVisibleOrSkip(this.locators.totalLiabilitiesBalance, totalsLabel)))
            return;
        let mortgageOutstanding = 0;
        let mortgageMonthly = 0;
        // -------------------------------------------------
        // Mortgage (optional)
        // -------------------------------------------------
        if (await this.action.ensureVisibleOrSkip(this.locators.mortgageOutstandingBalance, 'Mortgage outstanding balance')) {
            mortgageOutstanding = await this.readMoney(this.locators.mortgageOutstandingBalance);
        }
        if (await this.action.ensureVisibleOrSkip(this.locators.mortgageMonthlyPayment, 'Mortgage monthly payment')) {
            mortgageMonthly = await this.readMoney(this.locators.mortgageMonthlyPayment);
        }
        // -------------------------------------------------
        // Other liabilities (0..n safe)
        // -------------------------------------------------
        const otherOutstandingSum = await this.sumMoneyInputs(this.locators.otherLiabilitiesOutstandingBalances);
        const otherMonthlySum = await this.sumMoneyInputs(this.locators.otherLiabilitiesMonthlyPayments);
        const expectedTotalBalance = mortgageOutstanding + otherOutstandingSum;
        const expectedMonthlyTotal = mortgageMonthly + otherMonthlySum;
        const expectedYearlyTotal = expectedMonthlyTotal * 12;
        // -------------------------------------------------
        // Totals should be calculated/disabled
        // -------------------------------------------------
        await (0, test_1.expect)(this.locators.totalLiabilitiesBalance).toBeDisabled();
        await (0, test_1.expect)(this.locators.totalLiabilitiesMonthly).toBeDisabled();
        await (0, test_1.expect)(this.locators.totalLiabilitiesYearly).toBeDisabled();
        // -------------------------------------------------
        // Poll until UI recalculates
        // -------------------------------------------------
        await test_1.expect
            .poll(async () => await this.readMoney(this.locators.totalLiabilitiesBalance), {
            timeout: 10000,
        })
            .toBe(expectedTotalBalance);
        await test_1.expect
            .poll(async () => await this.readMoney(this.locators.totalLiabilitiesMonthly), {
            timeout: 10000,
        })
            .toBe(expectedMonthlyTotal);
        await test_1.expect
            .poll(async () => await this.readMoney(this.locators.totalLiabilitiesYearly), {
            timeout: 10000,
        })
            .toBe(expectedYearlyTotal);
        this.logger.info?.(`✓ Total Liabilities OK: balance=${expectedTotalBalance}, monthly=${expectedMonthlyTotal}, yearly=${expectedYearlyTotal}`);
    }
    /* -------------------- Committed Expenditures -------------------- */
    async fillCommittedExpenditures() {
        const items = [
            // { name: 'Housekeeping (food and washing)', monthly: TestDataGenerator.randomNumber() },
            // { name: 'Gas, electricity, and other heating', monthly: TestDataGenerator.randomNumber() },
            // { name: 'Water', monthly: TestDataGenerator.randomNumber() },
            // { name: 'Telephone', monthly: TestDataGenerator.randomNumber() },
            // { name: 'Council tax', monthly: TestDataGenerator.randomNumber() },
            // { name: 'Buildings insurance', monthly: TestDataGenerator.randomNumber() },
            // { name: 'Ground rent and service charge', monthly: TestDataGenerator.randomNumber() },
            // {
            //   name: 'Essential travel (including to work or school)',
            //   monthly: TestDataGenerator.randomNumber(),
            { name: 'Buildings insurance', monthly: src_1.TestDataGenerator.randomNumber() },
            {
                name: 'Essential travel (including to work or school)',
                monthly: src_1.TestDataGenerator.randomNumber(),
            },
            { name: 'Water', monthly: src_1.TestDataGenerator.randomNumber() },
            { name: 'Telephone', monthly: src_1.TestDataGenerator.randomNumber() },
            { name: 'Council tax', monthly: src_1.TestDataGenerator.randomNumber() },
            { name: 'Housekeeping (food and washing)', monthly: src_1.TestDataGenerator.randomNumber() },
            // },
        ];
        let expectedMonthlyTotal = 0;
        for (const item of items) {
            expectedMonthlyTotal += item.monthly;
            await this.fillMonthlyAndAssertYearly(item.name, item.monthly);
        }
        await this.assertTotals(expectedMonthlyTotal);
        this.logger.info?.('✓ Filled committed expenditures (monthly) + verified yearly + totals');
    }
    /* =====================================================
       Helpers (logic only)
       ===================================================== */
    /**
     * Resolve the real committedExpenditures base key from the row "name" control id.
     * Example name control id: "8-person.committedExpenditures.4.name"
     * Returned baseKey: "person.committedExpenditures.4"
     */
    async committedBaseKeyByName(name) {
        const control = this.locators.committedNameControls.filter({ hasText: name }).first();
        await (0, test_1.expect)(control, `Committed expenditure name not found: "${name}"`).toHaveCount(1);
        const id = await control.getAttribute('id');
        if (!id)
            throw new Error(`Committed expenditure name control has no id for "${name}"`);
        const marker = 'person.committedExpenditures.';
        const start = id.indexOf(marker);
        const end = id.lastIndexOf('.name');
        if (start === -1 || end === -1 || end <= start) {
            throw new Error(`Unexpected committed expenditure id format: "${id}"`);
        }
        return id.slice(start, end);
    }
    async fillMonthlyAndAssertYearly(name, monthly) {
        const baseKey = await this.committedBaseKeyByName(name);
        const monthlyInput = this.locators.committedMonthlyByBase(baseKey);
        const yearlyInput = this.locators.committedYearlyByBase(baseKey);
        await (0, test_1.expect)(monthlyInput, `Monthly input not found for "${name}"`).toHaveCount(1);
        await (0, test_1.expect)(yearlyInput, `Yearly input not found for "${name}"`).toHaveCount(1);
        await monthlyInput.fill(String(monthly));
        await this.assert.assertFormattedNumberEquals(yearlyInput, monthly * 12);
        this.logger.info?.(`✓ ${name} → monthly=${monthly}, yearly=${monthly * 12}`);
    }
    async assertTotals(expectedMonthlyTotal) {
        const monthlyTotal = this.locators.committedMonthlyTotal;
        const yearlyTotal = this.locators.committedYearlyTotal;
        await (0, test_1.expect)(monthlyTotal).toBeDisabled();
        await (0, test_1.expect)(yearlyTotal).toBeDisabled();
        await this.assert.assertFormattedNumberEquals(monthlyTotal, expectedMonthlyTotal);
        await this.assert.assertFormattedNumberEquals(yearlyTotal, expectedMonthlyTotal * 12);
        this.logger.info?.(`✓ Totals → monthly=${expectedMonthlyTotal}, yearly=${expectedMonthlyTotal * 12}`);
    }
}
exports.KycLiabilitiesAndExpendituresPageSteps = KycLiabilitiesAndExpendituresPageSteps;
//# sourceMappingURL=KycLiabilitiesAndExpendituresPageSteps.js.map