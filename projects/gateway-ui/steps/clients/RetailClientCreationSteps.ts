// projects/gateway-ui/steps/clients/RetailClientCreationSteps.ts
import { Page, expect } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';
import { SideNavService } from '@steps/components/SideNav';
import { ClientCreationPageLocators } from '@pages/clients/ClientCreationPageLocators';
import { AlertService } from '@steps/components/AlertService';
import { DatePickerService } from '@steps/components/DatePicker';
import { FormsComponent } from '@pages/componentsLocator/FormsLocators';
import { TestDataGenerator } from '@framework/utils/TestDataGenerator';
import { dataStore } from '@framework/utils/DataStore';
import type { RetailClientData, RetailClientFormResult } from './fact_find/types/RetailClientCreation.types';

export class RetailClientCreationSteps extends BasePage {
  /* -------------------- Dependencies -------------------- */
  private readonly clientPage: ClientCreationPageLocators;
  private readonly alert: AlertService;
  private readonly datePicker: DatePickerService;
  private readonly formsComponent: FormsComponent;

  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
    this.clientPage = new ClientCreationPageLocators(page, config);
    this.alert = new AlertService(page, config);
    this.datePicker = new DatePickerService(page);
    this.formsComponent = new FormsComponent(page);
  }

  /* -------------------- Verification -------------------- */

  public async verifyClientPage(): Promise<void> {
    await this.wait.waitForUrlToMatch('**/clientfiles/createclient');
    await expect(this.page).toHaveTitle('Gateway | Create Client Record(s)');
  }

  public async executeNavigateToAddClient(sideNav: SideNavService): Promise<void> {
    await sideNav.clickSideMenuItem('Clients', 'Add Client');
    await this.verifyClientPage();
  }

  /* -------------------- Main Flow -------------------- */

  public async createClient(clientData: RetailClientData = {}): Promise<RetailClientFormResult> {
    const selectedGatewayClient = await this.completeRetailClientForm(clientData);

    await this.action.clickButtonByText('Save Details', false);
    await this.alert.handleClientCreationSuccessAlert('OK');

    dataStore.setValue('selected.gatewayClient', selectedGatewayClient);

    return selectedGatewayClient;
  }

  public async completeRetailClientForm(
    data: RetailClientData = {}
  ): Promise<RetailClientFormResult> {
    const names = TestDataGenerator.personName(data.forename, data.surname);

    // Select2 / fallback dropdowns
    const adviserLabel = await this.selectAdviser();
    const title = await this.selectTitle();
    const sourceOfEnquiry = await this.selectSourceOfEnquiry();

    // Required fields
    await this.fillForename(names.forename);
    await this.fillSurname(names.surname);

    // Optional fields (each has its own method now)
    await this.fillOptionalContactFields(data);

    // Standard dropdowns (non-select2)
    const gender = await this.selectGender(data.gender);
    const maritalStatus = await this.selectMaritalStatus(data.maritalStatus);
    const activePlan = await this.selectActivePlan(data.activePlan);

    // DOB
    const dob = data.dob ?? this.datePicker.generateRandomDOB();
    await this.selectDOB(dob);

    return {
      adviserLabel,
      title,
      forename: names.forename,
      surname: names.surname,
      knownAs: data.knownAs,
      gender,
      dob,
      maritalStatus,
      activePlan,
      sourceOfEnquiry,
      specificSource: data.specificSource,
      niNumber: data.niNumber,
    };
  }

  /* -------------------- Dropdown Selections (Select2 / Fallback) -------------------- */

  private async selectAdviser(value?: string): Promise<string> {
    return this.action.selectSelect2AndVerify(
      'Adviser',
      this.clientPage.adviserTrigger,
      this.clientPage.s2Options,
      this.clientPage.adviserRendered,
      value
    );
  }

  private async selectTitle(value?: string): Promise<string> {
    return this.action.selectSelect2AndVerify(
      'Title',
      this.clientPage.titleTrigger,
      this.clientPage.s2Options,
      this.clientPage.titleRendered,
      value
    );
  }

  private async selectSourceOfEnquiry(value?: string): Promise<string> {
    return this.action.selectSelect2AndVerify(
      'Source of Enquiry',
      this.clientPage.sourceTrigger,
      this.clientPage.s2Options,
      this.clientPage.sourceRendered,
      value
    );
  }

  /* -------------------- Standard Dropdowns -------------------- */

  private async selectGender(gender?: string): Promise<string | undefined> {
    return this.action.selectDropdownByLabel('Gender', gender).catch(() => undefined);
  }

  private async selectMaritalStatus(maritalStatus?: string): Promise<string | undefined> {
    return this.action
      .selectDropdownByLabel('Marital Status', maritalStatus)
      .catch(() => undefined);
  }

  private async selectActivePlan(activePlan?: string): Promise<string | undefined> {
    return this.action.selectDropdownByLabel('Active Plan', activePlan).catch(() => undefined);
  }

  /* -------------------- Required Input Fields -------------------- */

  private async fillForename(forename: string): Promise<void> {
    await this.action.fillInputByLabel('Forename', forename);
  }

  private async fillSurname(surname: string): Promise<void> {
    await this.action.fillInputByLabel('Surname', surname);
  }

  /* -------------------- Optional Input Fields (Individual Methods) -------------------- */

  private async fillKnownAs(knownAs?: string): Promise<void> {
    if (!knownAs) return;
    await this.action.fillInputByLabel('Known As', knownAs);
  }

  private async fillNINumber(niNumber?: string): Promise<void> {
    if (!niNumber) return;
    await this.action.fillInputByLabel('NI Number', niNumber);
  }

  private async fillSpecificSource(specificSource?: string): Promise<void> {
    if (!specificSource) return;
    await this.action.fillInputByLabel('Specific Source', specificSource);
  }

  private async fillEmailAddress(email?: string): Promise<void> {
    if (!email) return;
    await this.action.fillInputByLabel('Email Address', email);
  }

  private async fillHomePhone(homePhone?: string): Promise<void> {
    if (!homePhone) return;
    await this.action.fillInputByLabel('Home Phone', homePhone);
  }

  private async fillMobilePhone(mobilePhone?: string): Promise<void> {
    if (!mobilePhone) return;
    await this.action.fillInputByLabel('Mobile Phone', mobilePhone);
  }

  /**
   * Thin orchestrator to keep the main flow clean,
   * while still giving each field its own method (easy reuse + debugging).
   */
  private async fillOptionalContactFields(data: RetailClientData): Promise<void> {
    await this.fillKnownAs(data.knownAs);
    await this.fillNINumber(data.niNumber);
    await this.fillSpecificSource(data.specificSource);
    await this.fillEmailAddress(data.email);
    await this.fillHomePhone(data.homePhone);
    await this.fillMobilePhone(data.mobilePhone);
  }

  /* -------------------- Date Handling -------------------- */

  private async selectDOB(dob: string): Promise<void> {
    await this.datePicker.selectDOB(() => this.formsComponent.clientDOB, dob);
  }

  /* -------------------- Helpers -------------------- */


}










