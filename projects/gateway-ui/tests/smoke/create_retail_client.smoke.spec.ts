//projects/gateway-ui/tests/smoke/create_retail_client.smoke.spec.ts
import { test, Page } from '@playwright/test';
import { GatewaySetup } from '@setup/GatewaySetup';
import { SideNavService } from '@steps/components/SideNav';
import { RetailClientCreationSteps } from '@steps/clients/RetailClientCreationSteps';
import { ClientsSearchSteps } from '@steps/clients/ClientsSearchSteps';

test.describe('Create a Retail Client', () => {
  let page: Page;
  let sideNav: SideNavService;
  let clientSteps: RetailClientCreationSteps;
  let searchSteps: ClientsSearchSteps;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await GatewaySetup.setupForEnvironment(page, 'qa');

    // Initialize services once - eliminates duplication
    sideNav = new SideNavService(page);
    clientSteps = new RetailClientCreationSteps(page);
    searchSteps = new ClientsSearchSteps(page);
  });

  test('Navigate to Add Client page', async () => {
    await clientSteps.executeNavigateToAddClient(sideNav);
  });

  test('Create complete Client', async () => {
    await clientSteps.createClient();
  });

  test('Search for created client and verify Forename and Surname matches', async () => {
    await searchSteps.executeSearchAndVerifyStoredIndividualClient();
  });

  test.afterAll(async () => {
    await page?.close();
  });
});