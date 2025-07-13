// ui/tests/room_booking_report_flow.spec.ts
import {test, type Page, expect} from '@playwright/test';
import * as dotenv from 'dotenv';
import {sharedSetup, sharedTeardown, TestSetup} from "../../utils/testSetupHelper";

dotenv.config();

test.describe('Shady Meadows – Room Management Flow', () => {
    let setup: TestSetup;
    let page: Page;

    test.beforeAll(async ({ browser }) => {
        setup = await sharedSetup(browser);
        page = setup.page;
    });

    test.afterAll(async () => {
        await sharedTeardown(setup.page);
    });


    test('Verify homepage loads with status 200', async () => {
        await setup.homeSteps.getHomepageResponse();
    });

    test('should create a new room and keep it while removing others', async () => {
        await setup.roomsSteps.handleFullRoomManagementFlow('Double', 'true')
    })

    test('should edit and update the previously created room details', async () => {
        await setup.roomsSteps.editCreatedRoom();
    });

    test('should verify and book created room successfully', async () => {
        await setup.homeSteps.verifyCreatedRoomAndCompleteBooking();
    })

    test('should reflect dates, match title, and submit form', async () => {
         await setup.reservationSteps.completeReservationValidationFlow();
    });


    test('should confirm booking summary with title and selected dates', async () => {
        await setup.reservationSteps.assertBookingConfirmationSummary()
    });

    test('should display booking confirmation in report', async () => {
        await setup.reportSteps.navigateToReportDashboardAndVerifyDateRange();
    })

    test('verify created room is deleted from the list', async () => {
        await setup.roomsSteps.deleteOnlyStoredNameInRoom();
    })
});
