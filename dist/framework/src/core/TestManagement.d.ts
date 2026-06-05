/**
 * 🏗️ Test Management Classes - Following SOLID Principles
 *
 * This module implements proper OOP design patterns for test management:
 * - Single Responsibility Principle: Each class has one clear purpose
 * - Open/Closed Principle: Easy to extend without modifying existing code
 * - Liskov Substitution Principle: Derived classes are substitutable
 * - Interface Segregation Principle: Small, focused interfaces
 * - Dependency Inversion Principle: Depend on abstractions
 */
import { Browser, Page } from '@playwright/test';
import { TestIsolationApiClient } from '@framework/utils/TestIsolationApiClient';
import { IClientManager, ITestClient, ITestEnvironment, IPageNavigator, ITestLifecycle, ITestFactory } from '../interfaces/ITestSetup';
/**
 * Concrete implementation of ITestClient
 * Encapsulates client data and behavior
 */
export declare class TestClient implements ITestClient {
    readonly id: string;
    readonly email: string;
    readonly api: TestIsolationApiClient;
    constructor(id: string, email: string, api: TestIsolationApiClient);
}
/**
 * Concrete implementation of IClientManager
 * Single Responsibility: Manages test client lifecycle
 */
export declare class ClientManager implements IClientManager {
    private readonly environment;
    constructor(environment?: 'qa' | 'dev');
    createTestClient(): Promise<ITestClient>;
    cleanupClient(client: ITestClient): Promise<void>;
}
/**
 * Concrete implementation of ITestEnvironment
 * Single Responsibility: Manages environment configuration
 */
export declare class TestEnvironment implements ITestEnvironment {
    readonly environment: 'qa' | 'dev';
    readonly storageState: string;
    constructor(environment?: 'qa' | 'dev');
    configure(): void;
}
/**
 * Concrete implementation of IPageNavigator
 * Single Responsibility: Handles page navigation and setup
 */
export declare class PageNavigator implements IPageNavigator {
    private readonly browser;
    private testBase?;
    private kycPage?;
    constructor(browser: Browser);
    navigateToKycPage(pageName: string): Promise<Page>;
    cleanup(): Promise<void>;
}
/**
 * Abstract base class for test lifecycle management
 * Template Method Pattern: Defines the skeleton of test execution
 */
export declare abstract class BaseTestLifecycle implements ITestLifecycle {
    protected clientManager: IClientManager;
    protected testEnvironment: ITestEnvironment;
    protected client?: ITestClient;
    constructor(clientManager: IClientManager, testEnvironment: ITestEnvironment);
    setup(): Promise<void>;
    teardown(): Promise<void>;
    protected abstract onSetupComplete(): Promise<void>;
    protected abstract onTeardownComplete(): Promise<void>;
}
/**
 * Concrete implementation for isolated KYC tests
 * Liskov Substitution: Can be used anywhere BaseTestLifecycle is expected
 */
export declare class IsolatedKycTestLifecycle extends BaseTestLifecycle {
    protected onSetupComplete(): Promise<void>;
    protected onTeardownComplete(): Promise<void>;
}
/**
 * Factory implementation following Factory Pattern
 * Open/Closed Principle: Easy to add new test types without modification
 */
export declare class TestFactory implements ITestFactory {
    private readonly environment;
    constructor(environment?: 'qa' | 'dev');
    createClientManager(): IClientManager;
    createPageNavigator(browser: Browser): Promise<IPageNavigator>;
    createTestEnvironment(): ITestEnvironment;
    /**
     * Factory method for creating complete test lifecycle
     * Dependency Inversion: Returns abstraction, not concrete class
     */
    createTestLifecycle(): ITestLifecycle;
}
//# sourceMappingURL=TestManagement.d.ts.map