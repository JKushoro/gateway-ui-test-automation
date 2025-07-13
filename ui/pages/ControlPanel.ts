
import {Locator, Page} from "@playwright/test";
import {BasePage} from "../base/BasePage";

export class ControlPanel extends BasePage{

    constructor(page: Page) {
        super(page);
    }

    readonly adminNavLinksLocator = this.page.locator('nav.navbar a, nav.navbar .navbar-collapse button');
    public readonly mainSiteNavLinkLocator = this.page.locator('ul.navbar-nav.ms-auto a.nav-link');



    public getMainSiteNavLinkByText(title: string): Locator {
        return this.mainSiteNavLinkLocator.filter({ hasText: title });
    }

    public getAdminDashboardNavLinks(title: string): Locator {
        return this.adminNavLinksLocator.filter({ hasText: title });
    }

}