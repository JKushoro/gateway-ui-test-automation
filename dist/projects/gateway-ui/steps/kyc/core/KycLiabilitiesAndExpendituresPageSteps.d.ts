import { BaseKYCSteps } from '@steps/kyc/BaseKYCSteps';
import { Page, FrameworkConfig } from '@/framework/src';
export declare class KycLiabilitiesAndExpendituresPageSteps extends BaseKYCSteps {
    private locators;
    private readonly datePicker;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Main method to complete the entire Liabilities & Expenditures page
     * Uses the standardized KYC page completion flow
     */
    completeKYC_LiabilitiesAndExpenditures(): Promise<void>;
    answerLiabilitiesAndExpendituresQuestions(): Promise<void>;
    /**
     * 🎯 Answer mortgage question with proper validation
     *
     * This method answers the mortgage question and validates that a selection was made.
     *
     * @param answer - The answer to select (optional, will use random if not provided)
     */
    answerHasMortgageOnProperty(answer?: string): Promise<void>;
    selectCurrentMortgageEndTerm(answer?: string): Promise<void>;
    setMortgageTermEndDate(minYearsAhead: number, maxYearsAhead: number): Promise<string | undefined>;
    selectMortgageLender(value?: string): Promise<void>;
    selectTypeOfMortgage(value?: string): Promise<void>;
    fillFirstOutstandingBalance(value: string | number): Promise<void>;
    fillMortgageAccountNumber(value?: string | number): Promise<void>;
    selectMortgageRepaymentType(value?: string): Promise<void>;
    fillFirstMonthlyPayment(value: string | number): Promise<void>;
    selectInterestType(value?: string): Promise<void>;
    fillFixedLengthYears(value: string): Promise<void>;
    fillRemainingMortgageTermYears(value: string): Promise<void>;
    fillFirstCurrentInterestRate(value: string | number): Promise<void>;
    setProductStartDate(minYearsAgo: number, maxYearsAgo: number): Promise<string | undefined>;
    answerOtherLiabilities(answer?: string): Promise<void>;
    private parseMoneyToNumber;
    private readMoney;
    private sumMoneyInputs;
    /**
     * Validates:
     * - Total balance = Mortgage outstanding + sum(other liabilities outstanding)
     * - Monthly total = Mortgage monthly + sum(other liabilities monthly)
     * - Yearly total = Monthly total * 12
     */
    assertTotalLiabilitiesCalculatedCorrectly(): Promise<void>;
    fillCommittedExpenditures(): Promise<void>;
    /**
     * Resolve the real committedExpenditures base key from the row "name" control id.
     * Example name control id: "8-person.committedExpenditures.4.name"
     * Returned baseKey: "person.committedExpenditures.4"
     */
    private committedBaseKeyByName;
    private fillMonthlyAndAssertYearly;
    private assertTotals;
}
//# sourceMappingURL=KycLiabilitiesAndExpendituresPageSteps.d.ts.map