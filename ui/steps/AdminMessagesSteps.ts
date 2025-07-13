//ui/steps/AdminMessagesSteps.ts
import { dataStore } from "../../utils/dataStore";
import { ActionHelper } from "../helpers/ActionHelper";
import { WaitHelper } from "../helpers/WaitHelper";
import { AdminMessagesPage } from "../pages/AdminMessagesPage";
import { RowMatcherHelper } from "../helpers/RowMatcherHelper";
import { ElementHelper } from "../helpers/ElementHelper";
import { expect, Page } from "@playwright/test";
import {ControlPanelSteps} from "./ControlPanelSteps";
import {LoginSteps} from "./LoginSteps";

export class AdminMessagesSteps {
    private waitHelper: WaitHelper;
    private actionHelper: ActionHelper;
    private adminMessagesPage: AdminMessagesPage;
    private controlPanelSteps: any;
    private loginSteps: any;

    constructor(page: Page) {
        this.actionHelper = new ActionHelper(page);
        this.waitHelper = new WaitHelper(page);
        this.adminMessagesPage = new AdminMessagesPage(page);
        this.controlPanelSteps = new ControlPanelSteps(page);
        this.loginSteps = new LoginSteps(page);
    }

    // ----------------------- PUBLIC WORKFLOWS -----------------------

    public async getMatchingNameAndSubjectRow(): Promise<{ actualName: string; actualSubject: string } | null> {
        const storedName = dataStore.getValue<string>('selectedName')!;
        const storedSubject = dataStore.getValue<string>('selectedSubject')!;

        const row = await RowMatcherHelper.findRowByCellValues({
            rows: this.adminMessagesPage.messageRows,
            getNameLocator: (r) => this.adminMessagesPage.getNameLocatorFromRow(r),
            getSubjectLocator: (r) => this.adminMessagesPage.getSubjectLocatorFromRow(r),
            expectedName: storedName,
            expectedSubject: storedSubject,
        });

        if (!row) return null;

        const actualName = await ElementHelper.getTrimmedText(this.adminMessagesPage.getNameLocatorFromRow(row));
        const actualSubject = await ElementHelper.getTrimmedText(this.adminMessagesPage.getSubjectLocatorFromRow(row));

        return { actualName, actualSubject };
    }



    public async clickMessageRowByStoredName(): Promise<void> {
        const storedName = dataStore.getValue<string>('selectedName')!;
        const row = await RowMatcherHelper.findRowByCellValues({
            rows: this.adminMessagesPage.messageRows,
            getNameLocator: (r) => this.adminMessagesPage.getNameLocatorFromRow(r),
            expectedName: storedName,
        });

        expect(row).not.toBeNull();
        await row!.click();
        await expect(this.adminMessagesPage.adminPopUpName).toBeVisible();
    }

    public async clickClosePopupOnMessagePage(): Promise<void> {
        await this.waitHelper.waitForElement(this.adminMessagesPage.closePopButtonLocator);
        await this.actionHelper.clickElementByExactText(this.adminMessagesPage.closePopButtonLocator, 'Close');
        await expect(this.adminMessagesPage.adminPopUpName).toBeHidden();
    }

    public async deleteMessageRowByStoredNameAndSubject(): Promise<void> {
        const storedName = dataStore.getValue<string>('selectedName')!;
        const storedSubject = dataStore.getValue<string>('selectedSubject')!;

        const row = await RowMatcherHelper.findRowByCellValues({
            rows: this.adminMessagesPage.messageRows,
            getNameLocator: (r) => this.adminMessagesPage.getNameLocatorFromRow(r),
            getSubjectLocator: (r) => this.adminMessagesPage.getSubjectLocatorFromRow(r),
            expectedName: storedName,
            expectedSubject: storedSubject,
        });

        expect(row).not.toBeNull();
        const deleteButton = this.adminMessagesPage.deleteButtonFromRow(row!);
        await deleteButton.click();
        await this.waitHelper.waitForLocatorToHaveCount(row!, 0, 5000);

        const deletedRow = await RowMatcherHelper.findRowByCellValues({
            rows: this.adminMessagesPage.messageRows,
            getNameLocator: (r) => this.adminMessagesPage.getNameLocatorFromRow(r),
            getSubjectLocator: (r) => this.adminMessagesPage.getSubjectLocatorFromRow(r),
            expectedName: storedName,
            expectedSubject: storedSubject,
        });

        expect(deletedRow).toBeNull();
    }



    public async verifyMessageInAdminTable(): Promise<void> {
        await this.controlPanelSteps.clickMainSiteNavLinkByText('Admin');
        await this.loginSteps.loginWithEnvCredentials();

        await this.controlPanelSteps.clickAdminDashboardNavLinkByText('Messages');
        await expect(this.adminMessagesPage.messageRows.first()).toBeVisible();

        const storedName = dataStore.getValue<string>('selectedName')!;
        const storedSubject = dataStore.getValue<string>('selectedSubject')!;

        const result = await this.getMatchingNameAndSubjectRow();
        expect(result).not.toBeNull();

        const { actualName, actualSubject } = result!;
        expect(actualName).toBe(storedName);
        expect(actualSubject).toBe(storedSubject);
    }

    public async verifyMessagePopupDetails(): Promise<void> {
        await this.clickMessageRowByStoredName();
        const storedName = dataStore.getValue<string>('selectedName')!;
        const storedEmail = dataStore.getValue<string>('selectedEmail')!;
        const storedPhone = dataStore.getValue<string>('selectedPhone')!;

        const actualName = (await this.adminMessagesPage.adminPopUpName.textContent())?.replace('From:', '').trim();
        const actualEmail = (await this.adminMessagesPage.adminPopUpEmail.textContent())?.replace('Email:', '').trim();
        const actualPhone = (await this.adminMessagesPage.adminPopUpPhone.textContent())?.replace('Phone:', '').trim();

        expect(actualName).toBe(storedName);
        expect(actualEmail).toBe(storedEmail);
        expect(actualPhone).toBe(storedPhone);

        await this.clickClosePopupOnMessagePage();
    }

    public async deleteMessage(): Promise<void> {
        await this.deleteMessageRowByStoredNameAndSubject();
        const result = await this.getMatchingNameAndSubjectRow();
        expect(result).toBeNull();
    }

}
