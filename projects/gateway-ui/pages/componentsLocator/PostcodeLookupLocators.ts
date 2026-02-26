import { Locator, Page } from '@playwright/test';

/**
 * Postcode Lookup Component Locators
 * All selectors for the postcode lookup modal functionality
 */
export class PostcodeLookupComponent {
  constructor(private readonly page: Page) {}

  // Trigger button
  get postcodeLookupButton(): Locator {
    return this.page.locator('a.btn.btn-white:has-text("Postcode Lookup")');
  }

  // Modal elements
  get modal(): Locator {
    return this.page.locator('#mdlPostcode');
  }

  get modalContent(): Locator {
    return this.page.locator('#mdlPostcode .modal-content');
  }

  get modalHeader(): Locator {
    return this.page.locator('#mdlPostcode .modal-header');
  }

  get modalTitle(): Locator {
    return this.page.locator('#mdlPostcode .modal-title');
  }

  get closeButton(): Locator {
    return this.page.locator('#mdlPostcode .close');
  }

  // Form elements
  get postcodeInput(): Locator {
    return this.page.locator('#Postcode');
  }

  get searchButton(): Locator {
    return this.page.locator('#btnPostCodeSearch');
  }

  // Address selection
  get chooseAddressSection(): Locator {
    return this.page.locator('#divChooseAddress');
  }

  get addressDropdown(): Locator {
    return this.page.locator('#ddlPostcode');
  }

  get chooseAddressButton(): Locator {
    return this.page.locator('#btn_choose');
  }

  // Address options
  get addressOptions(): Locator {
    return this.page.locator('#ddlPostcode option');
  }

  get validAddressOptions(): Locator {
    return this.page.locator('#ddlPostcode option:not(:first-child)');
  }

  // Modal footer
  get modalFooter(): Locator {
    return this.page.locator('#mdlPostcode .modal-footer');
  }

  get modalCloseButton(): Locator {
    return this.page.locator('#mdlPostcode .modal-footer .btn-white');
  }

  // Helper methods for specific address selection
  addressOptionByText(addressText: string): Locator {
    return this.page.locator(`#ddlPostcode option:has-text("${addressText}")`);
  }

  addressOptionByIndex(index: number): Locator {
    return this.page.locator(`#ddlPostcode option:nth-child(${index + 1})`);
  }

  // Material-UI address search elements
  get muiAddressMenu(): Locator {
    return this.page.locator('.MuiPaper-root.MuiMenu-paper');
  }

  get muiAddressMenuItems(): Locator {
    return this.page.locator('.MuiMenuItem-root[role="menuitem"]');
  }
}
