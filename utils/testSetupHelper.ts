// // ui/utils/testSetupHelper.ts
import type { Page, Browser } from '@playwright/test';
import { HomeSteps } from "../ui/steps/HomeSteps";
import { ReservationSteps } from "../ui/steps/ReservationSteps";
import { LoginSteps } from "../ui/steps/LoginSteps";
import {ReportSteps} from "../ui/steps/ReportSteps";
import { ControlPanelSteps } from "../ui/steps/ControlPanelSteps";
import { AdminMessagesSteps } from "../ui/steps/AdminMessagesSteps";
import { ReservationPage } from "../ui/pages/ReservationPage";
import { RoomsSteps } from "../ui/steps/RoomsSteps";
import { afterAllHook, beforeAllHook } from "../ui/hooks/global/globalHooks";
import { ContactSteps } from "../ui/steps/ContactSteps";
import { AdminMessagesPage } from "../ui/pages/AdminMessagesPage";
import { generateForm } from "./generators/formGenerator";

export interface TestSetup {
    page: Page;
    homeSteps: HomeSteps;
    reservationSteps: ReservationSteps;
    loginSteps: LoginSteps;
    controlPanelSteps: ControlPanelSteps;
    roomsSteps: RoomsSteps;
    adminMessageSteps: AdminMessagesSteps;
    reservationPage: ReservationPage;
    reportSteps: ReportSteps;
}

export async function sharedSetup(browser: Browser): Promise<TestSetup> {
    const page = await beforeAllHook(browser);

    const homeSteps = new HomeSteps(page);
    const reservationSteps = new ReservationSteps(page);
    const loginSteps = new LoginSteps(page);
    const controlPanelSteps = new ControlPanelSteps(page);
    const adminMessageSteps = new AdminMessagesSteps(page);
    const reservationPage = new ReservationPage(page);
    const reportSteps = new ReportSteps(page);

    const roomsSteps = new RoomsSteps(page, {
        loginSteps,
        controlPanelSteps
    });

    return {
        page,
        homeSteps,
        reservationSteps,
        loginSteps,
        controlPanelSteps,
        roomsSteps,
        adminMessageSteps,
        reservationPage,
        reportSteps

    };
}

export interface ContactTestSetup extends TestSetup {
    contactSteps: ContactSteps;
    adminMessagesPage: AdminMessagesPage;
}

export async function contactSetup(browser: Browser): Promise<ContactTestSetup> {
    const baseSetup = await sharedSetup(browser);
    const formData = generateForm();

    return {
        ...baseSetup,
        contactSteps: new ContactSteps({ page: baseSetup.page, formData }),
        adminMessagesPage: new AdminMessagesPage(baseSetup.page)
    };
}

export async function sharedTeardown(page: Page): Promise<void> {
    await afterAllHook(page);
}
