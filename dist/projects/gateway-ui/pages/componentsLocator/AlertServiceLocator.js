"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertServiceLocator = void 0;
/**
 * Alert / Modal Component Locators
 * Pure element selectors only.
 */
class AlertServiceLocator {
    constructor(page) {
        this.page = page;
    }
    // ==========================================================
    // GENERIC ALERT CONTAINER
    // ==========================================================
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
    // ==========================================================
    // GENERIC ALERT CONTENT
    // ==========================================================
    get alertTitle() {
        return this.container
            .locator('.swal2-title:visible, .sweet-alert h2:visible, h1:visible, h2:visible, h3:visible')
            .first();
    }
    get alertMessage() {
        return this.container
            .locator('.swal2-html-container:visible, .sweet-alert p:visible, p:visible')
            .first();
    }
    // ==========================================================
    // ALERT ICONS
    // ==========================================================
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
    // ==========================================================
    // ALERT BUTTONS
    // ==========================================================
    get allButtons() {
        return this.container.locator('button:visible');
    }
    get okButton() {
        return this.container.locator('.swal2-confirm:visible, .sweet-alert .confirm:visible, button:has-text("OK"):visible');
    }
    get cancelButton() {
        return this.container.locator('.swal2-cancel:visible, .sweet-alert .cancel:visible, button:has-text("Cancel"):visible');
    }
    // ==========================================================
    // FACT FIND ABANDON MODAL
    // ==========================================================
    get abandonModal() {
        return this.getModalByTitle('Abandon Fact Find');
    }
    get abandonModalTitle() {
        return this.getModalTitle(this.abandonModal);
    }
    get abandonModalWarning() {
        return this.getModalWarning(this.abandonModal);
    }
    get abandonModalCloseButton() {
        return this.getModalCloseButton(this.abandonModal);
    }
    get abandonModalButton() {
        return this.getModalActionButton(this.abandonModal, 'Abandon');
    }
    // ==========================================================
    // FACT FIND ADD NAME MODAL
    // ==========================================================
    get addNameModal() {
        return this.getModalByTitle('Add Fact Find Name');
    }
    get addNameModalTitle() {
        return this.getModalTitle(this.addNameModal);
    }
    get addNameModalCloseButton() {
        return this.getModalCloseButton(this.addNameModal);
    }
    get addNameModalSaveButton() {
        return this.getModalActionButton(this.addNameModal, 'Save Name');
    }
    get nameModalInput() {
        return this.addNameModal.locator('#txtName');
    }
    // ==========================================================
    // FACT FIND EDIT NAME MODAL
    // ==========================================================
    get editNameModal() {
        return this.getModalByTitle('Edit Fact Find Name');
    }
    get editNameModalTitle() {
        return this.getModalTitle(this.editNameModal);
    }
    get editNameModalSaveButton() {
        return this.getModalActionButton(this.editNameModal, 'Save Name');
    }
    get nameEditModalInput() {
        return this.editNameModal.locator('#txtName_2');
    }
    // ==========================================================
    // FACT FIND ADD NOTE MODAL
    // ==========================================================
    get addNoteModal() {
        return this.getModalByTitle('Fact Find Notes');
    }
    get addNoteModalTitle() {
        return this.getModalTitle(this.addNoteModal);
    }
    get addNoteModalCloseButton() {
        return this.getModalCloseButton(this.addNoteModal);
    }
    get addNoteModalSaveButton() {
        return this.getModalActionButton(this.addNoteModal, 'Save Note');
    }
    get addNoteModalInput() {
        return this.addNoteModal.locator('#txtAdditionalNote');
    }
    // ==========================================================
    // FACT FIND ADD NOTE MODAL
    // ==========================================================
    get editNoteModal() {
        return this.getModalByTitle('Edit Fact Find Note');
    }
    get editNoteModalTitle() {
        return this.editNoteModal.locator('.modal-header .modal-title');
    }
    get editNoteModalSaveButton() {
        return this.getModalActionButton(this.editNoteModal, 'Save Note');
    }
    get editNoteModalInput() {
        return this.editNoteModal.locator('.note-editable[contenteditable="true"]');
    }
    // ==========================================================
    // LEGACY SWEET ALERT ELEMENTS
    // ==========================================================
    get fieldset() {
        return this.container.locator('.sweet-alert fieldset:visible');
    }
    get errorContainer() {
        return this.container.locator('.sweet-alert .sa-error-container:visible');
    }
    get errorMessage() {
        return this.container.locator('.sweet-alert .sa-error-container p:visible');
    }
    // ==========================================================
    // PRIVATE HELPER FUNCTIONS
    // ==========================================================
    /** Returns a modal container by modal title */
    getModalByTitle(title) {
        return this.page
            .locator('.modal-content')
            .filter({
            has: this.page.locator('.modal-title', { hasText: title }),
        })
            .first();
    }
    /** Returns the title element inside a modal */
    getModalTitle(modal) {
        return modal.locator('.modal-title');
    }
    /** Returns the warning message inside a modal */
    getModalWarning(modal) {
        return modal.locator('.alert-danger');
    }
    /** Returns the Close button inside a modal */
    getModalCloseButton(modal) {
        return modal.locator('button.btn-white:has-text("Close")');
    }
    /** Returns the main action button inside a modal */
    getModalActionButton(modal, buttonText) {
        return modal.locator(`button:has-text("${buttonText}")`);
    }
}
exports.AlertServiceLocator = AlertServiceLocator;
//# sourceMappingURL=AlertServiceLocator.js.map