import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { expect, Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';

export class KycInvestmentKnowledgeAndPreferencesPageSteps extends BaseKYCSteps {
  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
  }

  private sustainabilityAwarenessIsYes: boolean | null = null;

  /* -------------------- Verification -------------------- */
  public async verifyInvestmentKnowledgeAndPreferencesHeading(): Promise<void> {
    await this.assert.assertPageURLContains('page=investment-knowledge-and-preferences');

    await expect(this.heading).toBeVisible({ timeout: 15_000 });
    await expect(this.heading).toHaveText('Investment Knowledge & Preferences');
  }

  /* -------------------- Main Flow -------------------- */

  public async completeKYC_InvestmentKnowledgeAndPreferences(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');

    await this.verifyInvestmentKnowledgeAndPreferencesHeading();
    await this.answerInvestmentKnowledgeAndPreferencesQuestions();
    await this.verifyFactFindCompleted();
  }

  private async answerInvestmentKnowledgeAndPreferencesQuestions(): Promise<void> {
    await this.answerInvestmentKnowledgeAndPreference('No');
    await this.answerClientClassification('Retail');
    await this.answerInvestmentExperience('Basic');
    await this.answerSustainabilityRequirements('Yes - relating to all of their objectives');
    await this.answerSustainabilityAwareness('Yes - they are comfortable proceeding');
   await this.assertResponsibleInvestmentFramework();
    await this.answerResponsibleInvestmentFramework('No');
    await this.answerFaithBasedRequirements('No');
    await this.answerNegativeScreens('Yes');
    await this.selectNegativeScreens();
    await this.answerSustainableInvestmentStatement('Neither of the above statements align');
    await this.action.clickButtonByText('Save and Submit');
  }

  /* -------------------- Questions -------------------- */
  /* Each question now only asserts: label must be visible. */

  private async answerInvestmentKnowledgeAndPreference(value?: string): Promise<void> {
    const label = 'Do you need to provide or update your Investment Knowledge & Preference?';
    const locator = this.page.getByText(label, { exact: false });

    if (!(await locator.count())) return;
    if (!value) throw new Error('answerInvestmentKnowledgeAndPreference requires a value');

    await expect(locator).toBeVisible();
    await this.action.setRadioByQuestion(label, value);

    this.logInfo(`✓ Answered investment knowledge & preference: ${value}`);
  }

  private async answerClientClassification(value?: string): Promise<void> {
    const label = "What is the client's classification?";
    const locator = this.page.getByText(label, { exact: false });

    if (!(await locator.count())) return;
    if (!value) throw new Error('answerClientClassification requires a value');

    await expect(locator).toBeVisible();
    await this.action.setRadioByQuestion(label, value);

    this.logInfo(`✓ Answered client classification: ${value}`);
  }

  private async answerInvestmentExperience(value?: string): Promise<void> {
    const label = "What's the client's level of investment experience?";
    const locator = this.page.getByText(label, { exact: false });

    if (!(await locator.count())) return;
    if (!value) throw new Error('answerInvestmentExperience requires a value');

    await expect(locator).toBeVisible();
    await this.action.setRadioByQuestion(label, value);

    this.logInfo(`✓ Answered investment experience: ${value}`);
  }

  private async answerSustainabilityRequirements(value?: string): Promise<void> {
    const label =
      'Do you have sustainability linked requirements, that need to be considered in addition to your financial objectives?';
    const locator = this.page.getByText(label, { exact: false });

    if (!(await locator.count())) return;
    if (!value) throw new Error('answerSustainabilityRequirements requires a value');

    await expect(locator).toBeVisible();
    await this.action.setRadioByQuestion(label, value);

    this.logInfo(`✓ Answered sustainability requirements: ${value}`);
  }

  private async answerSustainabilityAwareness(value?: string): Promise<void> {
    const pattern = /Is the client aware that in applying sustainability preferences/i;
    const question = this.page.getByText(pattern).first();

    if (!(await question.count())) {
      this.sustainabilityAwarenessIsYes = null;
      this.logInfo('ℹ Sustainability awareness question not shown - skipping');
      return;
    }

    if (!value) throw new Error('answerSustainabilityAwareness requires a value');

    await expect(question, 'Missing sustainability awareness question').toBeVisible({
      timeout: 15_000,
    });

    await this.action.setRadioByQuestionPattern(pattern, value);

    this.sustainabilityAwarenessIsYes = /^yes\b/i.test(value.trim());
    this.logInfo(`✓ Answered sustainability awareness: ${value}`);
  }

  private async assertResponsibleInvestmentFramework(): Promise<void> {
    if (this.sustainabilityAwarenessIsYes === undefined) {
      this.logInfo(
        'ℹ Skipping Responsible Investment Framework checks (awareness not answered)'
      );
      return;
    }

    const rifHeading = this.page.getByRole('heading', {
      name: /^Fairstone's Responsible Investment Framework$/i, // FULL match
    });

    if (this.sustainabilityAwarenessIsYes === true) {
      await expect(rifHeading).toBeVisible({ timeout: 15_000 });
      await expect(this.page.getByRole('heading', { name: /^Negative Screens\b/i })).toBeVisible();
      await expect(this.page.getByRole('heading', { name: /^Carbon Reduction\b/i })).toBeVisible();
      await expect(this.page.getByRole('heading', { name: /^Positive Outcomes\b/i })).toBeVisible();
    } else {
      await expect(rifHeading).toHaveCount(0);
    }
  }

  private async answerResponsibleInvestmentFramework(value?: string): Promise<void> {
    const label =
      "Does the Fairstone's Responsible Investment Framework align with their sustainability linked requirements?";
    const locator = this.page.getByText(label, { exact: false });

    if (!(await locator.count())) return;
    if (!value) throw new Error('answerResponsibleInvestmentFramework requires a value');

    await expect(locator).toBeVisible();
    await this.action.setRadioByQuestion(label, value);

    this.logInfo(`✓ Answered responsible investment framework: ${value}`);
  }

  private async answerFaithBasedRequirements(value?: string): Promise<void> {
    const label = "Are the client's requirements faith based?";
    const locator = this.page.getByText(label, { exact: false });

    if (!(await locator.count())) return;
    if (!value) throw new Error('answerFaithBasedRequirements requires a value');

    await expect(locator).toBeVisible();
    await this.action.setRadioByQuestion(label, value);

    this.logInfo(`✓ Answered faith-based requirements: ${value}`);
  }

  private async answerNegativeScreens(value?: string): Promise<void> {
    const label = 'Does the client have specific negative screens that need to be employed?';
    const locator = this.page.getByText(label, { exact: false });

    if (!(await locator.count())) return;
    if (!value) throw new Error('answerNegativeScreens requires a value');

    await expect(locator).toBeVisible();
    await this.action.setRadioByQuestion(label, value);

    this.logInfo(`✓ Answered negative screens: ${value}`);
  }

  private async selectNegativeScreens(selection?: string | string[] | number): Promise<string[]> {
    const groupId = 'person.negativeScreens';

    if (!(await this.isAriaGroupVisible(groupId))) return [];

    return this.action.selectCheckboxesFromAriaGroup(groupId, selection);
  }

  private async answerSustainableInvestmentStatement(value?: string): Promise<void> {
    const label =
      "Which of the below statements most closely aligns with the client's sustainable investment requirements?";
    const locator = this.page.getByText(label, { exact: false });

    if (!(await locator.count())) return;
    if (!value) throw new Error('answerSustainableInvestmentStatement requires a value');

    await expect(locator).toBeVisible();
    await this.action.setRadioByQuestion(label, value);

    this.logInfo(`✓ Answered sustainable investment statement: ${value}`);
  }

  /* -------------------- Final Fact Find Completed -------------------- */

  private async verifyFactFindCompleted(): Promise<void> {
    await this.page.waitForURL(/\/kyc-ff\/success/i, { timeout: 15_000 });
    await expect(this.page.getByText(/Fact Find Successfully Completed/i)).toBeVisible({
      timeout: 15_000,
    });
  }
}