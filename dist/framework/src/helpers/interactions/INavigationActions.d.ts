/**
 * Interface for navigation-related actions
 * Following Interface Segregation Principle
 */
export interface INavigationActions {
    navigateToUrl(url: string): Promise<void>;
    navigateToPage(url: string, timeout?: number): Promise<void>;
    getPageTitle(): Promise<string>;
    pressKey(key: string): Promise<void>;
}
//# sourceMappingURL=INavigationActions.d.ts.map