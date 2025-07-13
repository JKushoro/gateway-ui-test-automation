import {WaitHelper} from "../helpers/WaitHelper";
import {ActionHelper} from "../helpers/ActionHelper";
import {ControlPanel} from "../pages/ControlPanel";
import {Page} from "@playwright/test";

export class ControlPanelSteps{

    private waitHelper: WaitHelper;
    private actionHelper: ActionHelper;
    private controlPanel: ControlPanel;

        constructor(page: Page) {
            this.actionHelper = new ActionHelper(page);
            this.waitHelper = new WaitHelper(page);
            this.controlPanel = new ControlPanel(page);
        }


    public async clickMainSiteNavLinkByText(linkText: string): Promise<void> {
        const targetLocator = this.controlPanel.getMainSiteNavLinkByText(linkText);
        await this.waitHelper.waitForElement(targetLocator);
        await this.actionHelper.clickElementByExactText(this.controlPanel.mainSiteNavLinkLocator, linkText);
    }

    public async clickAdminDashboardNavLinkByText(linkText: string): Promise<void> {
        const targetLocator = this.controlPanel.getAdminDashboardNavLinks(linkText);
        await this.waitHelper.waitForElement(targetLocator);
        await this.actionHelper.clickElementByExactText(this.controlPanel.adminNavLinksLocator, linkText);
    }

}