import { test } from '@playwright/test';
import { KycKycLifeEventsAndBenefitsPageSteps } from '@steps/kyc/retirement/KycLifeEventsAndBenefitsPageSteps';
import { setupIsolatedTest } from '@tests/shared/IsolatedTestManager';
import BaseTest from '@tests/shared/TestUtils';
import { ActionHelper } from '@framework/helpers/ActionHelper';

setupIsolatedTest('Retirement Fact Find - Life Events & Benefits Page (Isolated)', () => {
  test('Life Events & Benefits page - complete details (direct focus)', async ({ browser }) => {
    test.setTimeout(300_000);

    const testBase = await BaseTest.create(browser, 'qa');

    await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
      testBase.sideNav,
      testBase.navBar
    );

    const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Retirement Fact Find');

    // Navigate to Life Events & Benefits page
    const actionHelper = new ActionHelper(kycPage);
    await actionHelper.selectCustomRadioOptionByLabel('Life Events & Benefits');

    // Complete the Life Events & Benefits page
    const kycSteps = new KycKycLifeEventsAndBenefitsPageSteps(kycPage);
    await kycSteps.completeKYCKycLifeEventsAndBenefits();

    await kycPage.close();
    await testBase.cleanup();
  });
});