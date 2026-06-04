// projects/gateway-ui/steps/kyc_forms/KycCurrentSituationPageSteps.ts
import { BaseKYCSteps } from '@steps/kyc/BaseKYCSteps';
import { Page } from '@playwright/test';
import { FrameworkConfig, TestDataGenerator } from '@/framework/src';
import { dataStore } from '@framework/utils/DataStore';

/**
 * 🎯 KYC Current Situation Page Steps
 *
 * This class handles all interactions with the KYC Current Situation page.
 * It follows a simple pattern: validate page → answer questions → save data → continue.
 *
 * Key Features:
 * - Clear method names that describe what they do
 * - Proper error handling and validation
 * - Data persistence for later use
 * - Junior developer friendly structure
 *
 * @example Basic usage
 * ```typescript
 * const currentSituationSteps = new KycCurrentSituationPageSteps(page);
 * await currentSituationSteps.completeKYCCurrentSituation();
 * ```
 */
export class KycCurrentSituationPageSteps extends BaseKYCSteps {
  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
  }

  // ==========================================
  // 🎯 MAIN WORKFLOW METHOD
  // ==========================================

  /**
   * 🎯 Complete the entire KYC Current Situation page
   *
   * This is the main method that orchestrates the entire page completion.
   * It follows a clear sequence: validate → answer → save → continue.
   */
  public async completeKYCCurrentSituation(): Promise<void> {
    // Step 1: Validate we're on the correct page
    await this.validateCurrentSituationPage();
    
    // Step 2: Answer all the questions on the page
    await this.answerAllCurrentSituationQuestions();
    
    // Step 3: Save and continue to next page
    await this.saveAndContinue();
  }

  // ==========================================
  // 🎯 PAGE VALIDATION
  // ==========================================

  /**
   * 🎯 Validate that we're on the Current Situation page
   *
   * This ensures we're on the right page before proceeding with form filling.
   */
  public async validateCurrentSituationPage(): Promise<void> {
    await this.assert.assertPageURLContains('page=current-situation');
    await this.assert.assertHeadingVisible('Current situation', 15_000);
    this.logInfo('✓ Current Situation page validated');
  }

  // ==========================================
  // 🎯 QUESTION ANSWERING WORKFLOW
  // ==========================================

  /**
   * 🎯 Answer all questions on the Current Situation page
   *
   * This method breaks down the complex form into logical sections.
   * Each section is handled by a separate method for better readability.
   */
  public async answerAllCurrentSituationQuestions(): Promise<void> {
    // Employment related questions
    await this.handleEmploymentQuestions();
    
    // Retirement related questions
    await this.handleRetirementQuestions();
    
    // Health related questions
    await this.handleHealthQuestions();
    
    // Personal details (occupation, employer)
    await this.handlePersonalDetailsQuestions();
    
    // Legal documents questions
    await this.handleLegalDocumentQuestions();
    
    this.logInfo('✓ Completed all KYC Current Situation questions');
  }

  /**
   * 🎯 Handle employment-related questions
   */
  public async handleEmploymentQuestions(): Promise<void> {
    await this.selectEmploymentStatus('Unemployed');
    await this.selectEmploymentContract();
    await this.selectEmploymentChangeExpected();
    this.logInfo('✓ Employment questions completed');
  }

  /**
   * 🎯 Handle retirement-related questions
   */
  public async handleRetirementQuestions(): Promise<void> {
    await this.answerRetirementAndAge('No');
    await this.fillRetirementAge('When do you plan to retire?', '75');
    this.logInfo('✓ Retirement questions completed');
  }

  /**
   * 🎯 Handle health-related questions
   */
  public async handleHealthQuestions(): Promise<void> {
    await this.selectOverallHealth();
    await this.answerMedicalConditions();
    await this.answerSmoking12Months();
    this.logInfo('✓ Health questions completed');
  }

  /**
   * 🎯 Handle personal details questions and save the data
   */
  public async handlePersonalDetailsQuestions(): Promise<void> {
    const occupation = await this.fillOccupation(
      'What is your occupation?',
      dataStore.getValue<string>('kyc.currentSituation.occupation')
    );

    const currentEmployer = await this.fillCurrentEmployer(
      'Who is your current employer?',
      dataStore.getValue<string>('kyc.currentSituation.currentEmployer')
    );

    // Save the data for later use
    this.savePersonalDetailsData(occupation, currentEmployer);
    this.logInfo('✓ Personal details questions completed and data saved');
  }

  /**
   * 🎯 Handle legal document questions
   */
  public async handleLegalDocumentQuestions(): Promise<void> {
    await this.answerWillQuestion('Yes');
    await this.answerPowerOfAttorney('Yes');
    await this.selectPowerOfAttorneyType('Enduring POA', 'Lasting POA Both', 'Ordinary POA');
    this.logInfo('✓ Legal document questions completed');
  }

  /**
   * 🎯 Save personal details data to the data store
   *
   * @param occupation - The occupation value to save
   * @param currentEmployer - The current employer value to save
   */
  private savePersonalDetailsData(occupation: string, currentEmployer: string): void {
    // Save individual values (recommended for easy access)
    dataStore.setValue('kyc.currentSituation.occupation', occupation);
    dataStore.setValue('kyc.currentSituation.currentEmployer', currentEmployer);

    // Save combined object (useful for bulk operations)
    dataStore.setValue('kyc.currentSituation', {
      occupation,
      currentEmployer,
    });
  }

  /**
   * 🎯 Save the form and continue to the next page
   */
  public async saveAndContinue(): Promise<void> {
    await this.action.clickButtonByText('Save & Continue');
    this.logInfo('✓ Current Situation form saved and continuing to next page');
  }

  /* -------------------- Question Methods -------------------- */

  private async selectEmploymentStatus(answer?: string): Promise<string> {
    try {
      return this.action.chooseFromQuestionReactSelectDropdown(
        'What is your current employment status?',
        answer
      );
    } catch (error) {
      throw new Error(`Failed to select employment status: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  private async selectEmploymentContract(answer?: string): Promise<string> {
    if (await this.elementNotExists('What type of employment contract do you have?')) return '';

    return this.action.chooseFromQuestionReactSelectDropdown(
      'What type of employment contract do you have?',
      answer
    );
  }

  private async answerRetirementAndAge(answer?: string): Promise<void> {
    const question = 'Do you plan to retire at this age?';
    // Use verification method to ensure selection is successful
    await this.answerRadioQuestionWithVerificationIfPresent(question, answer);
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

    return this.action.chooseFromQuestionReactSelectDropdown(question);
  }

  private async selectOverallHealth(): Promise<void> {
    await this.action.chooseFromQuestionReactSelectDropdown(
      'How would you describe your overall health?'
    );
  }

  private async answerMedicalConditions(answer: string = 'No'): Promise<void> {
    const question = 'Do you have any known medical conditions?';
    // Use verification method to ensure selection is successful
    await this.answerRadioQuestionWithVerificationIfPresent(question, answer);
  }

  private async answerSmoking12Months(answer: string = 'Yes'): Promise<void> {
    const question = 'Do you smoke or vape, or have you done so in the past 12 months?';
    // Use verification method to ensure selection is successful
    await this.answerRadioQuestionWithVerificationIfPresent(question, answer);
  }

  private async answerWillQuestion(answer?: string): Promise<void> {
    // Use verification method to ensure selection is successful
    await this.answerRadioQuestionWithVerificationIfPresent(
      'Do you have an up to date Will that reflects your current wishes?',
      answer
    );
  }

  private async answerPowerOfAttorney(answer?: string): Promise<void> {
    // Use verification method to ensure selection is successful
    await this.answerRadioQuestionWithVerificationIfPresent(
      'Do you have a Power of Attorney in place?',
      answer
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
