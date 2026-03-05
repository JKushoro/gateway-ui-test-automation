// projects/gateway-ui/steps/clients/ClientFilesSteps.ts
import { BasePage } from '@framework/core/BasePage';
import { Page, expect } from '@playwright/test';
import { FrameworkConfig } from '@framework/types';
import { ClientDetailsPageLocators } from '@pages/gatewayElementLocators/ClientDetailsPageLocators';
import { dataStore } from '@framework/utils/DataStore';

type VerificationResult = {
  companyName: boolean;
  contactForename: boolean;
  contactSurname: boolean;
  phone: boolean;
  emailAddress: boolean;
  addressMatches: boolean;
  allFieldsMatch: boolean;
};

type DisplayedClientData = {
  companyName: string;
  contactForename: string;
  contactSurname: string;
  phone: string;
  emailAddress: string;
  addressLine1: string;
  townCity: string;
  postcode: string;
};

type ExpectedClientData = {
  companyName: string;
  contactForename: string;
  contactSurname: string;
  phone: string;
  emailAddress: string;
  addressLine1: string; // from postcode lookup flow this is the stored "selectedAddress"
};

export class ClientFilesSteps extends BasePage {
  private readonly clientFilePage: ClientDetailsPageLocators;

  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
    this.clientFilePage = new ClientDetailsPageLocators(page, config);
  }

  /**
   * Ensure we are on the Client Files (Client Details) page.
   */
  public async verifyClientFilesPage(): Promise<void> {
    await this.wait.waitForUrlToMatch('**/clientfiles/details/**');
    await this.wait.waitForVisible('label:has-text("Company Name")');
    await expect(this.page).toHaveTitle(/Gateway \| Client Details/);
  }

  /**
   * Click a navigation link in the client file by its text.
   */
  public async clickNavigationLink(linkText: string): Promise<void> {
    const navLink = this.clientFilePage.getNavLinkByText(linkText);
    await this.wait.waitForElement(navLink);
    await this.action.clickLocator(navLink);
  }

  /**
   * Main workflow: verify page, then assert all stored data matches what is displayed.
   */
  public async executeStoredClientDataVerification(dataPrefix: string = 'formData'): Promise<void> {
    await this.verifyClientFilesPage();
    await this.assertStoredClientDataMatches(dataPrefix);
  }

  /**
   * Assert that stored data matches displayed data (field-by-field).
   */
  public async assertStoredClientDataMatches(dataPrefix: string = 'formData'): Promise<void> {
    const result: VerificationResult = await this.verifyStoredClientDataMatches(dataPrefix);

    expect(result.companyName).toBe(true);
    expect(result.contactForename).toBe(true);
    expect(result.contactSurname).toBe(true);
    expect(result.phone).toBe(true);
    expect(result.emailAddress).toBe(true);
    expect(result.addressMatches).toBe(true);
    expect(result.allFieldsMatch).toBe(true);
  }

  /**
   * Compare stored vs displayed and return a per-field result.
   */
  public async verifyStoredClientDataMatches(dataPrefix: string = 'formData'): Promise<VerificationResult> {
    const expected: ExpectedClientData = this.getExpectedFromStore(dataPrefix);
    const actual: DisplayedClientData = await this.getDisplayedClientData();

    const companyNameMatches     = this.same(expected.companyName,     actual.companyName);
    const contactForenameMatches = this.same(expected.contactForename, actual.contactForename);
    const contactSurnameMatches  = this.same(expected.contactSurname,  actual.contactSurname);
    const phoneMatches           = this.samePhone(expected.phone,      actual.phone);
    const emailAddressMatches    = this.sameEmail(expected.emailAddress, actual.emailAddress);
    const addressMatches         = this.same(expected.addressLine1,    actual.addressLine1);

    const allFieldsMatch =
      companyNameMatches &&
      contactForenameMatches &&
      contactSurnameMatches &&
      phoneMatches &&
      emailAddressMatches &&
      addressMatches;

    return {
      companyName: companyNameMatches,
      contactForename: contactForenameMatches,
      contactSurname: contactSurnameMatches,
      phone: phoneMatches,
      emailAddress: emailAddressMatches,
      addressMatches,
      allFieldsMatch,
    };
  }

  /**
   * Read all client data displayed on the page (single pass).
   */
  public async getDisplayedClientData(): Promise<DisplayedClientData> {
    await this.wait.waitForVisible('label:has-text("Company Name")');

    return {
      companyName:     await this.action.getTextByLabel('Company Name'),
      contactForename: await this.action.getTextByLabel('Contact Forename'),
      contactSurname:  await this.action.getTextByLabel('Contact Surname'),
      phone:           await this.action.getTextByLabel('Phone'),
      emailAddress:    await this.action.getTextByLabel('Email Address', 'a'),
      addressLine1:    await this.action.getTextByLabel('Line 1'),
      townCity:        await this.action.getTextByLabel('Town/City'),
      postcode:        await this.action.getTextByLabel('Postcode'),
    };
  }

  /**
   * Pull expected values from the DataStore.
   */
  private getExpectedFromStore(dataPrefix: string): ExpectedClientData {
    return {
      companyName:     dataStore.getValue<string>(`${dataPrefix}.companyName`)      ?? '',
      contactForename: dataStore.getValue<string>(`${dataPrefix}.contactForename`)  ?? '',
      contactSurname:  dataStore.getValue<string>(`${dataPrefix}.contactSurname`)   ?? '',
      phone:           dataStore.getValue<string>(`${dataPrefix}.phone`)            ?? '',
      emailAddress:    dataStore.getValue<string>(`${dataPrefix}.email`)            ?? '',
      addressLine1:    dataStore.getValue<string>(`${dataPrefix}.selectedAddress`)  ?? '',
    };
  }

  // -------- simple comparison helpers (clear & readable) --------

  /**
   * Trim-only comparison for plain text fields.
   */
  private same(a: string, b: string): boolean {
    return a.trim() === b.trim();
  }

  /**
   * Email comparison: trim and lower-case.
   */
  private sameEmail(a: string, b: string): boolean {
    return a.trim().toLowerCase() === b.trim().toLowerCase();
  }

  /**
   * Phone comparison: compare only digits (ignores spaces, dashes, brackets).
   * If you want strict comparison instead, replace with `return this.same(a, b)`.
   */
  private samePhone(a: string, b: string): boolean {
    const digits = (s: string): string => s.replace(/\D+/g, '');
    return digits(a) === digits(b);
  }
}
