"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// projects/gateway-ui/tests/smoke/abandon_fact_find.smoke.spec.ts
const test_1 = require("@playwright/test");
const DataStore_1 = require("@framework/utils/DataStore");
const TestCleanupHelper_1 = require("@framework/utils/TestCleanupHelper");
const TestUtils_1 = __importDefault(require("../shared/TestUtils"));
async function arrangeFactFindTab(browser) {
    const testBase = await TestUtils_1.default.create(browser, 'qa');
    await testBase.factFindSteps.executeAddClientAndNavigateToFactFindTab(testBase.sideNav, testBase.navBar);
    return { testBase };
}
async function arrangeCreatedCoreFactFind(browser) {
    const setup = await arrangeFactFindTab(browser);
    await setup.testBase.factFindSteps.executeCreateFactFind('Core Fact Find');
    return setup;
}
async function arrangeAbandonedCoreFactFind(browser) {
    const setup = await arrangeCreatedCoreFactFind(browser);
    await setup.testBase.factFindSteps.executeAbandonFirstRowFactFind();
    return setup;
}
test_1.test.describe('Abandon Fact Find', () => {
    let currentSetup;
    test_1.test.beforeEach(async () => {
        (0, DataStore_1.clearWorkerDataStore)();
    });
    test_1.test.afterEach(async () => {
        await (0, TestCleanupHelper_1.cleanupClient1FactFinds)();
        await currentSetup?.testBase.cleanup();
        currentSetup = undefined;
    });
    (0, test_1.test)('Abandon Fact Find - creates Core Fact Find', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeFactFindTab(browser);
        const setup = currentSetup;
        // Act
        const factFindType = await setup.testBase.factFindSteps.executeCreateFactFind('Core Fact Find');
        // Assert
        (0, test_1.expect)(factFindType).toBe('Core Fact Find');
    });
    (0, test_1.test)('Abandon Fact Find - abandons first row Fact Find', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeCreatedCoreFactFind(browser);
        const setup = currentSetup;
        // Act
        await setup.testBase.factFindSteps.executeAbandonFirstRowFactFind();
        // Assert
        await setup.testBase.factFindSteps.verifyFirstRowLaunchFactFindNotAvailable();
    });
    (0, test_1.test)('Abandon Fact Find - verifies abandoned Fact Find cannot be launched', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeAbandonedCoreFactFind(browser);
        const setup = currentSetup;
        // Act
        await setup.testBase.factFindSteps.verifyFirstRowLaunchFactFindNotAvailable();
        // Assert
        await setup.testBase.factFindSteps.executeVerifySystemResponseForFirstRowAbandonedFactFind();
    });
    (0, test_1.test)('Abandon Fact Find - verifies abandonment status persists after reload', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeAbandonedCoreFactFind(browser);
        const setup = currentSetup;
        // Act
        await setup.testBase.factFindSteps.executeVerifyFirstRowAbandonmentStatusMaintained();
        // Assert
        await setup.testBase.factFindSteps.verifyFirstRowLaunchFactFindNotAvailable();
    });
    (0, test_1.test)('Abandon Fact Find - verifies system response for abandoned Fact Find', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeAbandonedCoreFactFind(browser);
        const setup = currentSetup;
        // Act
        await setup.testBase.factFindSteps.executeVerifySystemResponseForFirstRowAbandonedFactFind();
        // Assert
        await setup.testBase.factFindSteps.verifyFirstRowLaunchFactFindNotAvailable();
    });
});
//# sourceMappingURL=abandon_fact_find.smoke.spec.js.map