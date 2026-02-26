// projects/gateway-ui/steps/kyc_forms/KycCurrentSituationPageSteps.ts
import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { expect, Page } from '@playwright/test';
import { FrameworkConfig, TestDataGenerator } from '@/framework/src';
import { dataStore } from '@framework/utils/DataStore';

export class KycCurrentSituationPageSteps extends BaseKYCSteps {
  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
  }

  /* -------------------- Verification -------------------- */
  public async verifyCurrentSituationHeading(): Promise<void> {
    await this.assert.assertPageURLContains('page=current-situation');

    await expect(this.heading).toBeVisible({ timeout: 15_000 });
    await expect(this.heading).toHaveText('Current situation');
  }

  /* -------------------- Main Flow -------------------- */
  public async completeKYCCurrentSituation(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.verifyCurrentSituationHeading();
    await this.answerCurrentSituationQuestions();

    this.logInfo('✓ Completed all KYC Current Situation questions');
  }

  private async answerCurrentSituationQuestions(): Promise<void> {
    await this.selectEmploymentStatus();
    await this.selectEmploymentContract();
    await this.answerRetirementAndAge('No');
    await this.fillRetirementAge();
    await this.selectOverallHealth();
    await this.answerMedicalConditions();

    const occupation = await this.fillOccupation();
    const currentEmployer = await this.fillCurrentEmployer();
    await this.selectEmploymentChangeExpected();
    await this.answerSmoking12Months();
    await this.answerWillQuestion();
    await this.answerPowerOfAttorney();
    await this.selectPowerOfAttorneyType('Enduring POA', 'Lasting POA Both', 'Ordinary POA');
    await this.action.clickButtonByText('Save & Continue');

    dataStore.setValue('kyc.currentSituation', {
      occupation,
      currentEmployer,
    });
  }

  /* -------------------- Questions (split into methods) -------------------- */

  private async selectEmploymentStatus(): Promise<void> {
    const selectedValue = 'Unemployed';

    this.logInfo(`Selecting employment status: ${selectedValue}`);
    await this.action.chooseFromQuestionReactSelectDropdown(
      'What is your current employment status?',
      selectedValue
    );
  }

  /** (1) Employment contract */
  private async selectEmploymentContract(): Promise<string> {
    const question = 'What type of employment contract do you have?';

    if (
      !(await this.page
        .getByText(question, { exact: false })
        .count()
        .catch(() => 0))
    )
      return '';

    const selected = await this.action.chooseFromQuestionReactSelectDropdown(question);
    this.logInfo(`Selected employment contract: ${selected}`);
    return selected;
  }

  /** () Retirement age question */
  private async answerRetirementAndAge(answer?: string): Promise<void> {
    const question = this.page
      .getByText('Do you plan to retire at this age?', { exact: false })
      .first();
    if (!(await question.count())) return;

    await expect(question).toBeVisible();
    await this.action.setRadioByQuestion('Do you plan to retire at this age?', answer);

    this.logInfo(`✓ Answered retirement age question:: ${answer}`);
  }

  /** () Retirement age input */
  private async fillRetirementAge(): Promise<string> {
    const label = 'When do you plan to retire?';
    const value = '75';

    if (
      !(await this.page
        .getByText(label, { exact: false })
        .count()
        .catch(() => 0))
    )
      return value;

    await this.action.fillInputByLabel(label, value);
    return value;
  }

  /** () Occupation */
  private async fillOccupation(): Promise<string> {
    const occupation = await TestDataGenerator.occupationAsync();
    this.logInfo(`Filling occupation: ${occupation}`);

    if (
      !(await this.page
        .getByText('What is your occupation?', { exact: false })
        .count()
        .catch(() => 0))
    )
      return occupation;

    await this.action.fillInputByLabel('What is your occupation?', occupation);
    return occupation;
  }

  /** () Current employer */
  private async fillCurrentEmployer(): Promise<string> {
    const employer = await TestDataGenerator.employerAsync();
    this.logInfo(`Filling current employer: ${employer}`);

    if (
      !(await this.page
        .getByText('Who is your current employer?', { exact: false })
        .count()
        .catch(() => 0))
    )
      return employer;

    await this.action.fillInputByLabel('Who is your current employer?', employer);
    return employer;
  }

  /** (4) Expected employment changes */
  private async selectEmploymentChangeExpected(): Promise<string> {
    const question = 'Are there any expected changes to your employment in the near future?';

    if (
      !(await this.page
        .getByText(question, { exact: false })
        .count()
        .catch(() => 0))
    )
      return '';

    const selected = await this.action.chooseFromLabeledReactSelectDropdown(question);
    this.logInfo(`Selected employment change expected: ${selected}`);
    return selected;
  }

  /** () Overall health */
  private async selectOverallHealth(): Promise<void> {
    const selectedValue = '';

    const chosen = await this.action.chooseFromQuestionReactSelectDropdown(
      'How would you describe your overall health?',
      selectedValue
    );

    this.logInfo(`Your overall health description: ${chosen}`);
  }

  /** (7) Medical conditions */
  private async answerMedicalConditions(answer: string = 'No'): Promise<void> {
    const question = 'Do you have any known medical conditions?';

    if (
      !(await this.page
        .getByText(question, { exact: false })
        .count()
        .catch(() => 0))
    ) {
      this.logInfo('↷ Skipped medical conditions question (not displayed)');
      return;
    }

    await this.action.setRadioByQuestion(question, answer);
    this.logInfo(`✓ Answered known medical conditions: ${answer}`);
  }

  /** (8) Smoking/Vaping in past 12 months */
  private async answerSmoking12Months(answer: string = 'Yes'): Promise<void> {
    const question = 'Do you smoke or vape, or have you done so in the past 12 months?';

    if (
      !(await this.page
        .getByText(question, { exact: false })
        .count()
        .catch(() => 0))
    ) {
      this.logInfo('↷ Skipped smoking/vaping question (not displayed)');
      return;
    }

    await this.action.setRadioByQuestion(question, answer);
    this.logInfo(`✓ Answered smoking/vaping question ${answer}`);
  }

  /** (11a) Up-to-date Will */
  private async answerWillQuestion(answer: string = 'Yes'): Promise<void> {
    const question = 'Do you have an up to date Will that reflects your current wishes?';

    if (
      !(await this.page
        .getByText(question, { exact: false })
        .count()
        .catch(() => 0))
    ) {
      this.logInfo('↷ Skipped Will question (not displayed)');
      return;
    }

    await this.action.setRadioByQuestion(question, answer);
    this.logInfo(`✓ Answered Will question ${answer}`);
  }

  /** (11b) Power of Attorney in place */
  private async answerPowerOfAttorney(answer: string = 'Yes'): Promise<void> {
    const question = 'Do you have a Power of Attorney in place?';

    if (
      !(await this.page
        .getByText(question, { exact: false })
        .count()
        .catch(() => 0))
    ) {
      this.logInfo('↷ Skipped Power of Attorney question (not displayed)');
      return;
    }

    await this.action.setRadioByQuestion(question, answer);
    this.logInfo(`✓ Answered Power of Attorney question ${answer}`);
  }

  public async selectPowerOfAttorneyType(...values: string[]): Promise<void> {
    const selected = await this.action.selectFromCheckboxGroupByLabel(
      'Type of Power of Attorney',
      values.length ? values : undefined
    );

    this.logInfo(`✓ Selected Power of Attorney: ${selected.join(', ')}`);
  }
}