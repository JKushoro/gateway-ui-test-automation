import { ApiClient, ClientCreateRequest, ClientCreateResponse, FactFindCreateRequest, FactFindCreateResponse } from './cdm';
import { Environment } from '../types/Environment';
/**
 * Enhanced API Client specifically designed for test isolation patterns.
 * Uses composition to wrap the base ApiClient with methods optimized for creating and cleaning up test data.
 */
export declare class TestIsolationApiClient {
    private readonly apiClient;
    private readonly logger;
    private readonly createdClients;
    private readonly createdFactFinds;
    constructor(environment?: Environment, baseUrl?: string, apiKey?: string, adviserId?: string | number, createdByUserId?: string | number);
    /**
     * Get the underlying API client for direct access to base methods
     */
    get api(): ApiClient;
    /**
     * Create a test client with unique email and track it for cleanup
     * @param clientData - Base client data (email will be made unique if not already)
     * @returns Promise<ClientCreateResponse & { id: string }>
     */
    createTestClient(clientData: Partial<ClientCreateRequest>): Promise<ClientCreateResponse & {
        id: string;
    }>;
    /**
     * Create a test fact find and track it for cleanup
     * @param request - Fact find creation request
     * @returns Promise<FactFindCreateResponse & { id: string }>
     */
    createTestFactFind(request: FactFindCreateRequest): Promise<FactFindCreateResponse & {
        id: string;
    }>;
    /**
     * Clean up a specific client (mark as deleted)
     * @param clientId - ID of client to clean up
     */
    cleanupClient(clientId: string): Promise<void>;
    /**
     * Clean up all tracked clients created by this instance
     */
    cleanupAllClients(): Promise<void>;
    /**
     * Get the count of tracked resources
     */
    getTrackedResourceCounts(): {
        clients: number;
        factFinds: number;
    };
    /**
     * Reset tracking (useful for test isolation)
     */
    resetTracking(): void;
}
//# sourceMappingURL=TestIsolationApiClient.d.ts.map