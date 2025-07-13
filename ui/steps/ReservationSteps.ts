//ui/steps/ReservationSteps.ts
import {ReservationPage} from "../pages/ReservationPage";
import {Person} from "../../utils/interfaces/Person";
import {WaitHelper} from "../helpers/WaitHelper";
import {generatePerson} from "../../utils/generators/personGenerator";
import {format, parse} from "date-fns";
import {expect, Locator, Page} from "@playwright/test";
import {dataStore} from "../../utils/dataStore";
import {HomeSteps} from "./HomeSteps";
import {ActionHelper} from "../helpers/ActionHelper";

export class ReservationSteps {
    private readonly reservationPage: ReservationPage;
    private readonly person: Person;
    private readonly waitHelper: WaitHelper;
    private readonly homeSteps: HomeSteps;
    private readonly actionHelper: ActionHelper;
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        this.waitHelper = new WaitHelper(page);
        this.reservationPage = new ReservationPage(page);
        this.homeSteps = new HomeSteps(page);
        this.actionHelper = new ActionHelper(page);

        this.person = generatePerson();
    }

    // ----------------------- PUBLIC WORKFLOWS -----------------------

    public async completeReservationValidationFlow(): Promise<void> {
        await this.assertDateRangeSelection()
        await this.homeSteps.clickPrimaryButton('Reserve Now');
        await this.fillReservationDetails()
        await this.homeSteps.clickPrimaryButton('Reserve Now');
        await this.assertCardTitleMatchesReservationTitle();

    }


    public async assertBookingConfirmationSummary(): Promise<void> {
        await this.assertBookingConfirmationTitle();
        await this.assertBookingDatesMatch();
    }


    // ----------------------- PRIVATE WORKFLOWS -----------------------


    public async assertDateRangeSelection(): Promise<void> {
        const checkInDate = dataStore.getValue('selectedCheckInInputFormat');
        const checkOutDate = dataStore.getValue('selectedCheckOutInputFormat');

        await this.assertDateIsMarkedSelected(checkInDate);
        await this.assertDateIsMarkedSelected(checkOutDate);
    }

    // private async assertDateIsMarkedSelected(dateStr: string): Promise<void> {
    //     const targetDate = parse(dateStr, 'dd/MM/yyyy', new Date());
    //     const targetMonth = format(targetDate, 'MMMM yyyy');
    //
    //     await this.actionHelper.clickUntilLabelMatches(
    //         this.reservationPage.calendarLabel,
    //         this.reservationPage.calendarNextButton,
    //         targetMonth
    //     );
    //
    //     const isVisible = await this.reservationPage.calendarSelectedLabel.isVisible();
    //     expect(isVisible).toBeTruthy();
    // }

    private async assertDateIsMarkedSelected(dateStr: string): Promise<void> {
        if (!dateStr) {
            throw new Error(`Invalid or missing date string passed to assertDateIsMarkedSelected`);
        }

        const targetDate = parse(dateStr, 'dd/MM/yyyy', new Date());
        const targetMonth = format(targetDate, 'MMMM yyyy');

        await this.actionHelper.clickUntilLabelMatches(
            this.reservationPage.calendarLabel,
            this.reservationPage.calendarNextButton,
            targetMonth
        );

        const isVisible = await this.reservationPage.calendarSelectedLabel.isVisible();
        expect(isVisible).toBeTruthy();
    }


    private async fillReservationDetails(): Promise<void> {
        dataStore.setValue('firstName', this.person.firstName);
        dataStore.setValue('lastName', this.person.lastName);
        dataStore.setValue('email', this.person.email);
        dataStore.setValue('phoneNumber', this.person.phoneNumber);

        await this.reservationPage.fillFirstName(this.person.firstName);
        await this.reservationPage.fillLastName(this.person.lastName);
        await this.reservationPage.fillEmail(this.person.email);
        await this.reservationPage.fillPhoneNumber(this.person.phoneNumber);
    }


    private async getReservationTitleFirstWord(): Promise<string> {
        const text = await this.reservationPage.getReservationTitleText();
        return text.trim().split(' ')[0];
    }

    private async assertCardTitleMatchesReservationTitle(): Promise<void> {
        const cardTitle = dataStore.getValue<string>('selectedCardTitle').trim();
        const reservationTitle = await this.getReservationTitleFirstWord();
        expect(cardTitle).toBe(reservationTitle);
    }


    private async assertBookingDatesMatch(): Promise<void> {
        const checkIn = dataStore.getValue<string>('selectedCheckInConfirmFormat');
        const checkOut = dataStore.getValue<string>('selectedCheckOutConfirmFormat');
        const expectedDates = `${checkIn} - ${checkOut}`;

        const locator = this.reservationPage.confirmationBookingDate;
        await this.waitHelper.waitForElement(locator);
        const actualDates = await locator.innerText();

        expect(actualDates).toBe(expectedDates);
    }

    private async assertBookingConfirmationTitle(): Promise<void> {
        const titleLocator = this.reservationPage.bookingConfirmationTitle;
        await this.waitHelper.waitForElement(titleLocator);
        await expect(titleLocator).toBeVisible();

        const titleText = await titleLocator.textContent();
        expect(titleText).toContain('Booking Confirmed');
    }


}