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
     * Verification
     * ====================================================================================== */
    async verifyFactFindDetailsHeading() {
        await (0, test_1.expect)(this.heading).toBeVisible({ timeout: 15000 });
        await (0, test_1.expect)(this.heading).toHaveText('Fact Find Details');
    }
    /* ======================================================================================
     * Main Flow
     * ====================================================================================== */
    async completeKYCFactFindDetails() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.verifyFactFindDetailsHeading();
        await this.answerFactFindDetailsQuestions();
        this.logger.info?.('✓ Completed all KYC Fact Find Details questions');
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
        const question = 'Was the work completed on a different date';
        await (0, test_1.expect)(this.page.getByText(question, { exact: false }).first()).toBeVisible();
        await this.action.setRadioByQuestion(question, answer);
        this.logger.info?.(`✓ ${question}: ${answer}`);
    }
    async setWorkCompletedDate(labelText, minYearsAgo, maxYearsAgo) {
        if (!(await this.page.getByText(labelText, { exact: false }).count()))
            return;
        const date = this.datePicker.generateRandomPastDate(minYearsAgo, maxYearsAgo);
        await this.datePicker.setDateByLabelOrFallback(labelText, KYCDatePickerLocators_1.KYCDatePickerLocators.DATE_INPUT, date);
        const input = this.page.getByLabel(labelText, { exact: false });
        if ((await input.count()) > 0) {
            await (0, test_1.expect)(input).toHaveValue(date);
        }
        this.logger.info?.(`✓ Set "${labelText}" to ${date}`);
        return date;
    }
    async selectVenue(value) {
        if (!(await this.page.getByText('Venue', { exact: false }).count()))
            return;
        const chosen = await this.action.chooseFromLabeledReactSelectDropdown('Venue', value);
        await (0, test_1.expect)(this.page.getByText(chosen, { exact: false }).first()).toBeVisible();
        this.logger.info?.(`✓ Venue selected: ${chosen}`);
    }
    async requireA3rdPartyToBePresent(answer) {
        const question = 'Does the client require a 3rd party to be present';
        await (0, test_1.expect)(this.page.getByText(question, { exact: false }).first()).toBeVisible();
        await this.action.setRadioByQuestion(question, answer);
        this.logger.info?.(`✓ ${question}: ${answer}`);
    }
    async clickAddThirdPartyButton() {
        const btn = this.page.getByText('Add Third Party', { exact: false }).first();
        if (!(await btn.count()))
            return;
        await (0, test_1.expect)(btn).toBeVisible();
        await (0, test_1.expect)(btn).toBeEnabled();
        await btn.click();
        this.logger.info?.('✓ Clicked "Add Third Party"');
    }
    async selectThirdPartyTitle(value) {
        if (!(await this.page.getByText('Title', { exact: false }).count()))
            return;
        const chosen = await this.action.chooseFromLabeledReactSelectDropdown('Title', value);
        await (0, test_1.expect)(this.page.getByText(chosen, { exact: false }).first()).toBeVisible();
        this.logger.info?.(`✓ Third party Title selected: ${chosen}`);
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
        if (!(await this.page.getByText('Relationship', { exact: false }).count()))
            return;
        const chosen = await this.action.chooseFromLabeledReactSelectDropdown('Relationship', value);
        await (0, test_1.expect)(this.page.getByText(chosen, { exact: false }).first()).toBeVisible();
        this.logger.info?.(`✓ Relationship selected: ${chosen}`);
    }
    async fillContactNumber() {
        const number = src_1.TestDataGenerator.phone();
        if (!(await this.page.getByText('Contact number', { exact: false }).count()))
            return;
        await this.action.fillInputByLabel('Contact number', number);
        const input = this.page.getByLabel('Contact number', { exact: false });
        if ((await input.count()) > 0) {
            await (0, test_1.expect)(input).toHaveValue(number);
        }
        this.logger.info?.(`✓ Contact number: ${number}`);
    }
    async fillThirdPartyAddress() {
        const address = src_1.TestDataGenerator.generateUKAddress({ useRealPostcode: true });
        const address1 = address.buildingName
            ? `${address.buildingName}, ${address.street}`
            : `${address.buildingNumber} ${address.street}`;
        // Address 1
        if (await this.page.getByText('Address 1', { exact: false }).count()) {
            await this.action.fillInputByLabel('Address 1', address1);
            const input = this.page.getByLabel('Address 1', { exact: false });
            if ((await input.count()) > 0) {
                await (0, test_1.expect)(input).toHaveValue(address1);
            }
        }
        // Town/City
        if (await this.page.getByText('Town or City', { exact: false }).count()) {
            await this.action.fillInputByLabel('Town or City', address.town);
            const input = this.page.getByLabel('Town or City', { exact: false });
            if ((await input.count()) > 0) {
                await (0, test_1.expect)(input).toHaveValue(address.town);
            }
        }
        // County
        if (await this.page.getByText('County', { exact: false }).count()) {
            await this.action.fillInputByLabel('County', address.county ?? '');
            const input = this.page.getByLabel('County', { exact: false });
            if ((await input.count()) > 0) {
                await (0, test_1.expect)(input).toHaveValue(address.county ?? '');
            }
        }
        // Postcode
        if (await this.page.getByText('Postcode', { exact: false }).count()) {
            await this.action.fillInputByLabel('Postcode', address.postcode);
            const input = this.page.getByLabel('Postcode', { exact: false });
            if ((await input.count()) > 0) {
                await (0, test_1.expect)(input).toHaveValue(address.postcode);
            }
        }
        // Country (select) — choose specific or random
        await this.selectCountry('United Kingdom of Great Britain and Northern Ireland');
        this.logger.info?.(`✓ Address entered: ${address.fullAddress}`);
    }
    async selectCountry(value) {
        if (!(await this.page.getByText('Country', { exact: false }).count()))
            return;
        const chosen = await this.action.chooseFromLabeledReactSelectDropdown('Country', value);
        await (0, test_1.expect)(this.page.getByText(chosen, { exact: false }).first()).toBeVisible();
        this.logger.info?.(`✓ Country selected: ${chosen}`);
    }
    async selectPresentAtMeeting(answer) {
        const question = 'Present at Meeting';
        await (0, test_1.expect)(this.page.getByText(question, { exact: false }).first()).toBeVisible();
        await this.action.setRadioByQuestion(question, answer);
        this.logger.info?.(`✓ ${question}: ${answer}`);
    }
    async fillNotesIfPresent() {
        if (!(await this.page.getByText('Notes', { exact: false }).count()))
            return;
        const notes = src_1.TestDataGenerator.shortText();
        await this.action.fillInputByLabel('Notes', notes);
        const input = this.page.getByLabel('Notes', { exact: false });
        if ((await input.count()) > 0) {
            await (0, test_1.expect)(input).toHaveValue(notes);
        }
        this.logger.info?.('✓ Notes filled');
    }
    async selectIf3rdPartyPowerOfAttorney(answer) {
        const question = 'Is the 3rd Party Power of Attorney';
        const q = this.page.getByText(question, { exact: false }).first();
        if ((await q.count()) === 0) {
            this.logger.info?.(`↷ Skipped "${question}" (not displayed)`);
            return;
        }
        await (0, test_1.expect)(q).toBeVisible();
        await this.action.setRadioByQuestion(question, answer);
        this.logger.info?.(`✓ ${question}: ${answer}`);
    }
}
exports.KycFactFindDetailsPageSteps = KycFactFindDetailsPageSteps;
//# sourceMappingURL=KycFactFindDetailsPageSteps.js.map