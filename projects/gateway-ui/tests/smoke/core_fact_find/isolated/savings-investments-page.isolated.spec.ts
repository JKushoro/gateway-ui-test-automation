import { test } from '@playwright/test';
import { KycSavingsAndInvestmentsPageSteps } from '@steps/kyc/core/KycSavingsAndInvestmentsPageSteps';
import { setupIsolatedTest } from '@tests/shared/IsolatedTestManager';
import BaseTest from '@tests/shared/TestUtils';
import { ActionHelper } from '@framework/helpers/ActionHelper';

setupIsolatedTest('Core Fact Find - Savings & Investments Page (Isolated)', () => {
  test('Savings & Investments page - complete details (direct focus)', async ({ browser }) => {
    test.setTimeout(300_000);

    const testBase = await BaseTest.create(browser, 'qa');

    await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
      testBase.sideNav,
      testBase.navBar
    );

    const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');

    // Navigate to Savings & Investments page
    const actionHelper = new ActionHelper(kycPage);
    await actionHelper.selectCustomRadioOptionByLabel('Savings & Investments');

    // Complete the Savings & Investments page
    const kycSteps = new KycSavingsAndInvestmentsPageSteps(kycPage);
    await kycSteps.completeKYC_SavingsAndInvestments();

    await kycPage.close();
    await testBase.cleanup();
  });
});