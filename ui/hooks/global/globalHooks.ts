// ui/hooks/global/globalHooks.ts
import { Browser, Page } from '@playwright/test';
import { getBaseUrl } from '../../config/EnvConfig';

/**
 * Runs once before all tests in a test.describe block.
 * Navigates to the base URL and returns the page instance.
 */
export async function beforeAllHook(browser: Browser): Promise<Page> {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(getBaseUrl());
    return page;
}

/**
 * Runs before each test.
 * Navigates to the base URL.
 */
export async function beforeEachHook(page: Page): Promise<void> {
    await page.goto(getBaseUrl());
}

/**
 * Runs after each test.
 * Clears cookies, local storage, session storage, and closes other pages.
 */
export async function afterEachHook(page: Page): Promise<void> {
    await page.context().clearCookies();
    await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
    });

    const allPages = page.context().pages();
    for (const p of allPages) {
        if (p !== page) await p.close();
    }
}

/**
 * Runs after all tests.
 * Closes the browser context.
 */
export async function afterAllHook(page: Page): Promise<void> {
    await page.context().close();
}
