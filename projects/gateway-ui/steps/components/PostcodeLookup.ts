import { Page } from '@playwright/test';
import { PostcodeLookupComponent } from '@pages/componentsLocator/PostcodeLookupLocators';
import { BasePage } from '@framework/core/BasePage';
import { TestDataGenerator } from '@framework/utils/TestDataGenerator';
import { FrameworkConfig } from '@framework/types';

/**
 * Postcode Lookup Service
 * Handles postcode lookup modal interactions with clean, structured methods
 */
export class PostcodeLookupService extends BasePage {
  private readonly pc: PostcodeLookupComponent;
  
  // Constants for better maintainability
  private static readonly DROPDOWN_SELECTOR = '#ddlPostcode';
  private static readonly POSTCODE_INPUT_SELECTOR = '#Postcode';
  private static readonly EXCLUDE_TEXT = 'Select Address';

  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
    this.pc = new PostcodeLookupComponent(page);
  }

  // =============================
  // PUBLIC API METHODS
  // =============================

  /**
   * Complete postcode lookup workflow
   * Main method that orchestrates the entire flow
   */
  public async performPostcodeLookup(postcode?: string): Promise<string> {
    const postcodeToUse = postcode ?? TestDataGenerator.postcode();
    
    await this.openModal();
    await this.searchForAddresses(postcodeToUse);
    const selectedAddress = await this.selectRandomAddress();
    await this.confirmSelection();
    
    return selectedAddress;
  }

  /**
   * Open the postcode lookup modal
   */
  public async openPostcodeLookup(): Promise<void> {
    await this.openModal();
  }

  /**
   * Search for addresses using a postcode
   */
  public async searchPostcode(postcode: string): Promise<void> {
    await this.searchForAddresses(postcode);
  }

  /**
   * Select a random address from the results
   */
  public async selectRandomAddress(): Promise<string> {
    const validOptions = await this.action.getValidDropdownOptions(
      PostcodeLookupService.DROPDOWN_SELECTOR,
      PostcodeLookupService.EXCLUDE_TEXT
    );

    this.validateAddressOptions(validOptions);

    const randomIndex = Math.floor(Math.random() * validOptions.length);
    const selectedAddress = validOptions[randomIndex];

    return await this.action.selectDropdownOptionRobust(
      PostcodeLookupService.DROPDOWN_SELECTOR,
      selectedAddress,
      randomIndex
    );
  }

  /**
   * Confirm the selected address and close modal
   */
  public async chooseAddress(): Promise<void> {
    await this.confirmSelection();
  }

  /**
   * KYC Address Search Field - Material-UI autocomplete address search
   * Enters postcode into search field and randomly selects from dropdown menu
   * @param labelText - The label text of the address search field
   * @param postcode - Optional postcode to use (generates random if not provided)
   */
  public async kycAddressSearchField(labelText: string, postcode?: string): Promise<string> {
    const postcodeToUse = postcode ?? TestDataGenerator.postcode();
    
    // Fill the search address field using the provided label
    await this.action.fillInputByLabel(labelText, postcodeToUse);
    
    // Wait a moment for the autocomplete to trigger
    await this.wait.waitForTimeout(1000);
    
    // Wait for the Material-UI dropdown menu to appear
    await this.wait.waitForElement(this.pc.muiAddressMenu, 10000);
    await this.wait.waitForElement(this.pc.muiAddressMenuItems.first(), 5000);
    
    // Additional wait to ensure menu items are fully loaded
    await this.wait.waitForTimeout(500);
    
    // Verify menu items are actually visible and clickable
    const itemCount = await this.pc.muiAddressMenuItems.count();
    if (itemCount === 0) {
      throw new Error('No address menu items found after postcode search');
    }
    
    // Select random address with improved error handling
    try {
      return await this.selectRandomAddressFromMUIMenu();
    } catch (error) {
      throw new Error(`Failed to select address from dropdown: ${error}`);
    }
  }

  /**
   * Enhanced Material-UI menu item selection with better error handling
   */
  private async selectRandomAddressFromMUIMenu(): Promise<string> {
    const items = this.pc.muiAddressMenuItems;
    const count = await items.count();
    
    if (count === 0) {
      throw new Error('No menu items available for selection');
    }
    
    const randomIndex = Math.floor(Math.random() * count);
    const selectedItem = items.nth(randomIndex);
    
    // Get the text content before clicking (in case click changes DOM)
    const itemText = await selectedItem.textContent();
    if (!itemText?.trim()) {
      throw new Error(`Menu item at index ${randomIndex} has no text content`);
    }
    
    // Scroll the item into view if needed (handles off-screen menu positioning)
    await selectedItem.scrollIntoViewIfNeeded();
    
    // Ensure the item is visible and enabled before clicking
    await this.wait.waitForElement(selectedItem, 3000);
    
    // Force click to handle potential overlay issues
    await selectedItem.click({ force: true });
    
    // Wait for menu to close
    await this.wait.waitForElementToBeHidden(this.pc.muiAddressMenu, 3000);
    
    return itemText.trim();
  }

  // =============================
  // PRIVATE HELPER METHODS
  // =============================

  private async openModal(): Promise<void> {
    await this.action.clickLocator(this.pc.postcodeLookupButton);
    await this.wait.waitForElement(this.pc.modalContent, 5000);
    await this.wait.waitForTimeout(200);
  }

  private async searchForAddresses(postcode: string): Promise<void> {
    await this.wait.waitForElement(this.pc.postcodeInput);
    await this.action.fill(PostcodeLookupService.POSTCODE_INPUT_SELECTOR, postcode);
    await this.action.clickLocator(this.pc.searchButton);
    await this.waitForAddressResults();
  }

  private async waitForAddressResults(): Promise<void> {
    await this.wait.waitForElement(this.pc.chooseAddressSection, 10000);
    await this.action.waitForDropdownPopulation(
      PostcodeLookupService.DROPDOWN_SELECTOR,
      PostcodeLookupService.EXCLUDE_TEXT,
      10000
    );
    await this.wait.waitForTimeout(1000);
    await this.wait.waitForElement(this.pc.addressDropdown);
  }

  private validateAddressOptions(validOptions: string[]): void {
    if (validOptions.length === 0) {
      throw new Error('No valid addresses found in dropdown');
    }
  }

  private async confirmSelection(): Promise<void> {
    await this.action.clickLocator(this.pc.chooseAddressButton);
    await this.wait.waitForElementToBeHidden(this.pc.modal, 3000);
  }

}
