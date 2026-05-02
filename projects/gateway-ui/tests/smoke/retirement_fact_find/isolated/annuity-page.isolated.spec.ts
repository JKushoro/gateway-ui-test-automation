import { test } from '@playwright/test';
import { KycAnnuityPageSteps } from '@steps/kyc/retirement/KycAnnuityPageSteps';
import { setupIsolatedTest } from '@tests/shared/IsolatedTestManager';
import BaseTest from '@tests/shared/TestUtils';
import { ActionHelper } from '@framework/helpers/ActionHelper';

setupIsolatedTest('Retirement Fact Find - Annuity Page (Isolated)', () => {
  test('Annuity page - complete annuity details (direct focus)', async ({ browser }) => {
    test.setTimeout(300_000);

    const testBase = await BaseTest.create(browser, 'qa');

    await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
      testBase.sideNav,
      testBase.navBar
    );

    const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Retirement Fact Find');

    // Navigate to Annuity page
    const actionHelper = new ActionHelper(kycPage);
    await actionHelper.selectCustomRadioOptionByLabel('Annuity');

    // Complete the Annuity page
    const kycSteps = new KycAnnuityPageSteps(kycPage);
    await kycSteps.completeKYCAnnuity();

    await kycPage.close();
    await testBase.cleanup();
  });
});