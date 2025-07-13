//ui/base/ActionHelper.ts
import {expect, Locator, Page} from "@playwright/test";
import {LocatorHelper} from "./LocatorHelper";
import {WaitHelper} from "./WaitHelper";

export class ActionHelper {
    private locatorHelper: LocatorHelper;
    private waitHelper: WaitHelper;

    constructor(private page: Page) {
        this.locatorHelper = new LocatorHelper(page);
        this.waitHelper = new WaitHelper(page);
    }

    async click(selector: string): Promise<void> {
        await this.locatorHelper.getLocator(selector).click();
    }

    public async getTrimmedText(locator: Locator): Promise<string> {
        return (await locator.textContent())?.trim() || '';
    }

    clickLinkByText(text: string, exact = true): Promise<void> {
        const link = this.locatorHelper.getLinkByText(text, exact);
        return link.click();
    }

    async fill(selector: string, value: string): Promise<void> {
        await this.locatorHelper.getLocator(selector).fill(value);
    }

    async fillInputByLabel(label: string, value: string, exact = true): Promise<void> {
        const input = this.locatorHelper.getInputByLabel(label, exact);
        await input.scrollIntoViewIfNeeded();
        await input.fill(value);
    }


    async selectOptionFromDropdown(selector: string, label: string): Promise<void> {
        await this.page.locator(selector).selectOption({label});
    }

    async checkCheckbox(selector: string): Promise<void> {
        const checkbox = this.page.locator(selector);
        if (!(await checkbox.isChecked())) {
            await checkbox.check();
        }
    }

    async uncheckCheckbox(selector: string): Promise<void> {
        const checkbox = this.page.locator(selector);
        if (await checkbox.isChecked()) {
            await checkbox.uncheck();
        }
    }

    async selectCustomDropdown(selector: string, visibleText: string): Promise<void> {
        const dropdown = this.page.locator(selector);
        await dropdown.click();

        const option = this.page.getByText(visibleText, {exact: true});
        await option.waitFor({state: 'visible'});
        await option.click();
    }


    async selectRadioByLabel(labelText: string): Promise<void> {
        const radio = this.page.getByLabel(labelText, {exact: true});
        if (!(await radio.isChecked())) {
            await radio.check({force: true});
        }
    }

    public async clickRowByMatchingText(
        rows: Locator,
        getTextFromRow: (row: Locator) => Promise<string>,
        matchText: string
    ): Promise<void> {
        const count = await rows.count();

        for (let i = 0; i < count; i++) {
            const row = rows.nth(i);
            const text = await getTextFromRow(row);

            if (text.trim() === matchText.trim()) {
                await row.click();
                return;
            }
        }

        throw new Error(`Row with text "${matchText}" not found.`);
    }

    public async findCardByDescription(
        cards: Locator,
        descriptionSelector: string,
        expectedDescription: string
    ): Promise<Locator | null> {
        const count = await cards.count();

        for (let i = 0; i < count; i++) {
            const card = cards.nth(i);
            const description = await card.locator(descriptionSelector).first().innerText();
            if (!description || !expectedDescription) continue;
            if (description.trim() === expectedDescription.trim()) {
                return card;
            }
        }

        return null;
    }


    public async assertFeaturesMatch(
        badgeElements: Locator,
        expectedFeatures: string[]
    ): Promise<void> {
        const actualFeatures: string[] = [];
        const badgeCount = await badgeElements.count();

        for (let i = 0; i < badgeCount; i++) {
            const text = await badgeElements.nth(i).innerText();
            actualFeatures.push(text.trim());
        }

        for (const feature of expectedFeatures) {
            expect(actualFeatures, `Missing expected feature: ${feature}`).toContain(feature);
        }

        expect(actualFeatures.length, 'Mismatch in number of displayed features').toBe(expectedFeatures.length);
    }

    public cleanPriceText(priceText: string): string {
        return priceText.trim().replace(/[^\d]/g, '');
    }


