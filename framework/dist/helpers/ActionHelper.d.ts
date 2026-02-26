import { Locator, Page } from '../types/PlaywrightTypes';
import { ActionOptions, ClickOptions, SelectOptions, FrameworkConfig } from '../types';
/**
 * Simplified ActionHelper with essential interaction methods
 * Removed unnecessary complexity and kept only commonly used functions
 */
export declare class ActionHelper {
    private page;
    private locatorHelper;
    private waitHelper;
    private readonly config;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Click on element by selector
     */
    click(selector: string, options?: ClickOptions): Promise<void>;
    /**
     * Click on locator
     */
    clickLocator(locator: Locator, options?: ClickOptions): Promise<void>;
    /**
     * Click button by text
     */
    clickButtonByText(text: string, exact?: boolean, options?: ClickOptions): Promise<void>;
    /**
     * Fill input field by selector
     */
    fill(selector: string, value: string, options?: ActionOptions): Promise<void>;
    /**
     * Fill input by label
     */
    fillInputByLabel(label: string, value: string, exact?: boolean, options?: ActionOptions): Promise<void>;
    /**
     * Press key
     */
    pressKey(key: string): Promise<void>;
    /**
     * Select option from dropdown by label
     */
    selectOptionFromDropdown(selector: string, label: string, options?: SelectOptions): Promise<void>;
    /**
     * Select option from dropdown by index
     */
    selectOptionByIndex(selector: string, index: number, options?: SelectOptions): Promise<void>;
    /**
     * Check checkbox
     */
    checkCheckbox(selector: string, options?: ActionOptions): Promise<void>;
    /**
     * Uncheck checkbox
     */
    uncheckCheckbox(selector: string, options?: ActionOptions): Promise<void>;
    /**
     * Select radio button by value
     */
    selectRadioByValue(name: string, value: string, options?: ActionOptions): Promise<void>;
    /**
     * Hover over element
     */
    hover(selector: string, options?: ActionOptions): Promise<void>;
    /**
     * Get text content from selector
     */
    getText(selector: string, options?: ActionOptions): Promise<string>;
    /**
     * Get attribute value
     */
    getAttribute(selector: string, attribute: string, options?: ActionOptions): Promise<string | null>;
    /**
     * Get input value
     */
    getInputValue(selector: string, options?: ActionOptions): Promise<string>;
    /**
     * Check if element is visible
     */
    isVisible(selector: string): Promise<boolean>;
    /**
     * Check if element is enabled
     */
    isEnabled(selector: string): Promise<boolean>;
    /**
     * Navigate to a specific URL
     */
    navigateToUrl(url: string): Promise<void>;
    /**
     * Navigate to a specific page with timeout and DOM content loaded wait
     */
    navigateToPage(url: string, timeout?: number): Promise<void>;
    /**
     * Get the page instance
     */
    getPage(): Page;
    /**
     * Get current URL
     */
    getCurrentUrl(): string;
    /**
     * Get page title
     */
    getPageTitle(): Promise<string>;
    /**
     * Apply slow motion delay if configured
     */
    private applySlowMo;
    /**
     * Update configuration at runtime
     */
    updateConfig(updates: Partial<FrameworkConfig>): void;
}
//# sourceMappingURL=ActionHelper.d.ts.map