import { test } from '@playwright/test';
import { setupIsolatedTest } from '@tests/shared/IsolatedTestManager';
import BaseTest from '@tests/shared/TestUtils';
import { KycFactFindDetailsPageSteps } from '@steps/kyc/core/KycFactFindDetailsPageSteps';

setupIsolatedTest('Core Fact Find - Fact Find Details Page (Isolated)', () => {
  test('Fact Find Details page - complete Fact Find details (direct focus)', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    const testBase = await BaseTest.create(browser, 'qa');

    await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
      testBase.sideNav,
      testBase.navBar
    );

    const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');

    // Complete the Fact Find Details page
    const kycSteps = new KycFactFindDetailsPageSteps(kycPage);
    await kycSteps.completeKYCFactFindDetails();

    await kycPage.close();
    await testBase.cleanup();
  });
});
