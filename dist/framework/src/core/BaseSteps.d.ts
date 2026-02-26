import { Page } from '@playwright/test';
import { WaitHelper } from '../helpers/WaitHelper';
import { ActionHelper } from '../helpers/ActionHelper';
import { AssertionHelper } from '../helpers/AssertionHelper';
import { LocatorHelper } from '../helpers/LocatorHelper';
import { FrameworkConfig } from '../types';
/**
 * Enhanced Base Steps Class
 * Pre-instantiates all helpers to eliminate code duplication across step classes
 * Provides consistent patterns for test scenarios
 */
export declare abstract class BaseSteps {
    protected readonly page: Page;
    protected readonly config: Partial<FrameworkConfig>;
    protected readonly action: ActionHelper;
    protected readonly wait: WaitHelper;
    protected readonly assert: AssertionHelper;
    protected readonly locate: LocatorHelper;
    protected constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Navigate to a specific page
     */
    protected navigateToPage(url: string): Promise<void>;
    /**
     * Fill a form field using ActionHelper
     */
    protected fillField(selector: string, value: string): Promise<void>;
    /**
     * Click an element using ActionHelper
     */
    protected clickElement(selector: string): Promise<void>;
    /**
     * Wait for element to be visible
     */
    protected waitForElementToBeVisible(selector: string, timeout?: number): Promise<void>;
    /**
     * Verify text is present on page
     */
    protected verifyTextIsPresent(expectedText: string): Promise<void>;
    /**
     * Wait for loading indicators to disappear
     */
    protected waitForLoadingToComplete(): Promise<void>;
}
//# sourceMappingURL=BaseSteps.d.ts.map