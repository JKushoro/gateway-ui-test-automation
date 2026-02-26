"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycPersonalDetailsPageSteps = void 0;
// =====================================================
// KycPersonalDetailsPageSteps.ts
// =====================================================
const test_1 = require("@playwright/test");
const DataStore_1 = require("@framework/utils/DataStore");
const TestDataGenerator_1 = require("@framework/utils/TestDataGenerator");
const PostcodeLookup_1 = require("@steps/components/PostcodeLookup");
const KYCDatePickerService_1 = require("@steps/components/KYCDatePickerService");
const KYCDatePickerLocators_1 = require("@pages/componentsLocator/KYCDatePickerLocators");
const BaseKYCSteps_1 = require("./BaseKYCSteps");
const KycPersonalDetailsPageLocators_1 = require("@pages/kycElementLocators/KycPersonalDetailsPageLocators");
/**
 * =====================================================
 * KYC - Personal Details (Steps)
 * =====================================================
 *
 * Responsibilities:
 * - Verify page heading
 * - Read + assert displayed client details in KYC
 * - Compare Gateway selected client vs KYC displayed client
 * - Fill Contact details (with inline assertions)
 * - Fill Current Address (Address 1)
 * - Add & fill Previous Address (Address 2)
 * - Answer Personal Details questions (explicitly)
 * - Fill Children/Dependants details (if shown)
 *
 * Notes for junior testers:
 * - Each method does ONE job
 * - Assertions live next to the action they validate
 * - If something is optional, we skip safely and log why
 */
