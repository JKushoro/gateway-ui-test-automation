"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycFactFindDetailsPageSteps = void 0;
const BaseKYCSteps_1 = require("@steps/kyc_forms/BaseKYCSteps");
const test_1 = require("@playwright/test");
const src_1 = require("@/framework/src");
const KYCDatePickerLocators_1 = require("@components/KYCDatePickerLocators");
const KYCDatePickerService_1 = require("@steps/components/KYCDatePickerService");
/**
 * KYC - Fact Find Details (Steps)
 *
 * Purpose:
 * - Confirm we are on the "Fact Find Details" page
 * - Complete the form in the same order a user would
 * - Assert values only when fields are present
 * - Proceed to "Personal Details"
 *
 * Junior tester notes:
 * - If a field does not exist, the test skips it safely
 * - Every fill has a matching expect
 */
class KycFactFindDetailsPageSteps extends BaseKYCSteps_1.BaseKYCSteps {
    constructor(page, config) {
        super(page, config);
        this.datePicker = new KYCDatePickerService_1.KYCDatePickerService(page);
    }
    /* ======================================================================================
     * Main Flow
     * ====================================================================================== */
    /**
     * Main method to complete the entire Fact Find Details page
     * Uses standardized verification with custom button handling
     */
    async completeKYCFactFindDetails() {
        await this.page.waitForLoadState('domcontentloaded');
        // Use assertion helper which handles missing testid or alternative headings
        await this.assert.assertHeadingVisible('Fact Find Details', 15000);
        await this.answerFactFindDetailsQuestions();
        this.logInfo('✓ Completed all KYC Fact Find Details questions');
    }
    async answerFactFindDetailsQuestions() {
        await this.workCompletedDate('Yes');
        await this.setWorkCompletedDate('What date was the work completed on', 1, 1);
        await this.selectVenue('Email');
        await this.requireA3rdPartyToBePresent('Yes');
        await this.clickAddThirdPartyButton();
        await this.selectThirdPartyTitle();
        await this.fillFirstAndLastName();
        await this.selectRelationship();
        await this.fillContactNumber();
        await this.fillThirdPartyAddress();
        await this.selectPresentAtMeeting('Yes');
        await this.fillNotesIfPresent();
        await this.selectIf3rdPartyPowerOfAttorney('No');
        await this.action.clickButtonByText('Proceed to Personal Details');
    }
    /* ======================================================================================
     * Questions
     * ====================================================================================== */
    async workCompletedDate(answer) {
        await this.answerRadioQuestionIfExists('Was the work completed on a different date', answer);
    }
    async setWorkCompletedDate(labelText, minYearsAgo, maxYearsAgo) {
        if (await this.elementNotExists(labelText))
            return;
        const date = this.datePicker.generateRandomPastDate(minYearsAgo, maxYearsAgo);
        await this.datePicker.setDateByLabelOrFallback(labelText, KYCDatePickerLocators_1.KYCDatePickerLocators.DATE_INPUT, date);
        const input = this.page.getByLabel(labelText, { exact: false });
        if ((await input.count()) > 0) {
            await (0, test_1.expect)(input).toHaveValue(date);
        }
        this.logInfo(`✓ Set "${labelText}" to ${date}`);
        return date;
    }
    async selectVenue(value) {
        if (await this.elementNotExists('Venue'))
            return;
        const chosen = await this.action.chooseFromLabeledReactSelectDropdown('Venue', value);
        await (0, test_1.expect)(this.page.getByText(chosen, { exact: false }).first()).toBeVisible();
        this.logInfo(`✓ Venue selected: ${chosen}`);
    }
    async requireA3rdPartyToBePresent(answer) {
        await this.answerRadioQuestionIfExists('Does the client require a 3rd party to be present', answer);
    }
    async clickAddThirdPartyButton() {
        const btn = this.page.getByText('Add Third Party', { exact: false }).first();
        if (!(await btn.count()))
            return;
        await (0, test_1.expect)(btn).toBeVisible();
        await (0, test_1.expect)(btn).toBeEnabled();
        await btn.click();
        this.logInfo('✓ Clicked "Add Third Party"');
    }
    async selectThirdPartyTitle(value) {
        if (await this.elementNotExists('Title'))
            return;
        const chosen = await this.action.chooseFromLabeledReactSelectDropdown('Title', value);
        await (0, test_1.expect)(this.page.getByText(chosen, { exact: false }).first()).toBeVisible();
        this.logInfo(`✓ Third party Title selected: ${chosen}`);
    }
    async fillFirstAndLastName() {
        const forename = src_1.TestDataGenerator.firstName();
        const surname = src_1.TestDataGenerator.lastName();
        if (await this.page.getByText('First Name', { exact: false }).count()) {
            await this.action.fillInputByLabel('First Name', forename);
            const input = this.page.getByLabel('First Name', { exact: false });
            if ((await input.count()) > 0) {
                await (0, test_1.expect)(input).toHaveValue(forename);
            }
        }
        if (await this.page.getByText('Surname', { exact: false }).count()) {
            await this.action.fillInputByLabel('Surname', surname);
            const input = this.page.getByLabel('Surname', { exact: false });
            if ((await input.count()) > 0) {
                await (0, test_1.expect)(input).toHaveValue(surname);
            }
        }
    }
    async selectRelationship(value) {
        if (await this.elementNotExists('Relationship'))
            return;
        const chosen = await this.action.chooseFromLabeledReactSelectDropdown('Relationship', value);
        await (0, test_1.expect)(this.page.getByText(chosen, { exact: false }).first()).toBeVisible();
        this.logInfo(`✓ Relationship selected: ${chosen}`);
    }
    async fillContactNumber() {
        const number = src_1.TestDataGenerator.phone();
        if (await this.elementNotExists('Contact number'))
            return;
        await this.action.fillInputByLabel('Contact number', number);
        const input = this.page.getByLabel('Contact number', { exact: false });
        if ((await input.count()) > 0) {
            await (0, test_1.expect)(input).toHaveValue(number);
        }
        this.logInfo(`✓ Contact number: ${number}`);
    }
    async fillThirdPartyAddress() {
        const address = src_1.TestDataGenerator.generateUKAddress({ useRealPostcode: true });
        const address1 = address.buildingName
            ? `${address.buildingName}, ${address.street}`
            : `${address.buildingNumber} ${address.street}`;
        // Address 1
        await this.ifElementExists('Address 1', async () => {
            await this.action.fillInputByLabel('Address 1', address1);
            const input = this.page.getByLabel('Address 1', { exact: false });
            if ((await input.count()) > 0) {
                await (0, test_1.expect)(input).toHaveValue(address1);
            }
        });
        // Town/City
        await this.ifElementExists('Town or City', async () => {
            await this.action.fillInputByLabel('Town or City', address.town);
            const input = this.page.getByLabel('Town or City', { exact: false });
            if ((await input.count()) > 0) {
                await (0, test_1.expect)(input).toHaveValue(address.town);
            }
        });
        // County
        await this.ifElementExists('County', async () => {
            await this.action.fillInputByLabel('County', address.county ?? '');
            const input = this.page.getByLabel('County', { exact: false });
            if ((await input.count()) > 0) {
                await (0, test_1.expect)(input).toHaveValue(address.county ?? '');
            }
        });
        // Postcode
        await this.ifElementExists('Postcode', async () => {
            await this.action.fillInputByLabel('Postcode', address.postcode);
            const input = this.page.getByLabel('Postcode', { exact: false });
            if ((await input.count()) > 0) {
                await (0, test_1.expect)(input).toHaveValue(address.postcode);
            }
        });
        // Country (select) — choose specific or random
        await this.selectCountry('United Kingdom of Great Britain and Northern Ireland');
        this.logInfo(`✓ Address entered: ${address.fullAddress}`);
    }
    async selectCountry(value) {
        if (await this.elementNotExists('Country'))
            return;
        const chosen = await this.action.chooseFromLabeledReactSelectDropdown('Country', value);
        await (0, test_1.expect)(this.page.getByText(chosen, { exact: false }).first()).toBeVisible();
        this.logInfo(`✓ Country selected: ${chosen}`);
    }
    async selectPresentAtMeeting(answer) {
        await this.answerRadioQuestionIfExists('Present at Meeting', answer);
    }
    async fillNotesIfPresent() {
        if (await this.elementNotExists('Notes'))
            return;
        const notes = src_1.TestDataGenerator.shortText();
        await this.action.fillInputByLabel('Notes', notes);
        const input = this.page.getByLabel('Notes', { exact: false });
        if ((await input.count()) > 0) {
            await (0, test_1.expect)(input).toHaveValue(notes);
        }
        this.logInfo('✓ Notes filled');
    }
    async selectIf3rdPartyPowerOfAttorney(answer) {
        await this.answerRadioQuestionIfExists('Is the 3rd Party Power of Attorney', answer);
    }
}
exports.KycFactFindDetailsPageSteps = KycFactFindDetailsPageSteps;
//# sourceMappingURL=KycFactFindDetailsPageSteps.js.map