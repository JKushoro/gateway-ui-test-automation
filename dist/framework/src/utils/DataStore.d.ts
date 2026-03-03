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
/**
 * Simple in-memory data store for test data
 */
declare class DataStore {
    private storedValues;
    /**
     * Get a stored value by key
     *
     * @param key - The key to retrieve
     * @returns The stored value or undefined if not found
     */
    getValue<T = any>(key: string): T;
    /**
     * Store a value with a key
     *
     * @param key - The key to store the value under
     * @param value - The value to store
     */
    setValue<T = any>(key: string, value: T): void;
    /**
     * Check if a key exists in the store
     *
     * @param key - The key to check
     * @returns True if the key exists, false otherwise
     */
    hasKey(key: string): boolean;
    /**
     * Remove a value from the store
     *
     * @param key - The key to remove
     */
    removeValue(key: string): void;
    /**
     * Clear all stored values
     */
    clear(): void;
    /**
     * Get all stored keys
     *
     * @returns Array of all keys in the store
     */
    getKeys(): string[];
    /**
     * Get the number of stored values
     *
     * @returns Number of stored key-value pairs
     */
    size(): number;
}
/**
 * Singleton instance of the data store
 * Use this instance throughout your tests
 */
declare const dataStore: DataStore;
export { dataStore, DataStore };
//# sourceMappingURL=DataStore.d.ts.map