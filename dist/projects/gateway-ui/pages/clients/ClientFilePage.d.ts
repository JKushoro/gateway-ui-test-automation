import { Locator, Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';
export declare class ClientFilePage extends BasePage {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    private readonly navigationBarLocator;
    private readonly navLinksLocator;
    private readonly companyDetailsSection;
    private readonly companyNameLocator;
    private readonly contactNameLocator;
    private readonly contactForenameLocator;
    private readonly contactSurnameLocator;
    private readonly contactDetailsSection;
    private readonly phoneLocator;
    private readonly emailAddressLocator;
    private readonly addressDetailsSection;
    private readonly addressLine1Locator;
    private readonly addressLine2Locator;
    private readonly townCityLocator;
    private readonly countyLocator;
    private readonly postcodeLocator;
    get navigationBar(): Locator;
    get navLinks(): Locator;
    /**
     * Get navigation link by text
     */
    getNavLinkByText(linkText: string): Locator;
    get companyName(): Locator;
    get contactName(): Locator;
    get contactForename(): Locator;
    get contactSurname(): Locator;
    get phone(): Locator;
    get emailAddress(): Locator;
    get addressLine1(): Locator;
    get addressLine2(): Locator;
    get townCity(): Locator;
    get county(): Locator;
    get postcode(): Locator;
}
//# sourceMappingURL=ClientFilePage.d.ts.map