"use strict";
//framework/src/utils/DataStore.ts
/**
 * Data Store - Framework Utility
 *
 * This utility provides a simple in-memory data store for sharing data
 * between test steps and maintaining state during test execution.
 *
 * Developer Guide:
 * - Use setValue() to store data with a key
 * - Use getValue() to retrieve data by key
 * - Perfect for storing IDs, tokens, or other data between test steps
 * - Data persists for the duration of the test run
 *
 * Example:
 *   // Store a user ID after creation
 *   dataStore.setValue('userId', '12345');
 *
 *   // Retrieve it later in another test step
 *   const userId = dataStore.getValue<string>('userId');
 *
 *   // Store complex objects
 *   dataStore.setValue('userProfile', { name: 'John', email: 'john@example.com' });
 *   const profile = dataStore.getValue<{name: string, email: string}>('userProfile');
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataStore = exports.dataStore = void 0;
/**
 * Simple in-memory data store for test data
 */
class DataStore {
    constructor() {
        this.storedValues = {};
    }
    /**
     * Get a stored value by key
     *
     * @param key - The key to retrieve
     * @returns The stored value or undefined if not found
     */
    getValue(key) {
        return this.storedValues[key];
    }
    /**
     * Store a value with a key
     *
     * @param key - The key to store the value under
     * @param value - The value to store
     */
    setValue(key, value) {
        this.storedValues[key] = value;
    }
    /**
     * Check if a key exists in the store
     *
     * @param key - The key to check
     * @returns True if the key exists, false otherwise
     */
    hasKey(key) {
        return key in this.storedValues;
    }
    /**
     * Remove a value from the store
     *
     * @param key - The key to remove
     */
    removeValue(key) {
        delete this.storedValues[key];
    }
    /**
     * Clear all stored values
     */
    clear() {
        this.storedValues = {};
    }
    /**
     * Get all stored keys
     *
     * @returns Array of all keys in the store
     */
    getKeys() {
        return Object.keys(this.storedValues);
    }
    /**
     * Get the number of stored values
     *
     * @returns Number of stored key-value pairs
     */
    size() {
        return Object.keys(this.storedValues).length;
    }
}
exports.DataStore = DataStore;
/**
 * Singleton instance of the data store
 * Use this instance throughout your tests
 */
const dataStore = new DataStore();
exports.dataStore = dataStore;
//# sourceMappingURL=DataStore.js.map