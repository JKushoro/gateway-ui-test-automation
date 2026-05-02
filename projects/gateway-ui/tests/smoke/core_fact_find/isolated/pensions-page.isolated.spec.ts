import { test } from '@playwright/test';
import { KycPensionsPageSteps } from '@steps/kyc/core/KycPensionsPageSteps';
import { setupIsolatedTest } from '@tests/shared/IsolatedTestManager';
import BaseTest from '@tests/shared/TestUtils';
import { ActionHelper } from '@framework/helpers/ActionHelper';

setupIsolatedTest('Core Fact Find - Pensions Page (Isolated)', () => {
  test('Pensions page - complete pension details (direct focus)', async ({ browser }) => {
    test.setTimeout(300_000);

    const testBase = await BaseTest.create(browser, 'qa');

    await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
      testBase.sideNav,
      testBase.navBar
    );

    const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');

    // Navigate to Pensions page
    const actionHelper = new ActionHelper(kycPage);
    await actionHelper.selectCustomRadioOptionByLabel('Pensions');

    // Complete the Pensions page
    const kycSteps = new KycPensionsPageSteps(kycPage);
    await kycSteps.completeKYC_Pensions();

    await kycPage.close();
    await testBase.cleanup();
  });
});
