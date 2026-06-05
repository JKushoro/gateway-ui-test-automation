import { Page } from '@playwright/test';
import { FrameworkConfig } from '../types';
import { IClickService, IFormService } from '../interfaces/IUIServices';
/**
 * ServiceContainer - Dependency Injection Container
 *
 * SOLID Principles Applied:
 * - Single Responsibility: Only manages service registration and resolution
 * - Dependency Inversion: Provides abstractions, not concrete implementations
 * - Open/Closed: Open for new services, closed for modification
 */
export declare class ServiceContainer {
    private static instance;
    private services;
    private factories;
    private logger;
    private constructor();
    static getInstance(): ServiceContainer;
    /**
     * Register a service factory
     */
    registerFactory<T>(key: string, factory: () => T): void;
    /**
     * Register a singleton service
     */
    registerSingleton<T>(key: string, instance: T): void;
    /**
     * Resolve a service
     */
    resolve<T>(key: string): T;
    /**
     * Initialize default UI services for a page
     */
    initializeUIServicesForPage(page: Page, config?: Partial<FrameworkConfig>): UIServices;
    /**
     * Clear all registered services (useful for testing)
     */
    clear(): void;
}
/**
 * UI Services bundle - clean interface for page objects
 */
export interface UIServices {
    click: IClickService;
    form: IFormService;
}
/**
 * Factory function for easy service creation
 */
export declare function createUIServices(page: Page, config?: Partial<FrameworkConfig>): UIServices;
//# sourceMappingURL=ServiceContainer.d.ts.map