import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';
export declare class KycLiabilitiesAndExpendituresPageSteps extends BaseKYCSteps {
    private locators;
    private readonly datePicker;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    verifyLiabilitiesAndExpendituresHeading(): Promise<void>;
    completeKYC_LiabilitiesAndExpenditures(): Promise<void>;
    private answerLiabilitiesAndExpendituresQuestions;
    private answerHasMortgageOnProperty;
    private selectCurrentMortgageEndTerm;
    setMortgageTermEndDate(minYearsAhead: number, maxYearsAhead: number): Promise<string | undefined>;
    private selectMortgageLender;
    private selectTypeOfMortgage;
    private fillFirstOutstandingBalance;
    private fillMortgageAccountNumber;
    private selectMortgageRepaymentType;
    private fillFirstMonthlyPayment;
    private selectInterestType;
    private fillFixedLengthYears;
    private fillRemainingMortgageTermYears;
    private fillFirstCurrentInterestRate;
    setProductStartDate(minYearsAgo: number, maxYearsAgo: number): Promise<string | undefined>;
    private answerOtherLiabilities;
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
    private fillCommittedExpenditures;
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