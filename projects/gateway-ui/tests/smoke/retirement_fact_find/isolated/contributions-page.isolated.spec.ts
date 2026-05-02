import { test } from '@playwright/test';
import { KycContributionsAndProtectionSteps } from '@steps/kyc/retirement/KycContributionsAndProtectionSteps';
import { setupIsolatedTest } from '@tests/shared/IsolatedTestManager';
import BaseTest from '@tests/shared/TestUtils';
import { ActionHelper } from '@framework/helpers/ActionHelper';

setupIsolatedTest('Retirement Fact Find - Contributions Page (Isolated)', () => {
  test('Contributions page - complete contributions details', async ({ browser }) => {
    test.setTimeout(300_000);

    const testBase = await BaseTest.create(browser, 'qa');

    await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
      testBase.sideNav,
      testBase.navBar
    );

    const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Retirement Fact Find');

    // Navigate to Contributions & Protection page
    const actionHelper = new ActionHelper(kycPage);
    await actionHelper.selectCustomRadioOptionByLabel('Contributions & Protection');

    // Complete the Contributions & Protection page
    const kycSteps = new KycContributionsAndProtectionSteps(kycPage);
    await kycSteps.completeKycContributionsAllowancesAndProtection();

    await kycPage.close();
    await testBase.cleanup();
  });
});