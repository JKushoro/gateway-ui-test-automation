"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionHelper = void 0;
const test_1 = require("@playwright/test");
const LocatorHelper_1 = require("./LocatorHelper");
const TextHelper_1 = require("./TextHelper");
const WaitHelper_1 = require("./WaitHelper");
const Logger_1 = require("../utils/Logger");
const AssertionHelper_1 = require("@framework/helpers/AssertionHelper");
const DEFAULT_CONFIG = {
    slowMo: 0,
    timeout: 30000,
};
class ActionHelper {
    constructor(page, config = {}) {
        this.page = page;
        this.config = { ...DEFAULT_CONFIG, ...config };
        this.locatorHelper = new LocatorHelper_1.LocatorHelper(page);
        this.waitHelper = new WaitHelper_1.WaitHelper(page, this.config);
        this.assertionHelper = new AssertionHelper_1.AssertionHelper(page);
        this.logger = (0, Logger_1.createLogger)('ActionHelper');
    }
    // ===========================================================================
    // Core utils
    // ===========================================================================
    esc(s) {
        return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    exactRx(s) {
        return new RegExp(`^\\s*${this.esc(s)}\\s*$`, 'i');
    }
    containsRx(s) {
        return new RegExp(this.esc(s), 'i');
    }
    async slowMo() {
        const ms = this.config.slowMo ?? 0;
        if (ms > 0)
            await this.page.waitForTimeout(ms);
    }
    async wait(locator, timeout) {
        await this.waitHelper.waitForElement(locator, timeout ?? this.config.timeout);
    }
    async clickEl(locator, options = {}) {
        await this.wait(locator, options.timeout);
        await locator.click({
            force: options.force,
            button: options.button,
            clickCount: options.clickCount,
            delay: options.delay,
        });
        await this.slowMo();
    }
    async fillEl(locator, value, options = {}) {
        await this.wait(locator, options.timeout);
        if (options.clear)
            await locator.fill('');
        await locator.fill(value);
        await this.slowMo();
    }
    async firstThatExists(strategies, err) {
        for (const s of strategies) {
            try {
                const el = await s();
                if (el && (await el.count()) > 0)
                    return el.first();
            }
            catch {
                // try next strategy
            }
        }
        throw new Error(err);
    }
    async tryMany(items, op, err) {
        let last;
        for (const item of items) {
            try {
                return await op(item);
            }
            catch (e) {
                last = e;
            }
        }
        throw last ?? new Error(err);
    }
    // ===========================================================================
    // Clicks & navigation
    // ===========================================================================
    async click(selector, options = {}) {
        await this.clickEl(this.locatorHelper.getLocator(selector), options);
    }
    async clickLocator(locator, options = {}) {
        await this.clickEl(locator, options);
    }
    async clickButtonByText(text, exact = true, options = {}) {
        const btn = this.page
            .getByRole('button', { name: exact ? this.exactRx(text) : this.containsRx(text) })
            .first();
        await this.clickEl(btn, options);
    }
    async clickLinkByText(text, exact = true, options = {}) {
        const link = this.page
            .getByRole('link', { name: exact ? this.exactRx(text) : this.containsRx(text) })
            .first();
        await this.clickEl(link, options);
    }
    async clickAndWaitForURL(target, url, timeout) {
        await Promise.all([
            this.page.waitForURL(url, { timeout: timeout ?? this.config.timeout }),
            target.click(),
        ]);
        await this.slowMo();
    }
    async clickButtonByTextIn(text, container, options = {}) {
        const root = container ?? this.page;
        let btn = root.getByRole?.('button', { name: this.exactRx(text) })?.first?.();
        if (!btn || (await btn.count()) === 0) {
            btn = root
                .locator?.('button')
                ?.filter({ hasText: this.exactRx(text) })
                .first?.();
        }
        if (!btn || (await btn.count()) === 0)
            throw new Error(`Button not found: "${text}"`);
        await this.clickEl(btn, options);
    }
    // ===========================================================================
    // Text / value / attributes
    // ===========================================================================
    async getText(selector, options = {}) {
        const loc = this.locatorHelper.getLocator(selector);
        await this.wait(loc, options.timeout);
        return TextHelper_1.TextHelper.getTrimmedText(loc);
    }
    async getAttribute(selector, attr, options = {}) {
        const loc = this.locatorHelper.getLocator(selector);
        await this.wait(loc, options.timeout);
        return loc.getAttribute(attr);
    }
    async getInputValue(selector, options = {}) {
        const loc = this.locatorHelper.getLocator(selector);
        await this.wait(loc, options.timeout);
        return loc.inputValue();
    }
    async getTextByLabel(labelText, elementTag = 'span') {
        const label = this.page.locator(`label:has-text("${labelText}")`).first();
        if (await label.isVisible().catch(() => false)) {
            const el = label.locator('..').locator('..').locator(elementTag).first();
            if (await el.isVisible().catch(() => false))
                return (await el.textContent())?.trim() ?? '';
        }
        const group = this.page.locator(`.form-group:has(label:has-text("${labelText}"))`);
        if (await group.isVisible().catch(() => false)) {
            const el = group.locator(`.col-md-7 ${elementTag}`).first();
            if (await el.isVisible().catch(() => false))
                return (await el.textContent())?.trim() ?? '';
        }
        throw new Error(`Field not found for label "${labelText}"`);
    }
    async getInputValueByAnyLabel(labels, timeout) {
        return this.tryMany(labels, async (label) => {
            const input = await this.findInputFieldByLabel(label);
            await this.wait(input, timeout);
            return input.inputValue();
        }, `Input not found for any label: ${labels.join(', ')}`);
    }
    // ===========================================================================
    // Inputs & forms
    // ===========================================================================
    async fill(selector, value, options = {}) {
        await this.fillEl(this.locatorHelper.getLocator(selector), value, options);
    }
    async fillInputByLabel(labelText, value, options = {}) {
        let input = this.page.getByRole('textbox', { name: this.exactRx(labelText) }).first();
        if (!(await input.count())) {
            const forAttr = await this.page
                .locator('label', { hasText: this.containsRx(labelText) })
                .first()
                .getAttribute('for');
            if (!forAttr)
                throw new Error(`Label "${labelText}" has no 'for' attribute`);
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
    async fillInputByAnyLabel(labels, value, options = {}) {
        return this.tryMany(labels, async (label) => {
            const input = await this.findInputFieldByLabel(label);
            await this.fillEl(input, value, options);
            return input;
        }, `Input not found for any label: ${labels.join(', ')}`);
    }
    async pressKey(key) {
        await this.page.keyboard.press(key);
        await this.slowMo();
    }
    async fillFormattedNumberInput(input, value, label = 'Formatted number input') {
        const expected = typeof value === 'number' ? value : this.assertionHelper.parseFormattedNumber(String(value));
        if (!Number.isFinite(expected)) {
            throw new Error(`${label}: invalid numeric value "${value}"`);
        }
        await (0, test_1.expect)(input).toBeVisible();
        await input.scrollIntoViewIfNeeded();
        await input.fill(String(expected));
        await input.evaluate(el => el.blur());
        await this.assertionHelper.assertFormattedNumberEquals(input, expected);
        this.logger.info?.(`✓ ${label}: ${expected}`);
    }
    // ===========================================================================
    // Visibility & state
    // ===========================================================================
    async isVisible(selector) {
        return this.locatorHelper.getLocator(selector).isVisible();
    }
    async isEnabled(selector) {
        return this.locatorHelper.getLocator(selector).isEnabled();
    }
    async ensureVisibleOrSkip(locator, label, timeout = 3000) {
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
    async selectRadioByLabel(labelText, options = {}) {
        const strategies = [
            () => this.page.getByLabel(labelText, { exact: true }),
            () => this.page.getByLabel(labelText, { exact: false }),
            () => this.page.getByRole('radio', { name: labelText }),
            async () => {
                const forId = await this.resolveForId(labelText);
                return forId ? this.page.locator(`#${forId}[type="radio"]`) : null;
            },
            () => this.page.locator(`label:has-text("${labelText}") input[type="radio"], label:has-text("${labelText}") ~ input[type="radio"]`),
        ];
        const radio = await this.firstThatExists(strategies, `Radio not found for "${labelText}"`);
        await this.wait(radio, options.timeout);
        await radio.check({ force: options.force });
        await this.slowMo();
    }
    async setRadioByQuestion(q, answer) {
        await this.waitHelper.waitForElement(this.page.getByText(q), 5000);
        const group = this.page
            .getByText(q)
            .locator('xpath=following::*[@role="radiogroup"][1]')
            .first();
        await this.waitHelper.waitForElement(group, 5000);
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
        const radios = group.locator('input[type="radio"]:not(:disabled)');
        const n = await radios.count();
        if (n === 0)
            throw new Error(`No selectable radios for "${q}"`);
        const pick = radios.nth(Math.floor(Math.random() * n));
        await pick.check({ force: true }).catch(() => pick.click({ force: true }));
        const labelText = await TextHelper_1.TextHelper.getTrimmedText(pick.locator('xpath=ancestor::label[1]'));
        return labelText || (await pick.getAttribute('value')) || '';
    }
    async setRadioByQuestionPattern(pattern, answer) {
        const q = this.page.getByText(pattern).first();
        await q.waitFor({ state: 'visible', timeout: 15000 });
        const group = q.locator('xpath=ancestor-or-self::*[.//input[@type="radio"]]').first();
        await group.waitFor({ state: 'attached', timeout: 15000 });
        if (answer !== undefined) {
            const value = String(answer).trim();
            const radio = group
                .getByRole('radio', { name: new RegExp(`^${this.esc(value)}$`, 'i') })
                .first();
            if (!(await radio.count()))
                throw new Error(`Option "${value}" not found for ${pattern}`);
            await radio.check({ force: true }).catch(() => radio.click({ force: true }));
            return value;
        }
        const radio = group.locator('input[type="radio"]:not(:disabled)').first();
        await radio.check({ force: true }).catch(() => radio.click({ force: true }));
        return ((await TextHelper_1.TextHelper.getTrimmedText(radio.locator('xpath=ancestor::label[1]'))) ||
            (await radio.getAttribute('value')) ||
            '');
    }
    async selectRandomRadioByName(name, excludeValues = [], options = {}) {
        const radios = this.page.locator(`input[name="${name}"][type="radio"]`);
        const count = await radios.count();
        if (count === 0)
            throw new Error(`No radios with name "${name}"`);
        const candidates = [];
        for (let i = 0; i < count; i++) {
            const r = radios.nth(i);
            const value = (await r.getAttribute('value')) ?? '';
            if (!(await r.isDisabled()) && !excludeValues.includes(value))
                candidates.push({ index: i, value });
        }
        if (!candidates.length)
            throw new Error(`No selectable radios for "${name}"`);
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
    async checkCheckbox(target, options = {}) {
        const checkbox = typeof target === 'string' ? this.locatorHelper.getLocator(target) : target;
        await this.wait(checkbox, options.timeout);
        if (!(await checkbox.isChecked()))
            await checkbox.check({ force: options.force });
        await this.slowMo();
    }
    async uncheckCheckbox(selector, options = {}) {
        const checkbox = this.locatorHelper.getLocator(selector);
        await this.wait(checkbox, options.timeout);
        if (await checkbox.isChecked())
            await checkbox.uncheck({ force: options.force });
        await this.slowMo();
    }
    async selectCheckboxesFromAriaGroup(id, pick = 1) {
        const group = this.page.locator(`[aria-labelledby="${id}"]`);
        const labels = group.locator('label');
        const inputs = group.locator('input[type="checkbox"]');
        await labels.first().waitFor({ state: 'visible' });
        const count = await labels.count();
        if (!count)
            throw new Error(`No checkboxes in "${id}"`);
        const clickAt = async (i) => {
            await labels
                .nth(i)
                .click({ force: true })
                .catch(() => inputs.nth(i).check({ force: true }));
            await (0, test_1.expect)(inputs.nth(i)).toBeChecked();
            return (await labels.nth(i).textContent())?.trim() ?? '';
        };
        if (typeof pick === 'number') {
            const n = Math.min(pick, count);
            return Promise.all([...Array(n).keys()].map(clickAt));
        }
        const wanted = Array.isArray(pick) ? pick : [pick];
        return Promise.all(wanted.map(async (text) => {
            const label = labels.filter({ hasText: text }).first();
            await label.click({ force: true });
            return text;
        }));
    }
    async selectCheckboxes(optionsLocator, options) {
        const count = await optionsLocator.count();
        if (!count)
            throw new Error('No checkbox options found');
        // Random N
        if (typeof options === 'number') {
            const texts = (await optionsLocator.allTextContents())
                .map(t => (t ?? '').trim())
                .filter(Boolean);
            const n = Math.max(0, Math.min(options, texts.length));
            const picks = [];
            const pool = [...texts];
            while (picks.length < n && pool.length) {
                picks.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
            }
            for (const t of picks) {
                const opt = optionsLocator.filter({ hasText: this.exactRx(t) }).first();
                await this.waitHelper.waitForElement(opt, 5000);
                await opt.click({ force: true });
                await this.slowMo();
            }
            return picks;
        }
        // Specific labels
        const wanted = Array.isArray(options) ? options : options ? [options] : [];
        const selected = [];
        for (const t of wanted) {
            const opt = optionsLocator.filter({ hasText: this.exactRx(t) }).first();
            await this.waitHelper.waitForElement(opt, 5000);
            await opt.click({ force: true });
            selected.push(t);
            await this.slowMo();
        }
        return selected;
    }
    // ===========================================================================
    // Fairstone KYC groups
    // ===========================================================================
    async selectFromRadioGroupByLabel(labelText, selection) {
        const label = this.page.getByText(labelText, { exact: false }).first();
        if (!(await label.count()))
            return '';
        await (0, test_1.expect)(label).toBeVisible();
        const id = await label.getAttribute('for');
        if (!id)
            throw new Error(`"${labelText}" label missing "for"`);
        const group = this.page.locator(`div[role="radiogroup"][aria-labelledby="${id}"]`);
        const options = group.locator('label');
        await (0, test_1.expect)(options.first()).toBeVisible();
        if (selection === undefined) {
            const i = Math.floor(Math.random() * (await options.count()));
            const text = ((await options.nth(i).textContent()) ?? '').trim();
            await options.nth(i).click();
            return text;
        }
        if (typeof selection === 'number') {
            const text = ((await options.nth(selection).textContent()) ?? '').trim();
            await options.nth(selection).click();
            return text;
        }
        const option = options.filter({ hasText: selection }).first();
        await (0, test_1.expect)(option).toBeVisible();
        await option.click();
        return selection;
    }
    // public async selectFromCheckboxGroupByLabel(
    //   labelText: string,
    //   selection?: string | string[] | number
    // ): Promise<string[]> {
    //   const group = this.page.locator(`div:has(> .mb-2 > label:has-text("${labelText}"))`);
    //   const options = group.locator('div[role="group"] label');
    //
    //   await this.waitHelper.waitForElement(group);
    //   await expect(options.first()).toBeVisible();
    //
    //   if (selection === undefined) {
    //     const count = await options.count();
    //     const value =
    //       (await options.nth(Math.floor(Math.random() * count)).textContent())?.trim() ?? '';
    //     await this.selectCheckboxes(options, [value]);
    //     return [value];
    //   }
    //
    //   if (typeof selection === 'number') return this.selectCheckboxes(options, selection);
    //
    //   const wanted = Array.isArray(selection) ? selection : [selection];
    //   return this.selectCheckboxes(options, wanted);
    // }
    async selectFromCheckboxGroupByLabel(labelText, selection) {
        // Find the label (ignore the required * span)
        const label = this.page.locator('label', { hasText: labelText }).first();
        await (0, test_1.expect)(label).toBeVisible({ timeout: 15000 });
        const forId = await label.getAttribute('for');
        if (!forId) {
            throw new Error(`Label "${labelText}" does not have a 'for' attribute.`);
        }
        // Fieldset is linked via aria-labelledby
        const fieldset = this.page.locator(`fieldset[aria-labelledby="${forId}"]`);
        await (0, test_1.expect)(fieldset).toBeVisible({ timeout: 15000 });
        // Each option is a <label> that contains the hidden checkbox input
        const options = fieldset.locator('label');
        await (0, test_1.expect)(options.first()).toBeVisible({ timeout: 15000 });
        if (selection === undefined) {
            const count = await options.count();
            const value = (await options.nth(Math.floor(Math.random() * count)).innerText())?.trim() ?? '';
            await this.selectCheckboxes(options, [value]);
            return [value];
        }
        if (typeof selection === 'number')
            return this.selectCheckboxes(options, selection);
        const wanted = Array.isArray(selection) ? selection : [selection];
        return this.selectCheckboxes(options, wanted);
    }
    // ===========================================================================
    // Native <select>
    // ===========================================================================
    async selectDropdownByLabel(labelText, option) {
        const dropdown = await this.findDropdownByLabel(labelText);
        if (option) {
            await dropdown
                .selectOption({ label: option })
                .catch(() => dropdown.selectOption({ value: option }));
        }
        else {
            const picked = await this.selectRandomFromNativeSelect(dropdown);
            if (!picked)
                throw new Error(`No valid options in "${labelText}"`);
        }
        return dropdown.evaluate(el => el.selectedOptions?.[0]?.text?.trim() ?? '');
    }
    async selectDropdownByAnyLabel(labels, option) {
        return this.tryMany(labels, label => this.selectDropdownByLabel(label, option), `Dropdown not found for any label: ${labels.join(', ')}`);
    }
    async selectRandomFromNativeSelect(dropdown) {
        const value = await dropdown.evaluate(el => {
            const select = el;
            const candidates = Array.from(select.options).filter(o => !o.disabled && o.value.trim() && !/^please\s*select/i.test(o.text.trim()));
            if (!candidates.length)
                return null;
            const choice = candidates[Math.floor(Math.random() * candidates.length)];
            select.value = choice.value;
            select.dispatchEvent(new Event('change', { bubbles: true }));
            return choice.text.trim();
        });
        return value ?? undefined;
    }
    async waitForDropdownPopulation(selector, excludeText = 'Select', timeout = 10000) {
        await this.waitHelper.waitForFunction((args) => {
            const [sel, exclude] = args;
            const dd = document.querySelector(sel);
            if (!dd || dd.options.length <= 1)
                return false;
            for (let i = 1; i < dd.options.length; i++) {
                const t = dd.options[i].textContent?.trim() || '';
                if (t && !t.includes(exclude))
                    return true;
            }
            return false;
        }, [selector, excludeText], timeout);
    }
    async getValidDropdownOptions(selector, excludeText = 'Select') {
        return this.page.evaluate((args) => {
            const [sel, exclude] = args;
            const dd = document.querySelector(sel);
            if (!dd)
                return [];
            const out = [];
            for (let i = 1; i < dd.options.length; i++) {
                const t = dd.options[i].textContent?.trim() || '';
                if (t && !t.includes(exclude))
                    out.push(t);
            }
            return out;
        }, [selector, excludeText]);
    }
    async selectSpecificOption(optionsLocator, optionText) {
        const exact = optionsLocator.filter({ hasText: this.exactRx(optionText) }).first();
        if (await exact.isVisible().catch(() => false)) {
            const text = (await exact.textContent())?.trim() ?? null;
            await exact.click();
            return text;
        }
        return null;
    }
    async selectRandomOption(optionsLocator, exclude) {
        const texts = await optionsLocator.allTextContents();
        const valid = texts
            .map((t, i) => ({ t: (t ?? '').trim(), i }))
            .filter(({ t }) => t && !exclude?.test(t));
        if (!valid.length)
            return null;
        const pick = valid[Math.floor(Math.random() * valid.length)];
        const selected = optionsLocator.nth(pick.i);
        const text = (await selected.textContent())?.trim() ?? null;
        await selected.click();
        return text;
    }
    // ===========================================================================
    // React Select / MUI / Select2
    // ===========================================================================
    async chooseFromLabeledReactSelectDropdown(labelText, optionText) {
        const label = this.page.locator('label', { hasText: labelText });
        await (0, test_1.expect)(label).toBeVisible();
        const id = await label.getAttribute('for');
        if (!id)
            throw new Error(`Label "${labelText}" has no 'for' attribute`);
        const input = this.page.locator(`[id="${id}"]`);
        const control = input.locator('xpath=ancestor::*[contains(@class,"react-select__control")]');
        await control.click();
        const options = this.page.getByRole('option');
        await (0, test_1.expect)(options.first()).toBeVisible();
        if (optionText?.trim()) {
            await this.page.getByRole('option', { name: optionText }).click();
            return optionText;
        }
        const count = await options.count();
        if (!count)
            throw new Error(`No options found for "${labelText}"`);
        const option = options.nth(Math.floor(Math.random() * count));
        const chosen = (await option.textContent())?.trim() ?? '';
        await option.click();
        return chosen;
    }
    async chooseFromQuestionReactSelectDropdown(questionText, optionText) {
        const question = this.page.getByText(questionText, { exact: false }).first();
        await (0, test_1.expect)(question).toBeVisible();
        const block = question.locator('xpath=ancestor::*[.//div[contains(@class,"react-select__control")]][1]');
        const control = block.locator('.react-select__control').first();
        await (0, test_1.expect)(control).toBeVisible();
        await control.click();
        const options = this.page.getByRole('listbox').getByRole('option');
        await (0, test_1.expect)(options.first()).toBeVisible();
        if (optionText?.trim()) {
            await options.getByText(optionText, { exact: true }).click();
            return optionText;
        }
        const option = options.nth(Math.floor(Math.random() * (await options.count())));
        const chosen = (await option.textContent())?.trim() ?? '';
        await option.click();
        return chosen;
    }
    async waitForMUIMenu(menuSelector, itemSelector, timeout = 5000) {
        await this.waitHelper.waitForElement(this.page.locator(menuSelector), timeout);
        await this.waitHelper.waitForElement(this.page.locator(itemSelector).first(), 3000);
        await this.waitHelper.waitForTimeout(300);
    }
    async selectRandomMUIMenuItem(items, menu) {
        const count = await items.count();
        if (!count)
            throw new Error('No menu items found');
        const idx = Math.floor(Math.random() * count);
        const item = items.nth(idx);
        const text = (await item.textContent())?.trim() || '';
        await this.clickLocator(item);
        if (menu)
            await this.waitHelper.waitForElementToBeHidden(menu, 2000);
        return text;
    }
    async selectSelect2(trigger, options, rendered, value) {
        const isValid = (t) => !!t && !/^please\s*select\b/i.test(t);
        await trigger.click({ force: true });
        await options.first().waitFor();
        let pick = (typeof value === 'string' && value.trim()) || '';
        if (!pick) {
            const texts = (await options.allTextContents()).map(t => (t ?? '').trim()).filter(isValid);
            if (!texts.length)
                throw new Error('No valid options in Select2 dropdown');
            pick = texts[Math.floor(Math.random() * texts.length)];
        }
        let chosen = options.filter({ hasText: this.exactRx(pick) }).first();
        if ((await chosen.count()) === 0)
            chosen = options.filter({ hasText: this.containsRx(pick) }).first();
        if ((await chosen.count()) === 0)
            throw new Error(`Select2 option not found: "${pick}"`);
        const selectedText = (await chosen.textContent())?.trim() ?? '';
        await chosen.click();
        return (await rendered.textContent().catch(() => selectedText))?.trim() || selectedText;
    }
    async selectSelect2AndVerify(label, trigger, options, rendered, value) {
        const selected = await this.selectSelect2(trigger, options, rendered, value);
        if (value) {
            const renderedText = (await rendered.textContent())?.trim() ?? '';
            if (!renderedText.toLowerCase().includes(value.toLowerCase())) {
                throw new Error(`${label} not selected. Expected "${value}", rendered "${renderedText}"`);
            }
        }
        return selected;
    }
    async selectReactSelect(dropdownId, value) {
        try {
            const dropdown = this.page.locator(`#${dropdownId.replace(/\./g, '\\.')}`);
            await this.waitHelper.waitForElement(dropdown, 5000);
            await dropdown.click();
            const menu = this.page.locator('.react-select__menu').first();
            await this.waitHelper.waitForElement(menu, 3000);
            const strategies = [
                () => menu
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
        }
        catch (e) {
            await this.page.click('body').catch(() => { });
            throw e;
        }
    }
    async getReactSelectValue(dropdownId) {
        const single = this.page.locator(`#${dropdownId.replace(/\./g, '\\.')} .react-select__single-value`);
        await this.waitHelper.waitForElement(single, 5000);
        return (await single.textContent())?.trim() || '';
    }
    async verifyReactSelectValue(dropdownId, expected) {
        const actual = await this.getReactSelectValue(dropdownId);
        if (actual !== expected)
            throw new Error(`React Select mismatch. Expected "${expected}", got "${actual}"`);
    }
    // ===========================================================================
    // Name / Label helpers
    // ===========================================================================
    async fillInputByName(name, value) {
        const input = this.page.locator(`input[name="${name}"]`);
        await this.waitHelper.waitForElement(input, 5000);
        await input.fill(value);
        await this.slowMo();
    }
    async getInputValueByName(name) {
        const input = this.page.locator(`input[name="${name}"]`);
        await this.waitHelper.waitForElement(input, 5000);
        return input.inputValue();
    }
    async verifyInputValue(name, expected) {
        const actual = await this.getInputValueByName(name);
        if (actual !== expected)
            throw new Error(`Input "${name}" mismatch. Expected "${expected}", got "${actual}"`);
    }
    async getReactSelectValueByLabelLoose(labelText) {
        const label = this.page.getByText(this.containsRx(labelText), { exact: false }).first();
        await this.waitHelper.waitForElement(label, 5000);
        const single = label
            .locator('xpath=following::*[contains(@class,"react-select__single-value")][1]')
            .first();
        await this.waitHelper.waitForElement(single, 5000);
        return (await single.textContent())?.trim() ?? '';
    }
    async getInputValueByLabel(label) {
        const input = await this.findInputFieldByLabel(label);
        await this.waitHelper.waitForElement(input, 5000);
        return input.inputValue();
    }
    async getReactSelectValueByLabelStrict(labelText) {
        const label = this.page.locator('label', { hasText: this.containsRx(labelText) }).first();
        await this.waitHelper.waitForElement(label, 5000);
        const forId = await label.getAttribute('for');
        if (!forId)
            throw new Error(`Label "${labelText}" has no 'for' attribute`);
        const input = this.page.locator(`#${forId.replace(/\./g, '\\.')}`);
        const container = input.locator('xpath=ancestor::*[contains(@class,"react-select-container") or contains(@class,"react-select__control")][1]');
        const valueOrPlaceholder = container
            .locator('.react-select__single-value, .react-select__placeholder, [class*="single-value"], [class*="placeholder"]')
            .first();
        await this.waitHelper.waitForElement(valueOrPlaceholder, 5000);
        return (await valueOrPlaceholder.textContent())?.trim() ?? '';
    }
    /**
     * Robust: find input/textarea by label text, handling broken `for`→`id` pairs.
     */
    async findInputFieldByLabel(labelText) {
        const forAttr = await this.resolveForId(labelText).catch(() => null);
        const strategies = [
            ...(forAttr
                ? [
                    () => this.page.locator(`input[name="${forAttr}"]:not([type="checkbox"]):not([type="radio"]), textarea[name="${forAttr}"]`),
                    () => this.page.getByTestId(`input-${forAttr}`),
                    () => this.page.locator(`input[id$="${forAttr}"]:not([type="checkbox"]):not([type="radio"]), textarea[id$="${forAttr}"]`),
                ]
                : []),
            () => this.page.getByLabel(labelText, { exact: true }),
            () => this.page.getByLabel(labelText, { exact: false }),
            () => this.page
                .locator(`label:has-text("${labelText}")`)
                .locator('xpath=../../following-sibling::div//input[not(@type="checkbox") and not(@type="radio")] | ' +
                'xpath=../../following-sibling::div//textarea | ' +
                'xpath=../following-sibling::div//input[not(@type="checkbox") and not(@type="radio")] | ' +
                'xpath=../following-sibling::div//textarea')
                .first(),
            () => this.page
                .locator(`div:has(> .mb-2 > label:has-text("${labelText}"))`)
                .locator('input:not([type="checkbox"]):not([type="radio"]), textarea')
                .first(),
            () => this.page.getByPlaceholder(labelText),
            () => this.page.locator(`input[aria-label*="${labelText}"]:not([type="checkbox"]):not([type="radio"]), textarea[aria-label*="${labelText}"]`),
        ];
        return this.firstThatExists(strategies, `Input not found for label "${labelText}"`);
    }
    async findElementByLabelWithId(labelText) {
        try {
            const el = await this.findInputFieldByLabel(labelText);
            const id = (await el.getAttribute('id')) ?? '';
            if (id)
                return { el, id };
        }
        catch {
            // fall through
        }
        for (const exact of [true, false]) {
            const cand = this.page.getByLabel(labelText, { exact });
            if (await cand.count()) {
                const el = cand.first();
                const id = (await el.getAttribute('id')) ?? '';
                if (id)
                    return { el, id };
            }
        }
        const labelEl = this.page.locator(`label:has-text("${labelText}")`).first();
        if (await labelEl.count()) {
            const forId = await labelEl.getAttribute('for');
            if (forId)
                return { el: this.page.locator(`#${forId}`), id: forId };
        }
        throw new Error(`No element found for label "${labelText}"`);
    }
    async resolveForId(labelText) {
        return this.page.locator('label').evaluateAll((els, t) => {
            const norm = (s) => (s ?? '').trim().toLowerCase();
            const wanted = norm(String(t));
            const lbl = els.find(e => norm(e.textContent || '') === wanted);
            return lbl ? lbl.getAttribute('for') : null;
        }, labelText);
    }
    async findDropdownByLabel(labelText) {
        let dd = this.page.getByLabel(labelText, { exact: true });
        if ((await dd.count()) === 0)
            dd = this.page.getByLabel(labelText, { exact: false });
        if ((await dd.count()) === 0)
            throw new Error(`Dropdown not found for "${labelText}"`);
        if ((await dd.count()) > 1) {
            const forId = await this.resolveForId(labelText);
            dd = forId ? this.page.locator(`#${forId}`).first() : dd.first();
        }
        const tag = await dd.evaluate(el => el.tagName.toLowerCase());
        if (tag !== 'select')
            throw new Error(`Control for "${labelText}" is not a <select>`);
        return dd;
    }
    // ===========================================================================
    // JS path for stubborn native dropdowns
    // ===========================================================================
    async selectDropdownOptionByJS(selector, optionText, fallbackIndex) {
        return this.page.evaluate(({ selector, text, index }) => {
            const select = document.querySelector(selector);
            if (!select)
                return false;
            for (let i = 1; i < select.options.length; i++) {
                if ((select.options[i].textContent || '').trim() === text) {
                    select.selectedIndex = i;
                    select.dispatchEvent(new Event('change', { bubbles: true }));
                    select.dispatchEvent(new Event('input', { bubbles: true }));
                    return true;
                }
            }
            if (index !== undefined) {
                const target = index + 1;
                if (target < select.options.length) {
                    select.selectedIndex = target;
                    select.dispatchEvent(new Event('change', { bubbles: true }));
                    select.dispatchEvent(new Event('input', { bubbles: true }));
                    return true;
                }
            }
            return false;
        }, { selector, text: optionText, index: fallbackIndex });
    }
    async getSelectedDropdownText(selector) {
        return this.page.evaluate((sel) => {
            const select = document.querySelector(sel);
            return select ? (select.options[select.selectedIndex]?.textContent?.trim() ?? null) : null;
        }, selector);
    }
    async selectDropdownOptionRobust(selector, optionText, fallbackIndex) {
        await this.page.click(selector);
        await this.waitHelper.waitForTimeout(300);
        await this.page.waitForSelector(`${selector}:not([disabled])`, { timeout: 5000 });
        const ok = await this.selectDropdownOptionByJS(selector, optionText, fallbackIndex);
        if (!ok)
            throw new Error(`Failed to select option: ${optionText}`);
        await this.waitHelper.waitForTimeout(500);
        const current = await this.getSelectedDropdownText(selector);
        if (current && current !== 'Select Address' && current !== optionText)
            return current;
        await this.waitHelper.waitForTimeout(300);
        return optionText;
    }
    async selectReactSelectDropdownOption(input, value) {
        await (0, test_1.expect)(input).toBeVisible();
        const control = input.locator('xpath=ancestor::*[contains(@class,"react-select__control")]');
        await control.click();
        const options = this.page.getByRole('option');
        await (0, test_1.expect)(options.first()).toBeVisible();
        let chosen;
        if (value?.trim()) {
            chosen = value;
            await options.filter({ hasText: value }).first().click();
        }
        else {
            const count = await options.count();
            const idx = Math.floor(Math.random() * count);
            const pick = options.nth(idx);
            chosen = ((await pick.textContent()) ?? '').trim();
            await pick.click();
        }
        await (0, test_1.expect)(control.getByText(chosen, { exact: false })).toBeVisible();
        return chosen;
    }
    // ===========================================================================
    // Navigation & page info
    // ===========================================================================
    async navigateToUrl(url) {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    }
    async navigateToPage(url, timeout) {
        await this.page.goto(url, {
            waitUntil: 'domcontentloaded',
            timeout: timeout ?? this.config.timeout,
        });
        await this.waitHelper.waitForDOMContentLoaded();
    }
    getPage() {
        return this.page;
    }
    getCurrentUrl() {
        return this.page.url();
    }
    async getPageTitle() {
        return this.page.title();
    }
    updateConfig(updates) {
        this.config = { ...this.config, ...updates };
        this.waitHelper.updateConfig(updates);
    }
    // ===========================================================================
    // Static utilities
    // ===========================================================================
    static async clickFirstAvailable(page, selectors) {
        for (const sel of selectors) {
            try {
                const el = page.locator(sel).first();
                if ((await el.count()) > 0 && (await el.isVisible())) {
                    await el.click();
                    return true;
                }
            }
            catch {
                // continue
            }
        }
        return false;
    }
}
exports.ActionHelper = ActionHelper;
//# sourceMappingURL=ActionHelper.js.map