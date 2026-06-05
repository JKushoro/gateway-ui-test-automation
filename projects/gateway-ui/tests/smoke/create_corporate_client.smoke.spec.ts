// projects/gateway-ui/tests/smoke/create_corporate_client.smoke.spec.ts
import { expect, test } from '@playwright/test';
import { clearWorkerDataStore } from '@framework/utils/DataStore';
import { AddCorporateClientSteps } from '@steps/clients/CorporateClientCreationSteps';
import type { CorporateClientFormResult } from '@steps/clients/CorporateClientCreationSteps';
import { ClientFilesSteps } from '@steps/clients/ClientFilesSteps';
import { ClientsSearchSteps } from '@steps/clients/ClientsSearchSteps';
import type { GatewaySearchFormData } from '@steps/components/Forms';
import BaseTest from '../shared/TestUtils';

test.describe.serial('Create Corporate Client', () => {
  let testBase: BaseTest;
  let clientSteps: AddCorporateClientSteps;
  let searchSteps: ClientsSearchSteps;
  let clientFilesSteps: ClientFilesSteps;
  let corporateClient: CorporateClientFormResult;
  let selectedAddress: string;
  let searchData: GatewaySearchFormData;
  let clientFound = false;

  test.afterAll(async () => {
    await testBase?.cleanup();
  });

  test('Arrange - clear shared worker data before creating a corporate client', async () => {
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
    clientSteps = new AddCorporateClientSteps(testBase.page);
    searchSteps = new ClientsSearchSteps(testBase.page);
    clientFilesSteps = new ClientFilesSteps(testBase.page);

    // Assert
    expect(testBase.page.isClosed()).toBe(false);
    expect(clientSteps).toBeDefined();
    expect(searchSteps).toBeDefined();
    expect(clientFilesSteps).toBeDefined();
    expect(testBase.sideNav).toBeDefined();
  });

  test('Arrange - navigate to the Add Corporate Client page', async () => {
    test.setTimeout(300_000);

    // Arrange
    expect(clientSteps).toBeDefined();

    // Act
    await clientSteps.executeNavigateToAddCorporateClient(testBase.sideNav);

    // Assert
    await clientSteps.verifyCorporateClientPage();
  });

  test('Arrange - complete the corporate client form fields', async () => {
    test.setTimeout(300_000);

    // Arrange
    expect(clientSteps).toBeDefined();

    // Act
    corporateClient = await clientSteps.fillCorporateClientForm();

    // Assert
    expect(corporateClient).toBeDefined();
  });

  test('Assert - verify required corporate client details were generated', async () => {
    test.setTimeout(300_000);

    // Arrange
    expect(corporateClient).toBeDefined();

    // Act
    const requiredCorporateClientDetails = [
      corporateClient.companyName,
      corporateClient.emailAddress,
      corporateClient.phone,
      corporateClient.contactForename,
      corporateClient.contactSurname,
    ];

    // Assert
    for (const requiredCorporateClientDetail of requiredCorporateClientDetails) {
      expect(requiredCorporateClientDetail).toBeTruthy();
    }
  });

  test('Act - complete postcode lookup for the corporate client address', async () => {
    test.setTimeout(300_000);

    // Arrange
    expect(clientSteps).toBeDefined();

    // Act
    selectedAddress = await clientSteps.performCorporatePostcodeLookup();

    // Assert
    expect(selectedAddress).toBeTruthy();
  });

  test('Act - submit the corporate client creation request', async () => {
    test.setTimeout(300_000);

    // Arrange
    expect(corporateClient.companyName).toBeTruthy();
    expect(selectedAddress).toBeTruthy();

    // Act
    await clientSteps.submitForm();

    // Assert
    expect(corporateClient.companyName).toBeTruthy();
  });

  test('Act - accept the corporate client creation success alert', async () => {
    test.setTimeout(300_000);

    // Arrange
    expect(clientSteps).toBeDefined();

    // Act
    await clientSteps.confirmCorporateClientCreation();

    // Assert
    expect(corporateClient.companyName).toBeTruthy();
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

  test('Act - populate Search Clients with the stored corporate client details', async () => {
    test.setTimeout(300_000);

    // Arrange
    expect(searchSteps).toBeDefined();
    expect(corporateClient.companyName).toBeTruthy();

    // Act
    searchData = await searchSteps.searchForStoredCompanyClientDetails();

    // Assert
    expect(searchData.company).toBe(corporateClient.companyName);
  });

  test('Act - submit the Search Clients request', async () => {
    test.setTimeout(300_000);

    // Arrange
    expect(searchData).toBeDefined();

    // Act
    await searchSteps.searchClients();

    // Assert
    expect(searchData.company).toBeTruthy();
  });

  test('Act - open the matching corporate client from search results', async () => {
    test.setTimeout(300_000);

    // Arrange
    expect(searchSteps).toBeDefined();

    // Act
    clientFound = await searchSteps.openStoredCompanyClientSearchResult();

    // Assert
    expect(clientFound).toBe(true);
  });

  test('Assert - verify the searched corporate client details page is open', async () => {
    test.setTimeout(300_000);

    // Arrange
    expect(clientFound).toBe(true);

    // Act
    await clientFilesSteps.verifyClientFilesPage();

    // Assert
    expect(testBase.page.url()).toContain('/clientfiles/details/');
  });

  test('Assert - verify stored corporate client data matches the details page', async () => {
    test.setTimeout(300_000);

    // Arrange
    await clientFilesSteps.verifyClientFilesPage();

    // Act
    await clientFilesSteps.assertStoredClientDataMatches();

    // Assert
    expect(clientFound).toBe(true);
  });
});
