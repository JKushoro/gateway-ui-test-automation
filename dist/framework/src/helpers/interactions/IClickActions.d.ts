import { Locator } from '@playwright/test';
import { ClickOptions } from '../../types';
/**
 * Interface for click-related actions
 * Following Interface Segregation Principle
 */
export interface IClickActions {
    click(selector: string, options?: ClickOptions): Promise<void>;
    clickLocator(locator: Locator, options?: ClickOptions): Promise<void>;
    clickButtonByText(text: string, exact?: boolean): Promise<void>;
    clickLinkByText(text: string, exact?: boolean): Promise<void>;
    clickAndWaitForURL(target: Locator, expectedUrl: string): Promise<void>;
}
//# sourceMappingURL=IClickActions.d.ts.map