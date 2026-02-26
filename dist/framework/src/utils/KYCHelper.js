"use strict";
// framework/src/utils/KYCHelper.ts
// Utility class for common KYC form patterns and operations
Object.defineProperty(exports, "__esModule", { value: true });
exports.KYCHelper = void 0;
const test_1 = require("@playwright/test");
const QuestionHelper_1 = require("./QuestionHelper");
const ActionHelper_1 = require("../helpers/ActionHelper");
const AssertionHelper_1 = require("../helpers/AssertionHelper");
const CommonConstants_1 = require("../constants/CommonConstants");
class KYCHelper {
    constructor(page, logger, config) {
        this.page = page;
        this.logger = logger;
        this.questionHelper = new QuestionHelper_1.QuestionHelper(page, logger);
        this.action = new ActionHelper_1.ActionHelper(page, config);
        this.assert = new AssertionHelper_1.AssertionHelper(page, config);
    }
    /**
     * Safe logging method that handles undefined logger
     */
    logInfo(message) {
        if (this.logger?.info) {
            this.logger.info(message);
        }
    }
    /**
     * Get the common KYC page heading locator
     */
    get heading() {
        return this.page.getByTestId(CommonConstants_1.UI_SELECTORS.FORM_HEADING);
    }
    /**
     * Verify KYC page heading with URL and text validation
     * @param urlFragment - URL fragment to check (e.g., 'page=income')
     * @param expectedHeading - Expected heading text
     * @param timeout - Timeout in milliseconds (uses default from constants)
     */
    async verifyKYCPageHeading(urlFragment, expectedHeading, timeout = CommonConstants_1.KYC_CONSTANTS.DEFAULTS.TIMEOUT) {
        await this.assert.assertPageURLContains(urlFragment);
        await (0, test_1.expect)(this.heading).toBeVisible({ timeout });
        await (0, test_1.expect)(this.heading).toHaveText(expectedHeading);
    }
    /**
     * Standard KYC page completion flow
     * @param urlFragment - URL fragment to verify
     * @param headingText - Expected heading text
     * @param questionsHandler - Function to handle page-specific questions
     * @param continueButtonText - Text for continue button (uses default from constants)
     */
    async completeKYCPage(urlFragment, headingText, questionsHandler, continueButtonText = CommonConstants_1.UI_SELECTORS.SAVE_CONTINUE) {
        await this.page.waitForLoadState('domcontentloaded');
        await this.verifyKYCPageHeading(urlFragment, headingText);
        await questionsHandler();
        await this.action.clickButtonByText(continueButtonText);
    }
    /**
     * Answer a radio question if it exists
     * @param questionText - The question text
     * @param answer - The answer to select (optional - will select randomly if not provided)
     * @param exact - Whether to use exact text matching (default: false)
     */
    async answerRadioQuestionIfExists(questionText, answer, exact = false) {
        if (await this.questionHelper.isQuestionVisible(questionText, exact)) {
            const finalAnswer = answer || this.getRandomYesNoAnswer();
            await this.action.setRadioByQuestion(questionText, finalAnswer);
            this.logInfo(`✓ Answered "${questionText}": ${finalAnswer}${!answer ? ' (randomly selected)' : ''}`);
        }
        else {
            this.logInfo(`Question "${questionText}" not present, skipping`);
        }
    }
    /**
     * Answer a Yes/No question with optional random selection
     * @param questionText - The question text
     * @param answer - Optional answer (any string, or undefined for random Yes/No)
     * @param exact - Whether to use exact text matching (default: false)
     */
    async answerYesNoQuestionIfExists(questionText, answer, exact = false) {
        if (await this.questionHelper.isQuestionVisible(questionText, exact)) {
            const finalAnswer = answer || this.getRandomYesNoAnswer();
            await this.action.setRadioByQuestion(questionText, finalAnswer);
            this.logInfo(`✓ Answered "${questionText}": ${finalAnswer}${!answer ? ' (randomly selected)' : ''}`);
        }
        else {
            this.logInfo(`Question "${questionText}" not present, skipping`);
        }
    }
    /**
     * Get a random Yes/No answer
     * @returns 'Yes' or 'No' randomly selected
     */
    getRandomYesNoAnswer() {
        return Math.random() < 0.5 ? 'Yes' : 'No';
    }
    /**
     * Fill an input field if the label exists
     * @param labelText - The label text to look for
     * @param value - The value to fill
     * @param exact - Whether to use exact text matching (default: false)
     */
    async fillInputIfExists(labelText, value, exact = false) {
        if (await this.questionHelper.isQuestionVisible(labelText, exact)) {
            await this.action.fillInputByLabel(labelText, value);
            this.logInfo(`✓ Filled "${labelText}": ${value}`);
        }
        else {
            this.logInfo(`Field "${labelText}" not present, skipping`);
        }
    }
    /**
     * Select from dropdown if the label exists
     * @param labelText - The label text to look for
     * @param value - The value to select
     * @param exact - Whether to use exact text matching (default: false)
     */
    async selectDropdownIfExists(labelText, value, exact = false) {
        if (await this.questionHelper.isQuestionVisible(labelText, exact)) {
            const chosen = await this.action.selectDropdownByLabel(labelText, value);
            await (0, test_1.expect)(this.page.getByText(chosen, { exact: false }).first()).toBeVisible();
            this.logInfo(`✓ Selected "${labelText}": ${chosen}`);
        }
        else {
            this.logInfo(`Dropdown "${labelText}" not present, skipping`);
        }
    }
    /**
     * Check if an aria group is visible
     * @param id - The aria-labelledby id
     */
    async isAriaGroupVisible(id) {
        return this.page.locator(`[aria-labelledby="${id}"] label`).first().isVisible();
    }
    /**
     * Normalize date format from dd-MM-yyyy to dd/MM/yyyy
     * @param value - Date string to normalize
     */
    normalizeDate(value) {
        return value ? value.trim().replace(/-/g, '/') : undefined;
    }
    /**
     * Click a button by text if it exists
     * @param buttonText - The button text to look for
     * @param exact - Whether to use exact text matching (default: false)
     */
    async clickButtonIfExists(buttonText, exact = false) {
        const btn = this.page.getByText(buttonText, { exact }).first();
        if (await btn.count()) {
            await btn.click();
            this.logInfo(`✓ Clicked button: ${buttonText}`);
        }
        else {
            this.logInfo(`Button "${buttonText}" not present, skipping`);
        }
    }
}
exports.KYCHelper = KYCHelper;
//# sourceMappingURL=KYCHelper.js.map