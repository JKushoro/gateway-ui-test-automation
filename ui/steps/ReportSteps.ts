// ui/steps/ReportSteps.ts
import {ElementHandle, expect, Page} from "@playwright/test";
import { ControlPanelSteps } from "./ControlPanelSteps";
import { ReportsCalendarPage } from "../pages/ReportsCalendarPage";
import { dataStore } from "../../utils/dataStore";
import { format, parse } from "date-fns";
import {WaitHelper} from "../helpers/WaitHelper";

export class ReportSteps {
    private readonly controlPanelSteps: ControlPanelSteps;
    private readonly calendarPage: ReportsCalendarPage;
    private readonly waitHelper: WaitHelper;
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        this.controlPanelSteps = new ControlPanelSteps(page);
        this.calendarPage = new ReportsCalendarPage(page);
        this.waitHelper = new WaitHelper(page);
    }

    private getExpectedBookingEventText(): string {
        const firstName = dataStore.getValue<string>('firstName') ?? 'UNKNOWN';
        const lastName = dataStore.getValue<string>('lastName') ?? 'UNKNOWN';
        const roomName = dataStore.getValue<string>('selectedRoomName') ?? 'UNKNOWN';
        if (roomName === 'UNKNOWN') {
            throw new Error('Room name is not set in dataStore. Ensure it is stored during creation.');
        }
        return `${firstName} ${lastName} - Room: ${roomName}`;
    }

    public async navigateToReportDashboardAndVerifyDateRange(): Promise<void> {
        await this.controlPanelSteps.clickMainSiteNavLinkByText('Admin');
        await this.page.waitForLoadState('networkidle');

        await this.controlPanelSteps.clickAdminDashboardNavLinkByText('Report');
        const checkInDate = dataStore.getValue<string>('selectedCheckInInputFormat');

        const targetDate = parse(checkInDate, 'dd/MM/yyyy', new Date());
        const targetMonthLabel = format(targetDate, 'MMMM yyyy');
        await this.clickUntilMonthMatches(targetMonthLabel);

        const expectedText = this.getExpectedBookingEventText();
        const eventLocator = this.calendarPage.getCalendarEventLocatorByText(expectedText);
        await expect(eventLocator).toBeVisible();
    }

    private async clickUntilMonthMatches(expectedLabel: string): Promise<void> {
        for (let i = 0; i < 12; i++) {
            const currentLabel = await this.calendarPage.toolbarLabel.textContent();
            if (currentLabel?.trim() === expectedLabel) return;
            await this.calendarPage.nextButton.click();
            await this.page.waitForTimeout(300);
        }
        throw new Error(`Could not find month: ${expectedLabel} in calendar after 12 attempts`);
    }

}
