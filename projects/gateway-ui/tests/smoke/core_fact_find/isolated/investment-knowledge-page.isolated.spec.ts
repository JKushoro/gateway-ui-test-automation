import { test } from '@playwright/test';
import { KycInvestmentKnowledgeAndPreferencesPageSteps } from '@steps/kyc/core/KycInvestmentKnowledgeAndPreferencesPageSteps';
import { setupIsolatedTest } from '@tests/shared/IsolatedTestManager';
import BaseTest from '@tests/shared/TestUtils';
import { ActionHelper } from '@framework/helpers/ActionHelper';

setupIsolatedTest('Core Fact Find - Investment Knowledge & Preferences Page (Isolated)', () => {
  test('Investment Knowledge & Preferences page - complete details (direct focus)', async ({ browser }) => {
    test.setTimeout(300_000);

    const testBase = await BaseTest.create(browser, 'qa');

    await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
      testBase.sideNav,
      testBase.navBar
    );

    const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');

    // Navigate to Investment Knowledge & Preferences page
    const actionHelper = new ActionHelper(kycPage);
    await actionHelper.selectCustomRadioOptionByLabel('Investment Knowledge & Preferences');

    // Complete the Investment Knowledge & Preferences page
    const kycSteps = new KycInvestmentKnowledgeAndPreferencesPageSteps(kycPage);
    await kycSteps.completeKYC_InvestmentKnowledgeAndPreferences();

    await kycPage.close();
    await testBase.cleanup();
  });
});
