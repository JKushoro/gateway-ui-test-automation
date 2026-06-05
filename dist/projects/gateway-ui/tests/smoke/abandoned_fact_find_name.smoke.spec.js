"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// projects/gateway-ui/tests/smoke/abandoned_fact_find_name.smoke.spec.ts
const test_1 = require("@playwright/test");
const DataStore_1 = require("@framework/utils/DataStore");
const TestCleanupHelper_1 = require("@framework/utils/TestCleanupHelper");
const TestUtils_1 = __importDefault(require("../shared/TestUtils"));
async function arrangeAbandonedCoreFactFind(browser) {
    const testBase = await TestUtils_1.default.create(browser, 'qa');
    await testBase.factFindSteps.createAndAbandonFactFind(testBase.sideNav, testBase.navBar, 'Core Fact Find');
    return { testBase };
}
async function arrangeAbandonedCoreFactFindWithName(browser) {
    const setup = await arrangeAbandonedCoreFactFind(browser);
    await setup.testBase.factFindSteps.executeAddNameToAbandonedFactFind();
    return setup;
}
test_1.test.describe('Verify a name can be added to an abandoned KYC Fact Find', () => {
    let currentSetup;
    test_1.test.beforeEach(async () => {
        (0, DataStore_1.clearWorkerDataStore)();
    });
    test_1.test.afterEach(async () => {
        await (0, TestCleanupHelper_1.cleanupClient1FactFinds)();
        await currentSetup?.testBase.cleanup();
        currentSetup = undefined;
    });
    (0, test_1.test)('Abandoned Fact Find Name - verifies name is blank after abandon', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeAbandonedCoreFactFind(browser);
        const setup = currentSetup;
        // Act
        await setup.testBase.factFindSteps.verifyFirstRowNameIsBlank();
        // Assert
        await setup.testBase.factFindSteps.verifyFirstRowLaunchFactFindNotAvailable();
    });
    (0, test_1.test)('Abandoned Fact Find Name - adds name to abandoned Fact Find', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeAbandonedCoreFactFind(browser);
        const setup = currentSetup;
        await setup.testBase.factFindSteps.verifyFirstRowNameIsBlank();
        // Act
        await setup.testBase.factFindSteps.executeAddNameToAbandonedFactFind();
        // Assert
        await setup.testBase.factFindSteps.executeVerifyNameSavedAgainstAbandonedFactFind();
    });
    (0, test_1.test)('Abandoned Fact Find Name - verifies name persists after reload', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeAbandonedCoreFactFindWithName(browser);
        const setup = currentSetup;
        // Act
        await setup.testBase.factFindSteps.executeVerifyNameSavedAgainstAbandonedFactFind();
        // Assert
        await setup.testBase.factFindSteps.verifyFirstRowLaunchFactFindNotAvailable();
    });
    (0, test_1.test)('Abandoned Fact Find Name - edits name on abandoned Fact Find', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeAbandonedCoreFactFindWithName(browser);
        const setup = currentSetup;
        // Act
        await setup.testBase.factFindSteps.executeEditNameOnAbandonedFactFind();
        // Assert
        await setup.testBase.factFindSteps.verifyFirstRowLaunchFactFindNotAvailable();
    });
    (0, test_1.test)('Abandoned Fact Find Name - verifies updated name persists after reload', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeAbandonedCoreFactFindWithName(browser);
        const setup = currentSetup;
        // Act
        await setup.testBase.factFindSteps.executeVerifyUpdatedNameSavedAndPersisted();
        // Assert
        await setup.testBase.factFindSteps.verifyFirstRowLaunchFactFindNotAvailable();
    });
});
//# sourceMappingURL=abandoned_fact_find_name.smoke.spec.js.map