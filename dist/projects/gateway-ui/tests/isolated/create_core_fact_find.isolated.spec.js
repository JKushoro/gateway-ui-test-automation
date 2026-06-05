"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const IsolatedTestManager_1 = require("@tests/shared/IsolatedTestManager");
const TestUtils_1 = __importDefault(require("@tests/shared/TestUtils"));
(0, IsolatedTestManager_1.setupIsolatedTest)('Create Core Fact Find (Isolated)', () => {
    test_1.test.describe.serial('Retail client to Core Fact Find creation journey', () => {
        let testBase;
        let kycPage;
        let selectedFactFindType = 'Core Fact Find';
        let createClickedAt;
        test_1.test.afterAll(async () => {
            if (kycPage && !kycPage.isClosed()) {
                await kycPage.close();
            }
            if (testBase) {
                await testBase.cleanup();
            }
        });
        (0, test_1.test)('Arrange - create an authenticated Gateway session for QA', async ({ browser }) => {
            test_1.test.setTimeout(300000);
            // Arrange
            const environment = 'qa';
            // Act
            testBase = await TestUtils_1.default.create(browser, environment);
            // Assert
            (0, test_1.expect)(testBase.page.isClosed()).toBe(false);
            (0, test_1.expect)(testBase.factFindSteps).toBeDefined();
            (0, test_1.expect)(testBase.sideNav).toBeDefined();
            (0, test_1.expect)(testBase.navBar).toBeDefined();
        });
        (0, test_1.test)('Arrange - create a retail client and open the Fact Find tab', async () => {
            test_1.test.setTimeout(300000);
            // Arrange
            (0, test_1.expect)(testBase).toBeDefined();
            // Act
            const retailClient = await testBase.factFindSteps.addClientAndNavigateToFactFindTab(testBase.sideNav, testBase.navBar);
            // Assert
            (0, test_1.expect)(retailClient).toBeDefined();
            await testBase.factFindSteps.waitForFactFindHistoryTable();
        });
        (0, test_1.test)('Act - enable the retail client for a new fact find', async () => {
            test_1.test.setTimeout(300000);
            // Arrange
            (0, test_1.expect)(testBase).toBeDefined();
            // Act
            await testBase.factFindSteps.selectEnableNewFactFindCheckBox();
            await testBase.factFindSteps.clickConfirmAndMigrateButton();
            await testBase.factFindSteps.confirmEnableClientForNewFactFind();
            // Assert
            await testBase.factFindSteps.waitForFactFindHistoryTable();
        });
        (0, test_1.test)('Act - select Core Fact Find as the new fact find type', async () => {
            test_1.test.setTimeout(300000);
            // Arrange
            const factFindType = 'Core Fact Find';
            // Act
            selectedFactFindType = await testBase.factFindSteps.chooseFactFindType(factFindType);
            // Assert
            (0, test_1.expect)(selectedFactFindType).toBe(factFindType);
        });
        (0, test_1.test)('Act - create an open Core Fact Find record for the retail client', async () => {
            test_1.test.setTimeout(300000);
            // Arrange
            (0, test_1.expect)(selectedFactFindType).toBe('Core Fact Find');
            // Act
            createClickedAt = new Date();
            await testBase.factFindSteps.clickFactFindButton();
            await testBase.factFindSteps.waitForFactFindHistoryTable();
            // Assert
            await testBase.factFindSteps.assertFactFindHistoryRow({
                expectedType: selectedFactFindType,
                expectedStatus: 'Open',
                createClickedAt,
            });
        });
        (0, test_1.test)('Assert - launch the created Core Fact Find into KYC', async () => {
            test_1.test.setTimeout(300000);
            // Arrange
            const popupPromise = testBase.page
                .context()
                .waitForEvent('page', { timeout: 10000 })
                .catch(() => null);
            // Act
            await testBase.factFindSteps.clickLaunchFactFindButton();
            kycPage = (await popupPromise) ?? testBase.page;
            // Assert
            await testBase.factFindSteps.verifyKYCPage(kycPage);
        });
    });
});
//# sourceMappingURL=create_core_fact_find.isolated.spec.js.map