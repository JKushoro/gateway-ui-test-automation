// ui/steps/ContactSteps.ts
import { expect, Page } from '@playwright/test';
import { ActionHelper } from '../helpers/ActionHelper';
import { FormTypes } from '../../utils/interfaces/formTypes';
import { ContactPage } from '../pages/ContactPage';
import { dataStore } from '../../utils/dataStore';
import { ControlPanelSteps } from './ControlPanelSteps';
import { HomeSteps } from './HomeSteps';

interface ContactStepsConfig {
    page: Page;
    formData: FormTypes;
}

export class ContactSteps {
    private readonly actionHelper: ActionHelper;
    private readonly formData: FormTypes;
    readonly contactPage: ContactPage;
    private readonly controlPanelSteps: ControlPanelSteps;
    private readonly homeSteps: HomeSteps;

    constructor({ page, formData }: ContactStepsConfig) {
        this.formData = formData;
        this.contactPage = new ContactPage(page);
        this.actionHelper = new ActionHelper(page);
        this.controlPanelSteps = new ControlPanelSteps(page);
        this.homeSteps = new HomeSteps(page);
    }

    private async fillAndStore(label: string, value: string, storeKey: string): Promise<void> {
        await this.actionHelper.fillInputByLabel(label, value);
        dataStore.setValue(storeKey, value.trim());
    }

    public async fillContactForm(): Promise<void> {
        const { name, email, phone, subject, message } = this.formData;

        await this.fillAndStore('Name', name, 'selectedName');
        await this.fillAndStore('Email', email, 'selectedEmail');
        await this.fillAndStore('Phone', phone, 'selectedPhone');
        await this.fillAndStore('Subject', subject, 'selectedSubject');
        await this.fillMessage(message);
    }

    private async fillMessage(text: string): Promise<void> {
        await this.contactPage.messageTextAreaInput.scrollIntoViewIfNeeded();
        await this.contactPage.messageTextAreaInput.fill(text);
        dataStore.setValue('selectedMessage', text.trim());
    }

    public async getActualConfirmationName(): Promise<string> {
        const nameHeaderText = await this.contactPage.confirmationNameHeader.textContent();
        return nameHeaderText
            ?.replace('Thanks for getting in touch', '')
            .replace('!', '')
            .trim() ?? '';
    }

    public async submitContactFormSuccessfully(): Promise<void> {
        await this.controlPanelSteps.clickMainSiteNavLinkByText('Contact');
        await this.fillContactForm();
        await this.homeSteps.clickPrimaryButton('Submit');

        await expect(this.contactPage.confirmationNameHeader).toBeVisible();
        await expect(this.contactPage.confirmationSubjectText).toBeVisible();

        const storedName = dataStore.getValue<string>('selectedName');
        const storedSubject = dataStore.getValue<string>('selectedSubject');

        const displayedName = await this.getActualConfirmationName();
        const displayedSubject = await this.contactPage.confirmationSubjectText.textContent();

        expect(displayedName).toBe(storedName);
        expect(displayedSubject?.trim().toLowerCase()).toBe(storedSubject?.trim().toLowerCase());
    }
}
