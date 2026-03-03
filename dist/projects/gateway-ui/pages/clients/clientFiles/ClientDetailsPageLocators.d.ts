import { BasePage, FrameworkConfig } from '@/framework/src';
import { Locator, Page } from '@playwright/test';
export declare class ClientDetailsPageLocators extends BasePage {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /** Clickable nav link/tab by visible text */
    getNavLinkByText(linkText: string): Locator;
    /** Layout A: gateway-bs boxes */
    gatewayBsCell(sectionTitle: string, labelText: string): Locator;
    /** Layout B: summary panel (form-group anchor) */
    summaryPanelCell(sectionTitle: string, labelText: string): Locator;
    /** Layout B alternative: sibling navigation */
    summaryPanelCellAlt(sectionTitle: string, labelText: string): Locator;
}
//# sourceMappingURL=ClientDetailsPageLocators.d.ts.map