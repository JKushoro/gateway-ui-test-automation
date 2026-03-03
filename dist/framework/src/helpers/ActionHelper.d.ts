import { Locator, Page } from '@playwright/test';
import { LocatorHelper } from './LocatorHelper';
import { WaitHelper } from './WaitHelper';
import { ActionOptions, ClickOptions, FrameworkConfig } from '../types';
import { ILogger } from '../utils/Logger';
import { AssertionHelper } from '@framework/helpers/AssertionHelper';
/**
 * ActionHelper
 * - One place for all user-like interactions (click/fill/select)
 * - Consistent waiting + slowMo behaviour
 * - Robust "find-by-label/question" utilities used across KYC flows
 *
 * Notes:
 * - Keep "core primitives" (wait/click/fill) private and reused everywhere.
 * - Keep "locator resolution" centralised (firstThatExists/tryMany/findInput...).
 * - Public methods are grouped by concern for easier navigation/maintenance.
 */
export declare class ActionHelper {
    readonly page: Page;
    readonly locatorHelper: LocatorHelper;
    readonly waitHelper: WaitHelper;
    readonly assertionHelper: AssertionHelper;
    readonly logger: ILogger;
    config: FrameworkConfig;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /** Escape regex special chars in a string */
    private esc;
    /** Exact match regex (trim + case-insensitive) */
    private exactRx;
    /** Contains match regex (case-insensitive) */
    private containsRx;
    /** Optional slowMo after actions (useful for demo/debug) */
    private slowMo;
    /** Wait for element to be visible/ready using WaitHelper */
    private wait;
    /** Click a locator with consistent wait + slowMo */
    private clickEl;
    /** Fill an input/textarea with consistent wait + optional clear + slowMo */
    private fillEl;
    /** Returns first locator that exists across multiple strategies */
    private firstThatExists;
    /** Try many candidate strings until one operation succeeds */
    private tryMany;
    /** Click by framework selector (via LocatorHelper) */
    click(selector: string, options?: ClickOptions): Promise<void>;
    /** Click a Locator directly */
    clickLocator(locator: Locator, options?: ClickOptions): Promise<void>;
    /** Click a button by accessible name */
    clickButtonByText(text: string, exact?: boolean, options?: ClickOptions): Promise<void>;
    /** Click a link by accessible name */
    clickLinkByText(text: string, exact?: boolean, options?: ClickOptions): Promise<void>;
    /** Click target and wait for URL change */
    clickAndWaitForURL(target: Locator, url: string | RegExp, timeout?: number): Promise<void>;
    /**
     * Click a button by text inside a container (or full page)
     * - Uses role-based match first, then falls back to DOM filtering.
     */
    clickButtonByTextIn(text: string, container?: Locator, options?: ClickOptions): Promise<void>;
    /** Press a keyboard key */
    pressKey(key: string): Promise<void>;
    /** Get visible text from selector */
    getText(selector: string, options?: ActionOptions): Promise<string>;
    /** Get element attribute from selector */
    getAttribute(selector: string, attr: string, options?: ActionOptions): Promise<string | null>;
    /** Get input value from selector */
    getInputValue(selector: string, options?: ActionOptions): Promise<string>;
    /**
     * Read a value/label pair (legacy forms)
     * - Tries label->parent->value and form-group fallback.
     */
    getTextByLabel(labelText: string, elementTag?: string): Promise<string>;
    /** Get input value from the first label that exists in a list */
    getInputValueByAnyLabel(labels: string[], timeout?: number): Promise<string>;
    /** Fill by selector */
    fill(selector: string, value: string, options?: ActionOptions): Promise<void>;
    /**
     * Fill input by label (supports broken for/id wiring)
     * - Tries role textbox first
     * - Falls back to label[for] -> id/testid/name selector paths
     */
    fillInputByLabel(labelText: string, value: string, options?: ActionOptions): Promise<void>;
    /** Fill first found label among a list */
    fillInputByAnyLabel(labels: string[], value: string, options?: ActionOptions): Promise<Locator>;
    /** Fill by label and assert the value is what we expect (normalized) */
    fillInputByLabelAndAssert(label: string, value: string): Promise<void>;
    /**
     * Fill formatted number inputs and verify formatting/parsing
     * - Useful for currency/number masked controls
     */
    fillFormattedNumberInput(input: Locator, value: string | number, label?: string): Promise<void>;
    /** Is selector visible right now */
    isVisible(selector: string): Promise<boolean>;
    /** Is selector enabled right now */
    isEnabled(selector: string): Promise<boolean>;
    /**
     * Ensure a locator exists and becomes visible; otherwise log and skip
     * - Returns true if visible, false if not displayed
     */
    ensureVisibleOrSkip(locator: Locator, label: string, timeout?: number): Promise<boolean>;
    /**
     * Select a radio by label text (several fallback strategies)
     * - Good for non-KYC generic pages
     */
    selectRadioByLabel(labelText: string, options?: ActionOptions): Promise<void>;
    /**
     * Set radio answer for a question text (KYC style)
     * - Finds the radiogroup following the question text
     * - If answer missing => chooses a random enabled radio
     */
    setRadioByQuestion(q: string, answer?: string | boolean): Promise<string>;
    /**
     * Select a radio option for a question identified by regex.
     * - Scopes to the nearest radio container for that question
     * - If answer provided → selects matching option (case-insensitive)
     * - If no answer → selects a random enabled radio
     * - Strict: fails if question or option not found
     */
    setRadioByQuestionPattern(pattern: RegExp, answer?: string | boolean): Promise<string>;
    /**
     * Optional wrapper: answer pattern-based radio only if question exists
     * - Returns chosen value or undefined if question not shown
     */
    setRadioByQuestionPatternIfPresent(pattern: RegExp, answer?: string | boolean, timeoutMs?: number): Promise<string | undefined>;
    /**
     * Optional wrapper: answer text-based question radio only if question exists
     * - Returns chosen value or undefined if question not shown
     */
    setRadioByQuestionIfPresent(questionText: string, answer?: string | boolean, timeoutMs?: number): Promise<string | undefined>;
    /**
     * Set radio answer with MANDATORY selection verification - FAILS TEST if selection fails
     * - Ensures radio button is actually selected after interaction
     * - Throws error if selection verification fails
     * - Use this for critical form fields that MUST be selected
     */
    setRadioByQuestionWithVerification(questionText: string, answer?: string | boolean, timeoutMs?: number): Promise<string>;
    /**
     * Set radio answer with verification for pattern-based questions
     * - FAILS TEST if selection verification fails
     */
    setRadioByQuestionPatternWithVerification(pattern: RegExp, answer?: string | boolean, timeoutMs?: number): Promise<string>;
    /**
     * Set radio answer with verification - only if question exists
     * - Returns undefined if question not found
     * - FAILS TEST if question exists but selection fails
     */
    setRadioByQuestionWithVerificationIfPresent(questionText: string, answer?: string | boolean, timeoutMs?: number): Promise<string | undefined>;
    /**
     * PRIVATE: Verify radio button selection by question text
     * - Throws error if verification fails (causing test to fail)
     */
    private verifyRadioSelection;
    /**
     * PRIVATE: Verify radio button selection by pattern
     */
    private verifyRadioSelectionByPattern;
    /**
     * PRIVATE: Get the value of the currently selected radio button
     */
    private getSelectedRadioValue;
    /**
     * Set checkbox with MANDATORY selection verification - FAILS TEST if selection fails
     * - Ensures checkbox is actually checked/unchecked after interaction
     * - Throws error if verification fails
     */
    setCheckboxWithVerification(locator: Locator, checked?: boolean, timeoutMs?: number): Promise<void>;
    /**
     * Set checkbox by label with verification
     */
    setCheckboxByLabelWithVerification(labelText: string, checked?: boolean, timeoutMs?: number): Promise<void>;
    /**
     * Select random radio by name attribute (classic HTML radios)
     * - Excludes disabled and user-provided values
     */
    selectRandomRadioByName(name: string, excludeValues?: string[], options?: ActionOptions): Promise<string>;
    /** Check a checkbox (by selector or Locator) */
    checkCheckbox(target: string | Locator, options?: ActionOptions): Promise<void>;
    /** Uncheck a checkbox by selector */
    uncheckCheckbox(selector: string, options?: ActionOptions): Promise<void>;
    /**
     * Select checkboxes inside a fieldset locator.
     * - No values => selects 1 random
     * - With values => selects matching label text (contains match)
     */
    selectCheckboxGroup(fieldset: Locator, ...values: string[]): Promise<string[]>;
    /**
     * Select checkboxes from a locator list (usually the label nodes)
     * - options can be:
     *   - number: random N unique items
     *   - string[]: pick those labels exactly
     *   - undefined: pick none (returns [])
     */
    selectCheckboxes(optionsLocator: Locator, options?: string[] | number): Promise<string[]>;
    /** Select from a KYC radiogroup by the label text above it */
    selectFromRadioGroupByLabel(labelText: string, selection?: string | number): Promise<string>;
    /**
     * Select from a KYC checkbox group (fieldset[aria-labelledby])
     * - selection can be:
     *   - undefined: pick 1 random
     *   - number: pick N random
     *   - string | string[]: pick those labels
     */
    selectFromCheckboxGroupByLabel(labelText: string, selection?: string | string[] | number): Promise<string[]>;
    /** Select an option from a native <select> by label text */
    selectDropdownByLabel(labelText: string, option?: string): Promise<string>;
    /** Select from first existing label among a list */
    selectDropdownByAnyLabel(labels: string[], option?: string): Promise<string>;
    /** Select a random valid option from a native select (skips disabled/placeholder options) */
    selectRandomFromNativeSelect(dropdown: Locator): Promise<string | undefined>;
    /** Wait until a native select is populated (more than placeholder) */
    waitForDropdownPopulation(selector: string, excludeText?: string, timeout?: number): Promise<void>;
    /** Get valid option texts from a native select */
    getValidDropdownOptions(selector: string, excludeText?: string): Promise<string[]>;
    /** Select an option by exact visible text */
    selectSpecificOption(optionsLocator: Locator, optionText: string): Promise<string | null>;
    /** Select random option from a list, with optional exclude regex */
    selectRandomOption(optionsLocator: Locator, exclude?: RegExp): Promise<string | null>;
    /** React Select: choose option by label */
    chooseFromLabeledReactSelectDropdown(labelText: string, optionText?: string): Promise<string>;
    /** React Select: choose option by question text */
    chooseFromQuestionReactSelectDropdown(questionText: string, optionText?: string): Promise<string>;
    /** React Select: click control and choose an option by visible text (robust strategies) */
    selectReactSelect(dropdownId: string, value: string): Promise<void>;
    /** React Select: read single selected value */
    getReactSelectValue(dropdownId: string): Promise<string>;
    /** React Select: assert selected value is exact */
    verifyReactSelectValue(dropdownId: string, expected: string): Promise<void>;
    /** Generic: open react-select and pick value (or random) given the input locator */
    selectReactSelectDropdownOption(input: Locator, value?: string): Promise<string>;
    /** Wait for MUI menu and first item */
    waitForMUIMenu(menuSelector: string, itemSelector: string, timeout?: number): Promise<void>;
    /** Pick a random item from MUI menu list */
    selectRandomMUIMenuItem(items: Locator, menu?: Locator): Promise<string>;
    /** Select2: open dropdown and pick value (or random) */
    selectSelect2(trigger: Locator, options: Locator, rendered: Locator, value?: string): Promise<string>;
    /** Select2 + verify rendered display contains expected */
    selectSelect2AndVerify(label: string, trigger: Locator, options: Locator, rendered: Locator, value?: string): Promise<string>;
    /** Fill input by name attribute */
    fillInputByName(name: string, value: string): Promise<void>;
    /** Get input value by name attribute */
    getInputValueByName(name: string): Promise<string>;
    /** Verify input value by name attribute */
    verifyInputValue(name: string, expected: string): Promise<void>;
    /** React Select: get selected value by label (loose) */
    getReactSelectValueByLabelLoose(labelText: string): Promise<string>;
    /** Get input value by label (robust resolver) */
    getInputValueByLabel(label: string): Promise<string>;
    /**
     * React Select: get selected value by label (strict)
     * - Uses label[for] to locate the linked react-select container
     */
    getReactSelectValueByLabelStrict(labelText: string, timeoutMs?: number): Promise<string>;
    /**
     * Robust: find input/textarea by label text, handling broken `for`→`id` pairs.
     * - Uses multiple strategies (for/name/testid/label/placeholder/aria-label)
     */
    findInputFieldByLabel(labelText: string): Promise<Locator>;
    /** Find element + its id (useful when label wiring is weird) */
    findElementByLabelWithId(labelText: string): Promise<{
        el: Locator;
        id: string;
    }>;
    /** Resolve exact label text -> for id (fast DOM evaluate) */
    resolveForId(labelText: string): Promise<string | null>;
    /** Find a native <select> by label text */
    findDropdownByLabel(labelText: string): Promise<Locator>;
    /** Select dropdown option using JS (works when native UI is flaky) */
    selectDropdownOptionByJS(selector: string, optionText: string, fallbackIndex?: number): Promise<boolean>;
    /** Read selected dropdown option text via JS */
    getSelectedDropdownText(selector: string): Promise<string | null>;
    /**
     * Robust dropdown select:
     * - open
     * - select by JS
     * - verify selection
     */
    selectDropdownOptionRobust(selector: string, optionText: string, fallbackIndex: number): Promise<string>;
    /** Navigate to URL (domcontentloaded) */
    navigateToUrl(url: string): Promise<void>;
    /** Navigate with optional timeout + wait for DOM ready */
    navigateToPage(url: string, timeout?: number): Promise<void>;
    /** Get underlying Page instance */
    getPage(): Page;
    /** Get current URL */
    getCurrentUrl(): string;
    /** Get page title */
    getPageTitle(): Promise<string>;
    /** Update runtime config + keep WaitHelper in sync */
    updateConfig(updates: Partial<FrameworkConfig>): void;
    /** Click first visible selector in a list (safe fallback) */
    static clickFirstAvailable(page: Page, selectors: string[]): Promise<boolean>;
}
//# sourceMappingURL=ActionHelper.d.ts.map