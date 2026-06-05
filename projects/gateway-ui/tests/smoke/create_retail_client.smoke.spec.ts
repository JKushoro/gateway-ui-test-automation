// projects/gateway-ui/tests/smoke/create_retail_client.smoke.spec.ts
import { expect, test } from '@playwright/test';
import { clearWorkerDataStore } from '@framework/utils/DataStore';
import { ClientsSearchSteps } from '@steps/gateway/ClientsSearchSteps';
import { RetailClientCreationSteps } from '@steps/gateway/RetailClientCreationSteps';
import type { RetailClientFormResult } from '@steps/gateway/fact_find/types/RetailClientCreation.types';
import type { GatewaySearchFormData } from '@steps/components/Forms';
import BaseTest from '../shared/TestUtils';

test.describe.serial('Create a Retail Client', () => {
  let testBase: BaseTest;
  let clientSteps: RetailClientCreationSteps;
  let searchSteps: ClientsSearchSteps;
  let retailClient: RetailClientFormResult;
  let searchData: GatewaySearchFormData;
  let clientFound = false;

  test.afterAll(async () => {
    await testBase?.cleanup();
  });

  test('Arrange - clear shared worker data before creating a retail client', async () => {
    test.setTimeout(300_000);

    // Arrange
    const clearDataStore = true;

    // Act
    clearWorkerDataStore();

    // Assert
    expect(clearDataStore).toBe(true);
  });

  test('Arrange - create an authenticated Gateway session for QA', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    const environment = 'qa';

    // Act
    testBase = await BaseTest.create(browser, environment);
    clientSteps = new RetailClientCreationSteps(testBase.page);
    searchSteps = new ClientsSearchSteps(testBase.page);

    // Assert
    expect(testBase.page.isClosed()).toBe(false);
    expect(clientSteps).toBeDefined();
    expect(searchSteps).toBeDefined();
    expect(testBase.sideNav).toBeDefined();
  });

  test('Arrange - navigate to the Add Retail Client page', async () => {
    test.setTimeout(300_000);

    // Arrange
    expect(clientSteps).toBeDefined();

    // Act
    await clientSteps.executeNavigateToAddClient(testBase.sideNav);

    // Assert
    await clientSteps.verifyClientPage();
  });

  test('Arrange - complete the retail client form fields', async () => {
    test.setTimeout(300_000);

    // Arrange
    expect(clientSteps).toBeDefined();

    // Act
    retailClient = await clientSteps.completeRetailClientForm();

    // Assert
    expect(retailClient).toBeDefined();
  });

  test('Assert - verify required retail client identity details were generated', async () => {
    test.setTimeout(300_000);

    // Arrange
    expect(retailClient).toBeDefined();

    // Act
    const requiredClientDetails = [
      retailClient.adviserLabel,
      retailClient.title,
      retailClient.forename,
      retailClient.surname,
      retailClient.sourceOfEnquiry,
      retailClient.dob,
    ];

    // Assert
    for (const requiredClientDetail of requiredClientDetails) {
      expect(requiredClientDetail).toBeTruthy();
    }
  });

  test('Act - save the completed retail client form', async () => {
    test.setTimeout(300_000);

    // Arrange
    expect(clientSteps).toBeDefined();
    expect(retailClient).toBeDefined();

    // Act
    retailClient = (await clientSteps.saveRetailClientDetails(retailClient)) ?? retailClient;

    // Assert
    await clientSteps.verifyClientDetailsPage();
  });

  test('Assert - verify the saved retail client details page is open', async () => {
    test.setTimeout(300_000);

    // Arrange
    expect(clientSteps).toBeDefined();

    // Act
    await clientSteps.verifyClientDetailsPage();

    // Assert
    expect(testBase.page.url()).toContain('/clientfiles/details/');
  });

  test('Arrange - return from client details before searching clients', async () => {
    test.setTimeout(300_000);

    // Arrange
    expect(searchSteps).toBeDefined();

    // Act
    await searchSteps.navigateToDashboardFromClientDetailsPage();

    // Assert
    expect(testBase.page.url()).not.toContain('/clientfiles/details/');
  });

  test('Arrange - navigate to the Search Clients page', async () => {
    test.setTimeout(300_000);

    // Arrange
    expect(searchSteps).toBeDefined();

    // Act
    await searchSteps.navigateToSearchClientsPage();

    // Assert
    await searchSteps.verifySearchClientPage();
  });

  test('Act - populate Search Clients with the stored retail client details', async () => {
    test.setTimeout(300_000);

    // Arrange
    expect(searchSteps).toBeDefined();
    expect(retailClient.forename).toBeTruthy();
    expect(retailClient.surname).toBeTruthy();

    // Act
    searchData = await searchSteps.searchForStoredIndividualClientDetails();

    // Assert
    expect(searchData.forename).toBe(retailClient.forename);
    expect(searchData.surname).toBe(retailClient.surname);
  });

  test('Act - submit the Search Clients request', async () => {
    test.setTimeout(300_000);

    // Arrange
    expect(searchData).toBeDefined();

    // Act
    await searchSteps.searchClients();

    // Assert
    expect(searchData.forename).toBeTruthy();
    expect(searchData.surname).toBeTruthy();
  });

  test('Act - open the matching retail client from search results', async () => {
    test.setTimeout(300_000);

    // Arrange
    expect(searchSteps).toBeDefined();

    // Act
    clientFound = await searchSteps.openStoredIndividualClientSearchResult();

    // Assert
    expect(clientFound).toBe(true);
  });

  test('Assert - verify the searched retail client details page is open', async () => {
    test.setTimeout(300_000);

    // Arrange
    expect(clientFound).toBe(true);

    // Act
    await searchSteps.verifyClientDetailsPageIsOpen();

    // Assert
    expect(testBase.page.url()).toContain('/clientfiles/details/');
  });
});
