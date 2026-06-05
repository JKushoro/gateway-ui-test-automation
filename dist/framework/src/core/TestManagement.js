"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestFactory = exports.IsolatedKycTestLifecycle = exports.BaseTestLifecycle = exports.PageNavigator = exports.TestEnvironment = exports.ClientManager = exports.TestClient = void 0;
const TestIsolationApiClient_1 = require("@framework/utils/TestIsolationApiClient");
const TestUtils_1 = __importDefault(require("../../projects/gateway-ui/tests/shared/TestUtils"));
const ActionHelper_1 = require("../helpers/ActionHelper");
/**
 * Concrete implementation of ITestClient
 * Encapsulates client data and behavior
 */
class TestClient {
    constructor(id, email, api) {
        this.id = id;
        this.email = email;
        this.api = api;
    }
}
exports.TestClient = TestClient;
/**
 * Concrete implementation of IClientManager
 * Single Responsibility: Manages test client lifecycle
 */
class ClientManager {
    constructor(environment = 'qa') {
        this.environment = environment;
    }
    async createTestClient() {
        const api = new TestIsolationApiClient_1.TestIsolationApiClient(this.environment);
        const email = `testuser${Date.now()}@example.com`;
        const response = await api.api.createClient({
            forename: 'Pipeline',
            surname: 'Automation',
            emailAddress: email,
            migrated: true,
        });
        return new TestClient(response.id, email, api);
    }
    async cleanupClient(client) {
        if (client.id && client.api) {
            await client.api.cleanupClient(client.id);
        }
    }
}
exports.ClientManager = ClientManager;
/**
 * Concrete implementation of ITestEnvironment
 * Single Responsibility: Manages environment configuration
 */
class TestEnvironment {
    constructor(environment = 'qa') {
        this.environment = environment;
        this.storageState = 'playwright/.auth/user.json';
    }
    configure() {
        // Environment-specific configuration logic
        // This method can be extended for different environments
    }
}
exports.TestEnvironment = TestEnvironment;
/**
 * Concrete implementation of IPageNavigator
 * Single Responsibility: Handles page navigation and setup
 */
class PageNavigator {
    constructor(browser) {
        this.browser = browser;
    }
    async navigateToKycPage(pageName) {
        this.testBase = await TestUtils_1.default.create(this.browser, 'qa');
        await this.testBase.factFindSteps.addClientAndNavigateToFactFindTab(this.testBase.sideNav, this.testBase.navBar);
        this.kycPage = await this.testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');
        // Navigate to the specified page
        const actionHelper = new ActionHelper_1.ActionHelper(this.kycPage);
        await actionHelper.selectCustomRadioOptionByLabel(pageName);
        return this.kycPage;
    }
    async cleanup() {
        if (this.kycPage) {
            await this.kycPage.close();
        }
        if (this.testBase) {
            await this.testBase.cleanup();
        }
    }
}
exports.PageNavigator = PageNavigator;
/**
 * Abstract base class for test lifecycle management
 * Template Method Pattern: Defines the skeleton of test execution
 */
class BaseTestLifecycle {
    constructor(clientManager, testEnvironment) {
        this.clientManager = clientManager;
        this.testEnvironment = testEnvironment;
    }
    async setup() {
        this.testEnvironment.configure();
        this.client = await this.clientManager.createTestClient();
        await this.onSetupComplete();
    }
    async teardown() {
        if (this.client) {
            await this.clientManager.cleanupClient(this.client);
        }
        await this.onTeardownComplete();
    }
}
exports.BaseTestLifecycle = BaseTestLifecycle;
/**
 * Concrete implementation for isolated KYC tests
 * Liskov Substitution: Can be used anywhere BaseTestLifecycle is expected
 */
class IsolatedKycTestLifecycle extends BaseTestLifecycle {
    async onSetupComplete() {
        // KYC-specific setup logic
    }
    async onTeardownComplete() {
        // KYC-specific cleanup logic
    }
}
exports.IsolatedKycTestLifecycle = IsolatedKycTestLifecycle;
/**
 * Factory implementation following Factory Pattern
 * Open/Closed Principle: Easy to add new test types without modification
 */
class TestFactory {
    constructor(environment = 'qa') {
        this.environment = environment;
    }
    createClientManager() {
        return new ClientManager(this.environment);
    }
    async createPageNavigator(browser) {
        return new PageNavigator(browser);
    }
    createTestEnvironment() {
        return new TestEnvironment(this.environment);
    }
    /**
     * Factory method for creating complete test lifecycle
     * Dependency Inversion: Returns abstraction, not concrete class
     */
    createTestLifecycle() {
        const clientManager = this.createClientManager();
        const testEnvironment = this.createTestEnvironment();
        return new IsolatedKycTestLifecycle(clientManager, testEnvironment);
    }
}
exports.TestFactory = TestFactory;
//# sourceMappingURL=TestManagement.js.map