import { Page } from '@playwright/test';
import { KYCHelper } from '@/framework/src';
import { FrameworkConfig } from '@framework/types';
/**
 * Base class for KYC form steps with common functionality
 * Now extends KYCHelper to reduce duplication
 * Follows SOLID principles and DRY patterns
 */
export declare class BaseKYCSteps extends KYCHelper {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Persist key/value pairs under a prefix in the data store
     */
    protected persist(prefix: string, obj: Record<string, unknown>): void;
    /**
     * Check if an element with the given text exists on the page
     * @param text - The text to search for
     * @param exact - Whether to match exactly (default: false)
     * @returns Promise<boolean> - True if element exists, false otherwise
     */
    protected elementExists(text: string, exact?: boolean): Promise<boolean>;
    /**
     * Check if an element with the given text does NOT exist on the page
     * @param text - The text to search for
     * @param exact - Whether to match exactly (default: false)
     * @returns Promise<boolean> - True if element does NOT exist, false otherwise
     */
    protected elementNotExists(text: string, exact?: boolean): Promise<boolean>;
    /**
     * Answer radio question with MANDATORY verification - FAILS TEST if selection fails
     * - Use this for critical form fields that MUST be selected
     * - Throws error if selection verification fails
     * - Includes proper logging and error handling
     */
    protected answerRadioQuestionWithVerification(questionText: string, answer?: string, timeoutMs?: number): Promise<string | undefined>;
    /**
     * Answer radio question with verification - only if question exists
     * - Returns undefined if question not found
     * - FAILS TEST if question exists but selection fails
     */
    protected answerRadioQuestionWithVerificationIfPresent(questionText: string, answer?: string, timeoutMs?: number): Promise<string | undefined>;
    /**
     * Answer Yes/No radio question with verification
     * - Defaults to 'Yes' if no answer provided
     * - FAILS TEST if selection verification fails
     */
    protected answerYesNoQuestionWithVerification(questionText: string, answer?: string, timeoutMs?: number): Promise<string | undefined>;
    /**
     * Set checkbox with verification - FAILS TEST if verification fails
     * - Ensures checkbox state is properly set and verified
     */
    protected setCheckboxWithVerification(labelText: string, checked?: boolean, timeoutMs?: number): Promise<void>;
    /**
     * Safe logging method for errors
     */
    protected logError(message: string): void;
    /**
     * Enhanced logging method with timestamp
     */
    protected logInfo(message: string): void;
    /**
     * Standardized method to answer radio questions with consistent logging
     * This replaces the old pattern and follows DRY principles
     * @param questionText - The question text to look for
     * @param answer - The answer to select (optional, will use random if not provided)
     * @returns Promise<void>
     */
    answerRadioQuestionIfExists(questionText: string, answer?: string): Promise<void>;
    /**
     * Standardized method to complete a KYC page
     * Follows the same pattern across all KYC pages
     * @param urlFragment - URL fragment to verify (e.g., 'page=income')
     * @param headingText - Expected heading text
     * @param questionsHandler - Function to handle page-specific questions
     */
    protected completeKYCPageStandard(urlFragment: string, headingText: string, questionsHandler: () => Promise<void>): Promise<void>;
    /**
     * Verify KYC page heading with URL and text validation
     * @param urlFragment - URL fragment to check (e.g., 'page=income')
     * @param expectedHeading - Expected heading text
     */
    verifyKYCPageHeading(urlFragment: string, expectedHeading: string): Promise<void>;
    /**
     * Fill input field if it exists with consistent logging
     * @param labelText - The label text to look for
     * @param value - The value to fill
     */
    fillInputIfExists(labelText: string, value: string): Promise<void>;
    /**
     * Select dropdown option if it exists with consistent logging
     * @param labelText - The label text to look for
     * @param value - The value to select
     */
    selectDropdownIfExists(labelText: string, value: string): Promise<void>;
    /**
     * Execute a function only if an element with the given text exists
     * @param text - The text to search for
     * @param fn - The function to execute if element exists
     * @param exact - Whether to match exactly (default: false)
     */
    protected ifElementExists<T>(text: string, fn: () => Promise<T> | T, exact?: boolean): Promise<T | undefined>;
    /**
     * Return early from a function if an element with the given text does NOT exist
     * @param text - The text to search for
     * @param returnValue - The value to return if element doesn't exist
     * @param exact - Whether to match exactly (default: false)
     */
    protected returnIfElementNotExists<T>(text: string, returnValue?: T, exact?: boolean): Promise<T | undefined>;
}
//# sourceMappingURL=BaseKYCSteps.d.ts.map