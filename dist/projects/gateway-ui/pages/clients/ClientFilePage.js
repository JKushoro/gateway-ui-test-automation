"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientFilePage = void 0;
const BasePage_1 = require("@framework/core/BasePage");
class ClientFilePage extends BasePage_1.BasePage {
    constructor(page, config = {}) {
        super(page, config);
        // Navigation Bar Locators
        this.navigationBarLocator = this.page.locator('nav.navbar.navbar-default.gatewaynavbar');
        this.navLinksLocator = this.navigationBarLocator.locator('ul.nav.navbar-nav li a');
        // Company Details Section Locators
        this.companyDetailsSection = this.page
            .locator('.ibox')
            .filter({ hasText: 'Company Details' });
        this.companyNameLocator = this.companyDetailsSection
            .locator('.form-group')
            .filter({ hasText: 'Company Name' })
            .locator('.col-md-7 span');
        this.contactNameLocator = this.companyDetailsSection
            .locator('.form-group')
            .filter({ hasText: 'Contact Name' })
            .locator('.col-md-7 span');
        this.contactForenameLocator = this.companyDetailsSection
            .locator('.form-group')
            .filter({ hasText: 'Contact Forename' })
            .locator('.col-md-7 span');
        this.contactSurnameLocator = this.companyDetailsSection
            .locator('.form-group')
            .filter({ hasText: 'Contact Surname' })
            .locator('.col-md-7 span');
        // Contact Details Section Locators
        this.contactDetailsSection = this.page
            .locator('.ibox')
            .filter({ hasText: 'Contact Details' });
        this.phoneLocator = this.contactDetailsSection
            .locator('.form-group')
            .filter({ hasText: 'Phone' })
            .locator('.col-md-7 span');
        this.emailAddressLocator = this.contactDetailsSection
            .locator('.form-group')
            .filter({ hasText: 'Email Address' })
            .locator('.col-md-7 a');
        // Address Details Section Locators
        this.addressDetailsSection = this.page
            .locator('.ibox')
            .filter({ hasText: 'Address Details' });
        this.addressLine1Locator = this.addressDetailsSection
            .locator('.form-group')
            .filter({ hasText: 'Line 1' })
            .locator('.col-md-7 span');
        this.addressLine2Locator = this.addressDetailsSection
            .locator('.form-group')
            .filter({ hasText: 'Line 2' })
            .locator('.col-md-7 span');
        this.townCityLocator = this.addressDetailsSection
            .locator('.form-group')
            .filter({ hasText: 'Town/City' })
            .locator('.col-md-7 span');
        this.countyLocator = this.addressDetailsSection
            .locator('.form-group')
            .filter({ hasText: 'County' })
            .locator('.col-md-7 span');
        this.postcodeLocator = this.addressDetailsSection
            .locator('.form-group')
            .filter({ hasText: 'Postcode' })
            .locator('.col-md-7 span');
    }
    // Public getters for navigation
    get navigationBar() {
        return this.navigationBarLocator;
    }
    get navLinks() {
        return this.navLinksLocator;
    }
    /**
     * Get navigation link by text
     */
    getNavLinkByText(linkText) {
        return this.navLinksLocator.filter({ hasText: linkText });
    }
    // Public getters for Company Details
    get companyName() {
        return this.companyNameLocator;
    }
    get contactName() {
        return this.contactNameLocator;
    }
    get contactForename() {
        return this.contactForenameLocator;
    }
    get contactSurname() {
        return this.contactSurnameLocator;
    }
    // Public getters for Contact Details
    get phone() {
        return this.phoneLocator;
    }
    get emailAddress() {
        return this.emailAddressLocator;
    }
    // Public getters for Address Details
    get addressLine1() {
        return this.addressLine1Locator;
    }
    get addressLine2() {
        return this.addressLine2Locator;
    }
    get townCity() {
        return this.townCityLocator;
    }
    get county() {
        return this.countyLocator;
    }
    get postcode() {
        return this.postcodeLocator;
    }
}
exports.ClientFilePage = ClientFilePage;
//# sourceMappingURL=ClientFilePage.js.map