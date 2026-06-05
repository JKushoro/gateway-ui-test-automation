import { Locator, Page } from '@playwright/test';
import { FrameworkConfig } from '../types';
/**
 * ClickService - Handles all click-related interactions
 * Single Responsibility: Click operations only
 */
export declare class ClickService {
    private readonly page;
    private readonly config;
    private readonly logger;
    private readonly waitHelper;
    constructor(page: Page, config: Partial<FrameworkConfig>);
    /**
     * Click a locator with proper waiting and error handling
     */
    click(locator: Locator, options?: {
        timeout?: number;
        force?: boolean;
    }): Promise<void>;
    /**
     * Double-click a locator
     */
    doubleClick(locator: Locator, options?: {
        timeout?: number;
    }): Promise<void>;
    /**
     * Right-click (context menu) on a locator
     */
    rightClick(locator: Locator, options?: {
        timeout?: number;
    }): Promise<void>;
    /**
     * Click at specific coordinates
     */
    clickAt(x: number, y: number): Promise<void>;
}
//# sourceMappingURL=ClickService.d.ts.map