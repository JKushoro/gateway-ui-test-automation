// import {RoomsPage} from "../pages/RoomsPage";
import { RoomsPage } from "../pages/RoomsPage";
import { generateTwoOrThreeDigitNumber, getSentence, numberAndString } from "../../utils/dataGenerator";
import { ActionHelper } from "../helpers/ActionHelper";
import { WaitHelper } from "../helpers/WaitHelper";
import { dataStore } from "../../utils/dataStore";
import { expect, Page } from "@playwright/test";
import { LoginSteps } from "./LoginSteps";
import { ControlPanelSteps } from "./ControlPanelSteps";
import { HomeSteps } from "./HomeSteps";

type Setup = {
    loginSteps: LoginSteps;
    controlPanelSteps: ControlPanelSteps;
};

export class RoomsSteps {
    private readonly roomsPage: RoomsPage;
    private readonly actionHelper: ActionHelper;
    private readonly waitHelper: WaitHelper;
    private readonly loginSteps: LoginSteps;
    private readonly controlPanelSteps: ControlPanelSteps;
    private readonly page: Page;
    private readonly homeSteps: HomeSteps;

    constructor(page: Page, setup: Setup) {
        this.page = page;
        this.roomsPage = new RoomsPage(page);
        this.actionHelper = new ActionHelper(page);
        this.waitHelper = new WaitHelper(page);
        this.loginSteps = setup.loginSteps;
        this.controlPanelSteps = setup.controlPanelSteps;
        this.homeSteps = new HomeSteps(page);
    }

    public async handleFullRoomManagementFlow(type: string, accessible: string): Promise<void> {
        await this.controlPanelSteps.clickMainSiteNavLinkByText('Admin');
        await this.loginSteps.loginWithEnvCredentials();
        await this.controlPanelSteps.clickAdminDashboardNavLinkByText('Rooms');
        await this.fillRoomDetails(type, accessible);
        await this.clickCreateButtonOnRoomPage();

        const roomName = dataStore.getValue<string>('selectedRoomName')!;
        const roomLocator = this.roomsPage.getRoomLocatorByName(roomName);
        await expect(roomLocator).toBeVisible();

        await this.deleteAllRoomsExceptSelected();
    }

    public async editCreatedRoom(): Promise<void> {
        await this.clickStoredRoomRow();
        await this.clickEditPopupOnRoomPage();
        await this.fillDescriptionField();
        await this.fillImageField();
        await this.clickUpdateButtonOnRoomPage();

        const updatedText = dataStore.getValue<string>('selectedMessage')!;
        await this.waitHelper.waitForElement(this.roomsPage.roomsTextAreaInput);
        await expect(this.roomsPage.roomsTextAreaInput).toHaveValue(updatedText);

        await this.controlPanelSteps.clickAdminDashboardNavLinkByText('Front Page');
    }

    public async deleteOnlyStoredNameInRoom(): Promise<void> {
        await this.controlPanelSteps.clickAdminDashboardNavLinkByText('Rooms');
        await this.deleteStoredRoomOnly();
        await this.controlPanelSteps.clickAdminDashboardNavLinkByText('Front Page');
        await this.page.waitForTimeout(3000);
        await this.homeSteps.clickPrimaryButton('Check Availability');
        await this.homeSteps.verifyRoomCardIsDeleted(); // This is assumed to contain assertion
    }

    private async fillRoomDetails(type: string, accessible: string): Promise<void> {
        const roomName = numberAndString();
        const price = generateTwoOrThreeDigitNumber();
        const selectedFeatures = ['WiFi', 'TV', 'Radio', 'Refreshments', 'Safe', 'Views'];

        await this.roomsPage.roomInput.fill(roomName);
        await this.roomsPage.typeDropdown.selectOption(type);
        await this.roomsPage.accessibleDropdown.selectOption(accessible);
        await this.roomsPage.priceInput.fill(price);

        await this.actionHelper.clickCheckboxByText(...selectedFeatures);

        dataStore.setValue('selectedFeatures', selectedFeatures);
        dataStore.setValue('selectedRoomName', roomName);
        dataStore.setValue('selectedType', type);
        dataStore.setValue('selectedPrice', price);
    }

    private async clickCreateButtonOnRoomPage(): Promise<void> {
        await this.waitHelper.waitForElement(this.roomsPage.closePopButtonLocator);
        await this.actionHelper.clickElementByExactText(this.roomsPage.closePopButtonLocator, 'Create');
    }

    private async deleteAllRoomsExceptSelected(): Promise<void> {
        const storedRoomName = dataStore.getValue<string>('selectedRoomName')!;
        await this.actionHelper.deleteAllRowsExceptWithText(
            this.roomsPage.allRoomRows,
            async (row) => (await this.roomsPage.getRoomNameFromRow(row).innerText()).trim(),
            (row) => this.roomsPage.getDeleteButtonFromRow(row),
            storedRoomName
        );
    }

    private async clickStoredRoomRow(): Promise<void> {
        await this.actionHelper.clickRowByMatchingText(
            this.roomsPage.allRoomRows,
            async (row) => {
                const nameLocator = this.roomsPage.getRoomNameFromRow(row);
                return await nameLocator.innerText();
            },
            dataStore.getValue<string>('selectedRoomName')!
        );
    }

    private async clickEditPopupOnRoomPage(): Promise<void> {
        await this.waitHelper.waitForElement(this.roomsPage.closePopButtonLocator);
        await this.actionHelper.clickElementByExactText(this.roomsPage.closePopButtonLocator, 'Edit');
    }

    private async fillDescriptionField(text?: string): Promise<void> {
        const sentence = text ?? getSentence();
        await this.roomsPage.roomsTextAreaInput.scrollIntoViewIfNeeded();
        await this.roomsPage.roomsTextAreaInput.fill(sentence);
        dataStore.setValue('selectedMessage', sentence.trim());
    }

    private async fillImageField(text?: string): Promise<void> {
        const imageUrl = text ?? process.env.IMAGE ?? '';
        await this.actionHelper.fillInputByLabel('Image:', imageUrl);
    }

    private async clickUpdateButtonOnRoomPage(): Promise<void> {
        await this.waitHelper.waitForElement(this.roomsPage.closePopButtonLocator);
        await this.actionHelper.clickElementByExactText(this.roomsPage.closePopButtonLocator, 'Update');
    }

    private async deleteStoredRoomOnly(): Promise<void> {
        const storedRoomName = dataStore.getValue<string>('selectedRoomName')!;
        const roomNameLocator = this.roomsPage.getRoomLocatorByName(storedRoomName);
        await this.waitHelper.waitForElement(roomNameLocator);
        await this.actionHelper.deleteRowByMatchingText(
            this.roomsPage.allRoomRows,
            (row) => this.roomsPage.getRoomNameFromRow(row).innerText(),
            (row) => this.roomsPage.getDeleteButtonFromRow(row),
            storedRoomName
        );
        await expect(roomNameLocator).toHaveCount(0);
    }
}
