"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const TestUtils_1 = __importDefault(require("@tests/shared/TestUtils"));
const DataStore_1 = require("@framework/utils/DataStore");
const KycFactFindDetailsPageSteps_1 = require("@steps/kyc/core/KycFactFindDetailsPageSteps");
async function arrangeFactFindDetailsPage(browser) {
    const testBase = await TestUtils_1.default.create(browser, 'dev');
    await testBase.factFindSteps.addClientAndNavigateToFactFindTab(testBase.sideNav, testBase.navBar);
    const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');
    const kycFactFindDetailsPageSteps = new KycFactFindDetailsPageSteps_1.KycFactFindDetailsPageSteps(kycPage);
    await (0, test_1.expect)(kycPage.getByText('Fact Find Details').first()).toBeVisible({
        timeout: 15000,
    });
    return {
        testBase,
        kycPage,
        kycFactFindDetailsPageSteps,
    };
}
async function arrangeThirdPartyFields(setup) {
    await setup.kycFactFindDetailsPageSteps.requireA3rdPartyToBePresent('Yes');
    await setup.kycFactFindDetailsPageSteps.clickAddThirdPartyButton();
}
async function cleanupFactFindDetailsPage(setup) {
    await setup?.kycPage.close();
    await setup?.testBase.cleanup();
}
async function expectFactFindDetailsPage(kycPage) {
    await (0, test_1.expect)(kycPage.getByText('Fact Find Details').first()).toBeVisible({
        timeout: 15000,
    });
}
test_1.test.describe('Create core Fact Find - Fact Find Details', () => {
    let currentSetup;
    test_1.test.beforeEach(async () => {
        (0, DataStore_1.clearWorkerDataStore)();
    });
    test_1.test.afterEach(async () => {
        await cleanupFactFindDetailsPage(currentSetup);
        currentSetup = undefined;
    });
    (0, test_1.test)('Fact Find Details page - answers work completed on a different date', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeFactFindDetailsPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycFactFindDetailsPageSteps.workCompletedDate('Yes');
        // Assert
        await expectFactFindDetailsPage(setup.kycPage);
    });
    (0, test_1.test)('Fact Find Details page - sets work completed date', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeFactFindDetailsPage(browser);
        const setup = currentSetup;
        await setup.kycFactFindDetailsPageSteps.workCompletedDate('Yes');
        // Act
        const date = await setup.kycFactFindDetailsPageSteps.setWorkCompletedDate('What date was the work completed on', 1, 1);
        // Assert
        (0, test_1.expect)(date).toBeTruthy();
        await expectFactFindDetailsPage(setup.kycPage);
    });
    (0, test_1.test)('Fact Find Details page - selects venue', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeFactFindDetailsPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycFactFindDetailsPageSteps.selectVenue('Email');
        // Assert
        await (0, test_1.expect)(setup.kycPage.getByText('Email').first()).toBeVisible();
    });
    (0, test_1.test)('Fact Find Details page - answers third party required', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeFactFindDetailsPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycFactFindDetailsPageSteps.requireA3rdPartyToBePresent('Yes');
        // Assert
        await (0, test_1.expect)(setup.kycPage.getByText('Add Third Party').first()).toBeVisible();
    });
    (0, test_1.test)('Fact Find Details page - adds third party', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeFactFindDetailsPage(browser);
        const setup = currentSetup;
        await setup.kycFactFindDetailsPageSteps.requireA3rdPartyToBePresent('Yes');
        // Act
        await setup.kycFactFindDetailsPageSteps.clickAddThirdPartyButton();
        // Assert
        await (0, test_1.expect)(setup.kycPage.getByText('Title').first()).toBeVisible();
    });
    (0, test_1.test)('Fact Find Details page - selects third party title', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeFactFindDetailsPage(browser);
        const setup = currentSetup;
        await arrangeThirdPartyFields(setup);
        // Act
        await setup.kycFactFindDetailsPageSteps.selectThirdPartyTitle();
        // Assert
        await expectFactFindDetailsPage(setup.kycPage);
    });
    (0, test_1.test)('Fact Find Details page - fills third party first name and surname', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeFactFindDetailsPage(browser);
        const setup = currentSetup;
        await arrangeThirdPartyFields(setup);
        // Act
        await setup.kycFactFindDetailsPageSteps.fillFirstAndLastName();
        // Assert
        await expectFactFindDetailsPage(setup.kycPage);
    });
    (0, test_1.test)('Fact Find Details page - selects third party relationship', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeFactFindDetailsPage(browser);
        const setup = currentSetup;
        await arrangeThirdPartyFields(setup);
        // Act
        await setup.kycFactFindDetailsPageSteps.selectRelationship();
        // Assert
        await expectFactFindDetailsPage(setup.kycPage);
    });
    (0, test_1.test)('Fact Find Details page - fills third party contact number', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeFactFindDetailsPage(browser);
        const setup = currentSetup;
        await arrangeThirdPartyFields(setup);
        // Act
        await setup.kycFactFindDetailsPageSteps.fillContactNumber();
        // Assert
        await expectFactFindDetailsPage(setup.kycPage);
    });
    (0, test_1.test)('Fact Find Details page - fills third party address', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeFactFindDetailsPage(browser);
        const setup = currentSetup;
        await arrangeThirdPartyFields(setup);
        // Act
        await setup.kycFactFindDetailsPageSteps.fillThirdPartyAddress();
        // Assert
        await expectFactFindDetailsPage(setup.kycPage);
    });
    (0, test_1.test)('Fact Find Details page - answers third party present at meeting', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeFactFindDetailsPage(browser);
        const setup = currentSetup;
        await arrangeThirdPartyFields(setup);
        // Act
        await setup.kycFactFindDetailsPageSteps.selectPresentAtMeeting('Yes');
        // Assert
        await expectFactFindDetailsPage(setup.kycPage);
    });
    (0, test_1.test)('Fact Find Details page - fills notes when present', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeFactFindDetailsPage(browser);
        const setup = currentSetup;
        await arrangeThirdPartyFields(setup);
        // Act
        await setup.kycFactFindDetailsPageSteps.fillNotesIfPresent();
        // Assert
        await expectFactFindDetailsPage(setup.kycPage);
    });
    (0, test_1.test)('Fact Find Details page - answers third party Power of Attorney', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeFactFindDetailsPage(browser);
        const setup = currentSetup;
        await arrangeThirdPartyFields(setup);
        // Act
        await setup.kycFactFindDetailsPageSteps.selectIf3rdPartyPowerOfAttorney('No');
        // Assert
        await expectFactFindDetailsPage(setup.kycPage);
    });
    (0, test_1.test)('Fact Find Details page - completes all Fact Find Details questions', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeFactFindDetailsPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycFactFindDetailsPageSteps.answerFactFindDetailsQuestions();
        // Assert
        await expectFactFindDetailsPage(setup.kycPage);
    });
    (0, test_1.test)('Fact Find Details page - completes page and proceeds to Personal Details', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeFactFindDetailsPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycFactFindDetailsPageSteps.completeKYCFactFindDetails();
        // Assert
        await (0, test_1.expect)(setup.kycPage.getByText('Personal Details').first()).toBeVisible({
            timeout: 15000,
        });
    });
});
//# sourceMappingURL=fact_find_details.page.spec.js.map