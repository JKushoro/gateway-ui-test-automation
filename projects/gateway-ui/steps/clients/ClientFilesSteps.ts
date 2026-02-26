// projects/gateway-ui/steps/clients/ClientFilesSteps.ts
import { BasePage } from '@framework/core/BasePage';
import { Page, expect } from '@playwright/test';
import { FrameworkConfig } from '@framework/types';
import { ClientDetailsPageLocators } from '@pages/clients/clientFiles/ClientDetailsPageLocators';
import { dataStore } from '@framework/utils/DataStore';

export class ClientFilesSteps extends BasePage {
  private readonly clientFilePage: ClientDetailsPageLocators;

  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
    this.clientFilePage = new ClientDetailsPageLocators(page, config);
  }

  // ---------------- Page checks ----------------

  public async verifyClientFilesPage(): Promise<void> {
    await this.wait.waitForUrlToMatch('**/clientfiles/details/**');
    await this.wait.waitForVisible('label:has-text("Company Name")');
    await expect(this.page).toHaveTitle(/Gateway \| Client Details/);
  }

  public async clickNavigationLink(linkText: string): Promise<void> {
    const navLink = this.clientFilePage.getNavLinkByText(linkText);
    await this.wait.waitForElement(navLink);
    await this.action.clickLocator(navLink);
  }

  // ---------------- Public flow ----------------

  public async executeStoredClientDataVerification(dataPrefix: string = 'formData'): Promise<void> {
    await this.verifyClientFilesPage();

    const matches = await this.verifyStoredClientDataMatches(dataPrefix);
    expect(matches).toBe(true);
  }

  // ---------------- Core verification ----------------

  private async verifyStoredClientDataMatches(dataPrefix: string): Promise<boolean> {
    const expected = this.getExpectedFromStore(dataPrefix);
    const actual = await this.getDisplayedClientData();

    return (
      this.same(expected.companyName, actual.companyName) &&
      this.same(expected.contactForename, actual.contactForename) &&
      this.same(expected.contactSurname, actual.contactSurname) &&
      this.samePhone(expected.phone, actual.phone) &&
      this.sameEmail(expected.emailAddress, actual.emailAddress) &&
      this.same(expected.addressLine1, actual.addressLine1)
    );
  }

  // ---------------- Data readers ----------------

  private async getDisplayedClientData(): Promise<{
    companyName: string;
    contactForename: string;
    contactSurname: string;
    phone: string;
    emailAddress: string;
    addressLine1: string;
  }> {
    await this.wait.waitForVisible('label:has-text("Company Name")');

    return {
      companyName: await this.action.getTextByLabel('Company Name'),
      contactForename: await this.action.getTextByLabel('Contact Forename'),
      contactSurname: await this.action.getTextByLabel('Contact Surname'),
      phone: await this.action.getTextByLabel('Phone'),
      emailAddress: await this.action.getTextByLabel('Email Address', 'a'),
      addressLine1: await this.action.getTextByLabel('Line 1'),
    };
  }

  private getExpectedFromStore(dataPrefix: string): {
    companyName: string;
    contactForename: string;
    contactSurname: string;
    phone: string;
    emailAddress: string;
    addressLine1: string;
  } {
    return {
      companyName: dataStore.getValue(`${dataPrefix}.companyName`) ?? '',
      contactForename: dataStore.getValue(`${dataPrefix}.contactForename`) ?? '',
      contactSurname: dataStore.getValue(`${dataPrefix}.contactSurname`) ?? '',
      phone: dataStore.getValue(`${dataPrefix}.phone`) ?? '',
      emailAddress: dataStore.getValue(`${dataPrefix}.email`) ?? '',
      addressLine1: dataStore.getValue(`${dataPrefix}.selectedAddress`) ?? '',
    };
  }

  // ---------------- Comparison helpers ----------------

  private same(a: string, b: string): boolean {
    return a.trim() === b.trim();
  }

  private sameEmail(a: string, b: string): boolean {
    return a.trim().toLowerCase() === b.trim().toLowerCase();
  }

  private samePhone(a: string, b: string): boolean {
    const digits = (s: string) => s.replace(/\D+/g, '');
    return digits(a) === digits(b);
  }
}
