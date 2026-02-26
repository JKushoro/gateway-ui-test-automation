"use strict";
// import { BasePage, FrameworkConfig } from '@/framework/src';
// import { Page, Locator } from '@playwright/test';
//
// export class KycLiabilitiesAndExpendituresPageLocators extends BasePage {
//   constructor(page: Page, config: Partial<FrameworkConfig> = {}) {
//     super(page, config);
//   }
//
//   /* =========================
//      Totals
//   ========================= */
//
//   get committedMonthlyTotal(): Locator {
//     return this.page.getByTestId('input-money-person.committedExpendituresMonthlyTotal');
//   }
//
//   get committedYearlyTotal(): Locator {
//     return this.page.getByTestId('input-money-person.committedExpendituresYearlyTotal');
//   }
//
//   /* =========================
//      Committed expenditure "name" controls
//      (CSS only)
//   ========================= */
//
//   get committedNameControls(): Locator {
//     // Use "*=" because your ids can be prefixed (e.g. "8-person....")
//     return this.page.locator('[id*="person.committedExpenditures."][id$=".name"]');
//   }
//
//   /* =========================
//      Inputs by resolved baseKey
//      baseKey example: "person.committedExpenditures.4"
//   ========================= */
//
//   committedMonthlyByBase(baseKey: string): Locator {
//     return this.page.getByTestId(`input-money-${baseKey}.monthly`);
//   }
//
//   committedYearlyByBase(baseKey: string): Locator {
//     return this.page.getByTestId(`input-money-${baseKey}.yearly`);
//   }
//
//   get mortgageTermEndDate(): Locator {
//     return this.page.locator('input[id="person.mortgageTermEndDate"]');
//   }
//
//   get firstOutstandingBalance(): Locator {
//     return this.page.locator('input[id="8-person.outstandingBalance"]');
//   }
//
//   get firstMonthlyPayment(): Locator {
//     return this.page.locator('input[id="8-person.monthlyRepaymentAmount"]');
//   }
//
//   get firstCurrentInterestRate(): Locator {
//     return this.page.locator('input[id="8-person.interestRate"]');
//   }
//
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycLiabilitiesAndExpendituresPageLocators = void 0;
const src_1 = require("@/framework/src");
class KycLiabilitiesAndExpendituresPageLocators extends src_1.BasePage {
    constructor(page, config = {}) {
        super(page, config);
    }
    /* =========================
       Total Liabilities (calculated fields)
    ========================= */
    get totalLiabilitiesBalance() {
        return this.page.getByTestId('input-money-person.totalLiabilitiesBalance');
    }
    get totalLiabilitiesMonthly() {
        return this.page.getByTestId('input-money-person.totalLiabilitiesMonthly');
    }
    get totalLiabilitiesYearly() {
        return this.page.getByTestId('input-money-person.totalLiabilitiesYearly');
    }
    /* =========================
       Mortgage liability inputs
    ========================= */
    get mortgageOutstandingBalance() {
        // prefer stable "name" over the prefixed id (e.g. "8-person...")
        return this.page.locator('input[name="person.outstandingBalance"]');
    }
    get mortgageMonthlyPayment() {
        return this.page.locator('input[name="person.monthlyRepaymentAmount"]');
    }
    get mortgageCurrentInterestRate() {
        return this.page.locator('input[name="person.interestRate"]');
    }
    get mortgageTermEndDate() {
        // your html shows id="person.mortgageTermEndDate"
        return this.page.locator('input[id="person.mortgageTermEndDate"]');
    }
    /* =========================
       Other liabilities (0..n) inputs
    ========================= */
    get otherLiabilitiesOutstandingBalances() {
        return this.page.locator('input[name^="person.otherLiabilities"][name$=".outstandingBalance"]');
    }
    get otherLiabilitiesMonthlyPayments() {
        return this.page.locator('input[name^="person.otherLiabilities"][name$=".monthlyRepaymentAmount"]');
    }
    get otherLiabilitiesInterestRates() {
        return this.page.locator('input[name^="person.otherLiabilities"][name$=".interestRate"]');
    }
    /* =========================
       Totals - Committed Expenditures
    ========================= */
    get committedMonthlyTotal() {
        return this.page.getByTestId('input-money-person.committedExpendituresMonthlyTotal');
    }
    get committedYearlyTotal() {
        return this.page.getByTestId('input-money-person.committedExpendituresYearlyTotal');
    }
    /* =========================
       Committed expenditure "name" controls (CSS only)
    ========================= */
    get committedNameControls() {
        // Use "*=" because your ids can be prefixed (e.g. "8-person....")
        return this.page.locator('[id*="person.committedExpenditures."][id$=".name"]');
    }
    /* =========================
       Inputs by resolved baseKey
       baseKey example: "person.committedExpenditures.4"
    ========================= */
    committedMonthlyByBase(baseKey) {
        return this.page.getByTestId(`input-money-${baseKey}.monthly`);
    }
    committedYearlyByBase(baseKey) {
        return this.page.getByTestId(`input-money-${baseKey}.yearly`);
    }
    /* =========================
       Backwards-compatible aliases (if your Steps already use these)
    ========================= */
    get firstOutstandingBalance() {
        return this.mortgageOutstandingBalance;
    }
    get firstMonthlyPayment() {
        return this.mortgageMonthlyPayment;
    }
    get firstCurrentInterestRate() {
        return this.mortgageCurrentInterestRate;
    }
}
exports.KycLiabilitiesAndExpendituresPageLocators = KycLiabilitiesAndExpendituresPageLocators;
//# sourceMappingURL=KycLiabilitiesAndExpendituresPageLocators.js.map