import { test } from '@playwright/test';
import { KycCurrentSituationPageSteps } from '@steps/kyc/core/KycCurrentSituationPageSteps';
import { setupIsolatedTest } from '@tests/shared/IsolatedTestManager';
import BaseTest from '@tests/shared/TestUtils';
import { ActionHelper } from '@framework/helpers/ActionHelper';

setupIsolatedTest('Core Fact Find - Current Situation Page (Isolated)', () => {
  test('Current Situation page - complete current situation details (direct focus)', async ({ browser }) => {
    test.setTimeout(300_000);

    const testBase = await BaseTest.create(browser, 'qa');

    await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
      testBase.sideNav,
      testBase.navBar
    );

    const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');

    // Navigate to Current Situation page
    const actionHelper = new ActionHelper(kycPage);
    await actionHelper.selectCustomRadioOptionByLabel('Current Situation');

    // Complete the Current Situation page
    const kycSteps = new KycCurrentSituationPageSteps(kycPage);
    await kycSteps.completeKYCCurrentSituation();

    await kycPage.close();
    await testBase.cleanup();
  });
});
