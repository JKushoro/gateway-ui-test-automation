// =====================================================
// KycPersonalDetailsPageSteps.ts
// =====================================================
import { Page, expect } from '@playwright/test';
import { FrameworkConfig } from '@framework/types';
import { dataStore } from '@framework/utils/DataStore';
import { TestDataGenerator } from '@framework/utils/TestDataGenerator';
import { PostcodeLookupService } from '@steps/components/PostcodeLookup';
import { KYCDatePickerService } from '@steps/components/KYCDatePickerService';
import { KYCDatePickerLocators } from '@pages/componentsLocator/KYCDatePickerLocators';
import { BaseKYCSteps } from './BaseKYCSteps';
import { KycPersonalDetailsPageLocators } from '@pages/kycElementLocators/KycPersonalDetailsPageLocators';

/**
 * =====================================================
 * KYC - Personal Details (Steps)
 * =====================================================
 *
 * Responsibilities:
 * - Verify page heading
 * - Read + assert displayed client details in KYC
 * - Compare Gateway selected client vs KYC displayed client
 * - Fill Contact details (with inline assertions)
 * - Fill Current Address (Address 1)
 * - Add & fill Previous Address (Address 2)
 * - Answer Personal Details questions (explicitly)
 * - Fill Children/Dependants details (if shown)
 *
 * Notes:
 * - Each method does ONE job
 * - Assertions live next to the action they validate
 * - REQUIRED fields: never swallow errors, never return empty silently
 * - OPTIONAL fields: skip safely and log why
 */

// =====================================================
// Types (module scope - correct TypeScript)
// =====================================================
type DisplayedKycClient = {
  title: string;
  firstName: string;
  surname: string;
  fullName: string;
  dob: string;
  sexAtBirth: string;
};

