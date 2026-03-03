import { BasePage, FrameworkConfig } from '@/framework/src';
import { Page, Locator } from '@playwright/test';
export declare class KycPersonalDetailsPageLocators extends BasePage {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    get addressSearch(): Locator;
    get addressLine1(): Locator;
    get addressLine2(): Locator;
    get city(): Locator;
    get county(): Locator;
    get postcode(): Locator;
    get country(): Locator;
    get secondMoveInDate(): Locator;
    get dependentOneFirstName(): Locator;
    get dependentOneSurname(): Locator;
    get dependentOneRelationship(): Locator;
    get dependentOneDependantUntil(): Locator;
    get dependentOneSexAtBirth(): Locator;
    get dependentOneDateOfBirth(): Locator;
}
//# sourceMappingURL=KycPersonalDetailsPageLocators.d.ts.map