class KycPersonalDetailsPageSteps extends BaseKYCSteps_1.BaseKYCSteps {
    constructor(page, config) {
        super(page, config);
        this.postcodeLookup = new PostcodeLookup_1.PostcodeLookupService(page, config);
        this.datePicker = new KYCDatePickerService_1.KYCDatePickerService(page);
        this.locators = new KycPersonalDetailsPageLocators_1.KycPersonalDetailsPageLocators(page, config);
    }
    // =====================================================
    // Main Flow
    // =====================================================
    async completeKYCPersonalDetails() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.verifyPersonalDetailsHeading();
        // 1) Client identity checks (Gateway vs KYC)
        const gatewayClient = this.getSelectedGatewayClient();
        const displayedClient = await this.readAndStoreDisplayedKycClient();
        await this.compareSelectedGatewayVsDisplayedKyc(gatewayClient, displayedClient);
        // 2) Contact details
        const generatedContact = this.generateAndStoreKycContactDetails();
        await this.fillKycContactAndStoreDisplayed(generatedContact);
        // 3) Current address (Address 1)
        await this.fillCurrentAddress_Address1();
        // 4) Previous address (Address 2)
        await this.addPreviousAddress_Address2();
        await this.fillPreviousAddress_Address2();
        // 5) Personal details questions
        await this.answerPersonalDetailsQuestions();
        // 6) Children / dependants details (optional section)
        await this.completeChildrenOrDependantsDetails();
        // 7) Continue
        await this.action.clickButtonByText('Save & Continue');
    }
    // =====================================================
    // Verification
    // =====================================================
    async verifyPersonalDetailsHeading() {
        await this.assert.assertPageURLContains('page=personal-details');
        await this.assert.assertElementVisible(this.heading);
        await this.assert.assertElementHasText(this.heading, 'Personal details');
    }
    // =====================================================
    // Gateway Client (DataStore)
    // =====================================================
    getSelectedGatewayClient() {
        return DataStore_1.dataStore.getValue('selected.gatewayClient') || {};
    }
    // =====================================================
    // Read + Assert Displayed KYC Client
    // =====================================================
    async readAndStoreDisplayedKycClient() {
        const title = await this.readAndAssertTitle();
        const { firstName, surname } = await this.readAndAssertNames('First name', 'Surname');
        const dob = await this.readAndAssertDateOfBirth();
        const sexAtBirth = await this.readAndAssertSexAtBirth();
        const fullName = `${firstName} ${surname}`.replace(/\s+/g, ' ').trim();
        const displayedKycClient = {
            title,
            firstName,
            surname,
            fullName,
            dob,
            sexAtBirth,
        };
        DataStore_1.dataStore.setValue('displayed.kycClient', displayedKycClient);
        return displayedKycClient;
    }
    async readAndAssertTitle() {
        const title = await this.action.getReactSelectValueByLabelStrict('Title').catch(() => '');
        if (title) {
            await (0, test_1.expect)(this.page.getByText(title, { exact: false }).first()).toBeVisible();
        }
        return title;
    }
    async readAndAssertNames(firstNameLabel, surnameLabel) {
        const firstName = await this.action.getInputValueByLabel(firstNameLabel).catch(() => '');
        const surname = await this.action.getInputValueByLabel(surnameLabel).catch(() => '');
        const firstNameInput = this.page.getByLabel(firstNameLabel, { exact: false });
        if ((await firstNameInput.count()) > 0) {
            await (0, test_1.expect)(firstNameInput.first()).toHaveValue(firstName);
        }
        const surnameInput = this.page.getByLabel(surnameLabel, { exact: false });
        if ((await surnameInput.count()) > 0) {
            await (0, test_1.expect)(surnameInput.first()).toHaveValue(surname);
        }
        return { firstName, surname };
    }
    async readAndAssertDateOfBirth() {
        const dob = await this.action.getInputValueByLabel('Date of birth').catch(() => '');
        if (dob) {
            const input = this.page.getByLabel('Date of birth', { exact: false });
            if ((await input.count()) > 0) {
                await (0, test_1.expect)(input.first()).toHaveValue(dob);
            }
        }
        return dob;
    }
    async readAndAssertSexAtBirth() {
        const sexAtBirth = await this.action
            .getReactSelectValueByLabelStrict('Sex at birth')
            .catch(() => '');
        if (sexAtBirth) {
            await (0, test_1.expect)(this.page.getByText(sexAtBirth, { exact: false }).first()).toBeVisible();
        }
        return sexAtBirth;
    }
    // =====================================================
    // Compare Gateway vs KYC
    // =====================================================
    async compareSelectedGatewayVsDisplayedKyc(gatewayClient, displayedKycClient) {
        if (gatewayClient.title) {
            (0, test_1.expect)(displayedKycClient.title).toBe(gatewayClient.title);
        }
        if (gatewayClient.forename) {
            (0, test_1.expect)(displayedKycClient.firstName).toBe(gatewayClient.forename);
        }
        if (gatewayClient.surname) {
            (0, test_1.expect)(displayedKycClient.surname).toBe(gatewayClient.surname);
        }
        if (gatewayClient.dob) {
            (0, test_1.expect)(displayedKycClient.dob).toBe(this.normalizeDate(gatewayClient.dob));
        }
        if (gatewayClient.gender) {
            const expected = this.mapGender(gatewayClient.gender);
            if (expected) {
                (0, test_1.expect)(displayedKycClient.sexAtBirth).toBe(expected);
            }
        }
    }
    // =====================================================
    // Contact Details
    // =====================================================
    generateAndStoreKycContactDetails() {
        const mobile = TestDataGenerator_1.TestDataGenerator.phone();
        const email = TestDataGenerator_1.TestDataGenerator.email();
        DataStore_1.dataStore.setValue('generated.kyc.contact.mobile', mobile);
        DataStore_1.dataStore.setValue('generated.kyc.contact.email', email);
        return { mobile, email };
    }
    async fillKycContactAndStoreDisplayed(data) {
        await this.fillMobileNumberAndAssert(data.mobile);
        await this.fillEmailAndAssert(data.email);
        await this.selectPreferredContact('Email');
        DataStore_1.dataStore.setValue('displayed.kyc.contact.mobile', await this.action.getInputValueByLabel('Mobile number').catch(() => ''));
        DataStore_1.dataStore.setValue('displayed.kyc.contact.email', await this.action.getInputValueByLabel('Email').catch(() => ''));
    }
    async fillMobileNumberAndAssert(mobile) {
        await this.action.fillInputByLabel('Mobile number', mobile);
        const displayed = await this.action.getInputValueByLabel('Mobile number').catch(() => '');
        (0, test_1.expect)(displayed).toBe(mobile);
    }
    async fillEmailAndAssert(email) {
        await this.action.fillInputByLabel('Email', email);
        const displayed = await this.action.getInputValueByLabel('Email').catch(() => '');
        (0, test_1.expect)(displayed).toBe(email);
    }
    async selectPreferredContact(answer) {
        const labelText = 'Preferred contact';
        const selected = await this.action.selectFromRadioGroupByLabel(labelText, answer);
        if (!selected) {
            this.logger.info?.(`↷ Skipped "${labelText}" (not displayed)`);
            return;
        }
        this.logger.info?.(`✓ ${labelText}: ${selected}`);
    }
    // =====================================================
    // Current Address (Address 1)
    // =====================================================
    async fillCurrentAddress_Address1() {
        const currentAddress = TestDataGenerator_1.TestDataGenerator.generateUKAddress({ useRealPostcode: true });
        await this.fillTextByLabelAndAssert('Address 1', `${currentAddress.buildingNumber} ${currentAddress.street}`);
        await this.fillTextByLabelAndAssert('Town or City', currentAddress.town);
        if (currentAddress.county) {
            await this.fillTextByLabelAndAssert('County', currentAddress.county);
        }
        const chosen = await this.action.chooseFromLabeledReactSelectDropdown('Country', 'United Kingdom of Great Britain and Northern Ireland');
        if (chosen) {
            await (0, test_1.expect)(this.page.getByText(chosen, { exact: false }).first()).toBeVisible();
        }
        await this.fillTextByLabelAndAssert('Postcode', currentAddress.postcode);
        const moveInDate = await this.setAddressMoveInDate('Move in date', 6, 20);
        DataStore_1.dataStore.setValue('kyc.address1.moveInDate', moveInDate);
        DataStore_1.dataStore.setValue('kyc.address1.postcode', currentAddress.postcode);
        this.logger.info?.(`✓ Current address (Address 1) completed. Move-in: ${moveInDate}`);
    }
    // =====================================================
    // Previous Address (Address 2)
    // =====================================================
    async addPreviousAddress_Address2() {
        const btn = this.page.getByText('Add another address', { exact: false }).first();
        if (!(await btn.count()))
            return;
        await (0, test_1.expect)(btn).toBeVisible();
        await (0, test_1.expect)(btn).toBeEnabled();
        await btn.click();
        this.logger.info?.('✓ Clicked "Add another address" (to add Previous Address / Address 2)');
    }
    async fillPreviousAddress_Address2() {
        const previousAddress = TestDataGenerator_1.TestDataGenerator.generateUKAddress({ useRealPostcode: true });
        const line1 = `${previousAddress.buildingNumber} ${previousAddress.street}`;
        await this.setSecondAddressLine1(line1);
        await this.setSecondAddressLine2(previousAddress.street);
        await this.setSecondAddressCity(previousAddress.town);
        await this.setSecondAddressCounty(previousAddress.county);
        await this.selectSecondAddressCountry('United Kingdom of Great Britain and Northern Ireland');
        await this.setSecondAddressPostcode(previousAddress.postcode);
        const moveInDate2 = await this.setSecondAddressMoveInDate(6, 20);
        DataStore_1.dataStore.setValue('kyc.address2.moveInDate', moveInDate2);
        DataStore_1.dataStore.setValue('kyc.address2.postcode', previousAddress.postcode);
        this.logger.info?.(`✓ Previous address (Address 2) completed. Move-in: ${moveInDate2}`);
        return moveInDate2;
    }
    // =====================================================
    // Previous Address (Address 2) - Field Helpers
    // =====================================================
    async setSecondAddressLine1(value) {
        const input = this.locators.addressLine1;
        await (0, test_1.expect)(input).toBeVisible();
        await input.scrollIntoViewIfNeeded();
        await input.fill(value);
        await (0, test_1.expect)(input).toHaveValue(value);
        this.logger.info?.(`✓ Previous address (Address 2) line 1 set: ${value}`);
    }
    async setSecondAddressLine2(value) {
        if (!value) {
            this.logger.info?.('↷ Skipped Previous address line 2 (no value provided)');
            return;
        }
        const input = this.locators.addressLine2;
        if (!(await input.count())) {
            this.logger.info?.('↷ Skipped Previous address line 2 (not displayed)');
            return;
        }
        await (0, test_1.expect)(input).toBeVisible();
        await input.scrollIntoViewIfNeeded();
        await input.fill(value);
        await (0, test_1.expect)(input).toHaveValue(value);
        this.logger.info?.(`✓ Previous address (Address 2) line 2 set: ${value}`);
    }
    async setSecondAddressCity(town) {
        if (!town) {
            this.logger.info?.('↷ Skipped Previous address city (no value provided)');
            return;
        }
        const input = this.locators.city;
        if (!(await input.count())) {
            this.logger.info?.('↷ Skipped Previous address city (not displayed)');
            return;
        }
        await (0, test_1.expect)(input).toBeVisible();
        await input.scrollIntoViewIfNeeded();
        await input.fill(town);
        await (0, test_1.expect)(input).toHaveValue(town);
        this.logger.info?.(`✓ Previous address (Address 2) city set: ${town}`);
    }
    async setSecondAddressCounty(county) {
        if (!county) {
            this.logger.info?.('↷ Skipped Previous address county (no value provided)');
            return;
        }
        const input = this.locators.county;
        if (!(await input.count())) {
            this.logger.info?.('↷ Skipped Previous address county (not displayed)');
            return;
        }
        await (0, test_1.expect)(input).toBeVisible();
        await input.scrollIntoViewIfNeeded();
        await input.fill(county);
        await (0, test_1.expect)(input).toHaveValue(county);
        this.logger.info?.(`✓ Previous address (Address 2) county set: ${county}`);
    }
    async setSecondAddressPostcode(postcode) {
        const input = this.locators.postcode;
        // If postcode is required in Address 2, use `await expect(input).toBeVisible();` instead.
        if (!(await input.count())) {
            this.logger.info?.('↷ Skipped Previous address postcode (not displayed)');
            return;
        }
        await (0, test_1.expect)(input).toBeVisible();
        await input.scrollIntoViewIfNeeded();
        await input.fill(postcode);
        await input.evaluate(el => el.blur());
        await (0, test_1.expect)(input).toHaveValue(postcode);
        this.logger.info?.(`✓ Previous address (Address 2) postcode set: ${postcode}`);
    }
    async selectSecondAddressCountry(value) {
        if (!value)
            return;
        const countryInput = this.locators.country;
        if (!(await countryInput.count()))
            return;
        await (0, test_1.expect)(countryInput).toBeVisible();
        await countryInput.scrollIntoViewIfNeeded();
        await countryInput.click();
        const option = this.page.getByRole('option', { name: value });
        await (0, test_1.expect)(option).toBeVisible();
        await option.click();
        // Assert selection actually applied (prevents silent failures)
        await (0, test_1.expect)(this.page.getByText(value, { exact: false }).first()).toBeVisible();
        this.logger.info?.(`✓ Previous address (Address 2) country selected: ${value}`);
    }
    async setSecondAddressMoveInDate(minYearsAgo, maxYearsAgo) {
        const input = this.locators.secondMoveInDate;
        if (!(await input.count()))
            return '';
        const date = this.datePicker.generateRandomPastDate(minYearsAgo, maxYearsAgo);
        await (0, test_1.expect)(input).toBeVisible();
        await input.scrollIntoViewIfNeeded();
        await input.click();
        await input.fill(date);
        await input.evaluate(el => el.blur());
        await (0, test_1.expect)(input).toHaveValue(date);
        this.logger.info?.(`✓ Previous address (Address 2) move-in date set: ${date}`);
        return date;
    }
    // =====================================================
    // Personal Details Questions
    // =====================================================
    async answerPersonalDetailsQuestions() {
        await this.answerUkNationality('No');
        await this.selectNonUkNationality('Nigeria');
        await this.answerUkResidency('No');
        await this.selectNonUkResidency('Nigeria');
        await this.answerTaxOutsideUk('Yes');
        await this.selectTaxPaidCountryOutsideUk('Nigeria');
        await this.answerChildrenOrDependants('Yes');
    }
    async answerUkNationality(answer) {
        const q = this.page.getByText('Are you a UK national?', { exact: false }).first();
        if (!(await q.count()))
            return;
        await (0, test_1.expect)(q).toBeVisible();
        await this.action.setRadioByQuestion('Are you a UK national?', answer);
        this.logger.info?.(`✓ Are you a UK national?: ${answer}`);
    }
    /** Nationality dropdown shown when UK national = "Yes/No" */
    async selectNonUkNationality(value) {
        if (!(await this.page.getByText('Choose nationality', { exact: false }).count()))
            return;
        const chosen = await this.action.chooseFromLabeledReactSelectDropdown('Choose nationality', value);
        await (0, test_1.expect)(this.page.getByText(chosen, { exact: false }).first()).toBeVisible();
        this.logger.info?.(`✓ Nationality selected: ${chosen}`);
    }
    async answerUkResidency(answer) {
        const q = this.page.getByText('Are you a UK resident?', { exact: false }).first();
        if (!(await q.count()))
            return;
        await (0, test_1.expect)(q).toBeVisible();
        await this.action.setRadioByQuestion('Are you a UK resident?', answer);
        this.logger.info?.(`✓ Are you a UK resident?: ${answer}`);
    }
    /** Residency dropdown shown when UK resident = "Yes/No" */
    async selectNonUkResidency(value) {
        if (!(await this.page.getByText('Choose residency', { exact: false }).count()))
            return;
        const chosen = await this.action.chooseFromLabeledReactSelectDropdown('Choose residency', value);
        await (0, test_1.expect)(this.page.getByText(chosen, { exact: false }).first()).toBeVisible();
        this.logger.info?.(`✓ Residency selected: ${chosen}`);
    }
    async answerTaxOutsideUk(answer) {
        const question = 'Do you pay Tax in any other Country outside of the UK?';
        const q = this.page.getByText(question, { exact: false }).first();
        if (!(await q.count()))
            return;
        await (0, test_1.expect)(q).toBeVisible();
        await this.action.setRadioByQuestion(question, answer);
        this.logger.info?.(`✓ Tax outside UK?: ${answer}`);
    }
    /** Country dropdown shown when Tax outside UK = "Yes/No" */
    async selectTaxPaidCountryOutsideUk(value) {
        if (!(await this.page.getByText('What country', { exact: false }).count()))
            return;
        const chosen = await this.action.chooseFromLabeledReactSelectDropdown('What country', value);
        await (0, test_1.expect)(this.page.getByText(chosen, { exact: false }).first()).toBeVisible();
        this.logger.info?.(`✓ Selected tax paid country: ${chosen}`);
    }
    async answerChildrenOrDependants(answer) {
        const q = this.page
            .getByText('Do you have any children or dependants?', { exact: false })
            .first();
        if (!(await q.count()))
            return;
        await (0, test_1.expect)(q).toBeVisible();
        await this.action.setRadioByQuestion('Do you have any children or dependants?', answer);
        this.logger.info?.(`✓ Children or dependants?: ${answer}`);
    }
    // =====================================================
    // Children / Dependants (Optional Details)
    // =====================================================
    async completeChildrenOrDependantsDetails() {
        await this.fillDependantsFullName();
        await this.selectDependantOneSexAtBirth();
        await this.setDependantOneDateOfBirth(2, 4);
        await this.answerFinanciallyDependant();
        await this.selectDependantOneRelationship();
        await this.setDependantOneDependantUntil(12, 14);
    }
    async fillDependantsFullName(forename, surname) {
        const firstNameInput = this.locators.dependentOneFirstName;
        const surnameInput = this.locators.dependentOneSurname;
        const names = TestDataGenerator_1.TestDataGenerator.personName(forename, surname);
        if (await firstNameInput.count()) {
            await firstNameInput.fill(names.forename);
            (await surnameInput.count()) && (await surnameInput.fill(names.surname));
        }
        this.logger.info?.(`✓ Dependant full name: ${names.forename} ${names.surname}`);
    }
    async selectDependantOneSexAtBirth(value) {
        const chosen = await this.action.selectReactSelectDropdownOption(this.locators.dependentOneSexAtBirth, value);
        this.logger.info?.(`✓ Dependant 1 sex at birth selected: ${chosen}`);
    }
    async setDependantOneDateOfBirth(minYearsAgo, maxYearsAgo) {
        const input = this.locators.dependentOneDateOfBirth;
        if (!(await input.count())) {
            this.logger.info?.('↷ Skipped dependant 1 DOB (not displayed)');
            return;
        }
        const date = this.datePicker.generateRandomPastDate(minYearsAgo, maxYearsAgo);
        await (0, test_1.expect)(input).toBeVisible();
        await input.scrollIntoViewIfNeeded();
        await input.fill(date);
        await input.evaluate(el => el.blur());
        await (0, test_1.expect)(input).toHaveValue(date);
        this.logger.info?.(`✓ Dependant 1 DOB set: ${date}`);
        return date;
    }
    async answerFinanciallyDependant(answer) {
        const question = 'Financially dependant';
        await (0, test_1.expect)(this.page.getByText(question, { exact: false }).first()).toBeVisible();
        await this.action.setRadioByQuestion(question, answer);
        this.logger.info?.(`✓ ${question}: ${answer}`);
    }
    async selectDependantOneRelationship(value) {
        const chosen = await this.action.chooseFromLabeledReactSelectDropdown('Relationship', value);
        (0, test_1.expect)(chosen).toBeTruthy();
        await (0, test_1.expect)(this.page.getByText(chosen, { exact: false }).first()).toBeVisible();
        this.logger.info?.(`✓ Relationship selected: ${chosen}`);
    }
    async setDependantOneDependantUntil(minYearsAhead, maxYearsAhead) {
        const input = this.locators.dependentOneDependantUntil;
        if (!(await input.count())) {
            this.logger.info?.('↷ Skipped dependant 1 Dependant until (not displayed)');
            return;
        }
        const date = this.datePicker.generateRandomFutureDate(minYearsAhead, maxYearsAhead);
        await this.assert.assertElementVisible(input);
        await input.scrollIntoViewIfNeeded();
        await input.fill(date);
        await input.evaluate(el => el.blur());
        await this.assert.assertInputHasValue(input, date);
        this.logger.info?.(`✓ Dependant 1 Dependant until set: ${date}`);
        return date;
    }
    // =====================================================
    // Shared Helpers (Small + Focused)
    // =====================================================
    async fillTextByLabelAndAssert(label, value) {
        await this.action.fillInputByLabel(label, value);
        const displayed = await this.action.getInputValueByLabel(label).catch(() => '');
        (0, test_1.expect)(displayed).toBe(value);
    }
    async setAddressMoveInDate(labelText, minYearsAgo, maxYearsAgo) {
        const date = this.datePicker.generateRandomPastDate(minYearsAgo, maxYearsAgo);
        await this.datePicker.setDateByLabelOrFallback(labelText, KYCDatePickerLocators_1.KYCDatePickerLocators.DATE_INPUT, date);
        const displayed = await this.action.getInputValueByLabel(labelText).catch(() => '');
        if (displayed) {
            (0, test_1.expect)(displayed).toBe(date);
        }
        return date;
    }
    mapGender(gender) {
        if (!gender)
            return undefined;
        if (gender.toLowerCase().includes('female'))
            return 'Female';
        if (gender.toLowerCase().includes('male'))
            return 'Male';
        return undefined;
    }
    // =====================================================
    // Existing Helper (Unchanged)
    // =====================================================
    async fillKYC_AddressField(labelText, postcode) {
        return this.postcodeLookup.kycAddressSearchField(labelText, postcode);
    }
}
exports.KycPersonalDetailsPageSteps = KycPersonalDetailsPageSteps;
//# sourceMappingURL=KycPersonalDetailsPageSteps.js.map