import { Locator, Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';
/**
 * ClientCreationPageLocators - Page object for individual client creation
 * Contains locators and methods specific to the create client page
 *
 * Note: This page currently uses shared form components from FormsComponent.
 * Alert handling is centralized in AlertService.
 */
export declare class ClientCreationPageLocators extends BasePage {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    get s2Options(): Locator;
    get adviserTrigger(): Locator;
    get adviserRendered(): Locator;
    get titleTrigger(): Locator;
    get titleRendered(): Locator;
    get sourceTrigger(): Locator;
    get sourceRendered(): Locator;
}
//# sourceMappingURL=ClientCreationPageLocators.d.ts.map