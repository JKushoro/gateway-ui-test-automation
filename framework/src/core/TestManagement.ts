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
import { 
  IClientManager, 
  ITestClient, 
  ITestEnvironment, 
  IPageNavigator, 
  ITestLifecycle,
  ITestFactory 
} from '../interfaces/ITestSetup';
import BaseTest from '../../projects/gateway-ui/tests/shared/TestUtils';
import { ActionHelper } from '../helpers/ActionHelper';

/**
 * Concrete implementation of ITestClient
 * Encapsulates client data and behavior
 */
export class TestClient implements ITestClient {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly api: TestIsolationApiClient
  ) {}
}

/**
 * Concrete implementation of IClientManager
 * Single Responsibility: Manages test client lifecycle
 */
export class ClientManager implements IClientManager {
  private readonly environment: 'qa' | 'dev';

  constructor(environment: 'qa' | 'dev' = 'qa') {
    this.environment = environment;
  }

  async createTestClient(): Promise<ITestClient> {
    const api = new TestIsolationApiClient(this.environment);
    const email = `testuser${Date.now()}@example.com`;

    const response = await api.api.createClient({
      forename: 'Pipeline',
      surname: 'Automation',
      emailAddress: email,
      migrated: true,
    });

    return new TestClient(response.id, email, api);
  }

  async cleanupClient(client: ITestClient): Promise<void> {
    if (client.id && client.api) {
      await client.api.cleanupClient(client.id);
    }
  }
}

/**
 * Concrete implementation of ITestEnvironment
 * Single Responsibility: Manages environment configuration
 */
export class TestEnvironment implements ITestEnvironment {
  public readonly environment: 'qa' | 'dev';
  public readonly storageState: string;

  constructor(environment: 'qa' | 'dev' = 'qa') {
    this.environment = environment;
    this.storageState = 'playwright/.auth/user.json';
  }

  configure(): void {
    // Environment-specific configuration logic
    // This method can be extended for different environments
  }
}

/**
 * Concrete implementation of IPageNavigator
 * Single Responsibility: Handles page navigation and setup
 */
export class PageNavigator implements IPageNavigator {
  private testBase?: BaseTest;
  private kycPage?: Page;

  constructor(private readonly browser: Browser) {}

  async navigateToKycPage(pageName: string): Promise<Page> {
    this.testBase = await BaseTest.create(this.browser, 'qa');

    await this.testBase.factFindSteps.addClientAndNavigateToFactFindTab(
      this.testBase.sideNav,
      this.testBase.navBar
    );

    this.kycPage = await this.testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');

    // Navigate to the specified page
    const actionHelper = new ActionHelper(this.kycPage);
    await actionHelper.selectCustomRadioOptionByLabel(pageName);

    return this.kycPage;
  }

  async cleanup(): Promise<void> {
    if (this.kycPage) {
      await this.kycPage.close();
    }
    if (this.testBase) {
      await this.testBase.cleanup();
    }
  }
}

/**
 * Abstract base class for test lifecycle management
 * Template Method Pattern: Defines the skeleton of test execution
 */
export abstract class BaseTestLifecycle implements ITestLifecycle {
  protected clientManager: IClientManager;
  protected testEnvironment: ITestEnvironment;
  protected client?: ITestClient;

  constructor(clientManager: IClientManager, testEnvironment: ITestEnvironment) {
    this.clientManager = clientManager;
    this.testEnvironment = testEnvironment;
  }

  async setup(): Promise<void> {
    this.testEnvironment.configure();
    this.client = await this.clientManager.createTestClient();
    await this.onSetupComplete();
  }

  async teardown(): Promise<void> {
    if (this.client) {
      await this.clientManager.cleanupClient(this.client);
    }
    await this.onTeardownComplete();
  }

  // Template methods for subclasses to override
  protected abstract onSetupComplete(): Promise<void>;
  protected abstract onTeardownComplete(): Promise<void>;
}

/**
 * Concrete implementation for isolated KYC tests
 * Liskov Substitution: Can be used anywhere BaseTestLifecycle is expected
 */
export class IsolatedKycTestLifecycle extends BaseTestLifecycle {
  protected async onSetupComplete(): Promise<void> {
    // KYC-specific setup logic
  }

  protected async onTeardownComplete(): Promise<void> {
    // KYC-specific cleanup logic
  }
}

/**
 * Factory implementation following Factory Pattern
 * Open/Closed Principle: Easy to add new test types without modification
 */
export class TestFactory implements ITestFactory {
  private readonly environment: 'qa' | 'dev';

  constructor(environment: 'qa' | 'dev' = 'qa') {
    this.environment = environment;
  }

  createClientManager(): IClientManager {
    return new ClientManager(this.environment);
  }

  async createPageNavigator(browser: Browser): Promise<IPageNavigator> {
    return new PageNavigator(browser);
  }

  createTestEnvironment(): ITestEnvironment {
    return new TestEnvironment(this.environment);
  }

  /**
   * Factory method for creating complete test lifecycle
   * Dependency Inversion: Returns abstraction, not concrete class
   */
  createTestLifecycle(): ITestLifecycle {
    const clientManager = this.createClientManager();
    const testEnvironment = this.createTestEnvironment();
    return new IsolatedKycTestLifecycle(clientManager, testEnvironment);
  }
}