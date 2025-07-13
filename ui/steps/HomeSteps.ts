// ui/steps/HomeSteps.ts
import { AssertionHelper } from '../helpers/AssertionHelper';
import { WaitHelper } from '../helpers/WaitHelper';
import {APIResponse, expect, Locator, Page} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { DatePickerHelper } from '../helpers/DatePickerHelper';
import {ActionHelper} from "../helpers/ActionHelper";
import {dataStore} from "../../utils/dataStore";

export class HomeSteps {
    private waitHelper: WaitHelper;
    private actionHelper: ActionHelper;
    private datePicker: DatePickerHelper;
    private assertionHelper: AssertionHelper;
    private homePage: HomePage;
    private page: Page;

    constructor(page: Page) {
        this.page = page;
        this.waitHelper = new WaitHelper(page);
        this.actionHelper = new ActionHelper(page);
        this.assertionHelper = new AssertionHelper(page);
        this.datePicker = new DatePickerHelper(page);
        this.homePage = new HomePage(page);
    }


// ----------------------- PUBLIC WORKFLOWS -----------------------

    public async getHomepageResponse(): Promise<APIResponse> {
        const response = await this.page.request.get(this.homePage.getBaseUrl());
        expect(response.status()).toBe(200);
        return response;
    }

    public async clickPrimaryButton(buttonText: string): Promise<void> {
        const buttonSpan = this.homePage.getPrimaryButton().filter({ hasText: buttonText });
        await this.assertionHelper.assertElementVisible(buttonSpan);
        await this.homePage.actionHelper.clickElementByExactText(buttonSpan, buttonText);
    }


    public async getSectionTitleElement(title: string): Promise<Locator> {
        const sectionHeading = this.homePage.getSectionHeading(title);
        await this.waitHelper.waitForElement(sectionHeading);
        await sectionHeading.scrollIntoViewIfNeeded();
        return sectionHeading;
    }

    public async verifyCreatedRoomAndCompleteBooking(): Promise<void> {
        await this.selectAndStoreCheckInDate('Check In', '23/12/2025');
        await this.selectAndStoreCheckOutDate('Check Out', '27/12/2025');
        await this.clickPrimaryButton('Check Availability');
        await this.selectRoomCardByDescriptionAndGetPrices();
        await this.assertBookingPriceDetailsMatch();

    }


    // ----------------------- PRIVATE WORKFLOWS -----------------------

    private async selectAndStoreCheckInDate(label: string, date?: string): Promise<void> {
        const {inputFormat, confirmFormat} = await this.datePicker.selectDate(label, date);
        dataStore.setValue('selectedCheckInInputFormat', inputFormat);
        dataStore.setValue('selectedCheckInConfirmFormat', confirmFormat);
    }

    private async selectAndStoreCheckOutDate(label: string, date?: string): Promise<void> {
        const {inputFormat, confirmFormat} = await this.datePicker.selectDate(label, date);
        dataStore.setValue('selectedCheckOutInputFormat', inputFormat);
        dataStore.setValue('selectedCheckOutConfirmFormat', confirmFormat);
    }

    private async selectRoomCardByDescriptionAndGetPrices(): Promise<string> {
        const expectedDescription = dataStore.getValue<string>('selectedMessage');
        const expectedFeatures = dataStore.getValue<string[]>('selectedFeatures');
        const expectedType = dataStore.getValue<string>('selectedType');
        const generatedPrice = dataStore.getValue<string>('selectedPrice');

        expect(expectedDescription, 'Expected description should be set in dataStore').not.toBeNull();

        const allCards = this.homePage.getRoomCards();
        const matchedCard = await this.actionHelper.findCardByDescription(
            allCards, this.homePage.getCardDescriptionSelector(),
            expectedDescription
        );

        expect(matchedCard, `No room card found with description: "${expectedDescription}"`).toBeTruthy();
        const selectedCard = matchedCard!;

        const actualRoomType = await this.homePage.getCardTitle(selectedCard).innerText();
        expect(actualRoomType.trim(), 'Room type/title mismatch').toBe(expectedType.trim());
        dataStore.setValue('selectedCardTitle', actualRoomType);

        if (expectedFeatures?.length > 0) {
            const featureBadges = this.homePage.getCardFeatureBadges(selectedCard);
            await this.actionHelper.assertFeaturesMatch(featureBadges, expectedFeatures);
        }

        const displayedPriceText = await this.homePage.getCardPrice(selectedCard).innerText();
        const displayedPriceOnCard = this.actionHelper.cleanPriceText(displayedPriceText);
        expect(displayedPriceOnCard, 'Displayed price on card does not match generated price').toBe(generatedPrice);

        const bookButton = this.homePage.getCardActionButton(selectedCard);
        await bookButton.click();

        return displayedPriceOnCard;
    }




    private async assertBookingPriceDetailsMatch(): Promise<void> {
        const expectedPrice = dataStore.getValue<string>('selectedPrice');
        const detailPriceElement = this.homePage.getDetailPriceElement();
        await this.waitHelper.waitForElement(detailPriceElement);

        const displayedBookingPriceRaw = await detailPriceElement.innerText();
        const displayedBookingPrice = this.actionHelper.cleanPriceText(displayedBookingPriceRaw.trim());
        expect(displayedBookingPrice, 'Booking detail price mismatch').toBe(expectedPrice);
    }


    async verifyRoomCardIsDeleted(): Promise<void> {
        const expectedDescription = dataStore.getValue<string>('selectedMessage');
        expect(expectedDescription, 'Expected description should be set in dataStore').not.toBeNull();

        const allCards = this.homePage.getRoomCards();
        const matchedCard = await this.actionHelper.findCardByDescription(allCards, '.card-text', expectedDescription);

        expect(matchedCard, `Room card with description "${expectedDescription}" was expected to be deleted but still exists.`).toBeNull();
    }


}
