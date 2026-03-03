"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormsComponent = void 0;
/**
 * FormsComponent - Essential locators for Forms-related pages/components
 *
 * Notes:
 * - Retail dropdowns are handled via ActionHelper.selectDropdownByLabel/ByAnyLabel
 * - Select2 handling is encapsulated in ActionHelper, with this component exposing only special cases.
 */
class FormsComponent {
    constructor(page) {
        this.page = page;
    }
    // =================================================
    // CORPORATE / CLIENT FIELDS
    // =================================================
    // Date Established (prefers label, falls back to id)
    get dateEstablished() {
        return this.page
            .getByLabel('Date Established', { exact: true })
            .or(this.page.locator('#DateEstablished'));
    }
    // Client DOB (explicit id)
    get clientDOB() {
        return this.page.locator('#ClientOneDOB');
    }
    // =================================================
    // FORM INPUT SELECTORS
    // =================================================
    // Generic form input selectors
    get checkboxInput() {
        return 'input[type="checkbox"]';
    }
    get radioInput() {
        return 'input[type="radio"]';
    }
    get textInput() {
        return 'input[type="text"]';
    }
    get emailInput() {
        return 'input[type="email"]';
    }
    get numberInput() {
        return 'input[type="number"]';
    }
    get selectDropdown() {
        return 'select';
    }
    get textareaInput() {
        return 'textarea';
    }
}
exports.FormsComponent = FormsComponent;
//# sourceMappingURL=FormsLocators.js.map