export class KycPersonalDetailsPageSteps extends BaseKYCSteps {
  // =====================================================
  // Services / Locators
  // =====================================================
  private readonly postcodeLookup: PostcodeLookupService;
  private readonly datePicker: KYCDatePickerService;
  private readonly locators: KycPersonalDetailsPageLocators;

  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
    this.postcodeLookup = new PostcodeLookupService(page, config);
    this.datePicker = new KYCDatePickerService(page);
    this.locators = new KycPersonalDetailsPageLocators(page, config);
  }

  // =====================================================
  // Main Flow
  // =====================================================
  public async completeKYCPersonalDetails(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');

    await this.verifyPersonalDetailsHeading();

    // 1) Client identity checks (Gateway vs KYC)
    const gatewayClient = this.getSelectedGatewayClient();
    const displayedClient = await this.readAndStoreDisplayedKycClient();
    await this.compareSelectedGatewayVsDisplayedKyc(gatewayClient, displayedClient);

    // 2) Contact details
    const generatedContact = this.generateAndStoreKycContactDetails();
    await this.fillKycContactAndStoreDisplayed(generatedContact);

    // 3) Current address (Address 1)
    await this.fillCurrentAddress_Address1();

    // 4) Previous address (Address 2)
    await this.addPreviousAddress_Address2();
    await this.fillPreviousAddress_Address2();

    // 5) Personal details questions
    await this.answerPersonalDetailsQuestions();

    // 6) Children / dependants details (optional section)
    await this.completeChildrenOrDependantsDetails();

    // 7) Continue
    await this.action.clickButtonByText('Save & Continue');
  }

  // =====================================================
  // Verification
  // =====================================================
  public async verifyPersonalDetailsHeading(): Promise<void> {
    await this.assert.assertPageURLContains('page=personal-details');

    await this.assert.assertElementVisible(this.heading);
    await this.assert.assertElementHasText(this.heading, 'Personal details');
  }

  // =====================================================
  // Gateway Client (DataStore)
  // =====================================================
  private getSelectedGatewayClient(): any {
    return dataStore.getValue('selected.gatewayClient') || {};
  }

  // =====================================================
  // Read + Assert Displayed KYC Client (REQUIRED)
  // =====================================================
  private async readAndStoreDisplayedKycClient(): Promise<DisplayedKycClient> {
    const title = await this.readAndAssertTitle();
    const { firstName, surname } = await this.readAndAssertNames('First name', 'Surname');
    const dob = await this.readAndAssertDateOfBirth();
    const sexAtBirth = await this.readAndAssertSexAtBirth();

    const fullName = `${firstName} ${surname}`.replace(/\s+/g, ' ').trim();

    const displayedKycClient: DisplayedKycClient = {
      title,
      firstName,
      surname,
      fullName,
      dob,
      sexAtBirth,
    };

    dataStore.setValue('displayed.kycClient', displayedKycClient);
    return displayedKycClient;
  }

  private async readAndAssertTitle(): Promise<string> {
    const title = (await this.action.getReactSelectValueByLabelStrict('Title')).trim();
    expect(title, 'Title should not be empty').not.toBe('');
    return title;
  }

  private async readAndAssertNames(
    firstNameLabel: string,
    surnameLabel: string
  ): Promise<{ firstName: string; surname: string }> {
    const firstNameInput = await this.action.findInputFieldByLabel(firstNameLabel);
    const surnameInput = await this.action.findInputFieldByLabel(surnameLabel);

    await expect(firstNameInput, `"${firstNameLabel}" input should be visible`).toBeVisible();
    await expect(surnameInput, `"${surnameLabel}" input should be visible`).toBeVisible();

    const firstName = (await firstNameInput.inputValue()).trim();
    const surname = (await surnameInput.inputValue()).trim();

    expect(firstName, `${firstNameLabel} should not be empty`).not.toBe('');
    expect(surname, `${surnameLabel} should not be empty`).not.toBe('');

    return { firstName, surname };
  }

  private async readAndAssertDateOfBirth(): Promise<string> {
    const dobInput = await this.action.findInputFieldByLabel('Date of birth');
    await expect(dobInput, '"Date of birth" input should be visible').toBeVisible();

    const dob = (await dobInput.inputValue()).trim();
    expect(dob, 'Date of birth should not be empty').not.toBe('');

    return dob;
  }

  private async readAndAssertSexAtBirth(): Promise<string> {
    const sexAtBirth = (await this.action.getReactSelectValueByLabelStrict('Sex at birth')).trim();
    expect(sexAtBirth, 'Sex at birth should not be empty').not.toBe('');
    return sexAtBirth;
  }

  // =====================================================
  // Compare Gateway vs KYC
  // =====================================================
  private async compareSelectedGatewayVsDisplayedKyc(
    gatewayClient: any,
    displayedKycClient: DisplayedKycClient
  ): Promise<void> {
    if (gatewayClient.title) {
      expect(displayedKycClient.title).toBe(gatewayClient.title);
    }

    if (gatewayClient.forename) {
      expect(displayedKycClient.firstName).toBe(gatewayClient.forename);
    }

    if (gatewayClient.surname) {
      expect(displayedKycClient.surname).toBe(gatewayClient.surname);
    }

    if (gatewayClient.dob) {
      expect(displayedKycClient.dob).toBe(this.normalizeDate(gatewayClient.dob));
    }

    if (gatewayClient.gender) {
      const expected = this.mapGender(gatewayClient.gender);
      if (expected) {
        expect(displayedKycClient.sexAtBirth).toBe(expected);
      }
    }
  }

  // =====================================================
  // Contact Details
  // =====================================================
  private generateAndStoreKycContactDetails(): { mobile: string; email: string } {
    const mobile = TestDataGenerator.phone();
    const email = TestDataGenerator.email();

    dataStore.setValue('generated.kyc.contact.mobile', mobile);
    dataStore.setValue('generated.kyc.contact.email', email);

    return { mobile, email };
  }

  private async fillKycContactAndStoreDisplayed(data: {
    mobile: string;
    email: string;
  }): Promise<void> {
    await this.fillMobileNumberAndAssert(data.mobile);
    await this.fillEmailAndAssert(data.email);
    await this.selectPreferredContact('Email');

    // If these are REQUIRED in your journey, keep them strict (no .catch)
    dataStore.setValue(
      'displayed.kyc.contact.mobile',
      await this.action.getInputValueByLabel('Mobile number')
    );
    dataStore.setValue(
      'displayed.kyc.contact.email',
      await this.action.getInputValueByLabel('Email')
    );
  }

  private async fillMobileNumberAndAssert(mobile: string): Promise<void> {
    await this.action.fillInputByLabel('Mobile number', mobile);
    const displayed = (await this.action.getInputValueByLabel('Mobile number')).trim();
    expect(displayed).toBe(mobile);
  }

  private async fillEmailAndAssert(email: string): Promise<void> {
    await this.action.fillInputByLabel('Email', email);
    const displayed = (await this.action.getInputValueByLabel('Email')).trim();
    expect(displayed).toBe(email);
  }

  private async selectPreferredContact(answer?: string): Promise<void> {
    const labelText = 'Preferred contact';

    const selected = await this.action.selectFromRadioGroupByLabel(labelText, answer);
    if (!selected) {
      this.logInfo(`↷ Skipped "${labelText}" (not displayed)`);
      return;
    }

    this.logInfo(`✓ ${labelText}: ${selected}`);
  }

  // =====================================================
  // Current Address (Address 1)
  // =====================================================
  private async fillCurrentAddress_Address1(): Promise<void> {
    const currentAddress = TestDataGenerator.generateUKAddress({ useRealPostcode: true });

    await this.action.fillInputByLabelAndAssert(
      'Address 1',
      `${currentAddress.buildingNumber} ${currentAddress.street}`
    );

    await this.action.fillInputByLabelAndAssert('Town or City', currentAddress.town);

    if (currentAddress.county) {
      await this.action.fillInputByLabelAndAssert('County', currentAddress.county);
    }

    const chosen = await this.action.chooseFromLabeledReactSelectDropdown(
      'Country',
      'United Kingdom of Great Britain and Northern Ireland'
    );
    expect(chosen, 'Country should be selected').not.toBe('');

    await this.action.fillInputByLabelAndAssert('Postcode', currentAddress.postcode);

    const moveInDate = await this.setAddressMoveInDate('Move in date', 6, 20);
    dataStore.setValue('kyc.address1.moveInDate', moveInDate);
    dataStore.setValue('kyc.address1.postcode', currentAddress.postcode);

    this.logInfo(`✓ Current address (Address 1) completed. Move-in: ${moveInDate}`);
  }

  // =====================================================
  // Previous Address (Address 2)
  // =====================================================
  public async addPreviousAddress_Address2(): Promise<void> {
    const btn = this.page.getByText('Add another address', { exact: false }).first();
    if (!(await btn.count())) return;

    await expect(btn).toBeVisible();
    await expect(btn).toBeEnabled();

    await btn.click();
    this.logInfo('✓ Clicked "Add another address" (to add Previous Address / Address 2)');
  }

  private async fillPreviousAddress_Address2(): Promise<string> {
    const previousAddress = TestDataGenerator.generateUKAddress({ useRealPostcode: true });

    const line1 = `${previousAddress.buildingNumber} ${previousAddress.street}`;

    await this.setSecondAddressLine1(line1);
    await this.setSecondAddressLine2(previousAddress.street);
    await this.setSecondAddressCity(previousAddress.town);
    await this.setSecondAddressCounty(previousAddress.county);

    await this.selectSecondAddressCountry('United Kingdom of Great Britain and Northern Ireland');
    await this.setSecondAddressPostcode(previousAddress.postcode);

    const moveInDate2 = await this.setSecondAddressMoveInDate(6, 20);

    dataStore.setValue('kyc.address2.moveInDate', moveInDate2);
    dataStore.setValue('kyc.address2.postcode', previousAddress.postcode);

    this.logInfo(`✓ Previous address (Address 2) completed. Move-in: ${moveInDate2}`);

    return moveInDate2;
  }

  // =====================================================
  // Previous Address (Address 2) - Field Helpers
  // =====================================================
  private async setSecondAddressLine1(value: string): Promise<void> {
    const input = this.locators.addressLine1;

    await expect(input).toBeVisible();
    await input.scrollIntoViewIfNeeded();

    await input.fill(value);
    await expect(input).toHaveValue(value);

    this.logInfo(`✓ Previous address (Address 2) line 1 set: ${value}`);
  }

  private async setSecondAddressLine2(value?: string): Promise<void> {
    if (!value) {
      this.logInfo('↷ Skipped Previous address line 2 (no value provided)');
      return;
    }

    const input = this.locators.addressLine2;
    if (!(await input.count())) {
      this.logInfo('↷ Skipped Previous address line 2 (not displayed)');
      return;
    }

    await expect(input).toBeVisible();
    await input.scrollIntoViewIfNeeded();

    await input.fill(value);
    await expect(input).toHaveValue(value);

    this.logInfo(`✓ Previous address (Address 2) line 2 set: ${value}`);
  }

  private async setSecondAddressCity(town?: string): Promise<void> {
    if (!town) {
      this.logInfo('↷ Skipped Previous address city (no value provided)');
      return;
    }

    const input = this.locators.city;
    if (!(await input.count())) {
      this.logInfo('↷ Skipped Previous address city (not displayed)');
      return;
    }

    await expect(input).toBeVisible();
    await input.scrollIntoViewIfNeeded();

    await input.fill(town);
    await expect(input).toHaveValue(town);

    this.logInfo(`✓ Previous address (Address 2) city set: ${town}`);
  }

  private async setSecondAddressCounty(county?: string): Promise<void> {
    if (!county) {
      this.logInfo('↷ Skipped Previous address county (no value provided)');
      return;
    }

    const input = this.locators.county;
    if (!(await input.count())) {
      this.logInfo('↷ Skipped Previous address county (not displayed)');
      return;
    }

    await expect(input).toBeVisible();
    await input.scrollIntoViewIfNeeded();

    await input.fill(county);
    await expect(input).toHaveValue(county);

    this.logInfo(`✓ Previous address (Address 2) county set: ${county}`);
  }

  private async setSecondAddressPostcode(postcode: string): Promise<void> {
    const input = this.locators.postcode;

    if (!(await input.count())) {
      this.logInfo('↷ Skipped Previous address postcode (not displayed)');
      return;
    }

    await expect(input).toBeVisible();
    await input.scrollIntoViewIfNeeded();

    await input.fill(postcode);
    await input.evaluate(el => el.blur());

    await expect(input).toHaveValue(postcode);

    this.logInfo(`✓ Previous address (Address 2) postcode set: ${postcode}`);
  }

  private async selectSecondAddressCountry(value?: string): Promise<void> {
    if (!value) return;

    const countryInput = this.locators.country;
    if (!(await countryInput.count())) return;

    await expect(countryInput).toBeVisible();
    await countryInput.scrollIntoViewIfNeeded();

    await countryInput.click();

    const option = this.page.getByRole('option', { name: value });
    await expect(option).toBeVisible();

    await option.click();

    await expect(this.page.getByText(value, { exact: false }).first()).toBeVisible();
    this.logInfo(`✓ Previous address (Address 2) country selected: ${value}`);
  }

  private async setSecondAddressMoveInDate(
    minYearsAgo: number,
    maxYearsAgo: number
  ): Promise<string> {
    const input = this.locators.secondMoveInDate;
    if (!(await input.count())) return '';

    const date = this.datePicker.generateRandomPastDate(minYearsAgo, maxYearsAgo);

    await expect(input).toBeVisible();
    await input.scrollIntoViewIfNeeded();

    await input.click();
    await input.fill(date);
    await input.evaluate(el => el.blur());

    await expect(input).toHaveValue(date);

    this.logInfo(`✓ Previous address (Address 2) move-in date set: ${date}`);
    return date;
  }

  // =====================================================
  // Personal Details Questions
  // =====================================================
  private async answerPersonalDetailsQuestions(): Promise<void> {
    await this.answerUkNationality('No');
    await this.selectNonUkNationality('Nigeria');

    await this.answerUkResidency('No');
    await this.selectNonUkResidency('Nigeria');

    await this.answerTaxOutsideUk('Yes');
    await this.selectTaxPaidCountryOutsideUk('Nigeria');

    await this.answerChildrenOrDependants('Yes');
  }

  private async answerUkNationality(answer?: string): Promise<void> {
    const q = this.page.getByText('Are you a UK national?', { exact: false }).first();
    if (!(await q.count())) return;

    await expect(q).toBeVisible();
    await this.action.setRadioByQuestion('Are you a UK national?', answer);

    this.logInfo(`✓ Are you a UK national?: ${answer}`);
  }

  /** Nationality dropdown shown when UK national = "Yes/No" */
  private async selectNonUkNationality(value?: string): Promise<void> {
    if (await this.elementNotExists('Choose nationality')) return;

    const chosen = await this.action.chooseFromLabeledReactSelectDropdown(
      'Choose nationality',
      value
    );

    await expect(this.page.getByText(chosen, { exact: false }).first()).toBeVisible();
    this.logInfo(`✓ Nationality selected: ${chosen}`);
  }

  private async answerUkResidency(answer?: string): Promise<void> {
    const q = this.page.getByText('Are you a UK resident?', { exact: false }).first();
    if (!(await q.count())) return;

    await expect(q).toBeVisible();
    await this.action.setRadioByQuestion('Are you a UK resident?', answer);

    this.logInfo(`✓ Are you a UK resident?: ${answer}`);
  }

  /** Residency dropdown shown when UK resident = "Yes/No" */
  private async selectNonUkResidency(value?: string): Promise<void> {
    if (await this.elementNotExists('Choose residency')) return;

    const chosen = await this.action.chooseFromLabeledReactSelectDropdown(
      'Choose residency',
      value
    );

    await expect(this.page.getByText(chosen, { exact: false }).first()).toBeVisible();
    this.logInfo(`✓ Residency selected: ${chosen}`);
  }

  private async answerTaxOutsideUk(answer?: string): Promise<void> {
    const question = 'Do you pay Tax in any other Country outside of the UK?';

    const q = this.page.getByText(question, { exact: false }).first();
    if (!(await q.count())) return;

    await expect(q).toBeVisible();
    await this.action.setRadioByQuestion(question, answer);

    this.logInfo(`✓ Tax outside UK?: ${answer}`);
  }

  /** Country dropdown shown when Tax outside UK = "Yes/No" */
  private async selectTaxPaidCountryOutsideUk(value?: string): Promise<void> {
    if (await this.elementNotExists('What country')) return;

    const chosen = await this.action.chooseFromLabeledReactSelectDropdown('What country', value);

    await expect(this.page.getByText(chosen, { exact: false }).first()).toBeVisible();
    this.logInfo(`✓ Selected tax paid country: ${chosen}`);
  }

  private async answerChildrenOrDependants(answer?: string): Promise<void> {
    const q = this.page
      .getByText('Do you have any children or dependants?', { exact: false })
      .first();
    if (!(await q.count())) return;

    await expect(q).toBeVisible();
    await this.action.setRadioByQuestion('Do you have any children or dependants?', answer);

    this.logInfo(`✓ Children or dependants?: ${answer}`);
  }

  // =====================================================
  // Children / Dependants (Optional Details)
  // =====================================================
  private async completeChildrenOrDependantsDetails(): Promise<void> {
    await this.fillDependantsFullName();
    await this.selectDependantOneSexAtBirth();
    await this.setDependantOneDateOfBirth(2, 4);
    await this.answerFinanciallyDependant();
    await this.selectDependantOneRelationship();
    await this.setDependantOneDependantUntil(12, 14);
  }

  private async fillDependantsFullName(forename?: string, surname?: string): Promise<void> {
    const firstNameInput = this.locators.dependentOneFirstName;
    const surnameInput = this.locators.dependentOneSurname;

    const names = TestDataGenerator.personName(forename, surname);

    if (await firstNameInput.count()) {
      await firstNameInput.fill(names.forename);
      (await surnameInput.count()) && (await surnameInput.fill(names.surname));
    }

    this.logInfo(`✓ Dependant full name: ${names.forename} ${names.surname}`);
  }

  private async selectDependantOneSexAtBirth(value?: string): Promise<void> {
    const chosen = await this.action.selectReactSelectDropdownOption(
      this.locators.dependentOneSexAtBirth,
      value
    );

    this.logInfo(`✓ Dependant 1 sex at birth selected: ${chosen}`);
  }

  public async setDependantOneDateOfBirth(
    minYearsAgo: number,
    maxYearsAgo: number
  ): Promise<string | undefined> {
    const input = this.locators.dependentOneDateOfBirth;

    if (!(await input.count())) {
      this.logInfo('↷ Skipped dependant 1 DOB (not displayed)');
      return;
    }

    const date = this.datePicker.generateRandomPastDate(minYearsAgo, maxYearsAgo);

    await expect(input).toBeVisible();
    await input.scrollIntoViewIfNeeded();

    await input.fill(date);
    await input.evaluate(el => el.blur());

    await expect(input).toHaveValue(date);

    this.logInfo(`✓ Dependant 1 DOB set: ${date}`);
    return date;
  }

  private async answerFinanciallyDependant(answer?: string): Promise<void> {
    const question = 'Financially dependant';

    await expect(this.page.getByText(question, { exact: false }).first()).toBeVisible();
    await this.action.setRadioByQuestion(question, answer);

    this.logInfo(`✓ ${question}: ${answer}`);
  }

  private async selectDependantOneRelationship(value?: string): Promise<void> {
    const chosen = await this.action.chooseFromLabeledReactSelectDropdown('Relationship', value);
    expect(chosen).toBeTruthy();

    await expect(this.page.getByText(chosen, { exact: false }).first()).toBeVisible();
    this.logInfo(`✓ Relationship selected: ${chosen}`);
  }

  public async setDependantOneDependantUntil(
    minYearsAhead: number,
    maxYearsAhead: number
  ): Promise<string | undefined> {
    const input = this.locators.dependentOneDependantUntil;

    if (!(await input.count())) {
      this.logInfo('↷ Skipped dependant 1 Dependant until (not displayed)');
      return;
    }

    const date = this.datePicker.generateRandomFutureDate(minYearsAhead, maxYearsAhead);

    await this.assert.assertElementVisible(input);
    await input.scrollIntoViewIfNeeded();

    await input.fill(date);
    await input.evaluate(el => el.blur());

    await this.assert.assertInputHasValue(input, date);

    this.logInfo(`✓ Dependant 1 Dependant until set: ${date}`);
    return date;
  }

  // =====================================================
  // Shared Helpers (Small + Focused)
  // =====================================================
  private async setAddressMoveInDate(
    labelText: string,
    minYearsAgo: number,
    maxYearsAgo: number
  ): Promise<string> {
    const date = this.datePicker.generateRandomPastDate(minYearsAgo, maxYearsAgo);

    await this.datePicker.setDateByLabelOrFallback(
      labelText,
      KYCDatePickerLocators.DATE_INPUT,
      date
    );

    const displayed = (await this.action.getInputValueByLabel(labelText)).trim();
    expect(displayed).toBe(date);

    return date;
  }

  private mapGender(gender?: string): string | undefined {
    if (!gender) return undefined;
    if (gender.toLowerCase().includes('female')) return 'Female';
    if (gender.toLowerCase().includes('male')) return 'Male';
    return undefined;
  }

  // =====================================================
  // Existing Helper (Unchanged)
  // =====================================================
  public async fillKYC_AddressField(labelText: string, postcode?: string): Promise<string> {
    return this.postcodeLookup.kycAddressSearchField(labelText, postcode);
  }
}


