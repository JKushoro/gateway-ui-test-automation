export interface CleanupOptions {
    /** Skip cleanup entirely if true */
    skipCleanup?: boolean;
    /** Maximum number of retry attempts */
    maxRetries?: number;
    /** Timeout for cleanup operations in milliseconds */
    timeoutMs?: number;
    /** Type filter for fact finds */
    typeId?: number;
    /** Status filter for fact finds */
    statusId?: number;
}
/**
 * Clean up fact finds for Client1 after test execution
 * Uses the actual ApiClient to abandon fact finds for cleanup
 * Includes graceful error handling and configuration options
 *
 * @param options - Cleanup configuration options
 */
export declare function cleanupClient1FactFinds(options?: CleanupOptions): Promise<void>;
/**
 * Legacy function for backward compatibility
 * @deprecated Use cleanupClient1FactFinds with options instead
 */
export declare function cleanupClient1FactFindsLegacy(typeId?: number, statusId?: number): Promise<void>;
//# sourceMappingURL=TestCleanupHelper.d.ts.map