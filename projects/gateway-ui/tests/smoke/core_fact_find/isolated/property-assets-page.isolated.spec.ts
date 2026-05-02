import { test } from '@playwright/test';
import { KycPropertyAndAssetsSteps } from '@steps/kyc/core/KycPropertyAndAssetsSteps';
import { setupIsolatedTest } from '@tests/shared/IsolatedTestManager';
import BaseTest from '@tests/shared/TestUtils';
import { ActionHelper } from '@framework/helpers/ActionHelper';

setupIsolatedTest('Core Fact Find - Property & Assets Page (Isolated)', () => {
  test('Property & Assets page - complete details (direct focus)', async ({ browser }) => {
    test.setTimeout(300_000);

    const testBase = await BaseTest.create(browser, 'qa');

    await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
      testBase.sideNav,
      testBase.navBar
    );

    const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');

    // Navigate to Property & Assets page
    const actionHelper = new ActionHelper(kycPage);
    await actionHelper.selectCustomRadioOptionByLabel('Property & Assets');

    // Complete the Property & Assets page
    const kycSteps = new KycPropertyAndAssetsSteps(kycPage);
    await kycSteps.completeKYC_PropertyAndAssets();

    await kycPage.close();
    await testBase.cleanup();
  });
});
