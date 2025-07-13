// ui/tests/contact_message_lifecycle.spec.ts
import {Page, test} from "@playwright/test";
import {contactSetup, ContactTestSetup, sharedTeardown} from "../../utils/testSetupHelper";

test.describe('Contact Message Lifecycle: Submit → Verify → Delete', () => {
    let setup: ContactTestSetup;
    let page: Page;

    test.beforeAll(async ({ browser }) => {
        setup = await contactSetup(browser);
        page = setup.page;
    });

    test.afterAll(async () => {
        await sharedTeardown(page);
    });

    test('should submit the contact form successfully', async () => {
        await setup.contactSteps.submitContactFormSuccessfully();
    });

    test('should verify message is present in admin table', async () => {
        await setup.adminMessageSteps.verifyMessageInAdminTable();
    });

    test('should verify message popup details are correct', async () => {
        await setup.adminMessageSteps.verifyMessagePopupDetails();
    });

    test('should delete the submitted message', async () => {
        await setup.adminMessageSteps.deleteMessage();
    });
});
