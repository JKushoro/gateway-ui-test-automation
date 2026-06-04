// projects/gateway-ui/tests/smoke/abandoned_fact_find_name.smoke.spec.ts
import { Browser, test } from '@playwright/test';
import { clearWorkerDataStore } from '@framework/utils/DataStore';
import { cleanupClient1FactFinds } from '@framework/utils/TestCleanupHelper';
import BaseTest from '../shared/TestUtils';

type AbandonedFactFindNameSetup = {
  testBase: Awaited<ReturnType<typeof BaseTest.create>>;
};

async function arrangeAbandonedCoreFactFind(
  browser: Browser
): Promise<AbandonedFactFindNameSetup> {
  const testBase = await BaseTest.create(browser, 'qa');

  await testBase.factFindSteps.createAndAbandonFactFind(
    testBase.sideNav,
    testBase.navBar,
    'Core Fact Find'
  );

  return { testBase };
}

async function arrangeAbandonedCoreFactFindWithName(
  browser: Browser
): Promise<AbandonedFactFindNameSetup> {
  const setup = await arrangeAbandonedCoreFactFind(browser);
  await setup.testBase.factFindSteps.executeAddNameToAbandonedFactFind();
  return setup;
}

test.describe('Verify a name can be added to an abandoned KYC Fact Find', () => {
  let currentSetup: AbandonedFactFindNameSetup | undefined;

  test.beforeEach(async () => {
    clearWorkerDataStore();
  });

  test.afterEach(async () => {
    await cleanupClient1FactFinds();
    await currentSetup?.testBase.cleanup();
    currentSetup = undefined;
  });

  test('Abandoned Fact Find Name - verifies name is blank after abandon', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeAbandonedCoreFactFind(browser);
    const setup = currentSetup;

    // Act
    await setup.testBase.factFindSteps.verifyFirstRowNameIsBlank();

    // Assert
    await setup.testBase.factFindSteps.verifyFirstRowLaunchFactFindNotAvailable();
  });

  test('Abandoned Fact Find Name - adds name to abandoned Fact Find', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeAbandonedCoreFactFind(browser);
    const setup = currentSetup;
    await setup.testBase.factFindSteps.verifyFirstRowNameIsBlank();

    // Act
    await setup.testBase.factFindSteps.executeAddNameToAbandonedFactFind();

    // Assert
    await setup.testBase.factFindSteps.executeVerifyNameSavedAgainstAbandonedFactFind();
  });

  test('Abandoned Fact Find Name - verifies name persists after reload', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeAbandonedCoreFactFindWithName(browser);
    const setup = currentSetup;

    // Act
    await setup.testBase.factFindSteps.executeVerifyNameSavedAgainstAbandonedFactFind();

    // Assert
    await setup.testBase.factFindSteps.verifyFirstRowLaunchFactFindNotAvailable();
  });

  test('Abandoned Fact Find Name - edits name on abandoned Fact Find', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeAbandonedCoreFactFindWithName(browser);
    const setup = currentSetup;

    // Act
    await setup.testBase.factFindSteps.executeEditNameOnAbandonedFactFind();

    // Assert
    await setup.testBase.factFindSteps.verifyFirstRowLaunchFactFindNotAvailable();
  });

  test('Abandoned Fact Find Name - verifies updated name persists after reload', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeAbandonedCoreFactFindWithName(browser);
    const setup = currentSetup;

    // Act
    await setup.testBase.factFindSteps.executeVerifyUpdatedNameSavedAndPersisted();

    // Assert
    await setup.testBase.factFindSteps.verifyFirstRowLaunchFactFindNotAvailable();
  });
});
