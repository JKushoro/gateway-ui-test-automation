import { Page, Locator } from '@playwright/test';
import { ILogger } from './Logger';
import { QuestionHelper } from './QuestionHelper';
import { ActionHelper } from '../helpers/ActionHelper';
import { AssertionHelper } from '../helpers/AssertionHelper';
import { FrameworkConfig } from '../types';
export declare class KYCHelper {
    protected page: Page;
    protected logger?: ILogger | undefined;
    protected questionHelper: QuestionHelper;
    protected action: ActionHelper;
    protected assert: AssertionHelper;
    constructor(page: Page, logger?: ILogger | undefined, config?: Partial<FrameworkConfig>);
    /**
     * Safe logging method that handles undefined logger
     */
    protected logInfo(message: string): void;
    /**
     * Get the common KYC page heading locator
     */
    get heading(): Locator;
    /**
     * Verify KYC page heading with URL and text validation
     * @param urlFragment - URL fragment to check (e.g., 'page=income')
     * @param expectedHeading - Expected heading text
     * @param timeout - Timeout in milliseconds (uses default from constants)
     */
    verifyKYCPageHeading(urlFragment: string, expectedHeading: string, timeout?: number): Promise<void>;
    /**
     * Standard KYC page completion flow
     * @param urlFragment - URL fragment to verify
     * @param headingText - Expected heading text
     * @param questionsHandler - Function to handle page-specific questions
     * @param continueButtonText - Text for continue button (uses default from constants)
     */
    completeKYCPage(urlFragment: string, headingText: string, questionsHandler: () => Promise<void>, continueButtonText?: string): Promise<void>;
    /**
     * Answer a radio question if it exists
     * @param questionText - The question text
     * @param answer - The answer to select (optional - will select randomly if not provided)
     * @param exact - Whether to use exact text matching (default: false)
     */
    answerRadioQuestionIfExists(questionText: string, answer?: string, exact?: boolean): Promise<void>;
    /**
     * Answer a Yes/No question with optional random selection
     * @param questionText - The question text
     * @param answer - Optional answer (any string, or undefined for random Yes/No)
     * @param exact - Whether to use exact text matching (default: false)
     */
    answerYesNoQuestionIfExists(questionText: string, answer?: string, exact?: boolean): Promise<void>;
    /**
     * Get a random Yes/No answer
     * @returns 'Yes' or 'No' randomly selected
     */
    private getRandomYesNoAnswer;
    /**
     * Fill an input field if the label exists
     * @param labelText - The label text to look for
     * @param value - The value to fill
     * @param exact - Whether to use exact text matching (default: false)
     */
    fillInputIfExists(labelText: string, value: string, exact?: boolean): Promise<void>;
    /**
     * Select from dropdown if the label exists
     * @param labelText - The label text to look for
     * @param value - The value to select
     * @param exact - Whether to use exact text matching (default: false)
     */
    selectDropdownIfExists(labelText: string, value: string, exact?: boolean): Promise<void>;
    /**
     * Check if an aria group is visible
     * @param id - The aria-labelledby id
     */
    isAriaGroupVisible(id: string): Promise<boolean>;
    /**
     * Normalize date format from dd-MM-yyyy to dd/MM/yyyy
     * @param value - Date string to normalize
     */
    normalizeDate(value?: string): string | undefined;
    /**
     * Click a button by text if it exists
     * @param buttonText - The button text to look for
     * @param exact - Whether to use exact text matching (default: false)
     */
    clickButtonIfExists(buttonText: string, exact?: boolean): Promise<void>;
}
//# sourceMappingURL=KYCHelper.d.ts.map