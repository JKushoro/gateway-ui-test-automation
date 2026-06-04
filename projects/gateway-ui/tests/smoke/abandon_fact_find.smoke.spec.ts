// projects/gateway-ui/tests/smoke/abandon_fact_find.smoke.spec.ts
import { Browser, expect, test } from '@playwright/test';
import { clearWorkerDataStore } from '@framework/utils/DataStore';
import { cleanupClient1FactFinds } from '@framework/utils/TestCleanupHelper';
import BaseTest from '../shared/TestUtils';

type AbandonFactFindSetup = {
  testBase: Awaited<ReturnType<typeof BaseTest.create>>;
};

async function arrangeFactFindTab(browser: Browser): Promise<AbandonFactFindSetup> {
  const testBase = await BaseTest.create(browser, 'qa');

  await testBase.factFindSteps.executeAddClientAndNavigateToFactFindTab(
    testBase.sideNav,
    testBase.navBar
  );

  return { testBase };
}

async function arrangeCreatedCoreFactFind(browser: Browser): Promise<AbandonFactFindSetup> {
  const setup = await arrangeFactFindTab(browser);
  await setup.testBase.factFindSteps.executeCreateFactFind('Core Fact Find');
  return setup;
}

async function arrangeAbandonedCoreFactFind(browser: Browser): Promise<AbandonFactFindSetup> {
  const setup = await arrangeCreatedCoreFactFind(browser);
  await setup.testBase.factFindSteps.executeAbandonFirstRowFactFind();
  return setup;
}

test.describe('Abandon Fact Find', () => {
  let currentSetup: AbandonFactFindSetup | undefined;

  test.beforeEach(async () => {
    clearWorkerDataStore();
  });

  test.afterEach(async () => {
    await cleanupClient1FactFinds();
    await currentSetup?.testBase.cleanup();
    currentSetup = undefined;
  });

  test('Abandon Fact Find - creates Core Fact Find', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeFactFindTab(browser);
    const setup = currentSetup;

    // Act
    const factFindType = await setup.testBase.factFindSteps.executeCreateFactFind(
      'Core Fact Find'
    );

    // Assert
    expect(factFindType).toBe('Core Fact Find');
  });

  test('Abandon Fact Find - abandons first row Fact Find', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeCreatedCoreFactFind(browser);
    const setup = currentSetup;

    // Act
    await setup.testBase.factFindSteps.executeAbandonFirstRowFactFind();

    // Assert
    await setup.testBase.factFindSteps.verifyFirstRowLaunchFactFindNotAvailable();
  });

  test('Abandon Fact Find - verifies abandoned Fact Find cannot be launched', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeAbandonedCoreFactFind(browser);
    const setup = currentSetup;

    // Act
    await setup.testBase.factFindSteps.verifyFirstRowLaunchFactFindNotAvailable();

    // Assert
    await setup.testBase.factFindSteps.executeVerifySystemResponseForFirstRowAbandonedFactFind();
  });

  test('Abandon Fact Find - verifies abandonment status persists after reload', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeAbandonedCoreFactFind(browser);
    const setup = currentSetup;

    // Act
    await setup.testBase.factFindSteps.executeVerifyFirstRowAbandonmentStatusMaintained();

    // Assert
    await setup.testBase.factFindSteps.verifyFirstRowLaunchFactFindNotAvailable();
  });

  test('Abandon Fact Find - verifies system response for abandoned Fact Find', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeAbandonedCoreFactFind(browser);
    const setup = currentSetup;

    // Act
    await setup.testBase.factFindSteps.executeVerifySystemResponseForFirstRowAbandonedFactFind();

    // Assert
    await setup.testBase.factFindSteps.verifyFirstRowLaunchFactFindNotAvailable();
  });

});
