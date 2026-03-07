import { Locator, Page } from '@playwright/test';

/**
 * Alert / Modal Component Locators
 * Pure element selectors only.
 */
export class AlertServiceLocator {
  constructor(private readonly page: Page) {}

  // ==========================================================
  // GENERIC ALERT CONTAINER
  // ==========================================================

  /** Visible alert or modal container */
  get container(): Locator {
    return this.page
      .locator(
        '.swal2-container:visible, ' +
          '.sweet-alert.showSweetAlert.visible, ' +
          'section[role="dialog"]:visible, ' +
          'div[role="dialog"]:visible, ' +
          '.modal:visible'
      )
      .first();
  }

  // ==========================================================
  // GENERIC ALERT CONTENT
  // ==========================================================

  get alertTitle(): Locator {
    return this.container
      .locator('.swal2-title:visible, .sweet-alert h2:visible, h1:visible, h2:visible, h3:visible')
      .first();
  }

  get alertMessage(): Locator {
    return this.container
      .locator('.swal2-html-container:visible, .sweet-alert p:visible, p:visible')
      .first();
  }

  // ==========================================================
  // ALERT ICONS
  // ==========================================================

  get successIcon(): Locator {
    return this.container.locator('.swal2-success:visible, .sa-icon.sa-success:visible');
  }

  get errorIcon(): Locator {
    return this.container.locator('.swal2-error:visible, .sa-icon.sa-error:visible');
  }

  get warningIcon(): Locator {
    return this.container.locator('.swal2-warning:visible, .sa-icon.sa-warning:visible');
  }

  get infoIcon(): Locator {
    return this.container.locator('.swal2-info:visible, .sa-icon.sa-info:visible');
  }

  // ==========================================================
  // ALERT BUTTONS
  // ==========================================================

  get allButtons(): Locator {
    return this.container.locator('button:visible');
  }

  get okButton(): Locator {
    return this.container.locator(
      '.swal2-confirm:visible, .sweet-alert .confirm:visible, button:has-text("OK"):visible'
    );
  }

  get cancelButton(): Locator {
    return this.container.locator(
      '.swal2-cancel:visible, .sweet-alert .cancel:visible, button:has-text("Cancel"):visible'
    );
  }

  // ==========================================================
  // FACT FIND ABANDON MODAL
  // ==========================================================

  get abandonModal(): Locator {
    return this.getModalByTitle('Abandon Fact Find');
  }

  get abandonModalTitle(): Locator {
    return this.getModalTitle(this.abandonModal);
  }

  get abandonModalWarning(): Locator {
    return this.getModalWarning(this.abandonModal);
  }

  get abandonModalCloseButton(): Locator {
    return this.getModalCloseButton(this.abandonModal);
  }

  get abandonModalButton(): Locator {
    return this.getModalActionButton(this.abandonModal, 'Abandon');
  }

  // ==========================================================
  // FACT FIND ADD NAME MODAL
  // ==========================================================

  get addNameModal(): Locator {
    return this.getModalByTitle('Add Fact Find Name');
  }

  get addNameModalTitle(): Locator {
    return this.getModalTitle(this.addNameModal);
  }

  get addNameModalCloseButton(): Locator {
    return this.getModalCloseButton(this.addNameModal);
  }

  get addNameModalSaveButton(): Locator {
    return this.getModalActionButton(this.addNameModal, 'Save Name');
  }

  get nameModalInput(): Locator {
    return this.addNameModal.locator('#txtName');
  }

  // ==========================================================
  // FACT FIND EDIT NAME MODAL
  // ==========================================================

  get editNameModal(): Locator {
    return this.getModalByTitle('Edit Fact Find Name');
  }

  get editNameModalTitle(): Locator {
    return this.getModalTitle(this.editNameModal);
  }

  get editNameModalSaveButton(): Locator {
    return this.getModalActionButton(this.editNameModal, 'Save Name');
  }

  get nameEditModalInput(): Locator {
    return this.editNameModal.locator('#txtName_2');
  }

  // ==========================================================
  // LEGACY SWEET ALERT ELEMENTS
  // ==========================================================

  get fieldset(): Locator {
    return this.container.locator('.sweet-alert fieldset:visible');
  }

  get errorContainer(): Locator {
    return this.container.locator('.sweet-alert .sa-error-container:visible');
  }

  get errorMessage(): Locator {
    return this.container.locator('.sweet-alert .sa-error-container p:visible');
  }

  // ==========================================================
  // PRIVATE HELPER FUNCTIONS
  // ==========================================================

  /** Returns a modal container by modal title */
  private getModalByTitle(title: string): Locator {
    return this.page
      .locator('.modal-content')
      .filter({
        has: this.page.locator('.modal-title', { hasText: title }),
      })
      .first();
  }

  /** Returns the title element inside a modal */
  private getModalTitle(modal: Locator): Locator {
    return modal.locator('.modal-title');
  }

  /** Returns the warning message inside a modal */
  private getModalWarning(modal: Locator): Locator {
    return modal.locator('.alert-danger');
  }

  /** Returns the Close button inside a modal */
  private getModalCloseButton(modal: Locator): Locator {
    return modal.locator('button.btn-white:has-text("Close")');
  }

  /** Returns the main action button inside a modal */
  private getModalActionButton(modal: Locator, buttonText: string): Locator {
    return modal.locator(`button:has-text("${buttonText}")`);
  }
}