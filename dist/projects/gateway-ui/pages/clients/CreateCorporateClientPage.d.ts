import { Locator, Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';
export declare class CreateCorporateClientPage extends BasePage {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    private readonly createButtonLocator;
    get createButton(): Locator;
}
//# sourceMappingURL=CreateCorporateClientPage.d.ts.map