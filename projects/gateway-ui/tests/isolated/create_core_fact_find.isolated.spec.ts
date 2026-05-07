// import { test } from '@playwright/test';
// import { setupIsolatedTest } from '@tests/shared/IsolatedTestManager';
// import BaseTest from '@tests/shared/TestUtils';
// import { ActionHelper } from '@framework/helpers/ActionHelper';
//
// setupIsolatedTest('Create Core Fact Find (Isolated)', () => {
//   test('Create Core Fact Find - complete workflow', async ({ browser }) => {
//     test.setTimeout(300_000);
//
//     const testBase = await BaseTest.create(browser, 'qa');
//
//     await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
//       testBase.sideNav,
//       testBase.navBar
//     );
//
//     const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');
//
//     // Complete the Core Fact Find workflow
//     // This test focuses on the creation process itself
//
//     await kycPage.close();
//     await testBase.cleanup();
//   });
// });