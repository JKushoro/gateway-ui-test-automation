"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const ActionHelper_1 = require("@framework/helpers/ActionHelper");
const DataStore_1 = require("@framework/utils/DataStore");
const KycPersonalDetailsPageSteps_1 = require("@steps/kyc/core/KycPersonalDetailsPageSteps");
const IsolatedTestManager_1 = require("@tests/shared/IsolatedTestManager");
const TestUtils_1 = __importDefault(require("@tests/shared/TestUtils"));
async function arrangePersonalDetailsPage(browser) {
    const testBase = await TestUtils_1.default.create(browser, 'qa');
    await testBase.factFindSteps.addClientAndNavigateToFactFindTab(testBase.sideNav, testBase.navBar);
    const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');
    const actionHelper = new ActionHelper_1.ActionHelper(kycPage);
    await actionHelper.selectCustomRadioOptionByLabel('Personal Details');
    return {
        testBase,
        kycPage,
        kycSteps: new KycPersonalDetailsPageSteps_1.KycPersonalDetailsPageSteps(kycPage),
    };
}
async function cleanupPersonalDetailsPage(setup) {
    await setup?.kycPage.close();
    await setup?.testBase.cleanup();
}
async function expectPersonalDetailsPage(kycPage) {
    await (0, test_1.expect)(kycPage.getByText('Personal details').first()).toBeVisible({
        timeout: 15000,
    });
    (0, test_1.expect)(kycPage.url()).toContain('page=personal-details');
}
(0, IsolatedTestManager_1.setupIsolatedTest)('Core Fact Find - Personal Details Page (Isolated)', () => {
    let currentSetup;
    test_1.test.afterEach(async () => {
        await cleanupPersonalDetailsPage(currentSetup);
        currentSetup = undefined;
    });
    (0, test_1.test)('Personal Details page - validates page heading and URL', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangePersonalDetailsPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.verifyPersonalDetailsHeading();
        // Assert
        await expectPersonalDetailsPage(setup.kycPage);
    });
    (0, test_1.test)('Personal Details page - validates Gateway client details against KYC details', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangePersonalDetailsPage(browser);
        const setup = currentSetup;
        await setup.kycSteps.verifyPersonalDetailsHeading();
        const gatewayClient = setup.kycSteps.getSelectedGatewayClient();
        // Act
        const displayedClient = await setup.kycSteps.readAndStoreDisplayedKycClient();
        await setup.kycSteps.compareSelectedGatewayVsDisplayedKyc(gatewayClient, displayedClient);
        // Assert
        (0, test_1.expect)(DataStore_1.dataStore.getValue('displayed.kycClient')).toBeTruthy();
        await expectPersonalDetailsPage(setup.kycPage);
    });
    (0, test_1.test)('Personal Details page - fills contact details', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangePersonalDetailsPage(browser);
        const setup = currentSetup;
        await setup.kycSteps.verifyPersonalDetailsHeading();
        const contactDetails = setup.kycSteps.generateAndStoreKycContactDetails();
        // Act
        await setup.kycSteps.fillKycContactAndStoreDisplayed(contactDetails);
        // Assert
        (0, test_1.expect)(DataStore_1.dataStore.getValue('displayed.kyc.contact.mobile')).toBe(contactDetails.mobile);
        (0, test_1.expect)(DataStore_1.dataStore.getValue('displayed.kyc.contact.email')).toBe(contactDetails.email);
        await expectPersonalDetailsPage(setup.kycPage);
    });
    (0, test_1.test)('Personal Details page - fills current address', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangePersonalDetailsPage(browser);
        const setup = currentSetup;
        await setup.kycSteps.verifyPersonalDetailsHeading();
        // Act
        await setup.kycSteps.fillCurrentAddress_Address1();
        // Assert
        (0, test_1.expect)(DataStore_1.dataStore.getValue('kyc.address1.moveInDate')).toBeTruthy();
        (0, test_1.expect)(DataStore_1.dataStore.getValue('kyc.address1.postcode')).toBeTruthy();
        await expectPersonalDetailsPage(setup.kycPage);
    });
    (0, test_1.test)('Personal Details page - adds previous address', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangePersonalDetailsPage(browser);
        const setup = currentSetup;
        await setup.kycSteps.verifyPersonalDetailsHeading();
        // Act
        await setup.kycSteps.addPreviousAddress_Address2();
        // Assert
        await expectPersonalDetailsPage(setup.kycPage);
    });
    (0, test_1.test)('Personal Details page - fills previous address', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangePersonalDetailsPage(browser);
        const setup = currentSetup;
        await setup.kycSteps.verifyPersonalDetailsHeading();
        await setup.kycSteps.fillCurrentAddress_Address1();
        await setup.kycSteps.addPreviousAddress_Address2();
        // Act
        const moveInDate = await setup.kycSteps.fillPreviousAddress_Address2();
        // Assert
        (0, test_1.expect)(moveInDate).toBeTruthy();
        (0, test_1.expect)(DataStore_1.dataStore.getValue('kyc.address2.postcode')).toBeTruthy();
        await expectPersonalDetailsPage(setup.kycPage);
    });
    (0, test_1.test)('Personal Details page - answers nationality questions', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangePersonalDetailsPage(browser);
        const setup = currentSetup;
        await setup.kycSteps.verifyPersonalDetailsHeading();
        // Act
        await setup.kycSteps.answerUkNationality('No');
        await setup.kycSteps.selectNonUkNationality('Nigeria');
        // Assert
        await (0, test_1.expect)(setup.kycPage.getByText('Nigeria').first()).toBeVisible();
        await expectPersonalDetailsPage(setup.kycPage);
    });
    (0, test_1.test)('Personal Details page - answers residency questions', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangePersonalDetailsPage(browser);
        const setup = currentSetup;
        await setup.kycSteps.verifyPersonalDetailsHeading();
        // Act
        await setup.kycSteps.answerUkResidency('No');
        await setup.kycSteps.selectNonUkResidency('Nigeria');
        // Assert
        await (0, test_1.expect)(setup.kycPage.getByText('Nigeria').first()).toBeVisible();
        await expectPersonalDetailsPage(setup.kycPage);
    });
    (0, test_1.test)('Personal Details page - answers tax outside UK questions', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangePersonalDetailsPage(browser);
        const setup = currentSetup;
        await setup.kycSteps.verifyPersonalDetailsHeading();
        // Act
        await setup.kycSteps.answerTaxOutsideUk('Yes');
        await setup.kycSteps.selectTaxPaidCountryOutsideUk('Nigeria');
        // Assert
        await (0, test_1.expect)(setup.kycPage.getByText('Nigeria').first()).toBeVisible();
        await expectPersonalDetailsPage(setup.kycPage);
    });
    (0, test_1.test)('Personal Details page - answers children or dependants question', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangePersonalDetailsPage(browser);
        const setup = currentSetup;
        await setup.kycSteps.verifyPersonalDetailsHeading();
        // Act
        await setup.kycSteps.answerChildrenOrDependants('Yes');
        // Assert
        await expectPersonalDetailsPage(setup.kycPage);
    });
    (0, test_1.test)('Personal Details page - completes children or dependants details', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangePersonalDetailsPage(browser);
        const setup = currentSetup;
        await setup.kycSteps.verifyPersonalDetailsHeading();
        await setup.kycSteps.answerChildrenOrDependants('Yes');
        // Act
        await setup.kycSteps.completeChildrenOrDependantsDetails();
        // Assert
        await expectPersonalDetailsPage(setup.kycPage);
    });
    (0, test_1.test)('Personal Details page - answers all personal details questions', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangePersonalDetailsPage(browser);
        const setup = currentSetup;
        await setup.kycSteps.verifyPersonalDetailsHeading();
        // Act
        await setup.kycSteps.answerPersonalDetailsQuestions();
        // Assert
        await expectPersonalDetailsPage(setup.kycPage);
    });
    (0, test_1.test)('Personal Details page - completes page and proceeds to Current Situation', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangePersonalDetailsPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.completeKYCPersonalDetails();
        // Assert
        await (0, test_1.expect)(setup.kycPage.getByText('Current Situation').first()).toBeVisible({
            timeout: 15000,
        });
    });
});
//# sourceMappingURL=personal-details-page.isolated.spec.js.map