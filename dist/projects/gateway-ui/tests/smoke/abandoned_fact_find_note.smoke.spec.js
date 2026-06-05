"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// projects/gateway-ui/tests/smoke/abandoned_fact_find_note.smoke.spec.ts
const test_1 = require("@playwright/test");
const DataStore_1 = require("@framework/utils/DataStore");
const TestCleanupHelper_1 = require("@framework/utils/TestCleanupHelper");
const TestUtils_1 = __importDefault(require("../shared/TestUtils"));
async function arrangeAbandonedCoreFactFind(browser) {
    const testBase = await TestUtils_1.default.create(browser, 'qa');
    await testBase.factFindSteps.createAndAbandonFactFind(testBase.sideNav, testBase.navBar, 'Core Fact Find');
    return { testBase };
}
async function arrangeAbandonedCoreFactFindWithNote(browser) {
    const setup = await arrangeAbandonedCoreFactFind(browser);
    await setup.testBase.factFindSteps.executeAddNoteToAbandonedFactFind();
    return setup;
}
test_1.test.describe('Verify a note can be added to an abandoned KYC Fact Find', () => {
    let currentSetup;
    test_1.test.beforeEach(async () => {
        (0, DataStore_1.clearWorkerDataStore)();
    });
    test_1.test.afterEach(async () => {
        await (0, TestCleanupHelper_1.cleanupClient1FactFinds)();
        await currentSetup?.testBase.cleanup();
        currentSetup = undefined;
    });
    (0, test_1.test)('Abandoned Fact Find Note - verifies add note action is available', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeAbandonedCoreFactFind(browser);
        const setup = currentSetup;
        // Act
        await setup.testBase.factFindSteps.verifyFirstRowAddNoteButtonIsVisible();
        // Assert
        await setup.testBase.factFindSteps.verifyFirstRowLaunchFactFindNotAvailable();
    });
    (0, test_1.test)('Abandoned Fact Find Note - verifies note column is blank after abandon', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeAbandonedCoreFactFind(browser);
        const setup = currentSetup;
        // Act
        await setup.testBase.factFindSteps.verifyFactFindHistoryHasNoNoteHeader();
        // Assert
        await setup.testBase.factFindSteps.verifyFirstRowAddNoteButtonIsVisible();
    });
    (0, test_1.test)('Abandoned Fact Find Note - adds note to abandoned Fact Find', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeAbandonedCoreFactFind(browser);
        const setup = currentSetup;
        await setup.testBase.factFindSteps.verifyFirstRowAddNoteButtonIsVisible();
        // Act
        await setup.testBase.factFindSteps.executeAddNoteToAbandonedFactFind();
        // Assert
        await setup.testBase.factFindSteps.executeVerifyNoteSavedAgainstAbandonedFactFind();
    });
    (0, test_1.test)('Abandoned Fact Find Note - verifies note persists after reload', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeAbandonedCoreFactFindWithNote(browser);
        const setup = currentSetup;
        // Act
        await setup.testBase.factFindSteps.executeVerifyNoteSavedAgainstAbandonedFactFind();
        // Assert
        await setup.testBase.factFindSteps.verifyFirstRowLaunchFactFindNotAvailable();
    });
    (0, test_1.test)('Abandoned Fact Find Note - edits note on abandoned Fact Find', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeAbandonedCoreFactFindWithNote(browser);
        const setup = currentSetup;
        // Act
        await setup.testBase.factFindSteps.executeEditNoteOnAbandonedFactFind();
        // Assert
        await setup.testBase.factFindSteps.verifyFirstRowLaunchFactFindNotAvailable();
    });
    (0, test_1.test)('Abandoned Fact Find Note - verifies updated note persists after reload', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeAbandonedCoreFactFindWithNote(browser);
        const setup = currentSetup;
        // Act
        await setup.testBase.factFindSteps.executeVerifyUpdatedNoteSavedAndPersisted();
        // Assert
        await setup.testBase.factFindSteps.verifyFirstRowLaunchFactFindNotAvailable();
    });
});
//# sourceMappingURL=abandoned_fact_find_note.smoke.spec.js.map