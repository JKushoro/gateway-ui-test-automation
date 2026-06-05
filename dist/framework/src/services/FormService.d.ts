import { Locator, Page } from '@playwright/test';
import { IFormService, BaseOptions, FillOptions } from '../interfaces/IUIServices';
import { FrameworkConfig } from '../types';
/**
 * FormService - Clean implementation for form interactions
 *
 * SOLID Principles Applied:
 * - Single Responsibility: Only handles form operations
 * - Interface Segregation: Implements only IFormService methods
 * - Dependency Inversion: Depends on abstractions (interfaces)
 * - Open/Closed: Open for extension via interface, closed for modification
 */
export declare class FormService implements IFormService {
    private readonly page;
    private readonly logger;
    private readonly defaultTimeout;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    fillInput(locator: Locator, value: string, options?: FillOptions): Promise<void>;
    selectByValue(locator: Locator, value: string, options?: BaseOptions): Promise<void>;
    selectByText(locator: Locator, text: string, options?: BaseOptions): Promise<void>;
    check(locator: Locator, options?: BaseOptions): Promise<void>;
    uncheck(locator: Locator, options?: BaseOptions): Promise<void>;
    private waitForElementReady;
    private handleError;
}
//# sourceMappingURL=FormService.d.ts.map