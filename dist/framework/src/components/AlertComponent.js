"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertComponent = void 0;
// framework/src/components/AlertComponent.ts
const test_1 = require("@playwright/test");
const BasePage_1 = require("@framework/core/BasePage");
/**
 * AlertComponent - Reusable component for handling different types of alerts
 * Supports both SweetAlert2 and custom alert implementations
 */
class AlertComponent extends BasePage_1.BasePage {
    constructor(page, config) {
        super(page, config);
    }
    /**
     * Get alert locators based on alert type
     */
    getAlertLocators(alertType) {
        switch (alertType) {
            case 'sweetAlert2':
                return {
                    container: this.page.locator('.swal2-container'),
                    successIcon: this.page.locator('.swal2-success'),
                    title: this.page.locator('.swal2-title'),
                    message: this.page.locator('.swal2-html-container p'),
                    okButton: this.page.locator('.swal2-confirm'),
                };
            case 'customAlert':
                return {
                    container: this.page.locator('h2:has-text("Client Created")').locator('..'),
                    successIcon: this.page.locator('h2:has-text("Client Created")'),
                    title: this.page.locator('h2:has-text("Client Created")'),
                    message: this.page.locator('p:has-text("The client record was created successfully")'),
                    okButton: this.page.locator('button:has-text("OK")'),
                };
            case 'legacySweetAlert':
                return {
                    container: this.page.locator('.sweet-alert.showSweetAlert.visible'),
                    successIcon: this.page.locator('.sa-icon.sa-success'),
                    title: this.page.locator('.sweet-alert h2'),
                    message: this.page.locator('.sweet-alert p'),
                    okButton: this.page.locator('.sweet-alert .cancel'),
                };
            default:
                throw new Error(`Unsupported alert type: ${alertType}`);
        }
    }
    /**
     * Auto-detect alert type based on what's present on the page
     */
    async detectAlertType() {
        // Wait a bit for alert to appear and check for SweetAlert2 first
        const swal2Container = this.page.locator('.swal2-container');
        try {
            await swal2Container.waitFor({ state: 'visible', timeout: 2000 });
            return 'sweetAlert2';
        }
        catch {
            // Continue to next check
        }
        // Check for legacy SweetAlert
        const legacyContainer = this.page.locator('.sweet-alert.showSweetAlert.visible');
        try {
            await legacyContainer.waitFor({ state: 'visible', timeout: 2000 });
            return 'legacySweetAlert';
        }
        catch {
            // Continue to next check
        }
        // Check for custom alert - wait for either heading or button
        const customTitle = this.page.locator('h2:has-text("Client Created")');
        const customButton = this.page.locator('button:has-text("OK")');
        try {
            await Promise.race([
                customTitle.waitFor({ state: 'visible', timeout: 2000 }),
                customButton.waitFor({ state: 'visible', timeout: 2000 })
            ]);
            return 'customAlert';
        }
        catch {
            // No alert detected
        }
        throw new Error('No supported alert type detected on the page');
    }
    /**
     * Assert client creation success alert with auto-detection
     */
    async assertClientCreationSuccessAlert(expectedTitle = 'Client Created', expectedMessage = 'The client record was created successfully', alertType) {
        // Auto-detect alert type if not specified
        const detectedType = alertType || await this.detectAlertType();
        const locators = this.getAlertLocators(detectedType);
        // Wait for and expect the alert container to be visible
        await this.wait.waitForElement(locators.container);
        await (0, test_1.expect)(locators.container).toBeVisible();
        // Expect the success icon to be displayed
        await (0, test_1.expect)(locators.successIcon).toBeVisible();
        // Expect the title text
        await (0, test_1.expect)(locators.title).toHaveText(expectedTitle);
        // Expect the success message - use first() to handle multiple p elements
        await (0, test_1.expect)(locators.message.first()).toHaveText(expectedMessage);
    }
    /**
     * Click OK button on success alert with auto-detection
     */
    async clickSuccessAlertOkButton(alertType) {
        // Auto-detect alert type if not specified
        const detectedType = alertType || await this.detectAlertType();
        const locators = this.getAlertLocators(detectedType);
        // Ensure the OK button is visible before clicking
        await this.wait.waitForElement(locators.okButton);
        await this.action.clickLocator(locators.okButton);
        // Wait for the alert to disappear - use title as it's more reliable
        await this.wait.waitForLocatorToBeHidden(locators.title);
    }
    /**
     * Complete alert handling workflow (assert + dismiss)
     */
    async handleClientCreationSuccessAlert(expectedTitle = 'Client Created', expectedMessage = 'The client record was created successfully', alertType) {
        await this.assertClientCreationSuccessAlert(expectedTitle, expectedMessage, alertType);
        await this.clickSuccessAlertOkButton(alertType);
    }
    /**
     * Get alert locators for external use (maintains backward compatibility)
     */
    getAlertElements(alertType) {
        return this.getAlertLocators(alertType);
    }
}
exports.AlertComponent = AlertComponent;
//# sourceMappingURL=AlertComponent.js.map