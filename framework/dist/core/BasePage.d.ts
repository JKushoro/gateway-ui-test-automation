import { Page } from 'playwright-core';
import { WaitHelper } from '../helpers/WaitHelper';
import { ActionHelper } from '../helpers/ActionHelper';
import { AssertionHelper } from '../helpers/AssertionHelper';
import { LocatorHelper } from '../helpers/LocatorHelper';
import { FrameworkConfig } from '../types';
/**
 * Unified Base Page Class
 * Combines functionality of BaseSteps and BaseUIPage into a single comprehensive base class
 * Pre-instantiates all helpers to eliminate code duplication across page and step classes
 * Provides consistent patterns for both page objects and test scenarios
 */
export declare class BasePage {
    protected readonly page: Page;
    protected readonly config: Partial<FrameworkConfig>;
    protected readonly action: ActionHelper;
    protected readonly wait: WaitHelper;
    protected readonly assert: AssertionHelper;
    protected readonly locate: LocatorHelper;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
}
//# sourceMappingURL=BasePage.d.ts.map