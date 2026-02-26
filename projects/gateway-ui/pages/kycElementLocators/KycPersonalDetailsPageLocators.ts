import { BasePage, FrameworkConfig } from '@/framework/src';
import { Page, Locator } from '@playwright/test';

export class KycPersonalDetailsPageLocators extends BasePage {
  constructor(page: Page, config: Partial<FrameworkConfig> = {}) {
    super(page, config);
  }

  // ============================
  // Address (Address Index: 1)
  // ============================

  get addressSearch(): Locator {
    return this.page.getByRole('combobox', {
      name: 'Search for your address',
    });
  }

  get addressLine1(): Locator {
    return this.page.getByTestId('input-person.addresses.1.addressOne');
  }

  get addressLine2(): Locator {
    return this.page.getByTestId('input-person.addresses.1.addressTwo');
  }

  get city(): Locator {
    return this.page.getByTestId('input-person.addresses.1.city');
  }

  get county(): Locator {
    return this.page.getByTestId('input-person.addresses.1.county');
  }

  get postcode(): Locator {
    return this.page.getByTestId('input-person.addresses.1.postcode');
  }

  get country(): Locator {
    return this.page.locator('input[id="person.addresses.1.country"]');
  }

  // Second address move-in date (2nd on the page)
  get secondMoveInDate(): Locator {
    return this.page.locator('input[id="person.addresses.1.moveInDate"]');
  }

  // ============================
  // Children / Dependants
  // ============================

  get dependentOneFirstName(): Locator {
    return this.page.getByTestId('input-person.dependents.0.name');
  }

  get dependentOneSurname(): Locator {
    return this.page.getByTestId('input-person.dependents.0.surname');
  }

  get dependentOneRelationship(): Locator {
    return this.page.locator('input[id="person.dependents.0.relationship"]');
  }

  get dependentOneDependantUntil(): Locator {
    return this.page.locator('input[id="person.dependents.0.dependantUntil"]');
  }

  get dependentOneSexAtBirth(): Locator {
    return this.page.locator('input[id="person.dependents.0.gender"]');
  }

  get dependentOneDateOfBirth(): Locator {
    return this.page.locator('input[id="person.dependents.0.birthDate"]');
  }
}
