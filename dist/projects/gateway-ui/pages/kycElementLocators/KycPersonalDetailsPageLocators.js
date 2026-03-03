"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycPersonalDetailsPageLocators = void 0;
const src_1 = require("@/framework/src");
class KycPersonalDetailsPageLocators extends src_1.BasePage {
    constructor(page, config = {}) {
        super(page, config);
    }
    // ============================
    // Address (Address Index: 1)
    // ============================
    get addressSearch() {
        return this.page.getByRole('combobox', {
            name: 'Search for your address',
        });
    }
    get addressLine1() {
        return this.page.getByTestId('input-person.addresses.1.addressOne');
    }
    get addressLine2() {
        return this.page.getByTestId('input-person.addresses.1.addressTwo');
    }
    get city() {
        return this.page.getByTestId('input-person.addresses.1.city');
    }
    get county() {
        return this.page.getByTestId('input-person.addresses.1.county');
    }
    get postcode() {
        return this.page.getByTestId('input-person.addresses.1.postcode');
    }
    get country() {
        return this.page.locator('input[id="person.addresses.1.country"]');
    }
    // Second address move-in date (2nd on the page)
    get secondMoveInDate() {
        return this.page.locator('input[id="person.addresses.1.moveInDate"]');
    }
    // ============================
    // Children / Dependants
    // ============================
    get dependentOneFirstName() {
        return this.page.getByTestId('input-person.dependents.0.name');
    }
    get dependentOneSurname() {
        return this.page.getByTestId('input-person.dependents.0.surname');
    }
    get dependentOneRelationship() {
        return this.page.locator('input[id="person.dependents.0.relationship"]');
    }
    get dependentOneDependantUntil() {
        return this.page.locator('input[id="person.dependents.0.dependantUntil"]');
    }
    get dependentOneSexAtBirth() {
        return this.page.locator('input[id="person.dependents.0.gender"]');
    }
    get dependentOneDateOfBirth() {
        return this.page.locator('input[id="person.dependents.0.birthDate"]');
    }
}
exports.KycPersonalDetailsPageLocators = KycPersonalDetailsPageLocators;
//# sourceMappingURL=KycPersonalDetailsPageLocators.js.map