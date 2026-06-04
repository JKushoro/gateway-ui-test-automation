import { Browser, expect, Page, test } from '@playwright/test';
import { clearWorkerDataStore } from '@framework/utils/DataStore';
import { cleanupClient1FactFinds } from '@framework/utils/TestCleanupHelper';
import { GatewayManagementSteps } from '@steps/gateway/GatewayManagementSteps';
import { KycAnnuityPageSteps } from '@steps/kyc/retirement/KycAnnuityPageSteps';
import { KycContributionsAndProtectionSteps } from '@steps/kyc/retirement/KycContributionsAndProtectionSteps';
import { KycFuturePlanningPageSteps } from '@steps/kyc/retirement/KycFuturePlanningPageSteps';
import { KycKycLifeEventsAndBenefitsPageSteps } from '@steps/kyc/retirement/KycLifeEventsAndBenefitsPageSteps';
import { KycPurposePageSteps } from '@steps/kyc/retirement/KycPurposePageSteps';
import BaseTest from '@tests/shared/TestUtils';

type RetirementFactFindSetup = {
  testBase: Awaited<ReturnType<typeof BaseTest.create>>;
  gatewayFactFindSteps: GatewayManagementSteps;
  kycPage?: Page;
};

type RetirementKycSteps = {
  purpose: KycPurposePageSteps;
  contributions: KycContributionsAndProtectionSteps;
  futurePlanning: KycFuturePlanningPageSteps;
  lifeEvents: KycKycLifeEventsAndBenefitsPageSteps;
  annuity: KycAnnuityPageSteps;
};

async function arrangeRetirementFactFind(browser: Browser): Promise<RetirementFactFindSetup> {
  const testBase = await BaseTest.create(browser, 'qa');

  await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
    testBase.sideNav,
    testBase.navBar
  );

  return {
    testBase,
    gatewayFactFindSteps: new GatewayManagementSteps(testBase.page),
  };
}

async function launchRetirementFactFind(setup: RetirementFactFindSetup): Promise<Page> {
  const kycPage = await setup.testBase.factFindSteps.createAndLaunchNewFactFind(
    'Retirement Fact Find'
  );

  setup.kycPage = kycPage;
  await expect(kycPage, 'KYC page should be loaded with correct title').toHaveTitle('Fairstone');

  return kycPage;
}

function createRetirementKycSteps(kycPage: Page): RetirementKycSteps {
  return {
    purpose: new KycPurposePageSteps(kycPage),
    contributions: new KycContributionsAndProtectionSteps(kycPage),
    futurePlanning: new KycFuturePlanningPageSteps(kycPage),
    lifeEvents: new KycKycLifeEventsAndBenefitsPageSteps(kycPage),
    annuity: new KycAnnuityPageSteps(kycPage),
  };
}

async function completeRetirementKycWorkflow(kycSteps: RetirementKycSteps): Promise<void> {
  await kycSteps.purpose.completeKYCPurpose();
  await kycSteps.contributions.completeKycContributionsAllowancesAndProtection();
  await kycSteps.futurePlanning.completeKYCKycFuturePlanning();
  await kycSteps.lifeEvents.completeKYCKycLifeEventsAndBenefits();
  await kycSteps.annuity.completeKYCAnnuity();
}

async function cleanupRetirementFactFind(setup?: RetirementFactFindSetup): Promise<void> {
  await setup?.kycPage?.close();
  await cleanupClient1FactFinds();
  await setup?.testBase.cleanup();
}

test.describe('Create Retirement Fact Find', () => {
  let currentSetup: RetirementFactFindSetup | undefined;

  test.beforeEach(async () => {
    clearWorkerDataStore();
  });

  test.afterEach(async () => {
    await cleanupRetirementFactFind(currentSetup);
    currentSetup = undefined;
  });

  test('Complete Retirement fact find creation workflow', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeRetirementFactFind(browser);
    const kycPage = await launchRetirementFactFind(currentSetup);
    const kycSteps = createRetirementKycSteps(kycPage);

    // Act
    await completeRetirementKycWorkflow(kycSteps);

    // Assert
    await currentSetup.gatewayFactFindSteps.verifyFirstFactFindStatusIsComplete();
  });
});
