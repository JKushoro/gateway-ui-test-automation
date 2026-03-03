"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertComponent = void 0;
/**
 * Alert Component Locators
 * Pure element selectors only — no logic or filtering.
 */
class AlertComponent {
    constructor(page) {
        this.page = page;
    }
    // =============================
    // CONTAINERS
    // =============================
    /** Visible alert or modal container */
    get container() {
        return this.page
            .locator('.swal2-container:visible, ' +
            '.sweet-alert.showSweetAlert.visible, ' +
            'section[role="dialog"]:visible, ' +
            'div[role="dialog"]:visible, ' +
            '.modal:visible')
            .first();
    }
    // =============================
    // ICONS
    // =============================
    get successIcon() {
        return this.container.locator('.swal2-success:visible, .sa-icon.sa-success:visible');
    }
    get errorIcon() {
        return this.container.locator('.swal2-error:visible, .sa-icon.sa-error:visible');
    }
    get warningIcon() {
        return this.container.locator('.swal2-warning:visible, .sa-icon.sa-warning:visible');
    }
    get infoIcon() {
        return this.container.locator('.swal2-info:visible, .sa-icon.sa-info:visible');
    }
    // =============================
    // TEXT CONTENT
    // =============================
    get title() {
        return this.container
            .locator('.swal2-title:visible, .sweet-alert h2:visible, h1:visible, h2:visible, h3:visible')
            .first();
    }
    get message() {
        return this.container
            .locator('.swal2-html-container:visible, .sweet-alert p:visible, p:visible')
            .first();
    }
    // =============================
    // BUTTONS
    // =============================
    get allButtons() {
        return this.container.locator('button:visible');
    }
    /** Optional convenience, keep if you actually need these: */
    get okButton() {
        return this.container.locator('.swal2-confirm:visible, .sweet-alert .confirm:visible, button:has-text("OK"):visible');
    }
    get cancelButton() {
        return this.container.locator('.swal2-cancel:visible, .sweet-alert .cancel:visible, button:has-text("Cancel"):visible');
    }
    // =============================
    // MISC (legacy SweetAlert)
    // =============================
    get fieldset() {
        return this.container.locator('.sweet-alert fieldset:visible');
    }
    get errorContainer() {
        return this.container.locator('.sweet-alert .sa-error-container:visible');
    }
    get errorMessage() {
        return this.container.locator('.sweet-alert .sa-error-container p:visible');
    }
}
exports.AlertComponent = AlertComponent;
//# sourceMappingURL=AlertServiceLocator.js.map