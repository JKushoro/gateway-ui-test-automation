// projects/gateway-ui/steps/clients/CorporateClientCreationSteps.ts
import { Page, expect } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';
import { ClientCreationPageLocators } from '@pages/clients/ClientCreationPageLocators';
import { PostcodeLookupService } from '@steps/components/PostcodeLookup';
import { AlertService } from '@steps/components/AlertService';
import { SideNavService } from '@steps/components/SideNav';
import { FormsComponent } from '@pages/componentsLocator/FormsLocators';
import { DatePickerService } from '@steps/components/DatePicker';
import { TestDataGenerator } from '@framework/utils/TestDataGenerator';
import { dataStore } from '@framework/utils/DataStore';

/** Corporate Client Creation Form Data (UI shown in screenshot) */
export type CorporateClientData = {
  companyName?: string;
  dateEstablished?: string;        // dd/MM/yyyy
  emailAddress?: string;
  phone?: string;
  activePlanLabel?: string;
  adviserLabel?: string;           // Select2
  contactForename?: string;
  contactSurname?: string;
};

export type CorporateClientFormResult = {
  companyName: string;
  dateEstablished: string | undefined;
  emailAddress: string;
  phone: string;
  activePlanLabel: string | undefined;
  adviserLabel: string | undefined;
  contactForename: string;
  contactSurname: string;
};

/**
 * AddCorporateClientSteps – all corporate-specific behaviour lives here.
 */
export class AddCorporateClientSteps extends BasePage {
  private readonly clientPage: ClientCreationPageLocators;
  private readonly postcode: PostcodeLookupService;
  private readonly alert: AlertService;

  // Local helpers kept here so FormsService stays generic
  private readonly formsComponent: FormsComponent;
  private readonly datePicker: DatePickerService;

  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
    this.clientPage = new ClientCreationPageLocators(page, config);
    this.postcode = new PostcodeLookupService(page);
    this.alert = new AlertService(page, config);

    this.formsComponent = new FormsComponent(page);
    this.datePicker = new DatePickerService(page);
  }

  /** Navigate via side nav */
  async executeNavigateToAddCorporateClient(sideNav: SideNavService): Promise<void> {
    await sideNav.clickSideMenuItem('Clients', 'Add Corporate Client');
    await this.verifyCorporateClientPage();
  }

  /** Verify page URL + title */
  public async verifyCorporateClientPage(): Promise<void> {
    await this.wait.waitForUrlToMatch('**/clientfiles/createcorporateclient');
    await expect(this.page).toHaveTitle('Gateway | Create Corporate Client');
  }

  /** Main happy path: fill, postcode lookup, submit, alert handling */
  async createCorporateClient(
    formData?: CorporateClientData,
    postcode?: string
  ): Promise<{ formData: CorporateClientFormResult; selectedAddress: string }> {
    const usedFormData = await this.fillCorporateClientForm(formData);

    // postcode lookup + store for later assertions
    const selectedAddress = await this.postcode.performPostcodeLookup(postcode);
    dataStore.setValue('formData.selectedAddress', selectedAddress);

    await this.submitForm();
    await this.confirmCorporateClientCreation()

    return { formData: usedFormData, selectedAddress };
  }

  /** Just submits the page */
  async submitForm(): Promise<void> {
    await this.action.clickButtonByText('Create Corporate Client', false);
  }

  /** One-call flow with a sanity check */
  async executeCompleteClientCreation(): Promise<void> {
    const result = await this.createCorporateClient();
    if (!result.formData.companyName) {
      throw new Error('Corporate client creation failed - no company name generated');
    }
  }

  // ------------------------------------------------------------------
  // Corporate-specific form fill
  // ------------------------------------------------------------------
  public async fillCorporateClientForm(data: CorporateClientData = {}): Promise<CorporateClientFormResult> {
    const contact = this.makeContactNames(data.contactForename, data.contactSurname);

    const generated = {
      contactForename: contact.forename,
      contactSurname: contact.surname,
      companyName: data.companyName ?? TestDataGenerator.companyName(),
      email: data.emailAddress ?? TestDataGenerator.email({ first: contact.forename, last: contact.surname }),
      phone: data.phone ?? TestDataGenerator.phone(),
    };

    // Persist commonly re-used values with gateway prefix for consistency
    this.persist('gateway.formData', generated);
    // Also persist without prefix for backward compatibility
    this.persist('formData', generated);

    // Basic text inputs
    await this.action.fillInputByLabel('Company Name', generated.companyName);
    await this.action.fillInputByLabel('Email Address', generated.email);
    await this.action.fillInputByLabel('Phone', generated.phone);
    await this.action.fillInputByLabel('Contact Forename', generated.contactForename);
    await this.action.fillInputByLabel('Contact Surname', generated.contactSurname);

    // Date Established (either provided or "today" via datepicker)
    const dateEstablished = await this.handleDateEstablished(data.dateEstablished);
    dataStore.setValue('gateway.formData.dateEstablished', dateEstablished);
    dataStore.setValue('formData.dateEstablished', dateEstablished);

// Adviser
    let adviserLabel: string | undefined;
    try {
      adviserLabel = await this.action.selectDropdownByLabel('Adviser');
    } catch {
      adviserLabel = await this.action.selectSelect2(
        this.clientPage.adviserTrigger,
        this.clientPage.s2Options,
        this.clientPage.adviserRendered
      );
    }


    // Active Plan (native select; several label variants exist)
    const activePlanLabel = await this.action
      .selectDropdownByAnyLabel(['Active Plan', 'Active Plan *', 'ActivePlan'], data.activePlanLabel)
      .catch(() => undefined);

    const result: CorporateClientFormResult = {
      companyName: generated.companyName,
      dateEstablished,
      emailAddress: generated.email,
      phone: generated.phone,
      activePlanLabel,
      adviserLabel,
      contactForename: generated.contactForename,
      contactSurname: generated.contactSurname,
    };

    dataStore.setValue('gateway.formData.complete', result);
    dataStore.setValue('formData.complete', result);
    return result;
  }

  /** Confirm the “Corporate Client Created” success alert (clicks OK) */
  public async confirmCorporateClientCreation(): Promise<void> {
    await this.alert.handleClientCreationSuccessAlert('OK');
  }

  // --------------------- private helpers ---------------------
  private makeContactNames(forename?: string, surname?: string): { forename: string; surname: string } {
    return {
      forename: forename ?? TestDataGenerator.firstName(),
      surname: surname ?? TestDataGenerator.lastName(),
    };
  }

  private persist(prefix: string, obj: Record<string, unknown>): void {
    for (const [k, v] of Object.entries(obj)) dataStore.setValue(`${prefix}.${k}`, v);
  }

  private async handleDateEstablished(date?: string): Promise<string | undefined> {
    if (date) {
      await this.formsComponent.dateEstablished.fill(date);
      return date;
    }
    return this.datePicker.setToday(() => this.formsComponent.dateEstablished);
  }
}
