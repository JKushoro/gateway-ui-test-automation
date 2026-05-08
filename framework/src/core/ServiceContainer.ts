// framework/src/core/ServiceContainer.ts
import { Page } from '@playwright/test';
import { FrameworkConfig } from '../types';
import { IClickService, IFormService, IWaitService, INavigationService } from '../interfaces/IUIServices';
import { ClickService } from '../services/ClickService';
import { FormService } from '../services/FormService';
import { createLogger, ILogger } from '../utils/Logger';

/**
 * ServiceContainer - Dependency Injection Container
 * 
 * SOLID Principles Applied:
 * - Single Responsibility: Only manages service registration and resolution
 * - Dependency Inversion: Provides abstractions, not concrete implementations
 * - Open/Closed: Open for new services, closed for modification
 */
export class ServiceContainer {
  private static instance: ServiceContainer;
  private services = new Map<string, any>();
  private factories = new Map<string, () => any>();
  private logger: ILogger;

  private constructor() {
    this.logger = createLogger('ServiceContainer');
  }

  static getInstance(): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer();
    }
    return ServiceContainer.instance;
  }

  /**
   * Register a service factory
   */
  registerFactory<T>(key: string, factory: () => T): void {
    this.factories.set(key, factory);
    this.logger.debug(`Registered factory for service: ${key}`);
  }

  /**
   * Register a singleton service
   */
  registerSingleton<T>(key: string, instance: T): void {
    this.services.set(key, instance);
    this.logger.debug(`Registered singleton service: ${key}`);
  }

  /**
   * Resolve a service
   */
  resolve<T>(key: string): T {
    // Check for singleton first
    if (this.services.has(key)) {
      return this.services.get(key) as T;
    }

    // Check for factory
    if (this.factories.has(key)) {
      const factory = this.factories.get(key)!;
      const instance = factory();
      return instance as T;
    }

    throw new Error(`Service not found: ${key}`);
  }

  /**
   * Initialize default UI services for a page
   */
  initializeUIServicesForPage(page: Page, config: Partial<FrameworkConfig> = {}): UIServices {
    return {
      click: new ClickService(page, config),
      form: new FormService(page, config),
      // TODO: Add other services as we create them
      // wait: new WaitService(page, config),
      // navigation: new NavigationService(page, config),
    };
  }

  /**
   * Clear all registered services (useful for testing)
   */
  clear(): void {
    this.services.clear();
    this.factories.clear();
    this.logger.debug('Service container cleared');
  }
}

/**
 * UI Services bundle - clean interface for page objects
 */
export interface UIServices {
  click: IClickService;
  form: IFormService;
  // wait: IWaitService;      // TODO: Implement
  // navigation: INavigationService;  // TODO: Implement
}

/**
 * Factory function for easy service creation
 */
export function createUIServices(page: Page, config?: Partial<FrameworkConfig>): UIServices {
  return ServiceContainer.getInstance().initializeUIServicesForPage(page, config);
}