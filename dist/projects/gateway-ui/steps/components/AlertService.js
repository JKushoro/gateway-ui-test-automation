"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertService = void 0;
const BasePage_1 = require("@framework/core/BasePage");
const AlertServiceLocator_1 = require("@components/AlertServiceLocator");
class AlertService extends BasePage_1.BasePage {
    constructor(page, config) {
        super(page, config);
        this.alert = new AlertServiceLocator_1.AlertComponent(page);
    }
    /**
     * Waits for a visible alert, optionally asserts title/message,
     * clicks the button by exact text, then waits for dismissal.
     */
    async handleAlertByButton(buttonText, expectedTitle, expectedMessage) {
        const container = this.alert.container;
        // Wait for alert container
        await this.wait.waitForElement(container);
        // Optional assertions
        if (expectedTitle) {
            await this.assert.assertElementHasText(this.alert.title, expectedTitle);
        }
        if (expectedMessage) {
            // Single assertion is enough — it auto-waits
            await this.assert.assertElementContainsText(this.alert.message, expectedMessage);
        }
        // Click and wait for dismissal
        await this.action.clickButtonByTextIn(buttonText, container);
        await this.wait.waitForLocatorToBeHidden(container);
    }
    /** Convenience: “Client Created” */
    async handleClientCreationSuccessAlert(buttonText) {
        await this.handleAlertByButton(buttonText, 'Client Created', 'The client record was created successfully');
    }
    /** Convenience: “Enable client for new fact find?” */
    async handleEnableClientForNewFactFind(buttonText) {
        await this.handleAlertByButton(buttonText, 'Enable client for new fact find?', 'Are you sure you want to enable this client for the new fact find?');
    }
}
exports.AlertService = AlertService;
//# sourceMappingURL=AlertService.js.map