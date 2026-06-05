import { Page, Locator } from '@playwright/test';
import { LocatorHelper } from '../LocatorHelper';
import { WaitHelper } from '../WaitHelper';
import { AssertionHelper } from '../AssertionHelper';
import { FrameworkConfig } from '../../types';
import { ILogger } from '../../utils/Logger';
type LocatorStrategy = () => Locator | Promise<Locator | null>;
/**
 * 🔧 CoreActions - Base functionality for all action helpers
 *
 * Provides shared utilities, timing, and locator resolution logic
 * used by all other action helper classes.
 */
export declare class CoreActions {
    readonly page: Page;
    readonly locatorHelper: LocatorHelper;
    readonly waitHelper: WaitHelper;
    readonly assertionHelper: AssertionHelper;
    readonly logger: ILogger;
    config: FrameworkConfig;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /** Escape regex special chars in a string */
    protected esc(text: string): string;
    /** Exact match regex (trim + case-insensitive) */
    protected exactRx(text: string): RegExp;
    /** Contains match regex (case-insensitive) */
    protected containsRx(text: string): RegExp;
    /** Optional slowMo after actions (useful for demo/debug) */
    protected slowMo(): Promise<void>;
    /**
     * Wait for element to be ready for interaction
     * @param locator The element to wait for
     * @param action Description of the action for errors
     */
    protected waitForReady(locator: Locator, action: string): Promise<void>;
    /**
     * Resolve locator from various input types
     * @param locatorOrStrategy Locator, string selector, or strategy function
     */
    protected resolveLocator(locatorOrStrategy: Locator | string | LocatorStrategy): Promise<Locator>;
    /**
     * Get element with comprehensive error context
     * @param locatorOrStrategy Locator or strategy to find element
     * @param action Description of what we're trying to do
     */
    protected getElement(locatorOrStrategy: Locator | string | LocatorStrategy, action: string): Promise<Locator>;
    /**
     * Generate a unique identifier for test data
     */
    static generateId(): string;
    /**
     * Sleep for specified milliseconds
     * @param ms Milliseconds to sleep
     */
    static sleep(ms: number): Promise<void>;
    /**
     * Retry an operation with exponential backoff
     * @param operation Function to retry
     * @param maxRetries Maximum number of retries
     * @param baseDelay Base delay between retries in ms
     */
    static retry<T>(operation: () => Promise<T>, maxRetries?: number, baseDelay?: number): Promise<T>;
}
export {};
//# sourceMappingURL=CoreActions.d.ts.map