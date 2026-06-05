import { Locator } from '@playwright/test';
/**
 * Interface Segregation Principle - Separate interfaces for different UI operations
 */
export interface IClickService {
    click(locator: Locator, options?: ClickOptions): Promise<void>;
    doubleClick(locator: Locator, options?: BaseOptions): Promise<void>;
    rightClick(locator: Locator, options?: BaseOptions): Promise<void>;
}
export interface IFormService {
    fillInput(locator: Locator, value: string, options?: FillOptions): Promise<void>;
    selectByValue(locator: Locator, value: string, options?: BaseOptions): Promise<void>;
    selectByText(locator: Locator, text: string, options?: BaseOptions): Promise<void>;
    check(locator: Locator, options?: BaseOptions): Promise<void>;
    uncheck(locator: Locator, options?: BaseOptions): Promise<void>;
}
export interface IWaitService {
    waitForElement(locator: Locator, options?: WaitOptions): Promise<void>;
    waitForText(locator: Locator, text: string, options?: BaseOptions): Promise<void>;
    waitForUrl(pattern: string | RegExp, options?: BaseOptions): Promise<void>;
}
export interface INavigationService {
    navigateTo(url: string, options?: NavigationOptions): Promise<void>;
    goBack(): Promise<void>;
    goForward(): Promise<void>;
    reload(): Promise<void>;
}
export interface BaseOptions {
    timeout?: number;
}
export interface ClickOptions extends BaseOptions {
    force?: boolean;
}
export interface FillOptions extends BaseOptions {
    clear?: boolean;
}
export interface WaitOptions extends BaseOptions {
    state?: 'visible' | 'hidden' | 'attached' | 'detached';
}
export interface NavigationOptions extends BaseOptions {
    waitUntil?: 'load' | 'domcontentloaded' | 'networkidle';
}
//# sourceMappingURL=IUIServices.d.ts.map