"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostcodeLookupComponent = void 0;
/**
 * Postcode Lookup Component Locators
 * All selectors for the postcode lookup modal functionality
 */
class PostcodeLookupComponent {
    constructor(page) {
        this.page = page;
    }
    // Trigger button
    get postcodeLookupButton() {
        return this.page.locator('a.btn.btn-white:has-text("Postcode Lookup")');
    }
    // Modal elements
    get modal() {
        return this.page.locator('#mdlPostcode');
    }
    get modalContent() {
        return this.page.locator('#mdlPostcode .modal-content');
    }
    get modalHeader() {
        return this.page.locator('#mdlPostcode .modal-header');
    }
    get modalTitle() {
        return this.page.locator('#mdlPostcode .modal-title');
    }
    get closeButton() {
        return this.page.locator('#mdlPostcode .close');
    }
    // Form elements
    get postcodeInput() {
        return this.page.locator('#Postcode');
    }
    get searchButton() {
        return this.page.locator('#btnPostCodeSearch');
    }
    // Address selection
    get chooseAddressSection() {
        return this.page.locator('#divChooseAddress');
    }
    get addressDropdown() {
        return this.page.locator('#ddlPostcode');
    }
    get chooseAddressButton() {
        return this.page.locator('#btn_choose');
    }
    // Address options
    get addressOptions() {
        return this.page.locator('#ddlPostcode option');
    }
    get validAddressOptions() {
        return this.page.locator('#ddlPostcode option:not(:first-child)');
    }
    // Modal footer
    get modalFooter() {
        return this.page.locator('#mdlPostcode .modal-footer');
    }
    get modalCloseButton() {
        return this.page.locator('#mdlPostcode .modal-footer .btn-white');
    }
    // Helper methods for specific address selection
    addressOptionByText(addressText) {
        return this.page.locator(`#ddlPostcode option:has-text("${addressText}")`);
    }
    addressOptionByIndex(index) {
        return this.page.locator(`#ddlPostcode option:nth-child(${index + 1})`);
    }
    // Material-UI address search elements
    get muiAddressMenu() {
        return this.page.locator('.MuiPaper-root.MuiMenu-paper');
    }
    get muiAddressMenuItems() {
        return this.page.locator('.MuiMenuItem-root[role="menuitem"]');
    }
}
exports.PostcodeLookupComponent = PostcodeLookupComponent;
//# sourceMappingURL=PostcodeLookupLocators.js.map