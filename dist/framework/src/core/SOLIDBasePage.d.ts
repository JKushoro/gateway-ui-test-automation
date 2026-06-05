import { Page } from '@playwright/test';
import { FrameworkConfig } from '../types';
import { ILogger } from '../utils/Logger';
import { UIServices } from './ServiceContainer';
/**
 * SOLIDBasePage - Refactored BasePage following SOLID principles
 *
 * SOLID Principles Applied:
 * - Single Responsibility: Only provides core page functionality and service access
 * - Open/Closed: Open for extension, closed for modification
 * - Liskov Substitution: Can be substituted by any subclass without breaking functionality
 * - Interface Segregation: Clients only depend on interfaces they use (via UIServices)
 * - Dependency Inversion: Depends on abstractions (interfaces) not concretions
 *
 * What this class DOES NOT do (following SRP):
 * - Screenshot taking (moved to ScreenshotService)
 * - Navigation logic (moved to NavigationService)
 * - Retry mechanisms (moved to RetryService)
 * - Complex helper initialization (moved to ServiceContainer)
 */
export declare class SOLIDBasePage {
    protected readonly page: Page;
    protected readonly config: Partial<FrameworkConfig>;
    protected readonly logger: ILogger;
    protected readonly ui: UIServices;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Get the current page instance
     * Clean accessor following encapsulation principles
     */
    getPage(): Page;
    /**
     * Get the current configuration
     * Clean accessor following encapsulation principles
     */
    getConfig(): Partial<FrameworkConfig>;
    /**
     * Get page URL - simple delegation to Playwright
     * Single responsibility: just expose Playwright functionality
     */
    getCurrentUrl(): string;
    /**
     * Get page title - simple delegation to Playwright
     * Single responsibility: just expose Playwright functionality
     */
    getTitle(): Promise<string>;
    /**
     * Wait for page load state - simple delegation to Playwright
     * Single responsibility: just expose Playwright functionality
     */
    waitForLoadState(state?: 'load' | 'domcontentloaded' | 'networkidle'): Promise<void>;
}
/**
 * Backward compatibility adapter
 * Allows existing code to work while migrating to SOLID architecture
 *
 * @deprecated Use SOLIDBasePage directly for new code
 */
export declare class BasePage extends SOLIDBasePage {
    protected get action(): {
        clickLocator: (locator: any, options?: any) => Promise<void>;
        fillInput: (locator: any, value: string, options?: any) => Promise<void>;
    };
    protected get wait(): {
        waitForLoadingToComplete: () => Promise<void>;
    };
}
//# sourceMappingURL=SOLIDBasePage.d.ts.map