import { test } from '@playwright/test';
import { KycLiabilitiesAndExpendituresPageSteps } from '@steps/kyc/core/KycLiabilitiesAndExpendituresPageSteps';
import { setupIsolatedTest } from '@tests/shared/IsolatedTestManager';
import BaseTest from '@tests/shared/TestUtils';
import { ActionHelper } from '@framework/helpers/ActionHelper';

setupIsolatedTest('Core Fact Find - Liabilities & Expenditures Page (Isolated)', () => {
  test('Liabilities & Expenditures page - complete details (direct focus)', async ({ browser }) => {
    test.setTimeout(300_000);

    const testBase = await BaseTest.create(browser, 'qa');

    await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
      testBase.sideNav,
      testBase.navBar
    );

    const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');

    // Navigate to Liabilities & Expenditures page
    const actionHelper = new ActionHelper(kycPage);
    await actionHelper.selectCustomRadioOptionByLabel('Liabilities & Expenditures');

    // Complete the Liabilities & Expenditures page
    const kycSteps = new KycLiabilitiesAndExpendituresPageSteps(kycPage);
    await kycSteps.completeKYC_LiabilitiesAndExpenditures();

    await kycPage.close();
    await testBase.cleanup();
  });
});
