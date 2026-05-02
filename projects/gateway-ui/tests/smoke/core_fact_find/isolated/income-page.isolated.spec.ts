import { test } from '@playwright/test';
import { KycIncomePageSteps } from '@steps/kyc/core/KycIncomePageSteps';
import { setupIsolatedTest } from '@tests/shared/IsolatedTestManager';
import BaseTest from '@tests/shared/TestUtils';
import { ActionHelper } from '@framework/helpers/ActionHelper';

setupIsolatedTest('Core Fact Find - Income Page (Isolated)', () => {
  test('Income page - complete income details (direct focus)', async ({ browser }) => {
    test.setTimeout(300_000);

    const testBase = await BaseTest.create(browser, 'qa');

    await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
      testBase.sideNav,
      testBase.navBar
    );

    const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');

    // Navigate to Income page
    const actionHelper = new ActionHelper(kycPage);
    await actionHelper.selectCustomRadioOptionByLabel('Income');

    // Complete the Income page
    const kycSteps = new KycIncomePageSteps(kycPage);
    await kycSteps.completeKYC_Income();

    await kycPage.close();
    await testBase.cleanup();
  });
});