import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { expect, Page } from '@playwright/test';
import { FrameworkConfig, TestDataGenerator } from '@/framework/src';
import { KYCDatePickerLocators } from '@components/KYCDatePickerLocators';
import { KYCDatePickerService } from '@steps/components/KYCDatePickerService';

/**
 * KYC - Fact Find Details (Steps)
 *
 * Purpose:
 * - Confirm we are on the "Fact Find Details" page
 * - Complete the form in the same order a user would
 * - Assert values only when fields are present
 * - Proceed to "Personal Details"
 *
 * Junior tester notes:
 * - If a field does not exist, the test skips it safely
 * - Every fill has a matching expect
 */
export class KycFactFindDetailsPageSteps extends BaseKYCSteps {
  private readonly datePicker: KYCDatePickerService;

  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
    this.datePicker = new KYCDatePickerService(page);
  }

  /* ======================================================================================
   * Verification
   * ====================================================================================== */

  public async verifyFactFindDetailsHeading(): Promise<void> {
    await expect(this.heading).toBeVisible({ timeout: 15_000 });
    await expect(this.heading).toHaveText('Fact Find Details');
  }

  /* ======================================================================================
   * Main Flow
   * ====================================================================================== */

  public async completeKYCFactFindDetails(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.verifyFactFindDetailsHeading();
    await this.answerFactFindDetailsQuestions();

    this.logInfo('✓ Completed all KYC Fact Find Details questions');
  }

  private async answerFactFindDetailsQuestions(): Promise<void> {
    await this.workCompletedDate('Yes');
    await this.setWorkCompletedDate('What date was the work completed on', 1, 1);
    await this.selectVenue('Email');
    await this.requireA3rdPartyToBePresent('Yes');
    await this.clickAddThirdPartyButton();
    await this.selectThirdPartyTitle();
    await this.fillFirstAndLastName();
    await this.selectRelationship();
    await this.fillContactNumber();
    await this.fillThirdPartyAddress();
    await this.selectPresentAtMeeting('Yes');
    await this.fillNotesIfPresent();
    await this.selectIf3rdPartyPowerOfAttorney('No');
    await this.action.clickButtonByText('Proceed to Personal Details');
  }

  /* ======================================================================================
   * Questions
   * ====================================================================================== */

  private async workCompletedDate(answer?: string): Promise<void> {
    await this.answerRadioQuestionIfExists('Was the work completed on a different date', answer);
  }

  public async setWorkCompletedDate(
    labelText: string,
    minYearsAgo: number,
    maxYearsAgo: number
  ): Promise<string | undefined> {
    if (await this.elementNotExists(labelText)) return;

    const date = this.datePicker.generateRandomPastDate(minYearsAgo, maxYearsAgo);

    await this.datePicker.setDateByLabelOrFallback(
      labelText,
      KYCDatePickerLocators.DATE_INPUT,
      date
    );

    const input = this.page.getByLabel(labelText, { exact: false });
    if ((await input.count()) > 0) {
      await expect(input).toHaveValue(date);
    }

    this.logInfo(`✓ Set "${labelText}" to ${date}`);
    return date;
  }

  private async selectVenue(value?: string): Promise<void> {
    if (await this.elementNotExists('Venue')) return;

    const chosen = await this.action.chooseFromLabeledReactSelectDropdown('Venue', value);
    await expect(this.page.getByText(chosen, { exact: false }).first()).toBeVisible();
    this.logInfo(`✓ Venue selected: ${chosen}`);
  }

  private async requireA3rdPartyToBePresent(answer?: string): Promise<void> {
    await this.answerRadioQuestionIfExists('Does the client require a 3rd party to be present', answer);
  }

  public async clickAddThirdPartyButton(): Promise<void> {
    const btn = this.page.getByText('Add Third Party', { exact: false }).first();
    if (!(await btn.count())) return;

    await expect(btn).toBeVisible();
    await expect(btn).toBeEnabled();

    await btn.click();
    this.logInfo('✓ Clicked "Add Third Party"');
  }

  private async selectThirdPartyTitle(value?: string): Promise<void> {
    if (await this.elementNotExists('Title')) return;

    const chosen = await this.action.chooseFromLabeledReactSelectDropdown('Title', value);
    await expect(this.page.getByText(chosen, { exact: false }).first()).toBeVisible();
    this.logInfo(`✓ Third party Title selected: ${chosen}`);
  }

  private async fillFirstAndLastName(): Promise<void> {
    const forename = TestDataGenerator.firstName();
    const surname = TestDataGenerator.lastName();

    if (await this.page.getByText('First Name', { exact: false }).count()) {
      await this.action.fillInputByLabel('First Name', forename);

      const input = this.page.getByLabel('First Name', { exact: false });
      if ((await input.count()) > 0) {
        await expect(input).toHaveValue(forename);
      }
    }

    if (await this.page.getByText('Surname', { exact: false }).count()) {
      await this.action.fillInputByLabel('Surname', surname);

      const input = this.page.getByLabel('Surname', { exact: false });
      if ((await input.count()) > 0) {
        await expect(input).toHaveValue(surname);
      }
    }
  }

  private async selectRelationship(value?: string): Promise<void> {
    if (await this.elementNotExists('Relationship')) return;

    const chosen = await this.action.chooseFromLabeledReactSelectDropdown('Relationship', value);

    await expect(this.page.getByText(chosen, { exact: false }).first()).toBeVisible();
    this.logInfo(`✓ Relationship selected: ${chosen}`);
  }

  private async fillContactNumber(): Promise<void> {
    const number = TestDataGenerator.phone();

    if (await this.elementNotExists('Contact number')) return;

    await this.action.fillInputByLabel('Contact number', number);

    const input = this.page.getByLabel('Contact number', { exact: false });
    if ((await input.count()) > 0) {
      await expect(input).toHaveValue(number);
    }

    this.logInfo(`✓ Contact number: ${number}`);
  }

  private async fillThirdPartyAddress(): Promise<void> {
    const address = TestDataGenerator.generateUKAddress({ useRealPostcode: true });

    const address1 = address.buildingName
      ? `${address.buildingName}, ${address.street}`
      : `${address.buildingNumber} ${address.street}`;

    // Address 1
    if (await this.page.getByText('Address 1', { exact: false }).count()) {
      await this.action.fillInputByLabel('Address 1', address1);

      const input = this.page.getByLabel('Address 1', { exact: false });
      if ((await input.count()) > 0) {
        await expect(input).toHaveValue(address1);
      }
    }

    // Town/City
    if (await this.page.getByText('Town or City', { exact: false }).count()) {
      await this.action.fillInputByLabel('Town or City', address.town);

      const input = this.page.getByLabel('Town or City', { exact: false });
      if ((await input.count()) > 0) {
        await expect(input).toHaveValue(address.town);
      }
    }

    // County
    if (await this.page.getByText('County', { exact: false }).count()) {
      await this.action.fillInputByLabel('County', address.county ?? '');

      const input = this.page.getByLabel('County', { exact: false });
      if ((await input.count()) > 0) {
        await expect(input).toHaveValue(address.county ?? '');
      }
    }

    // Postcode
    if (await this.page.getByText('Postcode', { exact: false }).count()) {
      await this.action.fillInputByLabel('Postcode', address.postcode);

      const input = this.page.getByLabel('Postcode', { exact: false });
      if ((await input.count()) > 0) {
        await expect(input).toHaveValue(address.postcode);
      }
    }

    // Country (select) — choose specific or random
    await this.selectCountry('United Kingdom of Great Britain and Northern Ireland');

    this.logInfo(`✓ Address entered: ${address.fullAddress}`);
  }

  private async selectCountry(value?: string): Promise<void> {
    if (await this.elementNotExists('Country')) return;

    const chosen = await this.action.chooseFromLabeledReactSelectDropdown('Country', value);
    await expect(this.page.getByText(chosen, { exact: false }).first()).toBeVisible();
    this.logInfo(`✓ Country selected: ${chosen}`);
  }

  private async selectPresentAtMeeting(answer?: string): Promise<void> {
    await this.answerRadioQuestionIfExists('Present at Meeting', answer);
  }

  private async fillNotesIfPresent(): Promise<void> {
    if (await this.elementNotExists('Notes')) return;

    const notes = TestDataGenerator.shortText();
    await this.action.fillInputByLabel('Notes', notes);

    const input = this.page.getByLabel('Notes', { exact: false });
    if ((await input.count()) > 0) {
      await expect(input).toHaveValue(notes);
    }

    this.logInfo('✓ Notes filled');
  }

  private async selectIf3rdPartyPowerOfAttorney(answer?: string): Promise<void> {
    await this.answerRadioQuestionIfExists('Is the 3rd Party Power of Attorney', answer);
  }
}
