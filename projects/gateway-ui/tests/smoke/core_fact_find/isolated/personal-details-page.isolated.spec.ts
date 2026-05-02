import { test } from '@playwright/test';
import { KycPersonalDetailsPageSteps } from '@steps/kyc/core/KycPersonalDetailsPageSteps';
import { setupIsolatedTest } from '@tests/shared/IsolatedTestManager';
import BaseTest from '@tests/shared/TestUtils';
import { ActionHelper } from '@framework/helpers/ActionHelper';

setupIsolatedTest('Core Fact Find - Personal Details Page (Isolated)', () => {
  test('Personal Details page - complete personal details (direct focus)', async ({ browser }) => {
    test.setTimeout(300_000);

    const testBase = await BaseTest.create(browser, 'qa');

    await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
      testBase.sideNav,
      testBase.navBar
    );

    const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');

    // Navigate to Personal Details page
    const actionHelper = new ActionHelper(kycPage);
    await actionHelper.selectCustomRadioOptionByLabel('Personal Details');

    // Complete the Personal Details page
    const kycSteps = new KycPersonalDetailsPageSteps(kycPage);
    await kycSteps.completeKYCPersonalDetails();

    await kycPage.close();
    await testBase.cleanup();
  });
});
