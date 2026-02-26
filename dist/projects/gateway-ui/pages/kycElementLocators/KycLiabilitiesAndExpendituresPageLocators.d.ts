import { BasePage, FrameworkConfig } from '@/framework/src';
import { Page, Locator } from '@playwright/test';
export declare class KycLiabilitiesAndExpendituresPageLocators extends BasePage {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    get totalLiabilitiesBalance(): Locator;
    get totalLiabilitiesMonthly(): Locator;
    get totalLiabilitiesYearly(): Locator;
    get mortgageOutstandingBalance(): Locator;
    get mortgageMonthlyPayment(): Locator;
    get mortgageCurrentInterestRate(): Locator;
    get mortgageTermEndDate(): Locator;
    get otherLiabilitiesOutstandingBalances(): Locator;
    get otherLiabilitiesMonthlyPayments(): Locator;
    get otherLiabilitiesInterestRates(): Locator;
    get committedMonthlyTotal(): Locator;
    get committedYearlyTotal(): Locator;
    get committedNameControls(): Locator;
    committedMonthlyByBase(baseKey: string): Locator;
    committedYearlyByBase(baseKey: string): Locator;
    get firstOutstandingBalance(): Locator;
    get firstMonthlyPayment(): Locator;
    get firstCurrentInterestRate(): Locator;
}
//# sourceMappingURL=KycLiabilitiesAndExpendituresPageLocators.d.ts.map