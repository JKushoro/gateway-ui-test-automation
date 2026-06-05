import { expect, Page, test } from '@playwright/test';
import { RetailClientCreationSteps } from '@steps/gateway/RetailClientCreationSteps';
import type { RetailClientFormResult } from '@steps/gateway/fact_find/types/RetailClientCreation.types';
import { setupIsolatedTest } from '@tests/shared/IsolatedTestManager';
import BaseTest from '@tests/shared/TestUtils';

setupIsolatedTest('Create Core Fact Find (Isolated)', () => {
  test.describe.serial('Retail client to Core Fact Find creation journey', () => {
    let testBase: BaseTest;
    let retailClientSteps: RetailClientCreationSteps;
    let retailClient: RetailClientFormResult;
    let kycPage: Page | undefined;
    let selectedFactFindType = 'Core Fact Find';
    let createClickedAt: Date;

    test.afterAll(async () => {
      if (kycPage && !kycPage.isClosed()) {
        await kycPage.close();
      }

      if (testBase) {
        await testBase.cleanup();
      }
    });

    test('Arrange - create an authenticated Gateway session for QA', async ({ browser }) => {
      test.setTimeout(300_000);

      // Arrange
      const environment = 'qa';

      // Act
      testBase = await BaseTest.create(browser, environment);
      retailClientSteps = new RetailClientCreationSteps(testBase.page);

      // Assert
      expect(testBase.page.isClosed()).toBe(false);
      expect(retailClientSteps).toBeDefined();
      expect(testBase.factFindSteps).toBeDefined();
      expect(testBase.sideNav).toBeDefined();
      expect(testBase.navBar).toBeDefined();
    });

    test('Arrange - navigate to the Add Retail Client page', async () => {
      test.setTimeout(300_000);

      // Arrange
      expect(testBase).toBeDefined();
      expect(retailClientSteps).toBeDefined();

      // Act
      await retailClientSteps.executeNavigateToAddClient(testBase.sideNav);

      // Assert
      await retailClientSteps.verifyClientPage();
    });

    test('Arrange - complete the retail client form fields', async () => {
      test.setTimeout(300_000);

      // Arrange
      expect(retailClientSteps).toBeDefined();

      // Act
      retailClient = await retailClientSteps.completeRetailClientForm();

      // Assert
      expect(retailClient.adviserLabel).toBeTruthy();
      expect(retailClient.title).toBeTruthy();
      expect(retailClient.forename).toBeTruthy();
      expect(retailClient.surname).toBeTruthy();
      expect(retailClient.sourceOfEnquiry).toBeTruthy();
      expect(retailClient.dob).toBeTruthy();
    });

    test('Act - save the retail client details', async () => {
      test.setTimeout(300_000);

      // Arrange
      expect(retailClientSteps).toBeDefined();
      expect(retailClient).toBeDefined();

      // Act
      await retailClientSteps.saveRetailClientDetails();

      // Assert
      await retailClientSteps.verifyClientDetailsPage();
    });

    test('Assert - verify the saved retail client details page is open', async () => {
      test.setTimeout(300_000);

      // Arrange
      expect(testBase).toBeDefined();

      // Act
      const currentUrl = testBase.page.url();

      // Assert
      expect(currentUrl).toContain('/clientfiles/details/');
    });

    test('Arrange - open the Fact Find tab for the retail client', async () => {
      test.setTimeout(300_000);

      // Arrange
      expect(testBase.navBar).toBeDefined();

      // Act
      await testBase.navBar.clickNavItem('Fact Find');

      // Assert
      await testBase.factFindSteps.waitForFactFindHistoryTable();
    });

    test('Act - select enable new fact find for the retail client', async () => {
      test.setTimeout(300_000);

      // Arrange
      expect(testBase).toBeDefined();

      // Act
      await testBase.factFindSteps.selectEnableNewFactFindCheckBox();

      // Assert
      await testBase.factFindSteps.verifyEnableNewFactFindCheckBoxIsSelected();
    });

    test('Act - confirm the retail client can be migrated for fact find', async () => {
      test.setTimeout(300_000);

      // Arrange
      expect(testBase).toBeDefined();

      // Act
      await testBase.factFindSteps.clickConfirmAndMigrateButton();

      // Assert
      await testBase.factFindSteps.verifyEnableClientForNewFactFindAlertIsVisible();
    });

    test('Act - accept the enable client confirmation alert', async () => {
      test.setTimeout(300_000);

      // Arrange
      expect(testBase).toBeDefined();

      // Act
      await testBase.factFindSteps.confirmEnableClientForNewFactFind();

      // Assert
      await testBase.factFindSteps.waitForFactFindHistoryTable();
    });

    test('Act - select Core Fact Find as the new fact find type', async () => {
      test.setTimeout(300_000);

      // Arrange
      const factFindType = 'Core Fact Find';

      // Act
      selectedFactFindType = await testBase.factFindSteps.chooseFactFindType(factFindType);

      // Assert
      expect(selectedFactFindType).toBe(factFindType);
    });

    test('Act - submit the Core Fact Find creation request', async () => {
      test.setTimeout(300_000);

      // Arrange
      expect(selectedFactFindType).toBe('Core Fact Find');

      // Act
      createClickedAt = new Date();
      await testBase.factFindSteps.clickFactFindButton();
      await testBase.factFindSteps.waitForFactFindHistoryTable();

      // Assert
      expect(createClickedAt).toBeInstanceOf(Date);
    });

    test('Assert - verify the Core Fact Find history row is open', async () => {
      test.setTimeout(300_000);

      // Arrange
      expect(createClickedAt).toBeDefined();
      expect(selectedFactFindType).toBe('Core Fact Find');

      // Act
      await testBase.factFindSteps.waitForFactFindHistoryTable();

      // Assert
      await testBase.factFindSteps.assertFactFindHistoryRow({
        expectedType: selectedFactFindType,
        expectedStatus: 'Open',
        createClickedAt,
      });
    });

    test('Assert - verify the created Core Fact Find can be launched', async () => {
      test.setTimeout(300_000);

      // Arrange
      expect(testBase).toBeDefined();

      // Act
      await testBase.factFindSteps.waitForFactFindHistoryTable();

      // Assert
      await testBase.factFindSteps.verifyFirstRowLaunchFactFindAvailable();
    });

    test('Act - launch the created Core Fact Find', async () => {
      test.setTimeout(300_000);

      // Arrange
      const popupPromise = testBase.page
        .context()
        .waitForEvent('page', { timeout: 10_000 })
        .catch(() => null);

      // Act
      await testBase.factFindSteps.clickLaunchFactFindButton();
      kycPage = (await popupPromise) ?? testBase.page;

      // Assert
      expect(kycPage).toBeDefined();
      expect(kycPage.isClosed()).toBe(false);
    });

    test('Assert - verify the Core Fact Find KYC page is loaded', async () => {
      test.setTimeout(300_000);

      // Arrange
      if (!kycPage) {
        throw new Error('KYC page was not created when the Core Fact Find was launched.');
      }

      // Act
      await testBase.factFindSteps.verifyKYCPage(kycPage);

      // Assert
      await expect(kycPage).toHaveTitle('Fairstone', { timeout: 180_000 });
    });
  });
});
