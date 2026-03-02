// projects/gateway-ui/steps/kyc_forms/KycInvestmentKnowledgeAndPreferencesPageSteps.ts
import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { expect, Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';
import { TextHelper } from '@framework/helpers/TextHelper';
import {
  KycInvestmentKnowledgeAndPreferencesPageLocators
} from '@pages/kycElementLocators/KycInvestmentKnowledgeAndPreferencesPageLocators';

/**
 * KycInvestmentKnowledgeAndPreferencesPageSteps
 * - Completes the "Investment Knowledge & Preferences" KYC page
 * - Avoids any class-level state (no sustainabilityAwarenessIsYes flag)
 * - Avoids custom union types (no TriBool)
 * - Uses returned boolean | undefined to drive conditional assertions
 */
export class KycInvestmentKnowledgeAndPreferencesPageSteps extends BaseKYCSteps {
  private locators: KycInvestmentKnowledgeAndPreferencesPageLocators;
  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
    this.locators = new KycInvestmentKnowledgeAndPreferencesPageLocators(page);
  }

  /* -------------------- Verification -------------------- */

  /**
   * Verify we are on the correct page and the main heading is correct.
   */
  public async verifyInvestmentKnowledgeAndPreferencesHeading(): Promise<void> {
    await this.assert.assertPageURLContains('page=investment-knowledge-and-preferences');

    await expect(this.heading).toBeVisible({ timeout: 15_000 });
    await expect(this.heading).toHaveText('Investment Knowledge & Preferences');
  }

  /* -------------------- Main Flow -------------------- */

  /**
   * Complete the entire Investment Knowledge & Preferences page
   * and verify the success screen.
   */
  public async completeKYC_InvestmentKnowledgeAndPreferences(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');

    await this.verifyInvestmentKnowledgeAndPreferencesHeading();
    await this.answerInvestmentKnowledgeAndPreferencesQuestions();
    await this.verifyFactFindCompleted();
  }

  /**
   * Answers all questions on the page, safely skipping those not shown.
   */
  private async answerInvestmentKnowledgeAndPreferencesQuestions(): Promise<void> {
    await this.answerInvestmentKnowledgeAndPreference('Yes');
    await this.answerClientClassification('Retail');
    await this.answerInvestmentExperience('Basic');
    await this.answerSustainabilityRequirements(
      'They require a solution that has an objective to invest in assets that are environmentally and/or socially sustainable'
    );

    // Key refactor: we return awareness answer (true/false) or undefined (question not shown)
    await this.answerSustainabilityAwareness('Yes - they are comfortable proceeding');

    // Assert the Responsible Investment Framework based on awareness (or skip if undefined)
    await this.assertResponsibleInvestmentFramework();

    await this.answerResponsibleInvestmentFramework('No');
    await this.answerFaithBasedRequirements('No');
    await this.answerNegativeScreens('Yes');
    await this.selectNegativeScreens();
    await this.answerSustainableInvestmentStatement();

    await this.action.clickButtonByText('Save and Submit');
  }

  /* -------------------- Questions -------------------- */

  /**
   * Q: Do you need to provide or update Investment Knowledge & Preference?
   */
  private async answerInvestmentKnowledgeAndPreference(value?: string): Promise<void> {
    const label = 'Do you need to provide or update your Investment Knowledge & Preference?';
    const locator = this.page.getByText(label, { exact: false });

    if ((await locator.count()) === 0) return;
    if (!value) throw new Error('answerInvestmentKnowledgeAndPreference requires a value');

    await expect(locator).toBeVisible();
    await this.action.setRadioByQuestion(label, value);

    this.logInfo(`✓ Answered investment knowledge & preference: ${value}`);
  }

  /**
   * Q: What is the client's classification?
   */
  private async answerClientClassification(answer?: string): Promise<void> {
    if (await this.elementNotExists("What is the client's classification?")) return;
    if (!answer) throw new Error('answerClientClassification requires a value');

    const chosen = await this.action.setRadioByQuestion(
      "What is the client's classification?",
      answer
    );
    this.logInfo(`✓ Answered client classification: ${chosen}`);
  }

  /**
   * Q: What's the client's level of investment experience?
   */
  private async answerInvestmentExperience(value?: string): Promise<void> {
    if (await this.elementNotExists("What's the client's level of investment experience?")) return;
    this.logInfo(
      `✓ Answered investment experience: ${await this.action.setRadioByQuestion("What's the client's level of investment experience?", value)}`
    );
  }

  /**
   * Q: Do you have sustainability linked requirements...?
   */
  private async answerSustainabilityRequirements(value?: string): Promise<void> {
    if (
      await this.elementNotExists(
        'Do you have sustainability linked requirements, that need to be considered in addition to your financial objectives?'
      )
    )
      return;
    this.logInfo(
      `✓ Answered sustainability requirements: ${await this.action.setRadioByQuestion('Do you have sustainability linked requirements, that need to be considered in addition to your financial objectives?', value)}`
    );
  }

  /**
   * Q: Is the client aware that in applying sustainability preferences...?
   *
   * If the question is displayed, selects the provided value.
   * If not displayed, logs and safely skips.
   */
  private async answerSustainabilityAwareness(value?: string): Promise<void> {
    const questionText =
      'Is the client aware that in applying sustainability preferences they will be reducing their investable universe ' +
      'and this can have an effect on financial returns as well as increasing investment costs?';

    const questionPattern = TextHelper.toRegExp(questionText);

    const result = await this.action.setRadioByQuestionPatternIfPresent(questionPattern, value);

    if (result) {
      this.logInfo(`✓ Answered sustainability awareness: ${result}`);
    } else {
      this.logInfo('ℹ Sustainability awareness question not shown - skipping');
    }
  }

  /**
   * Assert Responsible Investment Framework section
   * - Skips if section is not displayed
   * - Fails clearly if text changes
   */
  private async assertResponsibleInvestmentFramework(): Promise<void> {
    const box = this.locators.responsibleInvestmentFrameworkBox;

    // Optional section: skip if not present
    if ((await box.count()) === 0) {
      this.logInfo('ℹ RIF section not shown - skipping');
      return;
    }

    // Main heading - exact text match (will show expected vs actual on failure)
    await expect(this.locators.responsibleInvestmentFrameworkTitle).toHaveText(
      "Fairstone's Responsible Investment Framework",
      { timeout: 15_000 }
    );
    await expect(this.locators.negativeScreensHeading).toContainText('Negative Screens');
    await expect(this.locators.carbonReductionHeading).toContainText('Carbon Reduction');
    await expect(this.locators.positiveOutcomesHeading).toContainText('Positive Outcomes');
  }

  /**
   * Q: Does Fairstone's Responsible Investment Framework align...?
   */
  private async answerResponsibleInvestmentFramework(value?: string): Promise<void> {
    if (
      await this.elementNotExists(
        "Does the Fairstone's Responsible Investment Framework align with their sustainability linked requirements?"
      )
    )
      return;

    const chosen = await this.action.setRadioByQuestion(
      "Does the Fairstone's Responsible Investment Framework align with their sustainability linked requirements?",
      value
    );

    await this.assert.assertElementVisible(this.page.getByText(chosen, { exact: false }).first());
    this.logInfo(`✓ Answered responsible investment framework: ${chosen}`);
  }

  /**
   * Q: Are the client's requirements faith based?
   */
  private async answerFaithBasedRequirements(value?: string): Promise<void> {
    if (await this.elementNotExists("Are the client's requirements faith based?")) return;

    const chosen = await this.action.setRadioByQuestion(
      "Are the client's requirements faith based?",
      value
    );

    await this.assert.assertElementVisible(this.page.getByText(chosen, { exact: false }).first());
    this.logInfo(`✓ Answered faith-based requirements: ${chosen}`);
  }

  /**
   * Q: Does the client have specific negative screens...?
   */
  private async answerNegativeScreens(value?: string): Promise<void> {
    if (
      await this.elementNotExists(
        'Does the client have specific negative screens that need to be employed?'
      )
    )
      return;
    const chosen = await this.action.setRadioByQuestion(
      'Does the client have specific negative screens that need to be employed?',
      value
    );

    await this.assert.assertElementVisible(this.page.getByText(chosen, { exact: false }).first());
    this.logInfo(`✓ Answered negative screens: ${chosen}`);
  }

  /**
   * Select negative screens checkboxes if the aria-group is shown.
   */
  private async selectNegativeScreens(...values: string[]): Promise<string[]> {
    await this.waitHelper.waitForElement(this.locators.negativeScreensFieldset, 5_000).catch(
      () => {}
    );
    if (!(await this.locators.negativeScreensFieldset.isVisible())) return [];

    const selected = await this.action.selectCheckboxGroup(
      this.locators.negativeScreensFieldset,
      ...values
    );
    this.logInfo(`✓ Negative Screens selected: ${selected.join(', ')}`);
    return selected;
  }

  /**
   * Q: Which statement aligns with the client's sustainable investment requirements?
   */
  private async answerSustainableInvestmentStatement(value?: string): Promise<void> {
    if (
      await this.elementNotExists(
        "Which of the below statements most closely aligns with the client's sustainable investment requirements?"
      )
    )
      return;
    const chosen = await this.action.setRadioByQuestion(
      "Which of the below statements most closely aligns with the client's sustainable investment requirements?",
      value
    );

    await this.assert.assertElementVisible(this.page.getByText(chosen, { exact: false }).first());
    this.logInfo(`✓ Answered sustainable investment statement: ${chosen}`);
  }

  /* -------------------- Final Fact Find Completed -------------------- */

  /**
   * Verify KYC completes successfully and we land on the success page.
   */
  private async verifyFactFindCompleted(): Promise<void> {
    await this.page.waitForURL(/\/kyc-ff\/success/i, { timeout: 15_000 });
    await expect(this.page.getByText(/Fact Find Successfully Completed/i)).toBeVisible({
      timeout: 15_000,
    });
  }
}