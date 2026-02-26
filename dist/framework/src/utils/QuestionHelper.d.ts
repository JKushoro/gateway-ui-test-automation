import { Page, Locator } from '@playwright/test';
import { ILogger } from './Logger';
export declare class QuestionHelper {
    private page;
    private logger?;
    constructor(page: Page, logger?: ILogger | undefined);
    /**
     * Check if a question/field is visible on the page
     * @param labelText - The text to search for
     * @param exact - Whether to use exact matching (default: false)
     * @returns Promise<boolean> - true if visible, false otherwise
     */
    isQuestionVisible(labelText: string, exact?: boolean): Promise<boolean>;
    /**
     * Check if a question is visible and log if not present
     * @param labelText - The text to search for
     * @param skipMessage - Message to log if question is not present
     * @param exact - Whether to use exact matching (default: false)
     * @returns Promise<boolean> - true if visible, false if should skip
     */
    isQuestionVisibleOrSkip(labelText: string, skipMessage?: string, exact?: boolean): Promise<boolean>;
    /**
     * Get a question locator by text
     * @param questionText - The question text to find
     * @param exact - Whether to use exact matching (default: false)
     * @returns Locator - The question locator
     */
    getQuestionLocator(questionText: string, exact?: boolean): Locator;
    /**
     * Check if a question exists and return early if not
     * @param labelText - The text to search for
     * @param methodName - Name of the calling method for logging
     * @param exact - Whether to use exact matching (default: false)
     * @returns Promise<boolean> - true if should continue, false if should return early
     */
    checkQuestionExistsOrReturn(labelText: string, methodName?: string, exact?: boolean): Promise<boolean>;
    /**
     * Wait for a question to be visible
     * @param questionText - The question text to wait for
     * @param timeout - Timeout in milliseconds (default: 5000)
     * @param exact - Whether to use exact matching (default: false)
     * @returns Promise<Locator> - The visible question locator
     */
    waitForQuestion(questionText: string, timeout?: number, exact?: boolean): Promise<Locator>;
}
//# sourceMappingURL=QuestionHelper.d.ts.map