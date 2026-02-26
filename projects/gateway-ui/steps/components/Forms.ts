
// projects/gateway-ui/steps/components/Forms.ts
import { Page } from '@playwright/test';
import { FormsComponent } from '@pages/componentsLocator/FormsLocators';
import { DatePickerService } from '@steps/components/DatePicker';
import { dataStore } from '@framework/utils/DataStore';
import { ActionHelper } from '@framework/helpers/ActionHelper';

/**
 * Gateway search form data structure
 * Used for tracking data generated from gateway forms
 */
export type GatewaySearchFormData = {
  forename?: string;
  surname?: string;
  company?: string;
  email?: string;
};

/**
 * FormsService – UI interaction service for filling gateway forms
 * All data stored with 'gateway.' prefix for clear tracking and comparison with KYC data
 */
export class FormsService {
  private readonly formsComponent: FormsComponent;
  private readonly datePicker: DatePickerService;
  private readonly action: ActionHelper;

  constructor(private readonly page: Page) {
    this.formsComponent = new FormsComponent(page);
    this.datePicker = new DatePickerService(page);
    this.action = new ActionHelper(page);
  }

  /**
   * Generic search form filler for gateway forms
   * Stores data with 'gateway.' prefix for clear identification
   */
  public async searchMinimalForm(
    data: GatewaySearchFormData = {},
    dataPrefix: string = 'gateway.formData'
  ): Promise<GatewaySearchFormData> {
    const searchData: GatewaySearchFormData = {
      forename: data.forename ?? dataStore.getValue<string>(`${dataPrefix}.contactForename`),
      surname: data.surname ?? dataStore.getValue<string>(`${dataPrefix}.contactSurname`),
      company: data.company ?? dataStore.getValue<string>(`${dataPrefix}.companyName`),
      email: data.email ?? dataStore.getValue<string>(`${dataPrefix}.email`),
    };

    if (searchData.forename) await this.action.fillInputByLabel('Forename', searchData.forename);
    if (searchData.surname) await this.action.fillInputByLabel('Surname', searchData.surname);
    if (searchData.company) await this.action.fillInputByLabel('Company/Trust Name', searchData.company);
    if (searchData.email) await this.action.fillInputByLabel('Email', searchData.email);

    // Store with gateway prefix for clear tracking
    dataStore.setValue(`${dataPrefix}.searchData`, searchData);
    dataStore.setValue('gateway.searchData.complete', searchData);
    
    return searchData;
  }

  /** Set date field to today using DatePicker service */
  public async setDateToday(locatorGetter: () => any): Promise<string> {
    return this.datePicker.setToday(locatorGetter);
  }
}
