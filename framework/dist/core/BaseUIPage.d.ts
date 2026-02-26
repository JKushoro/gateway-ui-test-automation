import { Page } from '../types/PlaywrightTypes';
import { FrameworkConfig } from '../types';
/**
 * Base UI Page Class
 * Simple base class for page objects with essential functionality
 */
export declare class BaseUIPage {
    protected readonly page: Page;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Get the page instance
     */
    getPage(): Page;
    /**
     * Get current URL
     */
    getCurrentUrl(): string;
    /**
     * Get page title
     */
    getPageTitle(): Promise<string>;
}
//# sourceMappingURL=BaseUIPage.d.ts.map