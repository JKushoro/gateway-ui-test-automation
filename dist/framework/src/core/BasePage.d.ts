import { WaitHelper } from '../helpers/WaitHelper';
import { ActionHelper } from '../helpers/ActionHelper';
import { AssertionHelper } from '../helpers/AssertionHelper';
import { LocatorHelper } from '../helpers/LocatorHelper';
import { FrameworkConfig } from '../types';
import { Page } from '@playwright/test';
import { ILogger } from '../utils/Logger';
import { TableHelper } from '@framework/helpers/TableHelper';
/**
 * Unified Base Page Class
 * Combines functionality of BaseSteps and BaseUIPage into a single comprehensive base class
 * Pre-instantiates all helpers to eliminate code duplication across page and step classes
 * Provides consistent patterns for both page objects and test scenarios
 */
export declare class BasePage {
    protected page: Page;
    protected readonly config: Partial<FrameworkConfig>;
    protected readonly action: ActionHelper;
    protected readonly wait: WaitHelper;
    protected readonly assert: AssertionHelper;
    protected readonly locate: LocatorHelper;
    protected readonly table: TableHelper;
    protected readonly logger: ILogger;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Run an async action and ignore errors (for optional UI elements).
     * Useful for handling optional form fields or UI elements that may not be present.
     */
    protected try(fn: () => Promise<void>, _context?: string): Promise<void>;
    /**
     * Batch version of try() for question radios.
     * Attempts to set multiple radio button options, ignoring failures for optional elements.
     */
    protected tryOptionalRadios(pairs: ReadonlyArray<[string, string]>): Promise<void>;
}
//# sourceMappingURL=BasePage.d.ts.map