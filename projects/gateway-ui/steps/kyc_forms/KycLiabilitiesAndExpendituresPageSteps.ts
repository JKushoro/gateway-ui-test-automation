import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { expect, Locator, Page } from '@playwright/test';
import { FrameworkConfig, TestDataGenerator } from '@/framework/src';
import { KycLiabilitiesAndExpendituresPageLocators } from '@pages/kycElementLocators/KycLiabilitiesAndExpendituresPageLocators';
import { KYCDatePickerService } from '@steps/components/KYCDatePickerService';

export class KycLiabilitiesAndExpendituresPageSteps extends BaseKYCSteps {
  private locators: KycLiabilitiesAndExpendituresPageLocators;
  private readonly datePicker: KYCDatePickerService;

  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
    this.locators = new KycLiabilitiesAndExpendituresPageLocators(page);
    this.datePicker = new KYCDatePickerService(page);
  }

  /* -------------------- Verification -------------------- */

  public async verifyLiabilitiesAndExpendituresHeading(): Promise<void> {
    await this.assert.assertPageURLContains('page=liabilities-and-expenditures');
    await expect(this.heading).toBeVisible({ timeout: 15_000 });
    await expect(this.heading).toHaveText('Liabilities & Expenditures');
  }

  /* -------------------- Main Flow -------------------- */

  public async completeKYC_LiabilitiesAndExpenditures(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');

    await this.verifyLiabilitiesAndExpendituresHeading();
    await this.answerLiabilitiesAndExpendituresQuestions();

    await this.action.clickButtonByText('Save & Continue');
  }

  private async answerLiabilitiesAndExpendituresQuestions(): Promise<void> {
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

  private async answerHasMortgageOnProperty(answer?: string): Promise<void> {
    const question = /do you have a mortgage on this property\?/i;
    const selected = await this.action.setRadioByQuestionPattern(question, answer);

    expect(selected).toBeTruthy();
    this.logInfo(`✓ ${question}: ${answer}`);
  }

  private async selectCurrentMortgageEndTerm(answer?: string): Promise<void> {
    const question = 'When does your current mortgage term end?';

    const q = this.page.getByText(question, { exact: false }).first();
    if (!(await this.action.ensureVisibleOrSkip(q, question))) return;

    await expect(q).toBeVisible();
    await this.action.setRadioByQuestion(question, answer);

    this.logInfo(`✓ ${question}: ${answer}`);
  }

  public async setMortgageTermEndDate(
    minYearsAhead: number,
    maxYearsAhead: number
  ): Promise<string | undefined> {
    const input = this.locators.mortgageTermEndDate;

    if (!(await this.action.ensureVisibleOrSkip(input, 'Mortgage Term End Date'))) return;
    const { month, year } = this.datePicker.generateRandomFutureMonthYear(
      minYearsAhead,
      maxYearsAhead
    );

    const selected = await this.datePicker.setMonthYearIntoInput(input, month, year);
    await this.assert.assertInputHasValue(input, selected);
    this.logInfo(`✓ Mortgage Term End Date set: ${selected}`);

    return selected;
  }

  private async selectMortgageLender(value?: string): Promise<void> {
    if (await this.elementNotExists('Mortgage Lender')) return;

    const chosen = await this.action.chooseFromLabeledReactSelectDropdown('Mortgage Lender', value);

    await expect(this.page.getByText(chosen, { exact: false }).first()).toBeVisible();
    this.logInfo(`✓ Mortgage Lender selected: ${chosen}`);
  }

  private async selectTypeOfMortgage(value?: string): Promise<void> {
    if (await this.elementNotExists('Type of mortgage')) return;

    const chosen = await this.action.chooseFromLabeledReactSelectDropdown(
      'Type of mortgage',
      value
    );

    await expect(this.page.getByText(chosen, { exact: false }).first()).toBeVisible();
    this.logInfo(`✓ Type of mortgage selected: ${chosen}`);
  }

  private async fillFirstOutstandingBalance(value: string | number): Promise<void> {
    const input = this.locators.firstOutstandingBalance;

    if (!(await this.action.ensureVisibleOrSkip(input, 'First outstanding balance'))) return;

    await this.action.fillFormattedNumberInput(input, value, 'First outstanding balance');
  }

  private async fillMortgageAccountNumber(value?: string | number): Promise<void> {
    const input = await this.action.findInputFieldByLabel('Mortgage account number');

    if (!(await this.action.ensureVisibleOrSkip(input, 'Mortgage account number'))) return;

    const finalValue = value ?? TestDataGenerator.randomNumericString();
    await this.action.fillInputByLabel('Mortgage account number', String(finalValue));
  }

  private async selectMortgageRepaymentType(value?: string): Promise<void> {
    if (await this.elementNotExists('Mortgage repayment type')) return;

    const chosen = await this.action.chooseFromLabeledReactSelectDropdown(
      'Mortgage repayment type',
      value
    );

    await expect(this.page.getByText(chosen, { exact: false }).first()).toBeVisible();
    this.logInfo(`✓ Mortgage repayment type selected: ${chosen}`);
  }

  private async fillFirstMonthlyPayment(value: string | number): Promise<void> {
    const input = this.locators.firstMonthlyPayment;

    if (!(await this.action.ensureVisibleOrSkip(input, 'First Monthly Payment'))) return;
    await this.action.fillFormattedNumberInput(input, value, 'First Monthly Payment');
  }

  private async selectInterestType(value?: string): Promise<void> {
    if (await this.elementNotExists('Interest type')) return;

    const chosen = await this.action.chooseFromLabeledReactSelectDropdown('Interest type', value);

    await expect(this.page.getByText(chosen, { exact: false }).first()).toBeVisible();
    this.logInfo(`✓ Interest type selected: ${chosen}`);
  }

  private async fillFixedLengthYears(value: string): Promise<void> {
    const label = 'Fixed length (years)';
    const input = this.page.getByLabel(label, { exact: false });

    if (!(await this.action.ensureVisibleOrSkip(input, label))) return;

    await this.action.fillInputByLabel(label, value);
    await expect(input).toHaveValue(value);
  }

  private async fillRemainingMortgageTermYears(value: string): Promise<void> {
    const label = 'Remaining mortgage term (years)';
    const input = this.page.getByLabel(label, { exact: false });

    if (!(await this.action.ensureVisibleOrSkip(input, label))) return;

    await this.action.fillInputByLabel(label, value);
    await expect(input).toHaveValue(value);
  }

  private async fillFirstCurrentInterestRate(value: string | number): Promise<void> {
    const input = this.locators.firstCurrentInterestRate;

    if (!(await this.action.ensureVisibleOrSkip(input, 'First Current interest Rate'))) return;
    await this.action.fillFormattedNumberInput(input, value, 'First Current interest Rate');
  }

  public async setProductStartDate(
    minYearsAgo: number,
    maxYearsAgo: number
  ): Promise<string | undefined> {
    const label = 'Product start date';
    const input = this.page.getByLabel(label, { exact: false });

    if (!(await this.action.ensureVisibleOrSkip(input, label))) return;

    const date = this.datePicker.generateRandomPastDate(minYearsAgo, maxYearsAgo);

    await this.action.fillInputByLabel(label, date);
    await expect(input).toHaveValue(date);

    this.logInfo(`✓ ${label} set: ${date}`);
    return date;
  }

  private async answerOtherLiabilities(answer?: string): Promise<void> {
    const question = 'Do you have any other liabilities?';

    await expect(this.page.getByText(question, { exact: false }).first()).toBeVisible();
    await this.action.setRadioByQuestion(question, answer);

    this.logInfo(`✓ ${question}: ${answer}`);
  }

  /* =========================
   Total Liabilities Assertions
========================= */

  private parseMoneyToNumber(raw: string | null | undefined): number {
    if (!raw) return 0;
    const cleaned = raw.replace(/[^\d.-]/g, '');
    if (!cleaned) return 0;
    return Number(cleaned);
  }

  private async readMoney(input: Locator): Promise<number> {
    const v = await input.inputValue();
    return this.parseMoneyToNumber(v);
  }

  private async sumMoneyInputs(inputs: Locator): Promise<number> {
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
  public async assertTotalLiabilitiesCalculatedCorrectly(): Promise<void> {
    const totalsLabel = 'Total Liabilities';

    // -------------------------------------------------
    // Skip ENTIRE check if totals card not on screen
    // -------------------------------------------------
    if (
      !(await this.action.ensureVisibleOrSkip(this.locators.totalLiabilitiesBalance, totalsLabel))
    )
      return;

    let mortgageOutstanding = 0;
    let mortgageMonthly = 0;

    // -------------------------------------------------
    // Mortgage (optional)
    // -------------------------------------------------
    if (
      await this.action.ensureVisibleOrSkip(
        this.locators.mortgageOutstandingBalance,
        'Mortgage outstanding balance'
      )
    ) {
      mortgageOutstanding = await this.readMoney(this.locators.mortgageOutstandingBalance);
    }

    if (
      await this.action.ensureVisibleOrSkip(
        this.locators.mortgageMonthlyPayment,
        'Mortgage monthly payment'
      )
    ) {
      mortgageMonthly = await this.readMoney(this.locators.mortgageMonthlyPayment);
    }

    // -------------------------------------------------
    // Other liabilities (0..n safe)
    // -------------------------------------------------
    const otherOutstandingSum = await this.sumMoneyInputs(
      this.locators.otherLiabilitiesOutstandingBalances
    );

    const otherMonthlySum = await this.sumMoneyInputs(
      this.locators.otherLiabilitiesMonthlyPayments
    );

    const expectedTotalBalance = mortgageOutstanding + otherOutstandingSum;
    const expectedMonthlyTotal = mortgageMonthly + otherMonthlySum;
    const expectedYearlyTotal = expectedMonthlyTotal * 12;

    // -------------------------------------------------
    // Totals should be calculated/disabled
    // -------------------------------------------------
    await expect(this.locators.totalLiabilitiesBalance).toBeDisabled();
    await expect(this.locators.totalLiabilitiesMonthly).toBeDisabled();
    await expect(this.locators.totalLiabilitiesYearly).toBeDisabled();

    // -------------------------------------------------
    // Poll until UI recalculates
    // -------------------------------------------------
    await expect
      .poll(async () => await this.readMoney(this.locators.totalLiabilitiesBalance), {
        timeout: 10_000,
      })
      .toBe(expectedTotalBalance);

    await expect
      .poll(async () => await this.readMoney(this.locators.totalLiabilitiesMonthly), {
        timeout: 10_000,
      })
      .toBe(expectedMonthlyTotal);

    await expect
      .poll(async () => await this.readMoney(this.locators.totalLiabilitiesYearly), {
        timeout: 10_000,
      })
      .toBe(expectedYearlyTotal);

    this.logInfo(
      `✓ Total Liabilities OK: balance=${expectedTotalBalance}, monthly=${expectedMonthlyTotal}, yearly=${expectedYearlyTotal}`
    );
  }

  /* -------------------- Committed Expenditures -------------------- */

  private async fillCommittedExpenditures(): Promise<void> {
    const items: Array<{ name: string; monthly: number }> = [
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

      { name: 'Buildings insurance', monthly: TestDataGenerator.randomNumber() },
      {
        name: 'Essential travel (including to work or school)',
        monthly: TestDataGenerator.randomNumber(),
      },
      { name: 'Water', monthly: TestDataGenerator.randomNumber() },
      { name: 'Telephone', monthly: TestDataGenerator.randomNumber() },
      { name: 'Council tax', monthly: TestDataGenerator.randomNumber() },
      { name: 'Housekeeping (food and washing)', monthly: TestDataGenerator.randomNumber() },

      // },
    ];

    let expectedMonthlyTotal = 0;

    for (const item of items) {
      expectedMonthlyTotal += item.monthly;
      await this.fillMonthlyAndAssertYearly(item.name, item.monthly);
    }

    await this.assertTotals(expectedMonthlyTotal);

    this.logInfo('✓ Filled committed expenditures (monthly) + verified yearly + totals');
  }

  /* =====================================================
     Helpers (logic only)
     ===================================================== */

  /**
   * Resolve the real committedExpenditures base key from the row "name" control id.
   * Example name control id: "8-person.committedExpenditures.4.name"
   * Returned baseKey: "person.committedExpenditures.4"
   */
  private async committedBaseKeyByName(name: string): Promise<string> {
    const control = this.locators.committedNameControls.filter({ hasText: name }).first();
    await expect(control, `Committed expenditure name not found: "${name}"`).toHaveCount(1);

    const id = await control.getAttribute('id');
    if (!id) throw new Error(`Committed expenditure name control has no id for "${name}"`);

    const marker = 'person.committedExpenditures.';
    const start = id.indexOf(marker);
    const end = id.lastIndexOf('.name');

    if (start === -1 || end === -1 || end <= start) {
      throw new Error(`Unexpected committed expenditure id format: "${id}"`);
    }

    return id.slice(start, end);
  }

  private async fillMonthlyAndAssertYearly(name: string, monthly: number): Promise<void> {
    const baseKey = await this.committedBaseKeyByName(name);

    const monthlyInput = this.locators.committedMonthlyByBase(baseKey);
    const yearlyInput = this.locators.committedYearlyByBase(baseKey);

    await expect(monthlyInput, `Monthly input not found for "${name}"`).toHaveCount(1);
    await expect(yearlyInput, `Yearly input not found for "${name}"`).toHaveCount(1);

    await monthlyInput.fill(String(monthly));
    await this.assert.assertFormattedNumberEquals(yearlyInput, monthly * 12);

    this.logInfo(`✓ ${name} → monthly=${monthly}, yearly=${monthly * 12}`);
  }

  private async assertTotals(expectedMonthlyTotal: number): Promise<void> {
    const monthlyTotal = this.locators.committedMonthlyTotal;
    const yearlyTotal = this.locators.committedYearlyTotal;

    await expect(monthlyTotal).toBeDisabled();
    await expect(yearlyTotal).toBeDisabled();

    await this.assert.assertFormattedNumberEquals(monthlyTotal, expectedMonthlyTotal);
    await this.assert.assertFormattedNumberEquals(yearlyTotal, expectedMonthlyTotal * 12);

    this.logInfo(
      `✓ Totals → monthly=${expectedMonthlyTotal}, yearly=${expectedMonthlyTotal * 12}`
    );
  }
}
