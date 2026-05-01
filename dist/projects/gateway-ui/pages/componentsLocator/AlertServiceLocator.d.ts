import { Locator, Page } from '@playwright/test';
/**
 * Alert / Modal Component Locators
 * Pure element selectors only.
 */
export declare class AlertServiceLocator {
    private readonly page;
    constructor(page: Page);
    /** Visible alert or modal container */
    get container(): Locator;
    get alertTitle(): Locator;
    get alertMessage(): Locator;
    get successIcon(): Locator;
    get errorIcon(): Locator;
    get warningIcon(): Locator;
    get infoIcon(): Locator;
    get allButtons(): Locator;
    get okButton(): Locator;
    get cancelButton(): Locator;
    get abandonModal(): Locator;
    get abandonModalTitle(): Locator;
    get abandonModalWarning(): Locator;
    get abandonModalCloseButton(): Locator;
    get abandonModalButton(): Locator;
    get addNameModal(): Locator;
    get addNameModalTitle(): Locator;
    get addNameModalCloseButton(): Locator;
    get addNameModalSaveButton(): Locator;
    get nameModalInput(): Locator;
    get editNameModal(): Locator;
    get editNameModalTitle(): Locator;
    get editNameModalSaveButton(): Locator;
    get nameEditModalInput(): Locator;
    get addNoteModal(): Locator;
    get addNoteModalTitle(): Locator;
    get addNoteModalCloseButton(): Locator;
    get addNoteModalSaveButton(): Locator;
    get addNoteModalInput(): Locator;
    get editNoteModal(): Locator;
    get editNoteModalTitle(): Locator;
    get editNoteModalSaveButton(): Locator;
    get editNoteModalInput(): Locator;
    get fieldset(): Locator;
    get errorContainer(): Locator;
    get errorMessage(): Locator;
    /** Returns a modal container by modal title */
    private getModalByTitle;
    /** Returns the title element inside a modal */
    private getModalTitle;
    /** Returns the warning message inside a modal */
    private getModalWarning;
    /** Returns the Close button inside a modal */
    private getModalCloseButton;
    /** Returns the main action button inside a modal */
    private getModalActionButton;
}
//# sourceMappingURL=AlertServiceLocator.d.ts.map