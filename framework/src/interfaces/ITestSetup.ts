/**
 * 🏗️ Test Setup Interfaces - Following SOLID Principles
 * 
 * These interfaces define contracts for test setup and management,
 * following the Interface Segregation Principle (ISP) and 
 * Dependency Inversion Principle (DIP).
 */

import { Browser, Page } from '@playwright/test';
import { TestIsolationApiClient } from '@framework/utils/TestIsolationApiClient';

/**
 * Interface for client management operations
 * Single Responsibility: Only handles client-related operations
 */
export interface IClientManager {
  createTestClient(): Promise<ITestClient>;
  cleanupClient(client: ITestClient): Promise<void>;
}

/**
 * Interface representing a test client
 * Encapsulates client data and behavior
 */
export interface ITestClient {
  readonly id: string;
  readonly email: string;
  readonly api: TestIsolationApiClient;
}

/**
 * Interface for test environment setup
 * Single Responsibility: Only handles environment configuration
 */
export interface ITestEnvironment {
  readonly environment: 'qa' | 'dev';
  readonly storageState: string;
  configure(): void;
}

/**
 * Interface for page navigation operations
 * Single Responsibility: Only handles navigation logic
 */
export interface IPageNavigator {
  navigateToKycPage(pageName: string): Promise<Page>;
  cleanup(): Promise<void>;
}

/**
 * Interface for test lifecycle management
 * Dependency Inversion: Depends on abstractions, not concretions
 */
export interface ITestLifecycle {
  setup(): Promise<void>;
  teardown(): Promise<void>;
}

/**
 * Factory interface for creating test components
 * Open/Closed Principle: Easy to extend with new test types
 */
export interface ITestFactory {
  createClientManager(): IClientManager;
  createPageNavigator(browser: Browser): Promise<IPageNavigator>;
  createTestEnvironment(): ITestEnvironment;
}