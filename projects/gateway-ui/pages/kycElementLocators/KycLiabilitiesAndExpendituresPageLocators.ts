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



















import { BasePage, FrameworkConfig } from '@/framework/src';
import { Page, Locator } from '@playwright/test';

export class KycLiabilitiesAndExpendituresPageLocators extends BasePage {
  constructor(page: Page, config: Partial<FrameworkConfig> = {}) {
    super(page, config);
  }

  /* =========================
     Total Liabilities (calculated fields)
  ========================= */

  get totalLiabilitiesBalance(): Locator {
    return this.page.getByTestId('input-money-person.totalLiabilitiesBalance');
  }

  get totalLiabilitiesMonthly(): Locator {
    return this.page.getByTestId('input-money-person.totalLiabilitiesMonthly');
  }

  get totalLiabilitiesYearly(): Locator {
    return this.page.getByTestId('input-money-person.totalLiabilitiesYearly');
  }

  /* =========================
     Mortgage liability inputs
  ========================= */

  get mortgageOutstandingBalance(): Locator {
    // prefer stable "name" over the prefixed id (e.g. "8-person...")
    return this.page.locator('input[name="person.outstandingBalance"]');
  }

  get mortgageMonthlyPayment(): Locator {
    return this.page.locator('input[name="person.monthlyRepaymentAmount"]');
  }

  get mortgageCurrentInterestRate(): Locator {
    return this.page.locator('input[name="person.interestRate"]');
  }

  get mortgageTermEndDate(): Locator {
    // your html shows id="person.mortgageTermEndDate"
    return this.page.locator('input[id="person.mortgageTermEndDate"]');
  }

  /* =========================
     Other liabilities (0..n) inputs
  ========================= */

  get otherLiabilitiesOutstandingBalances(): Locator {
    return this.page.locator('input[name^="person.otherLiabilities"][name$=".outstandingBalance"]');
  }

  get otherLiabilitiesMonthlyPayments(): Locator {
    return this.page.locator(
      'input[name^="person.otherLiabilities"][name$=".monthlyRepaymentAmount"]'
    );
  }

  get otherLiabilitiesInterestRates(): Locator {
    return this.page.locator('input[name^="person.otherLiabilities"][name$=".interestRate"]');
  }

  /* =========================
     Totals - Committed Expenditures
  ========================= */

  get committedMonthlyTotal(): Locator {
    return this.page.getByTestId('input-money-person.committedExpendituresMonthlyTotal');
  }

  get committedYearlyTotal(): Locator {
    return this.page.getByTestId('input-money-person.committedExpendituresYearlyTotal');
  }

  /* =========================
     Committed expenditure "name" controls (CSS only)
  ========================= */

  get committedNameControls(): Locator {
    // Use "*=" because your ids can be prefixed (e.g. "8-person....")
    return this.page.locator('[id*="person.committedExpenditures."][id$=".name"]');
  }

  /* =========================
     Inputs by resolved baseKey
     baseKey example: "person.committedExpenditures.4"
  ========================= */

  committedMonthlyByBase(baseKey: string): Locator {
    return this.page.getByTestId(`input-money-${baseKey}.monthly`);
  }

  committedYearlyByBase(baseKey: string): Locator {
    return this.page.getByTestId(`input-money-${baseKey}.yearly`);
  }

  /* =========================
     Backwards-compatible aliases (if your Steps already use these)
  ========================= */

  get firstOutstandingBalance(): Locator {
    return this.mortgageOutstandingBalance;
  }

  get firstMonthlyPayment(): Locator {
    return this.mortgageMonthlyPayment;
  }

  get firstCurrentInterestRate(): Locator {
    return this.mortgageCurrentInterestRate;
  }
}
