// projects/gateway-ui/tests/smoke/abandoned_fact_find_note.smoke.spec.ts
import { Browser, test } from '@playwright/test';
import { clearWorkerDataStore } from '@framework/utils/DataStore';
import { cleanupClient1FactFinds } from '@framework/utils/TestCleanupHelper';
import BaseTest from '../shared/TestUtils';

type AbandonedFactFindNoteSetup = {
  testBase: Awaited<ReturnType<typeof BaseTest.create>>;
};

async function arrangeAbandonedCoreFactFind(
  browser: Browser
): Promise<AbandonedFactFindNoteSetup> {
  const testBase = await BaseTest.create(browser, 'qa');

  await testBase.factFindSteps.createAndAbandonFactFind(
    testBase.sideNav,
    testBase.navBar,
    'Core Fact Find'
  );

  return { testBase };
}

async function arrangeAbandonedCoreFactFindWithNote(
  browser: Browser
): Promise<AbandonedFactFindNoteSetup> {
  const setup = await arrangeAbandonedCoreFactFind(browser);
  await setup.testBase.factFindSteps.executeAddNoteToAbandonedFactFind();
  return setup;
}

test.describe('Verify a note can be added to an abandoned KYC Fact Find', () => {
  let currentSetup: AbandonedFactFindNoteSetup | undefined;

  test.beforeEach(async () => {
    clearWorkerDataStore();
  });

  test.afterEach(async () => {
    await cleanupClient1FactFinds();
    await currentSetup?.testBase.cleanup();
    currentSetup = undefined;
  });

  test('Abandoned Fact Find Note - verifies add note action is available', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeAbandonedCoreFactFind(browser);
    const setup = currentSetup;

    // Act
    await setup.testBase.factFindSteps.verifyFirstRowAddNoteButtonIsVisible();

    // Assert
    await setup.testBase.factFindSteps.verifyFirstRowLaunchFactFindNotAvailable();
  });

  test('Abandoned Fact Find Note - verifies note column is blank after abandon', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeAbandonedCoreFactFind(browser);
    const setup = currentSetup;

    // Act
    await setup.testBase.factFindSteps.verifyFactFindHistoryHasNoNoteHeader();

    // Assert
    await setup.testBase.factFindSteps.verifyFirstRowAddNoteButtonIsVisible();
  });

  test('Abandoned Fact Find Note - adds note to abandoned Fact Find', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeAbandonedCoreFactFind(browser);
    const setup = currentSetup;
    await setup.testBase.factFindSteps.verifyFirstRowAddNoteButtonIsVisible();

    // Act
    await setup.testBase.factFindSteps.executeAddNoteToAbandonedFactFind();

    // Assert
    await setup.testBase.factFindSteps.executeVerifyNoteSavedAgainstAbandonedFactFind();
  });

  test('Abandoned Fact Find Note - verifies note persists after reload', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeAbandonedCoreFactFindWithNote(browser);
    const setup = currentSetup;

    // Act
    await setup.testBase.factFindSteps.executeVerifyNoteSavedAgainstAbandonedFactFind();

    // Assert
    await setup.testBase.factFindSteps.verifyFirstRowLaunchFactFindNotAvailable();
  });

  test('Abandoned Fact Find Note - edits note on abandoned Fact Find', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeAbandonedCoreFactFindWithNote(browser);
    const setup = currentSetup;

    // Act
    await setup.testBase.factFindSteps.executeEditNoteOnAbandonedFactFind();

    // Assert
    await setup.testBase.factFindSteps.verifyFirstRowLaunchFactFindNotAvailable();
  });

  test('Abandoned Fact Find Note - verifies updated note persists after reload', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeAbandonedCoreFactFindWithNote(browser);
    const setup = currentSetup;

    // Act
    await setup.testBase.factFindSteps.executeVerifyUpdatedNoteSavedAndPersisted();

    // Assert
    await setup.testBase.factFindSteps.verifyFirstRowLaunchFactFindNotAvailable();
  });
});
