"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceContainer = void 0;
exports.createUIServices = createUIServices;
const ClickService_1 = require("../services/ClickService");
const FormService_1 = require("../services/FormService");
const Logger_1 = require("../utils/Logger");
/**
 * ServiceContainer - Dependency Injection Container
 *
 * SOLID Principles Applied:
 * - Single Responsibility: Only manages service registration and resolution
 * - Dependency Inversion: Provides abstractions, not concrete implementations
 * - Open/Closed: Open for new services, closed for modification
 */
class ServiceContainer {
    constructor() {
        this.services = new Map();
        this.factories = new Map();
        this.logger = (0, Logger_1.createLogger)('ServiceContainer');
    }
    static getInstance() {
        if (!ServiceContainer.instance) {
            ServiceContainer.instance = new ServiceContainer();
        }
        return ServiceContainer.instance;
    }
    /**
     * Register a service factory
     */
    registerFactory(key, factory) {
        this.factories.set(key, factory);
        this.logger.debug(`Registered factory for service: ${key}`);
    }
    /**
     * Register a singleton service
     */
    registerSingleton(key, instance) {
        this.services.set(key, instance);
        this.logger.debug(`Registered singleton service: ${key}`);
    }
    /**
     * Resolve a service
     */
    resolve(key) {
        // Check for singleton first
        if (this.services.has(key)) {
            return this.services.get(key);
        }
        // Check for factory
        if (this.factories.has(key)) {
            const factory = this.factories.get(key);
            const instance = factory();
            return instance;
        }
        throw new Error(`Service not found: ${key}`);
    }
    /**
     * Initialize default UI services for a page
     */
    initializeUIServicesForPage(page, config = {}) {
        return {
            click: new ClickService_1.ClickService(page, config),
            form: new FormService_1.FormService(page, config),
            // TODO: Add other services as we create them
            // wait: new WaitService(page, config),
            // navigation: new NavigationService(page, config),
        };
    }
    /**
     * Clear all registered services (useful for testing)
     */
    clear() {
        this.services.clear();
        this.factories.clear();
        this.logger.debug('Service container cleared');
    }
}
exports.ServiceContainer = ServiceContainer;
/**
 * Factory function for easy service creation
 */
function createUIServices(page, config) {
    return ServiceContainer.getInstance().initializeUIServicesForPage(page, config);
}
//# sourceMappingURL=ServiceContainer.js.map