"use strict";
// framework/src/utils/QuestionHelper.ts
// Utility class to handle common question visibility and interaction patterns
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionHelper = void 0;
class QuestionHelper {
    constructor(page, logger) {
        this.page = page;
        this.logger = logger;
    }
    /**
     * Check if a question/field is visible on the page
     * @param labelText - The text to search for
     * @param exact - Whether to use exact matching (default: false)
     * @returns Promise<boolean> - true if visible, false otherwise
     */
    async isQuestionVisible(labelText, exact = false) {
        const count = await this.page.getByText(labelText, { exact }).count();
        return count > 0;
    }
    /**
     * Check if a question is visible and log if not present
     * @param labelText - The text to search for
     * @param skipMessage - Message to log if question is not present
     * @param exact - Whether to use exact matching (default: false)
     * @returns Promise<boolean> - true if visible, false if should skip
     */
    async isQuestionVisibleOrSkip(labelText, skipMessage, exact = false) {
        const isVisible = await this.isQuestionVisible(labelText, exact);
        if (!isVisible && skipMessage) {
            this.logger?.info?.(skipMessage);
        }
        return isVisible;
    }
    /**
     * Get a question locator by text
     * @param questionText - The question text to find
     * @param exact - Whether to use exact matching (default: false)
     * @returns Locator - The question locator
     */
    getQuestionLocator(questionText, exact = false) {
        return this.page.getByText(questionText, { exact });
    }
    /**
     * Check if a question exists and return early if not
     * @param labelText - The text to search for
     * @param methodName - Name of the calling method for logging
     * @param exact - Whether to use exact matching (default: false)
     * @returns Promise<boolean> - true if should continue, false if should return early
     */
    async checkQuestionExistsOrReturn(labelText, methodName, exact = false) {
        const exists = await this.isQuestionVisible(labelText, exact);
        if (!exists && methodName) {
            this.logger?.info?.(`${methodName}: Question "${labelText}" not present, skipping`);
        }
        return exists;
    }
    /**
     * Wait for a question to be visible
     * @param questionText - The question text to wait for
     * @param timeout - Timeout in milliseconds (default: 5000)
     * @param exact - Whether to use exact matching (default: false)
     * @returns Promise<Locator> - The visible question locator
     */
    async waitForQuestion(questionText, timeout = 5000, exact = false) {
        const locator = this.getQuestionLocator(questionText, exact);
        await locator.waitFor({ state: 'visible', timeout });
        return locator;
    }
}
exports.QuestionHelper = QuestionHelper;
//# sourceMappingURL=QuestionHelper.js.map