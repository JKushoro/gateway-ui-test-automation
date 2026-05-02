import { test } from '@playwright/test';
import { KycFuturePlanningPageSteps } from '@steps/kyc/retirement/KycFuturePlanningPageSteps';
import { setupIsolatedTest } from '@tests/shared/IsolatedTestManager';
import BaseTest from '@tests/shared/TestUtils';
import { ActionHelper } from '@framework/helpers/ActionHelper';

setupIsolatedTest('Retirement Fact Find - Future Planning Page (Isolated)', () => {
  test('Future Planning page - complete details (direct focus)', async ({ browser }) => {
    test.setTimeout(300_000);

    const testBase = await BaseTest.create(browser, 'qa');

    await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
      testBase.sideNav,
      testBase.navBar
    );

    const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Retirement Fact Find');

    // Navigate to Future Planning page
    const actionHelper = new ActionHelper(kycPage);
    await actionHelper.selectCustomRadioOptionByLabel('Future Planning');

    // Complete the Future Planning page
    const kycSteps = new KycFuturePlanningPageSteps(kycPage);
    await kycSteps.completeKYCKycFuturePlanning();

    await kycPage.close();
    await testBase.cleanup();
  });
});