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
    //await this.selectEmploymentStatus('Semi-Retired');
    await this.selectEmploymentStatus('Unemployed');
    await this.selectEmploymentContract();
    await this.answerRetirementAndAge('No');
    await this.fillRetirementAge('When do you plan to retire?', '75');
    await this.selectOverallHealth();
    await this.answerMedicalConditions();

    const occupation = await this.fillOccupation(
      'What is your occupation?',
      dataStore.getValue<string>('kyc.currentSituation.occupation')
    );

    const currentEmployer = await this.fillCurrentEmployer(
      'Who is your current employer?',
      dataStore.getValue<string>('kyc.currentSituation.currentEmployer')
    );

    await this.selectEmploymentChangeExpected();
    await this.answerSmoking12Months();
    await this.answerWillQuestion('Yes');
    await this.answerPowerOfAttorney('Yes');
    await this.selectPowerOfAttorneyType('Enduring POA', 'Lasting POA Both', 'Ordinary POA');

    await this.action.clickButtonByText('Save & Continue');

    // Persist both individually (recommended)
    dataStore.setValue('kyc.currentSituation.occupation', occupation);
    dataStore.setValue('kyc.currentSituation.currentEmployer', currentEmployer);

    // Optional: store combined object
    dataStore.setValue('kyc.currentSituation', {
      occupation,
      currentEmployer,
    });
  }

  /* -------------------- Question Methods -------------------- */

  private async selectEmploymentStatus(answer?: string): Promise<string> {
    return await this.action.chooseFromQuestionReactSelectDropdown(
      'What is your current employment status?',
      answer
    );
  }

  private async selectEmploymentContract(answer?: string): Promise<string> {
    if (await this.elementNotExists('What type of employment contract do you have?')) return '';

    return await this.action.chooseFromQuestionReactSelectDropdown(
      'What type of employment contract do you have?',
      answer
    );
  }

  private async answerRetirementAndAge(answer?: string): Promise<void> {
    const question = 'Do you plan to retire at this age?';
    if (!(await this.page.getByText(question, { exact: false }).count())) return;

    await this.action.setRadioByQuestion(question, answer);
  }

  private async fillRetirementAge(label: string, value: string): Promise<void> {
    if (await this.elementNotExists(label)) return;
    await this.action.fillInputByLabelAndAssert(label, value);
  }

  /* -------------------- Occupation / Employer -------------------- */

  private async fillOccupation(label: string, value?: string): Promise<string> {
    const occupation = value ?? (await TestDataGenerator.occupationAsync());
    if (await this.elementNotExists(label)) return occupation;

    await this.action.fillInputByLabelAndAssert(label, occupation);
    return occupation;
  }

  private async fillCurrentEmployer(label: string, value?: string): Promise<string> {
    const employer = value ?? (await TestDataGenerator.employerAsync());
    if (await this.elementNotExists(label)) return employer;

    await this.action.fillInputByLabelAndAssert(label, employer);
    return employer;
  }

  /* -------------------- Remaining Questions -------------------- */

  private async selectEmploymentChangeExpected(): Promise<string> {
    const question = 'Are there any expected changes to your employment in the near future?';

    if (!(await this.page.getByText(question, { exact: false }).count())) return '';

    return await this.action.chooseFromQuestionReactSelectDropdown(question);
  }

  private async selectOverallHealth(): Promise<void> {
    await this.action.chooseFromQuestionReactSelectDropdown(
      'How would you describe your overall health?'
    );
  }

  private async answerMedicalConditions(answer: string = 'No'): Promise<void> {
    const question = 'Do you have any known medical conditions?';
    if (!(await this.page.getByText(question, { exact: false }).count())) return;

    await this.action.setRadioByQuestion(question, answer);
  }

  private async answerSmoking12Months(answer: string = 'Yes'): Promise<void> {
    const question = 'Do you smoke or vape, or have you done so in the past 12 months?';

    if (!(await this.page.getByText(question, { exact: false }).count())) return;

    await this.action.setRadioByQuestion(question, answer);
  }

  private async answerWillQuestion(answer?: string): Promise<void> {
    if (await this.elementNotExists('Do you have an up to date Will that reflects your current wishes?')
    )
      return;
    this.logInfo(
      `✓ Answered to up to date Will question: ${await this.action.setRadioByQuestion('Do you have an up to date Will that reflects your current wishes?', answer)}`
    );
  }

  private async answerPowerOfAttorney(answer?: string): Promise<void> {
    if (await this.elementNotExists('Do you have a Power of Attorney in place?')) return;
    this.logInfo(
      `✓ Answered to Power of Attorney question: ${await this.action.setRadioByQuestion('Do you have a Power of Attorney in place?', answer)}`
    );
  }

  public async selectPowerOfAttorneyType(...values: string[]): Promise<void> {
    const selected = await this.action.selectFromCheckboxGroupByLabel(
      'Type of Power of Attorney',
      values.length ? values : undefined
    );

    this.logInfo(`✓ Selected Power of Attorney: ${selected.join(', ')}`);
  }
}