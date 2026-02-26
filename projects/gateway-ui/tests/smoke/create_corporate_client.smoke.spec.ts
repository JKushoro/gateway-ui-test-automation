//projects/gateway-ui/tests/smoke/create_corporate_client.smoke.spec.ts
import { test, Page } from '@playwright/test';
import { GatewaySetup } from '@setup/GatewaySetup';
import { SideNavService } from '@steps/components/SideNav';
import { AddCorporateClientSteps } from '@steps/clients/CorporateClientCreationSteps';
import { ClientsSearchSteps } from '@steps/clients/ClientsSearchSteps';
import { ClientFilesSteps } from '@steps/clients/ClientFilesSteps';

test.describe('Create Corporate Client', () => {
  let page: Page;
  let sideNav: SideNavService;
  let clientSteps: AddCorporateClientSteps;
  let searchSteps: ClientsSearchSteps;
  let clientFilesSteps: ClientFilesSteps;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await GatewaySetup.setupForEnvironment(page, 'qa');

    // Initialize services once - eliminates duplication
    sideNav = new SideNavService(page);
    clientSteps = new AddCorporateClientSteps(page);
    searchSteps = new ClientsSearchSteps(page);
    clientFilesSteps = new ClientFilesSteps(page);
  });

  test('Navigate to Add Corporate Client page', async () => {
    await clientSteps.executeNavigateToAddCorporateClient(sideNav);
  });

  test('Create complete Corporate Client', async () => {
    await clientSteps.executeCompleteClientCreation();
  });

  test('Search for created client and verify company name matches', async () => {
    await searchSteps.executeSearchAndVerifyStoredClient();
  });

  test('Verify all stored client data matches client details page', async () => {
    await clientFilesSteps.executeStoredClientDataVerification();
  });

  test.afterAll(async () => {
    await page?.close();
  });
});