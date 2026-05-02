import { test } from '@playwright/test';
import { KycPurposePageSteps } from '@steps/kyc/retirement/KycPurposePageSteps';
import { setupIsolatedTest } from '@tests/shared/IsolatedTestManager';
import BaseTest from '@tests/shared/TestUtils';
import { ActionHelper } from '@framework/helpers/ActionHelper';

setupIsolatedTest('Retirement Fact Find - Purpose Page (Isolated)', () => {
  test('Purpose page - complete details', async ({ browser }) => {
    test.setTimeout(300_000);

    const testBase = await BaseTest.create(browser, 'qa');

    await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
      testBase.sideNav,
      testBase.navBar
    );

    const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Retirement Fact Find');

    // Navigate to Purpose page
    const actionHelper = new ActionHelper(kycPage);
    await actionHelper.selectCustomRadioOptionByLabel('Purpose');

    // Complete the Purpose page
    const kycSteps = new KycPurposePageSteps(kycPage);
    await kycSteps.completeKYCPurpose();

    await kycPage.close();
    await testBase.cleanup();
  });
});