"use strict";
// projects/gateway-ui/pages/clients/CreateCorporateClientPage.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCorporateClientPage = void 0;
const BasePage_1 = require("@framework/core/BasePage");
class CreateCorporateClientPage extends BasePage_1.BasePage {
    constructor(page, config = {}) {
        super(page, config);
        // Private locators
        this.createButtonLocator = this.page.getByRole('button', {
            name: 'Create Corporate Client',
        });
    }
    // Public getters
    get createButton() {
        return this.createButtonLocator;
    }
}
exports.CreateCorporateClientPage = CreateCorporateClientPage;
//# sourceMappingURL=CreateCorporateClientPage.js.map