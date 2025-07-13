// ui/pages/ReservationPage.ts
import { BasePage } from "../base/BasePage";
import { Locator, Page } from "@playwright/test";

export class ReservationPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // ---------- Element Locators ----------

    private readonly roomTitleLocator = this.page.locator('h1.fw-bold.mb-2');
    private readonly firstNameInputLocator = this.page.getByPlaceholder('Firstname');
    private readonly lastNameInputLocator = this.page.getByPlaceholder('Lastname');
    private readonly emailInputLocator = this.page.getByPlaceholder('Email');
    private readonly phoneInputLocator = this.page.getByPlaceholder('Phone');

    private readonly bookingConfirmationLocator = this.page.locator('h2.card-title.fs-4.fw-bold.mb-3');
    private readonly confirmationBookingDateLocator = this.page.locator('p.text-center.pt-2 > strong');

    // 🔹 Calendar-specific locators
    private readonly calendarLabelLocator = this.page.locator('.rbc-toolbar-label');
    private readonly calendarNextButtonLocator = this.page.locator('.rbc-btn-group >> text=Next');
    private readonly calendarSelectedLabelLocator = this.page.locator('.rbc-event-content', {hasText: 'Selected'});

    // ---------- Public Getters (if needed externally) ----------

    public get reservationRoomTitle(): Locator {
        return this.roomTitleLocator;
    }

    public get bookingConfirmationTitle(): Locator {
        return this.bookingConfirmationLocator;
    }

    public get confirmationBookingDate(): Locator {
        return this.confirmationBookingDateLocator;
    }

    // 🔹 Add these getters to ReservationPage
    public get calendarLabel(): Locator {
        return this.calendarLabelLocator;
    }

    public get calendarNextButton(): Locator {
        return this.calendarNextButtonLocator;
    }

    public get calendarSelectedLabel(): Locator {
        return this.calendarSelectedLabelLocator;
    }


    // ---------- Form Methods ----------

    public async getReservationTitleText(): Promise<string> {
        return await this.reservationRoomTitle.innerText();
    }

    public async fillFirstName(value: string): Promise<void> {
        await this.firstNameInputLocator.fill(value);
    }

    public async fillLastName(value: string): Promise<void> {
        await this.lastNameInputLocator.fill(value);
    }

    public async fillEmail(value: string): Promise<void> {
        await this.emailInputLocator.fill(value);
    }

    public async fillPhoneNumber(value: string): Promise<void> {
        await this.phoneInputLocator.fill(value);
    }
}