    async clickCheckboxByText(...labelTexts: string[]): Promise<void> {
        if (labelTexts.length === 0 || labelTexts.length > 6) {
            throw new Error('You must provide between 1 and 5 checkbox labels.');
        }

        for (const labelText of labelTexts) {
            const checkbox = this.page.getByLabel(labelText, { exact: true });
            if (!(await checkbox.isChecked())) {
                await checkbox.check({ force: true });
            }
        }
    }


    async switchToTabByUrlPart(partialUrl: string): Promise<Page | null> {
        const pages = this.page.context().pages();
        for (const p of pages) {
            if (p.url().includes(partialUrl)) {
                await p.bringToFront();
                return p;
            }
        }
        return null;
    }


    public async clickElementByExactText(elements: Locator, targetText: string): Promise<void> {
        const count = await elements.count();

        for (let i = 0; i < count; i++) {
            const element = elements.nth(i);
            const text = (await element.innerText()).trim();

            if (text === targetText) {
                await this.waitHelper.waitForElement(element);
                await element.click();
                return;
            }

            if (text.startsWith(targetText)) {
                await this.waitHelper.waitForElement(element);
                await element.click();
                return;
            }
        }

        throw new Error(`Element with text "${targetText}" not found (even with fuzzy matching).`);
    }



    private isTitleMatch(actualTitle: string, expectedTitle?: string): boolean {
        return expectedTitle
            ? actualTitle.trim().toLowerCase() === expectedTitle.trim().toLowerCase()
            : true;
    }

    public extractFirstWordValue(text: string): string {
        return text.trim().split(' ')[0];
    }

    public async findCardByTitle(
        cards: Locator,
        getTitle: (card: Locator) => Locator,
        expectedTitle?: string
    ): Promise<Locator | null> {
        const count = await cards.count();

        for (let i = 0; i < count; i++) {
            const card = cards.nth(i);
            const title = await getTitle(card).innerText();

            if (this.isTitleMatch(title, expectedTitle)) {
                return card;
            }
        }

        return null;
    }

    public async deleteAllRowsExceptWithText(
        rows: Locator,
        getTextFromRow: (row: Locator) => Promise<string>,
        getDeleteButtonFromRow: (row: Locator) => Locator,
        textToKeep: string,
        delayMs: number = 200
    ): Promise<void> {
        while (await rows.count() > 0) {
            const total = await rows.count();
            let foundDeletable = false;

            for (let i = 0; i < total; i++) {
                const row = rows.nth(i);
                const rowText = await getTextFromRow(row);

                if (rowText !== textToKeep) {
                    const deleteBtn = getDeleteButtonFromRow(row);
                    await deleteBtn.click();
                    await this.page.waitForTimeout(delayMs);
                    foundDeletable = true;
                    break;
                }
            }

            if (!foundDeletable) break;
        }
    }

    public async clickUntilLabelMatches(
        label: Locator,
        button: Locator,
        expectedText: string,
        maxTries = 12
    ): Promise<void> {
        for (let i = 0; i < maxTries; i++) {
            const previousText = await this.getTrimmedText(label);
            if (previousText === expectedText) return;

            const labelHandle = await label.elementHandle();
            if (!labelHandle) {
                throw new Error('Failed to resolve element handle from label.');
            }

            await button.click();

            await this.waitHelper.waitForFunction(
                ({ el, prevText }) => el.innerText.trim() !== prevText,
                { el: labelHandle, prevText: previousText }
            );
        }

        throw new Error(`Could not match label text to "${expectedText}" within ${maxTries} attempts.`);
    }



    public async deleteRowByMatchingText(
        rows: Locator,
        getTextFromRow: (row: Locator) => Promise<string>,
        getDeleteButtonFromRow: (row: Locator) => Locator,
        matchText: string
    ): Promise<void> {
        const count = await rows.count();
        for (let i = 0; i < count; i++) {
            const row = rows.nth(i);
            const rowText = await getTextFromRow(row);

            if (rowText === matchText) {
                const deleteBtn = getDeleteButtonFromRow(row);
                await deleteBtn.click();
                await this.waitHelper.waitForLocatorToHaveCount(rows, count - 1);
                return;
            }
        }
        throw new Error(`Row with text "${matchText}" not found.`);
    }


}
