import { Locator, Page } from '@playwright/test';
import { CoreActions } from './CoreActions';
import { FrameworkConfig } from '../../types';
/**
 * ClickActions - Simple clicking and basic interactions
 *
 * Handles all click-related operations like clicking buttons, links,
 * and basic element interactions. Junior developer friendly with
 * clear method names and automatic waiting.
 */
export declare class ClickActions extends CoreActions {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Click any element with robust error handling
     *
     * @param locator Locator, selector, or strategy to find element
     * @param options Click options (force, button, etc.)
     */
    clickLocator(locator: Locator | string | (() => Locator | Promise<Locator | null>), options?: {
        force?: boolean;
        button?: 'left' | 'right' | 'middle';
        clickCount?: number;
    }): Promise<void>;
    /**
     * Double click an element
     *
     * @param locator Element to double click
     */
    doubleClick(locator: Locator | string | (() => Locator | Promise<Locator | null>)): Promise<void>;
    /**
     * Right click (context menu) an element
     *
     * @param locator Element to right click
     */
    rightClick(locator: Locator | string | (() => Locator | Promise<Locator | null>)): Promise<void>;
    /**
     * Click button by visible text (case-insensitive, exact match)
     *
     * @param buttonText Text on the button
     */
    clickButtonByText(buttonText: string): Promise<void>;
    /**
     * Click link by visible text (case-insensitive, exact match)
     *
     * @param linkText Text of the link
     */
    clickLinkByText(linkText: string): Promise<void>;
    /**
     * Click element containing specific text
     *
     * @param text Text to search for (partial match)
     * @param elementType Optional element type to narrow search
     */
    clickByText(text: string, elementType?: string): Promise<void>;
    /**
     * Click element by data-testid attribute
     *
     * @param testId The data-testid value
     */
    clickByTestId(testId: string): Promise<void>;
    /**
     * Click element by aria-label
     *
     * @param ariaLabel The aria-label value
     */
    clickByAriaLabel(ariaLabel: string): Promise<void>;
    /**
     * Click at specific coordinates
     *
     * @param x X coordinate
     * @param y Y coordinate
     */
    clickAtCoordinates(x: number, y: number): Promise<void>;
    /**
     * Hover over an element
     *
     * @param locator Element to hover over
     */
    hover(locator: Locator | string | (() => Locator | Promise<Locator | null>)): Promise<void>;
    /**
     * Focus on an element
     *
     * @param locator Element to focus
     */
    focus(locator: Locator | string | (() => Locator | Promise<Locator | null>)): Promise<void>;
    /**
     * Press a key or key combination
     *
     * @param key Key to press (e.g., 'Enter', 'Tab', 'Ctrl+A')
     */
    pressKey(key: string): Promise<void>;
    /**
     * Press Enter key - Convenience method for the most common key press
     */
    pressEnter(): Promise<void>;
    /**
     * Press Tab key - Useful for navigation between form fields
     */
    pressTab(): Promise<void>;
    /**
     * Press Escape key - Useful for closing modals or canceling operations
     */
    pressEscape(): Promise<void>;
}
//# sourceMappingURL=ClickActions.d.ts.map