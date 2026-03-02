// framework/helpers/ActionHelper.ts
import { expect, Locator, Page } from '@playwright/test';
import { LocatorHelper } from './LocatorHelper';
import { TextHelper } from './TextHelper';
import { WaitHelper } from './WaitHelper';
import { ActionOptions, ClickOptions, FrameworkConfig } from '../types';
import { createLogger, ILogger } from '../utils/Logger';
import { AssertionHelper } from '@framework/helpers/AssertionHelper';

type LocatorStrategy = () => Locator | Promise<Locator | null>;

const DEFAULT_CONFIG: FrameworkConfig = {
  slowMo: 0,
  timeout: 30_000,
};

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
export class ActionHelper {
  // ---------------------------------------------------------------------------
  // Dependencies (shared helpers)
  // ---------------------------------------------------------------------------
  public readonly locatorHelper: LocatorHelper;
  public readonly waitHelper: WaitHelper;
  public readonly assertionHelper: AssertionHelper;
  public readonly logger: ILogger;

  // Runtime config (can be updated)
  public config: FrameworkConfig;

  constructor(
    public readonly page: Page,
    config: Partial<FrameworkConfig> = {}
  ) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.locatorHelper = new LocatorHelper(page);
    this.waitHelper = new WaitHelper(page, this.config);
    this.assertionHelper = new AssertionHelper(page);
    this.logger = createLogger('ActionHelper');
  }

  // ===========================================================================
  // Text & Regex utilities
  // ===========================================================================

  /** Escape regex special chars in a string */
  private esc(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /** Exact match regex (trim + case-insensitive) */
  private exactRx(text: string): RegExp {
    return new RegExp(`^\\s*${this.esc(text)}\\s*$`, 'i');
  }

  /** Contains match regex (case-insensitive) */
  private containsRx(text: string): RegExp {
    return new RegExp(this.esc(text), 'i');
  }

  // ===========================================================================
  // Core timing / wait primitives (single source of truth)
  // ===========================================================================

  /** Optional slowMo after actions (useful for demo/debug) */
  private async slowMo(): Promise<void> {
    const ms = this.config.slowMo ?? 0;
    if (ms > 0) await this.page.waitForTimeout(ms);
  }

  /** Wait for element to be visible/ready using WaitHelper */
  private async wait(locator: Locator, timeout?: number): Promise<void> {
    await this.waitHelper.waitForElement(locator, timeout ?? this.config.timeout);
  }

  /** Click a locator with consistent wait + slowMo */
  private async clickEl(locator: Locator, options: ClickOptions = {}): Promise<void> {
    await this.wait(locator, options.timeout);
    await locator.click({
      force: options.force,
      button: options.button,
      clickCount: options.clickCount,
      delay: options.delay,
    });
    await this.slowMo();
  }

  /** Fill an input/textarea with consistent wait + optional clear + slowMo */
  private async fillEl(
    locator: Locator,
    value: string,
    options: ActionOptions = {}
  ): Promise<void> {
    await this.wait(locator, options.timeout);
    if (options.clear) await locator.fill('');
    await locator.fill(value);
    await this.slowMo();
  }

  // ===========================================================================
  // Robust locator resolution utilities (avoid duplication)
  // ===========================================================================

  /** Returns first locator that exists across multiple strategies */
  private async firstThatExists(strategies: LocatorStrategy[], err: string): Promise<Locator> {
    for (const s of strategies) {
      try {
        const el = await s();
        if (el && (await el.count()) > 0) return el.first();
      } catch {
        // try next strategy
      }
    }
    throw new Error(err);
  }

  /** Try many candidate strings until one operation succeeds */
  private async tryMany<T>(
    items: string[],
    op: (item: string) => Promise<T>,
    err: string
  ): Promise<T> {
    let last: unknown;
    for (const item of items) {
      try {
        return await op(item);
      } catch (e) {
        last = e;
      }
    }
    throw (last as Error) ?? new Error(err);
  }

  // ===========================================================================
  // Clicks & basic interactions
  // ===========================================================================

  /** Click by framework selector (via LocatorHelper) */
  public async click(selector: string, options: ClickOptions = {}): Promise<void> {
    await this.clickEl(this.locatorHelper.getLocator(selector), options);
  }

  /** Click a Locator directly */
  public async clickLocator(locator: Locator, options: ClickOptions = {}): Promise<void> {
    await this.clickEl(locator, options);
  }

  /** Click a button by accessible name */
  public async clickButtonByText(
    text: string,
    exact = true,
    options: ClickOptions = {}
  ): Promise<void> {
    const btn = this.page
      .getByRole('button', { name: exact ? this.exactRx(text) : this.containsRx(text) })
      .first();

    await this.clickEl(btn, options);
  }

  /** Click a link by accessible name */
  public async clickLinkByText(
    text: string,
    exact = true,
    options: ClickOptions = {}
  ): Promise<void> {
    const link = this.page
      .getByRole('link', { name: exact ? this.exactRx(text) : this.containsRx(text) })
      .first();

    await this.clickEl(link, options);
  }

  /** Click target and wait for URL change */
  public async clickAndWaitForURL(
    target: Locator,
    url: string | RegExp,
    timeout?: number
  ): Promise<void> {
    await Promise.all([
      this.page.waitForURL(url, { timeout: timeout ?? this.config.timeout }),
      target.click(),
    ]);
    await this.slowMo();
  }

  /**
   * Click a button by text inside a container (or full page)
   * - Uses role-based match first, then falls back to DOM filtering.
   */
  public async clickButtonByTextIn(
    text: string,
    container?: Locator,
    options: ClickOptions = {}
  ): Promise<void> {
    const root: Locator | Page = container ?? this.page;

    // Role-based first (works best when accessible names are correct)
    let btn = (root as Page).getByRole?.('button', { name: this.exactRx(text) })?.first?.() as
      | Locator
      | undefined;

    // DOM fallback
    if (!btn || (await btn.count()) === 0) {
      btn = (root as Locator)
        .locator?.('button')
        ?.filter({ hasText: this.exactRx(text) })
        .first?.() as Locator;
    }

    if (!btn || (await btn.count()) === 0) throw new Error(`Button not found: "${text}"`);
    await this.clickEl(btn, options);
  }

  /** Press a keyboard key */
  public async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
    await this.slowMo();
  }

  // ===========================================================================
  // Read text / values / attributes
  // ===========================================================================

  /** Get visible text from selector */
  public async getText(selector: string, options: ActionOptions = {}): Promise<string> {
    const loc = this.locatorHelper.getLocator(selector);
    await this.wait(loc, options.timeout);
    return TextHelper.getTrimmedText(loc);
  }

  /** Get element attribute from selector */
  public async getAttribute(
    selector: string,
    attr: string,
    options: ActionOptions = {}
  ): Promise<string | null> {
    const loc = this.locatorHelper.getLocator(selector);
    await this.wait(loc, options.timeout);
    return loc.getAttribute(attr);
  }

  /** Get input value from selector */
  public async getInputValue(selector: string, options: ActionOptions = {}): Promise<string> {
    const loc = this.locatorHelper.getLocator(selector);
    await this.wait(loc, options.timeout);
    return loc.inputValue();
  }

  /**
   * Read a value/label pair (legacy forms)
   * - Tries label->parent->value and form-group fallback.
   */
  public async getTextByLabel(labelText: string, elementTag = 'span'): Promise<string> {
    const label = this.page.locator(`label:has-text("${labelText}")`).first();

    if (await label.isVisible().catch(() => false)) {
      const el = label.locator('..').locator('..').locator(elementTag).first();
      if (await el.isVisible().catch(() => false)) return (await el.textContent())?.trim() ?? '';
    }

    const group = this.page.locator(`.form-group:has(label:has-text("${labelText}"))`);
    if (await group.isVisible().catch(() => false)) {
      const el = group.locator(`.col-md-7 ${elementTag}`).first();
      if (await el.isVisible().catch(() => false)) return (await el.textContent())?.trim() ?? '';
    }

    throw new Error(`Field not found for label "${labelText}"`);
  }

  /** Get input value from the first label that exists in a list */
  public async getInputValueByAnyLabel(labels: string[], timeout?: number): Promise<string> {
    return this.tryMany(
      labels,
      async label => {
        const input = await this.findInputFieldByLabel(label);
        await this.wait(input, timeout);
        return input.inputValue();
      },
      `Input not found for any label: ${labels.join(', ')}`
    );
  }

  // ===========================================================================
  // Inputs & forms
  // ===========================================================================

  /** Fill by selector */
  public async fill(selector: string, value: string, options: ActionOptions = {}): Promise<void> {
    await this.fillEl(this.locatorHelper.getLocator(selector), value, options);
  }

  /**
   * Fill input by label (supports broken for/id wiring)
   * - Tries role textbox first
   * - Falls back to label[for] -> id/testid/name selector paths
   */
  public async fillInputByLabel(
    labelText: string,
    value: string,
    options: ActionOptions = {}
  ): Promise<void> {
    let input = this.page.getByRole('textbox', { name: this.exactRx(labelText) }).first();

    if (!(await input.count())) {
      const forAttr = await this.page
        .locator('label', { hasText: this.containsRx(labelText) })
        .first()
        .getAttribute('for');

      if (!forAttr) throw new Error(`Label "${labelText}" has no 'for' attribute`);

      const idEsc = forAttr.replace(/\./g, '\\.');

      input = this.page
        .getByTestId(`input-${forAttr}`)
        .or(this.page.getByTestId(`number-input-${forAttr}`))
        .or(this.page.locator(`input[name="${forAttr}"],textarea[name="${forAttr}"]`))
        .or(this.page.locator(`input#${idEsc},textarea#${idEsc}`))
        .first();
    }

    await this.fillEl(input, value, options);
  }

  /** Fill first found label among a list */
  public async fillInputByAnyLabel(
    labels: string[],
    value: string,
    options: ActionOptions = {}
  ): Promise<Locator> {
    return this.tryMany(
      labels,
      async label => {
        const input = await this.findInputFieldByLabel(label);
        await this.fillEl(input, value, options);
        return input;
      },
      `Input not found for any label: ${labels.join(', ')}`
    );
  }

  /** Fill by label and assert the value is what we expect (normalized) */
  public async fillInputByLabelAndAssert(label: string, value: string): Promise<void> {
    const expected = TextHelper.cleanText(value);
    await this.fillInputByLabel(label, expected);

    const actual = TextHelper.cleanText(await this.getInputValueByLabel(label));
    expect(actual, `Input "${label}" value mismatch`).toBe(expected);
  }

  /**
   * Fill formatted number inputs and verify formatting/parsing
   * - Useful for currency/number masked controls
   */
  public async fillFormattedNumberInput(
    input: Locator,
    value: string | number,
    label = 'Formatted number input'
  ): Promise<void> {
    const expected =
      typeof value === 'number' ? value : this.assertionHelper.parseFormattedNumber(String(value));

    if (!Number.isFinite(expected)) throw new Error(`${label}: invalid numeric value "${value}"`);

    await expect(input).toBeVisible();
    await input.scrollIntoViewIfNeeded();

    await input.fill(String(expected));
    await input.evaluate(el => el.blur());

    await this.assertionHelper.assertFormattedNumberEquals(input, expected);
    this.logger.info?.(`✓ ${label}: ${expected}`);
  }

  // ===========================================================================
  // Visibility & state
  // ===========================================================================

  /** Is selector visible right now */
  public async isVisible(selector: string): Promise<boolean> {
    return this.locatorHelper.getLocator(selector).isVisible();
  }

  /** Is selector enabled right now */
  public async isEnabled(selector: string): Promise<boolean> {
    return this.locatorHelper.getLocator(selector).isEnabled();
  }

  /**
   * Ensure a locator exists and becomes visible; otherwise log and skip
   * - Returns true if visible, false if not displayed
   */
  public async ensureVisibleOrSkip(
    locator: Locator,
    label: string,
    timeout = 3_000
  ): Promise<boolean> {
    if ((await locator.count()) === 0) {
      this.logger.info?.(`↷ Skipped "${label}" (not displayed)`);
      return false;
    }

    await this.waitHelper.waitForElement(locator.first(), timeout);
    return true;
  }

  // ===========================================================================
  // Radios
  // ===========================================================================

  /**
   * Select a radio by label text (several fallback strategies)
   * - Good for non-KYC generic pages
   */
  public async selectRadioByLabel(labelText: string, options: ActionOptions = {}): Promise<void> {
    const strategies: LocatorStrategy[] = [
      () => this.page.getByLabel(labelText, { exact: true }),
      () => this.page.getByLabel(labelText, { exact: false }),
      () => this.page.getByRole('radio', { name: labelText }),
      async () => {
        const forId = await this.resolveForId(labelText);
        return forId ? this.page.locator(`#${forId}[type="radio"]`) : null;
      },
      () =>
        this.page.locator(
          `label:has-text("${labelText}") input[type="radio"], label:has-text("${labelText}") ~ input[type="radio"]`
        ),
    ];

    const radio = await this.firstThatExists(strategies, `Radio not found for "${labelText}"`);
    await this.wait(radio, options.timeout);
    await radio.check({ force: options.force });
    await this.slowMo();
  }

  /**
   * Set radio answer for a question text (KYC style)
   * - Finds the radiogroup following the question text
   * - If answer missing => chooses a random enabled radio
   */
  public async setRadioByQuestion(q: string, answer?: string | boolean): Promise<string> {
    const question = this.page.getByText(q, { exact: false }).first();
    await this.waitHelper.waitForElement(question, 5_000);

    const group = question.locator('xpath=following::*[@role="radiogroup"][1]').first();
    await this.waitHelper.waitForElement(group, 5_000);

    // Specific answer
    if (answer !== undefined && String(answer).trim()) {
      const want = String(answer).trim();

      const byName = group.getByRole('radio', { name: this.exactRx(want) }).first();
      if (await byName.count()) {
        await byName.check({ force: true }).catch(() => byName.click({ force: true }));
        return want;
      }

      const byVal = group
        .locator(`input[type="radio"][value="${String(answer).toLowerCase()}" i]:not(:disabled)`)
        .first();

      if (await byVal.count()) {
        await byVal.check({ force: true }).catch(() => byVal.click({ force: true }));
        return want;
      }

      throw new Error(`Option "${want}" not found for "${q}"`);
    }

    // Random answer
    const radios = group.locator('input[type="radio"]:not(:disabled)');
    const n = await radios.count();
    if (n === 0) throw new Error(`No selectable radios for "${q}"`);

    const pick = radios.nth(Math.floor(Math.random() * n));
    await pick.check({ force: true }).catch(() => pick.click({ force: true }));

    const labelText = await TextHelper.getTrimmedText(pick.locator('xpath=ancestor::label[1]'));
    return labelText || (await pick.getAttribute('value')) || '';
  }

  /**
   * Select a radio option for a question identified by regex.
   * - Scopes to the nearest radio container for that question
   * - If answer provided → selects matching option (case-insensitive)
   * - If no answer → selects a random enabled radio
   * - Strict: fails if question or option not found
   */
  public async setRadioByQuestionPattern(
    pattern: RegExp,
    answer?: string | boolean
  ): Promise<string> {
    const q = this.page.getByText(pattern).first();
    await expect(q).toBeVisible({ timeout: 15_000 });

    const box = q.locator('xpath=ancestor::*[.//input[@type="radio"]][1]');
    await expect(box).toBeVisible({ timeout: 15_000 });

    const radios = box.getByRole('radio');
    const v = answer !== undefined ? String(answer).trim() : '';
    const r = v
      ? box.getByRole('radio', { name: new RegExp(`^${this.esc(v)}$`, 'i') }).first()
      : radios.nth(Math.floor(Math.random() * (await radios.count())));

    await r.click({ force: true });
    await expect(r).toBeChecked();

    return v || (await r.textContent())?.trim() || '';
  }

  /**
   * Optional wrapper: answer pattern-based radio only if question exists
   * - Returns chosen value or undefined if question not shown
   */
  public async setRadioByQuestionPatternIfPresent(
    pattern: RegExp,
    answer?: string | boolean,
    timeoutMs = 15_000
  ): Promise<string | undefined> {
    const q = this.page.getByText(pattern).first();
    if ((await q.count()) === 0) return undefined;

    await q.waitFor({ state: 'visible', timeout: timeoutMs });
    return this.setRadioByQuestionPattern(pattern, answer);
  }

  /**
   * Optional wrapper: answer text-based question radio only if question exists
   * - Returns chosen value or undefined if question not shown
   */
  public async setRadioByQuestionIfPresent(
    questionText: string,
    answer?: string | boolean,
    timeoutMs = 15_000
  ): Promise<string | undefined> {
    const q = this.page.getByText(questionText, { exact: false }).first();
    if ((await q.count()) === 0) return undefined;

    await q.waitFor({ state: 'visible', timeout: timeoutMs });
    return this.setRadioByQuestion(questionText, answer);
  }

  /**
   * Select random radio by name attribute (classic HTML radios)
   * - Excludes disabled and user-provided values
   */
  public async selectRandomRadioByName(
    name: string,
    excludeValues: string[] = [],
    options: ActionOptions = {}
  ): Promise<string> {
    const radios = this.page.locator(`input[name="${name}"][type="radio"]`);
    const count = await radios.count();
    if (count === 0) throw new Error(`No radios with name "${name}"`);

    const candidates: { index: number; value: string }[] = [];
    for (let i = 0; i < count; i++) {
      const r = radios.nth(i);
      const value = (await r.getAttribute('value')) ?? '';
      if (!(await r.isDisabled()) && !excludeValues.includes(value))
        candidates.push({ index: i, value });
    }

    if (!candidates.length) throw new Error(`No selectable radios for "${name}"`);

    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    const chosen = radios.nth(pick.index);

    await this.wait(chosen, options.timeout);
    await chosen.check({ force: options.force });
    await this.slowMo();

    return pick.value;
  }

  // ===========================================================================
  // Checkboxes
  // ===========================================================================

  /** Check a checkbox (by selector or Locator) */
  public async checkCheckbox(target: string | Locator, options: ActionOptions = {}): Promise<void> {
    const checkbox = typeof target === 'string' ? this.locatorHelper.getLocator(target) : target;
    await this.wait(checkbox, options.timeout);

    if (!(await checkbox.isChecked())) await checkbox.check({ force: options.force });
    await this.slowMo();
  }

  /** Uncheck a checkbox by selector */
  public async uncheckCheckbox(selector: string, options: ActionOptions = {}): Promise<void> {
    const checkbox = this.locatorHelper.getLocator(selector);
    await this.wait(checkbox, options.timeout);

    if (await checkbox.isChecked()) await checkbox.uncheck({ force: options.force });
    await this.slowMo();
  }

  /**
   * Select checkboxes inside a fieldset locator.
   * - No values => selects 1 random
   * - With values => selects matching label text (contains match)
   */
  public async selectCheckboxGroup(fieldset: Locator, ...values: string[]): Promise<string[]> {
    await this.waitHelper.waitForElementStable(fieldset, 200, 15_000);

    const labels = fieldset.locator('label');
    const inputs = fieldset.locator('input[type="checkbox"]');

    const count = await labels.count();
    if (!count) throw new Error('No checkboxes found in fieldset.');

    const clickAt = async (i: number): Promise<string> => {
      const testId = await inputs.nth(i).getAttribute('data-testid');
      if (!testId) throw new Error('Checkbox input missing data-testid.');

      const input = fieldset.locator(`[data-testid="${testId}"]`);
      const label = labels.nth(i);

      await label.scrollIntoViewIfNeeded();
      await this.waitHelper.waitForElementStable(label, 150, 10_000);

      // Retry once for flaky UI
      for (let attempt = 0; attempt < 2; attempt++) {
        await label.click({ force: true });
        if (await input.isChecked()) break;
        await this.waitHelper.waitForTimeout(80);
      }

      await expect(input).toBeChecked({ timeout: 10_000 });
      return ((await label.textContent()) ?? '').trim();
    };

    // Random single
    if (!values.length) return [await clickAt(Math.floor(Math.random() * count))];

    // Specific values
    const texts = await labels.allTextContents();
    const picked: string[] = [];

    for (const v of values) {
      const idx = texts.findIndex(t => (t ?? '').includes(v));
      if (idx < 0) throw new Error(`Option "${v}" not found.`);
      picked.push(await clickAt(idx));
    }

    return picked;
  }

  /**
   * Select checkboxes from a locator list (usually the label nodes)
   * - options can be:
   *   - number: random N unique items
   *   - string[]: pick those labels exactly
   *   - undefined: pick none (returns [])
   */
  public async selectCheckboxes(
    optionsLocator: Locator,
    options?: string[] | number
  ): Promise<string[]> {
    const count = await optionsLocator.count();
    if (!count) throw new Error('No checkbox options found');

    // Random N
    if (typeof options === 'number') {
      const texts = (await optionsLocator.allTextContents())
        .map(t => (t ?? '').trim())
        .filter(Boolean);

      const n = Math.max(0, Math.min(options, texts.length));
      const picks: string[] = [];
      const pool = [...texts];

      while (picks.length < n && pool.length) {
        picks.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
      }

      for (const t of picks) {
        const opt = optionsLocator.filter({ hasText: this.exactRx(t) }).first();
        await this.waitHelper.waitForElement(opt, 5_000);
        await opt.click({ force: true });
        await this.slowMo();
      }

      return picks;
    }

    // Specific labels
    const wanted = Array.isArray(options) ? options : [];
    const selected: string[] = [];

    for (const t of wanted) {
      const opt = optionsLocator.filter({ hasText: this.exactRx(t) }).first();
      await this.waitHelper.waitForElement(opt, 5_000);
      await opt.click({ force: true });
      selected.push(t);
      await this.slowMo();
    }

    return selected;
  }

  // ===========================================================================
  // Fairstone KYC groups (radio/checkbox groups bound to label 'for' id)
  // ===========================================================================

  /** Select from a KYC radiogroup by the label text above it */
  public async selectFromRadioGroupByLabel(
    labelText: string,
    selection?: string | number
  ): Promise<string> {
    const label = this.page.getByText(labelText, { exact: false }).first();
    if (!(await label.count())) return '';

    await expect(label).toBeVisible();

    const id = await label.getAttribute('for');
    if (!id) throw new Error(`"${labelText}" label missing "for"`);

    const group = this.page.locator(`div[role="radiogroup"][aria-labelledby="${id}"]`);
    const options = group.locator('label');

    await expect(options.first()).toBeVisible();

    // Random
    if (selection === undefined) {
      const i = Math.floor(Math.random() * (await options.count()));
      const text = ((await options.nth(i).textContent()) ?? '').trim();
      await options.nth(i).click();
      await this.slowMo();
      return text;
    }

    // By index
    if (typeof selection === 'number') {
      const text = ((await options.nth(selection).textContent()) ?? '').trim();
      await options.nth(selection).click();
      await this.slowMo();
      return text;
    }

    // By text
    const option = options.filter({ hasText: this.containsRx(selection) }).first();
    await expect(option).toBeVisible();
    await option.click();
    await this.slowMo();
    return selection;
  }

  /**
   * Select from a KYC checkbox group (fieldset[aria-labelledby])
   * - selection can be:
   *   - undefined: pick 1 random
   *   - number: pick N random
   *   - string | string[]: pick those labels
   */
  public async selectFromCheckboxGroupByLabel(
    labelText: string,
    selection?: string | string[] | number
  ): Promise<string[]> {
    const label = this.page.locator('label', { hasText: this.containsRx(labelText) }).first();
    await expect(label).toBeVisible({ timeout: 15_000 });

    const forId = await label.getAttribute('for');
    if (!forId) throw new Error(`Label "${labelText}" does not have a 'for' attribute.`);

    const fieldset = this.page.locator(`fieldset[aria-labelledby="${forId}"]`);
    await expect(fieldset).toBeVisible({ timeout: 15_000 });

    const options = fieldset.locator('label');
    await expect(options.first()).toBeVisible({ timeout: 15_000 });

    // Random 1
    if (selection === undefined) {
      const count = await options.count();
      const value =
        (await options.nth(Math.floor(Math.random() * count)).innerText())?.trim() ?? '';
      await this.selectCheckboxes(options, [value]);
      return [value];
    }

    // Random N
    if (typeof selection === 'number') return this.selectCheckboxes(options, selection);

    // Specific list
    const wanted = Array.isArray(selection) ? selection : [selection];
    return this.selectCheckboxes(options, wanted);
  }

  // ===========================================================================
  // Native <select>
  // ===========================================================================

  /** Select an option from a native <select> by label text */
  public async selectDropdownByLabel(labelText: string, option?: string): Promise<string> {
    const dropdown = await this.findDropdownByLabel(labelText);

    if (option) {
      await dropdown
        .selectOption({ label: option })
        .catch(() => dropdown.selectOption({ value: option }));
    } else {
      const picked = await this.selectRandomFromNativeSelect(dropdown);
      if (!picked) throw new Error(`No valid options in "${labelText}"`);
    }

    return dropdown.evaluate(
      el => (el as HTMLSelectElement).selectedOptions?.[0]?.text?.trim() ?? ''
    );
  }

  /** Select from first existing label among a list */
  public async selectDropdownByAnyLabel(labels: string[], option?: string): Promise<string> {
    return this.tryMany(
      labels,
      label => this.selectDropdownByLabel(label, option),
      `Dropdown not found for any label: ${labels.join(', ')}`
    );
  }

  /** Select a random valid option from a native select (skips disabled/placeholder options) */
  public async selectRandomFromNativeSelect(dropdown: Locator): Promise<string | undefined> {
    const value = await dropdown.evaluate(el => {
      const select = el as HTMLSelectElement;
      const candidates = Array.from(select.options).filter(
        o => !o.disabled && o.value.trim() && !/^please\s*select/i.test(o.text.trim())
      );
      if (!candidates.length) return null;

      const choice = candidates[Math.floor(Math.random() * candidates.length)];
      select.value = choice.value;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      return choice.text.trim();
    });

    return value ?? undefined;
  }

  /** Wait until a native select is populated (more than placeholder) */
  public async waitForDropdownPopulation(
    selector: string,
    excludeText = 'Select',
    timeout = 10_000
  ): Promise<void> {
    await this.waitHelper.waitForFunction(
      (args): boolean => {
        const [sel, exclude] = args as [string, string];
        const dd = document.querySelector(sel) as HTMLSelectElement | null;
        if (!dd || dd.options.length <= 1) return false;

        for (let i = 1; i < dd.options.length; i++) {
          const t = dd.options[i].textContent?.trim() || '';
          if (t && !t.includes(exclude)) return true;
        }
        return false;
      },
      [selector, excludeText],
      timeout
    );
  }

  /** Get valid option texts from a native select */
  public async getValidDropdownOptions(
    selector: string,
    excludeText = 'Select'
  ): Promise<string[]> {
    return this.page.evaluate(
      (args): string[] => {
        const [sel, exclude] = args as [string, string];
        const dd = document.querySelector(sel) as HTMLSelectElement | null;
        if (!dd) return [];

        const out: string[] = [];
        for (let i = 1; i < dd.options.length; i++) {
          const t = dd.options[i].textContent?.trim() || '';
          if (t && !t.includes(exclude)) out.push(t);
        }
        return out;
      },
      [selector, excludeText]
    );
  }

  /** Select an option by exact visible text */
  public async selectSpecificOption(
    optionsLocator: Locator,
    optionText: string
  ): Promise<string | null> {
    const exact = optionsLocator.filter({ hasText: this.exactRx(optionText) }).first();
    if (await exact.isVisible().catch(() => false)) {
      const text = (await exact.textContent())?.trim() ?? null;
      await exact.click();
      await this.slowMo();
      return text;
    }
    return null;
  }

  /** Select random option from a list, with optional exclude regex */
  public async selectRandomOption(
    optionsLocator: Locator,
    exclude?: RegExp
  ): Promise<string | null> {
    const texts = await optionsLocator.allTextContents();
    const valid = texts
      .map((t, i) => ({ t: (t ?? '').trim(), i }))
      .filter(({ t }) => t && !exclude?.test(t));

    if (!valid.length) return null;

    const pick = valid[Math.floor(Math.random() * valid.length)];
    const selected = optionsLocator.nth(pick.i);
    const text = (await selected.textContent())?.trim() ?? null;
    await selected.click();
    await this.slowMo();
    return text;
  }

  // ===========================================================================
  // React Select / MUI / Select2
  // ===========================================================================

  /** React Select: choose option by label */
  public async chooseFromLabeledReactSelectDropdown(
    labelText: string,
    optionText?: string
  ): Promise<string> {
    const label = this.page.locator('label', { hasText: this.containsRx(labelText) }).first();
    await expect(label).toBeVisible();

    const id = await label.getAttribute('for');
    if (!id) throw new Error(`Label "${labelText}" has no 'for' attribute`);

    const input = this.page.locator(`[id="${id}"]`);
    const control = input.locator('xpath=ancestor::*[contains(@class,"react-select__control")]');

    await control.click();

    const options = this.page.getByRole('option');
    await expect(options.first()).toBeVisible();

    // Specific
    if (optionText?.trim()) {
      await this.page.getByRole('option', { name: optionText }).click();
      await this.slowMo();
      return optionText;
    }

    // Random
    const count = await options.count();
    if (!count) throw new Error(`No options found for "${labelText}"`);

    const option = options.nth(Math.floor(Math.random() * count));
    const chosen = (await option.textContent())?.trim() ?? '';

    await option.click();
    await this.slowMo();
    return chosen;
  }

  /** React Select: choose option by question text */
  public async chooseFromQuestionReactSelectDropdown(
    questionText: string,
    optionText?: string
  ): Promise<string> {
    const question = this.page.getByText(questionText, { exact: false }).first();
    await expect(question).toBeVisible();

    const block = question.locator(
      'xpath=ancestor::*[.//div[contains(@class,"react-select__control")]][1]'
    );
    const control = block.locator('.react-select__control').first();

    await expect(control).toBeVisible();
    await control.click();

    const options = this.page.getByRole('listbox').getByRole('option');
    await expect(options.first()).toBeVisible();

    // Specific
    if (optionText?.trim()) {
      await options.getByText(optionText, { exact: true }).click();
      await this.slowMo();
      return optionText;
    }

    // Random
    const option = options.nth(Math.floor(Math.random() * (await options.count())));
    const chosen = (await option.textContent())?.trim() ?? '';

    await option.click();
    await this.slowMo();
    return chosen;
  }

  /** React Select: click control and choose an option by visible text (robust strategies) */
  public async selectReactSelect(dropdownId: string, value: string): Promise<void> {
    try {
      const dropdown = this.page.locator(`#${dropdownId.replace(/\./g, '\\.')}`);
      await this.waitHelper.waitForElement(dropdown, 5_000);
      await dropdown.click();

      const menu = this.page.locator('.react-select__menu').first();
      await this.waitHelper.waitForElement(menu, 3_000);

      const strategies = [
        () =>
          menu
            .locator('.react-select__option')
            .filter({ hasText: this.exactRx(value) })
            .first(),
        () => menu.locator('.react-select__option').filter({ hasText: value }).first(),
        () => menu.locator('.react-select__option').getByText(value, { exact: false }).first(),
      ];

      for (const s of strategies) {
        const opt = s();
        if (await opt.count()) {
          await opt.click();
          await this.slowMo();
          return;
        }
      }

      throw new Error(`Option "${value}" not found in React Select`);
    } catch (e) {
      await this.page.click('body').catch(() => {});
      throw e;
    }
  }

  /** React Select: read single selected value */
  public async getReactSelectValue(dropdownId: string): Promise<string> {
    const single = this.page.locator(
      `#${dropdownId.replace(/\./g, '\\.')} .react-select__single-value`
    );
    await this.waitHelper.waitForElement(single, 5_000);
    return (await single.textContent())?.trim() || '';
  }

  /** React Select: assert selected value is exact */
  public async verifyReactSelectValue(dropdownId: string, expected: string): Promise<void> {
    const actual = await this.getReactSelectValue(dropdownId);
    if (actual !== expected)
      throw new Error(`React Select mismatch. Expected "${expected}", got "${actual}"`);
  }

  /** Generic: open react-select and pick value (or random) given the input locator */
  public async selectReactSelectDropdownOption(input: Locator, value?: string): Promise<string> {
    await expect(input).toBeVisible();

    const control = input.locator('xpath=ancestor::*[contains(@class,"react-select__control")]');
    await control.click();

    const options = this.page.getByRole('option');
    await expect(options.first()).toBeVisible();

    let chosen: string;

    // Specific
    if (value?.trim()) {
      chosen = value;
      await options.filter({ hasText: value }).first().click();
    } else {
      // Random
      const count = await options.count();
      const idx = Math.floor(Math.random() * count);
      const pick = options.nth(idx);

      chosen = ((await pick.textContent()) ?? '').trim();
      await pick.click();
    }

    await expect(control.getByText(chosen, { exact: false })).toBeVisible();
    await this.slowMo();
    return chosen;
  }

  /** Wait for MUI menu and first item */
  public async waitForMUIMenu(
    menuSelector: string,
    itemSelector: string,
    timeout = 5_000
  ): Promise<void> {
    await this.waitHelper.waitForElement(this.page.locator(menuSelector), timeout);
    await this.waitHelper.waitForElement(this.page.locator(itemSelector).first(), 3_000);
    await this.waitHelper.waitForTimeout(300);
  }

  /** Pick a random item from MUI menu list */
  public async selectRandomMUIMenuItem(items: Locator, menu?: Locator): Promise<string> {
    const count = await items.count();
    if (!count) throw new Error('No menu items found');

    const idx = Math.floor(Math.random() * count);
    const item = items.nth(idx);
    const text = (await item.textContent())?.trim() || '';

    await this.clickLocator(item);
    if (menu) await this.waitHelper.waitForElementToBeHidden(menu, 2_000);

    return text;
  }

  /** Select2: open dropdown and pick value (or random) */
  public async selectSelect2(
    trigger: Locator,
    options: Locator,
    rendered: Locator,
    value?: string
  ): Promise<string> {
    const isValid = (t: string): boolean => !!t && !/^please\s*select\b/i.test(t);

    await trigger.click({ force: true });
    await options.first().waitFor();

    let pick = (typeof value === 'string' && value.trim()) || '';
    if (!pick) {
      const texts = (await options.allTextContents()).map(t => (t ?? '').trim()).filter(isValid);
      if (!texts.length) throw new Error('No valid options in Select2 dropdown');
      pick = texts[Math.floor(Math.random() * texts.length)];
    }

    let chosen = options.filter({ hasText: this.exactRx(pick) }).first();
    if ((await chosen.count()) === 0)
      chosen = options.filter({ hasText: this.containsRx(pick) }).first();
    if ((await chosen.count()) === 0) throw new Error(`Select2 option not found: "${pick}"`);

    const selectedText = (await chosen.textContent())?.trim() ?? '';
    await chosen.click();
    await this.slowMo();

    return (await rendered.textContent().catch(() => selectedText))?.trim() || selectedText;
  }

  /** Select2 + verify rendered display contains expected */
  public async selectSelect2AndVerify(
    label: string,
    trigger: Locator,
    options: Locator,
    rendered: Locator,
    value?: string
  ): Promise<string> {
    const selected = await this.selectSelect2(trigger, options, rendered, value);

    if (value) {
      const renderedText = (await rendered.textContent())?.trim() ?? '';
      if (!renderedText.toLowerCase().includes(value.toLowerCase())) {
        throw new Error(`${label} not selected. Expected "${value}", rendered "${renderedText}"`);
      }
    }

    return selected;
  }

  // ===========================================================================
  // Name / Label helpers
  // ===========================================================================

  /** Fill input by name attribute */
  public async fillInputByName(name: string, value: string): Promise<void> {
    const input = this.page.locator(`input[name="${name}"]`);
    await this.waitHelper.waitForElement(input, 5_000);
    await input.fill(value);
    await this.slowMo();
  }

  /** Get input value by name attribute */
  public async getInputValueByName(name: string): Promise<string> {
    const input = this.page.locator(`input[name="${name}"]`);
    await this.waitHelper.waitForElement(input, 5_000);
    return input.inputValue();
  }

  /** Verify input value by name attribute */
  public async verifyInputValue(name: string, expected: string): Promise<void> {
    const actual = await this.getInputValueByName(name);
    if (actual !== expected)
      throw new Error(`Input "${name}" mismatch. Expected "${expected}", got "${actual}"`);
  }

  /** React Select: get selected value by label (loose) */
  public async getReactSelectValueByLabelLoose(labelText: string): Promise<string> {
    const label = this.page.getByText(this.containsRx(labelText), { exact: false }).first();
    await this.waitHelper.waitForElement(label, 5_000);

    const single = label
      .locator('xpath=following::*[contains(@class,"react-select__single-value")][1]')
      .first();
    await this.waitHelper.waitForElement(single, 5_000);

    return (await single.textContent())?.trim() ?? '';
  }

  /** Get input value by label (robust resolver) */
  public async getInputValueByLabel(label: string): Promise<string> {
    const input = await this.findInputFieldByLabel(label);
    await this.waitHelper.waitForElement(input, 5_000);
    return input.inputValue();
  }

  /**
   * React Select: get selected value by label (strict)
   * - Uses label[for] to locate the linked react-select container
   */
  public async getReactSelectValueByLabelStrict(
    labelText: string,
    timeoutMs = 15_000
  ): Promise<string> {
    const label = this.page.locator('label', { hasText: this.containsRx(labelText) }).first();
    await this.waitHelper.waitForElement(label, 10_000);

    const forId = await label.getAttribute('for');
    if (!forId) throw new Error(`Label "${labelText}" has no 'for' attribute`);

    const input = this.page.locator(`#${forId.replace(/\./g, '\\.')}`);
    const container = input.locator(
      'xpath=ancestor::*[contains(@class,"react-select-container") or contains(@class,"react-select__control")][1]'
    );

    const singleValue = container.locator('.react-select__single-value').first();
    await expect(singleValue).toBeVisible({ timeout: timeoutMs });

    return ((await singleValue.textContent()) ?? '').trim();
  }

  /**
   * Robust: find input/textarea by label text, handling broken `for`→`id` pairs.
   * - Uses multiple strategies (for/name/testid/label/placeholder/aria-label)
   */
  public async findInputFieldByLabel(labelText: string): Promise<Locator> {
    const forAttr = await this.resolveForId(labelText).catch(() => null);

    const strategies: LocatorStrategy[] = [
      ...(forAttr
        ? [
            () =>
              this.page.locator(
                `input[name="${forAttr}"]:not([type="checkbox"]):not([type="radio"]), textarea[name="${forAttr}"]`
              ),
            () => this.page.getByTestId(`input-${forAttr}`),
            () =>
              this.page.locator(
                `input[id$="${forAttr}"]:not([type="checkbox"]):not([type="radio"]), textarea[id$="${forAttr}"]`
              ),
          ]
        : []),

      () => this.page.getByLabel(labelText, { exact: true }),
      () => this.page.getByLabel(labelText, { exact: false }),

      () =>
        this.page
          .locator(`label:has-text("${labelText}")`)
          .locator(
            'xpath=../../following-sibling::div//input[not(@type="checkbox") and not(@type="radio")] | ' +
              'xpath=../../following-sibling::div//textarea | ' +
              'xpath=../following-sibling::div//input[not(@type="checkbox") and not(@type="radio")] | ' +
              'xpath=../following-sibling::div//textarea'
          )
          .first(),

      () =>
        this.page
          .locator(`div:has(> .mb-2 > label:has-text("${labelText}"))`)
          .locator('input:not([type="checkbox"]):not([type="radio"]), textarea')
          .first(),

      () => this.page.getByPlaceholder(labelText),

      () =>
        this.page.locator(
          `input[aria-label*="${labelText}"]:not([type="checkbox"]):not([type="radio"]), textarea[aria-label*="${labelText}"]`
        ),
    ];

    return this.firstThatExists(strategies, `Input not found for label "${labelText}"`);
  }

  /** Find element + its id (useful when label wiring is weird) */
  public async findElementByLabelWithId(labelText: string): Promise<{ el: Locator; id: string }> {
    try {
      const el = await this.findInputFieldByLabel(labelText);
      const id = (await el.getAttribute('id')) ?? '';
      if (id) return { el, id };
    } catch {
      // fall through
    }

    for (const exact of [true, false]) {
      const cand = this.page.getByLabel(labelText, { exact });
      if (await cand.count()) {
        const el = cand.first();
        const id = (await el.getAttribute('id')) ?? '';
        if (id) return { el, id };
      }
    }

    const labelEl = this.page.locator(`label:has-text("${labelText}")`).first();
    if (await labelEl.count()) {
      const forId = await labelEl.getAttribute('for');
      if (forId) return { el: this.page.locator(`#${forId}`), id: forId };
    }

    throw new Error(`No element found for label "${labelText}"`);
  }

  /** Resolve exact label text -> for id (fast DOM evaluate) */
  public async resolveForId(labelText: string): Promise<string | null> {
    return this.page.locator('label').evaluateAll((els, t): string | null => {
      const norm = (s: string) => (s ?? '').trim().toLowerCase();
      const wanted = norm(String(t));
      const lbl = els.find(e => norm(e.textContent || '') === wanted);
      return lbl ? lbl.getAttribute('for') : null;
    }, labelText);
  }

  /** Find a native <select> by label text */
  public async findDropdownByLabel(labelText: string): Promise<Locator> {
    let dd = this.page.getByLabel(labelText, { exact: true });
    if ((await dd.count()) === 0) dd = this.page.getByLabel(labelText, { exact: false });
    if ((await dd.count()) === 0) throw new Error(`Dropdown not found for "${labelText}"`);

    if ((await dd.count()) > 1) {
      const forId = await this.resolveForId(labelText);
      dd = forId ? this.page.locator(`#${forId}`).first() : dd.first();
    }

    const tag = await dd.evaluate(el => el.tagName.toLowerCase());
    if (tag !== 'select') throw new Error(`Control for "${labelText}" is not a <select>`);
    return dd;
  }

  // ===========================================================================
  // JS path for stubborn native dropdowns
  // ===========================================================================

  /** Select dropdown option using JS (works when native UI is flaky) */
  public async selectDropdownOptionByJS(
    selector: string,
    optionText: string,
    fallbackIndex?: number
  ): Promise<boolean> {
    return this.page.evaluate(
      ({ selector, text, index }): boolean => {
        const select = document.querySelector(selector) as HTMLSelectElement | null;
        if (!select) return false;

        for (let i = 1; i < select.options.length; i++) {
          if ((select.options[i].textContent || '').trim() === text) {
            select.selectedIndex = i;
            select.dispatchEvent(new Event('change', { bubbles: true }));
            select.dispatchEvent(new Event('input', { bubbles: true }));
            return true;
          }
        }

        if (index !== undefined) {
          const target = index + 1; // skip placeholder
          if (target < select.options.length) {
            select.selectedIndex = target;
            select.dispatchEvent(new Event('change', { bubbles: true }));
            select.dispatchEvent(new Event('input', { bubbles: true }));
            return true;
          }
        }

        return false;
      },
      { selector, text: optionText, index: fallbackIndex }
    );
  }

  /** Read selected dropdown option text via JS */
  public async getSelectedDropdownText(selector: string): Promise<string | null> {
    return this.page.evaluate((sel): string | null => {
      const select = document.querySelector(sel) as HTMLSelectElement | null;
      return select ? (select.options[select.selectedIndex]?.textContent?.trim() ?? null) : null;
    }, selector);
  }

  /**
   * Robust dropdown select:
   * - open
   * - select by JS
   * - verify selection
   */
  public async selectDropdownOptionRobust(
    selector: string,
    optionText: string,
    fallbackIndex: number
  ): Promise<string> {
    await this.page.click(selector);
    await this.waitHelper.waitForTimeout(300);
    await this.page.waitForSelector(`${selector}:not([disabled])`, { timeout: 5_000 });

    const ok = await this.selectDropdownOptionByJS(selector, optionText, fallbackIndex);
    if (!ok) throw new Error(`Failed to select option: ${optionText}`);

    await this.waitHelper.waitForTimeout(500);

    const current = await this.getSelectedDropdownText(selector);
    if (current && current !== 'Select Address' && current !== optionText) return current;

    await this.waitHelper.waitForTimeout(300);
    return optionText;
  }

  // ===========================================================================
  // Navigation & page info
  // ===========================================================================

  /** Navigate to URL (domcontentloaded) */
  public async navigateToUrl(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  /** Navigate with optional timeout + wait for DOM ready */
  public async navigateToPage(url: string, timeout?: number): Promise<void> {
    await this.page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: timeout ?? this.config.timeout,
    });
    await this.waitHelper.waitForDOMContentLoaded();
  }

  /** Get underlying Page instance */
  public getPage(): Page {
    return this.page;
  }

  /** Get current URL */
  public getCurrentUrl(): string {
    return this.page.url();
  }

  /** Get page title */
  public async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  /** Update runtime config + keep WaitHelper in sync */
  public updateConfig(updates: Partial<FrameworkConfig>): void {
    this.config = { ...this.config, ...updates };
    this.waitHelper.updateConfig(updates);
  }

  // ===========================================================================
  // Static utilities
  // ===========================================================================

  /** Click first visible selector in a list (safe fallback) */
  public static async clickFirstAvailable(page: Page, selectors: string[]): Promise<boolean> {
    for (const sel of selectors) {
      try {
        const el = page.locator(sel).first();
        if ((await el.count()) > 0 && (await el.isVisible())) {
          await el.click();
          return true;
        }
      } catch {
        // continue
      }
    }
    return false;
  }
}