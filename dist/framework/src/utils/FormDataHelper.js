"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormDataHelper = void 0;
// framework/src/utils/FormDataHelper.ts
const DataStore_1 = require("./DataStore");
const TestDataGenerator_1 = require("./TestDataGenerator");
/**
 * FormDataHelper - Utility for generating and managing test form data
 * Focused on data generation and storage, not UI interaction
 */
class FormDataHelper {
    /**
     * Create TestFormData object from individual fields
     */
    static createFormData(firstName, lastName, companyName, email, phone) {
        return {
            firstName,
            lastName,
            companyName,
            email,
            phone,
            fullName: `${firstName} ${lastName}`,
            generatedAt: new Date().toISOString()
        };
    }
    /**
     * Store form data in DataStore
     */
    static storeFormData(formData, prefix) {
        DataStore_1.dataStore.setValue(`${prefix}.firstName`, formData.firstName);
        DataStore_1.dataStore.setValue(`${prefix}.lastName`, formData.lastName);
        DataStore_1.dataStore.setValue(`${prefix}.companyName`, formData.companyName);
        DataStore_1.dataStore.setValue(`${prefix}.email`, formData.email);
        DataStore_1.dataStore.setValue(`${prefix}.phone`, formData.phone);
        DataStore_1.dataStore.setValue(`${prefix}.fullName`, formData.fullName);
        DataStore_1.dataStore.setValue(`${prefix}.complete`, formData);
    }
    /**
     * Generate and store a complete set of form data
     */
    static generateAndStore(prefix = 'formData') {
        const firstName = TestDataGenerator_1.TestDataGenerator.firstName();
        const lastName = TestDataGenerator_1.TestDataGenerator.lastName();
        const companyName = TestDataGenerator_1.TestDataGenerator.companyName();
        const email = TestDataGenerator_1.TestDataGenerator.email({ first: firstName, last: lastName });
        const phone = TestDataGenerator_1.TestDataGenerator.phone();
        const formData = this.createFormData(firstName, lastName, companyName, email, phone);
        this.storeFormData(formData, prefix);
        return formData;
    }
    /**
     * Generate form data with custom overrides
     */
    static generateWithOverrides(overrides = {}, prefix = 'formData') {
        const firstName = overrides.firstName ?? TestDataGenerator_1.TestDataGenerator.firstName();
        const lastName = overrides.lastName ?? TestDataGenerator_1.TestDataGenerator.lastName();
        const companyName = overrides.companyName ?? TestDataGenerator_1.TestDataGenerator.companyName();
        const email = overrides.email ?? TestDataGenerator_1.TestDataGenerator.email({ first: firstName, last: lastName });
        const phone = overrides.phone ?? TestDataGenerator_1.TestDataGenerator.phone();
        const formData = this.createFormData(firstName, lastName, companyName, email, phone);
        this.storeFormData(formData, prefix);
        return formData;
    }
    /**
     * Retrieve stored form data
     */
    static getStoredData(prefix = 'formData') {
        return DataStore_1.dataStore.getValue(`${prefix}.complete`);
    }
    /**
     * Get a specific field from stored form data
     */
    static getField(field, prefix = 'formData') {
        return DataStore_1.dataStore.getValue(`${prefix}.${field}`);
    }
    /**
     * Clear stored form data
     */
    static clearStoredData(prefix = 'formData') {
        const fields = ['firstName', 'lastName', 'companyName', 'email', 'phone', 'fullName', 'complete'];
        fields.forEach(field => DataStore_1.dataStore.removeValue(`${prefix}.${field}`));
    }
}
exports.FormDataHelper = FormDataHelper;
//# sourceMappingURL=FormDataHelper.js.map