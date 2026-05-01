export interface FactFind {
    id: string;
    client1Id: string;
    client2Id?: string | null;
    typeId: number;
    type?: string | null;
    definitionId: string;
    definitionTypeName?: string | null;
    data?: string | null;
    createdAt: string;
    updatedAt: string;
    statusId: number;
    status?: string | null;
    client1FirstName?: string | null;
    client1LastName?: string | null;
    client2FirstName?: string | null;
    client2LastName?: string | null;
}
export interface PaginatedResponse<T> {
    page: number;
    size: number;
    total: number;
    items: T[];
}
export interface ClientCreateRequest {
    forename: string;
    surname: string;
    emailAddress: string;
    mobilePhone?: string | null;
    homePhone?: string | null;
    dob?: string | null;
    address1?: string | null;
    address2?: string | null;
    addressTown?: string | null;
    addressCounty?: string | null;
    addressPostcode?: string | null;
    codeGenderId?: number | null;
    codeTitleId?: number | null;
    codeMaritalStatusId?: number | null;
    migrated?: boolean;
    adviserId?: number;
}
export interface ClientCreateResponse {
    id: string;
    createdAt: string;
}
export interface CreateClientAssociationRequest {
    associatedClientId: string;
    associationType: number;
}
export interface CreateClientAssociationResponse {
    id: string;
}
export interface FactFindCreateRequest {
    client1Id: string;
    client2Id?: string | null;
    factFindTypeId: number;
    createdByUserId?: number;
}
export interface FactFindCreateResponse {
    id: string;
}
type FactFindFilters = {
    typeId?: number;
    statusId?: number;
};
/**
 * CDM API Client for managing clients and fact finds
 *
 * Example usage:
 * ```typescript
 * import { ApiClient } from './cdm';
 *
 * // Initialize with environment variables
 * const api = new ApiClient();
 *
 * // Or with custom values
 * const api = new ApiClient('https://api.example.com', 'api-key', 123, 456);
 *
 * // Create a client
 * const client = await api.createClient({
 *   forename: 'John',
 *   surname: 'Doe',
 *   emailAddress: 'john.doe@example.com'
 * });
 *
 * // Abandon fact finds
 * await api.abandonFactFind('factFindId123');
 * await api.abandonAllFactFindsForClient('clientId123');
 * await api.abandonAllOpenFactFinds('client1Id', 'client2Id');
 * ```
 */
export declare class ApiClient {
    private readonly client;
    private readonly baseUrl;
    private readonly apiKey?;
    private readonly logger;
    readonly adviserId?: number;
    readonly createdByUserId?: number;
    constructor(baseUrl?: string, apiKey?: string, adviserId?: string | number, createdByUserId?: string | number);
    /**
     * Check if the API is available and responding
     * @returns Promise<boolean> - true if API is available, false otherwise
     */
    isApiAvailable(): Promise<boolean>;
    /**
     * Sleep for specified milliseconds
     */
    private sleep;
    /**
     * Retry operation with exponential backoff
     */
    private retryWithBackoff;
    /**
     * Extract error message from various error types
     */
    private getErrorMessage;
    private static validateBaseUrl;
    private parseNumberId;
    /**
     * Creates a new client
     */
    createClient(clientData: ClientCreateRequest): Promise<ClientCreateResponse>;
    /**
     * Soft-deletes or restores a client by setting isDeleted
     */
    setClientDeleted(clientId: string, isDeleted: boolean): Promise<boolean>;
    /**
     * Creates an association between two clients
     */
    createClientAssociation(clientId: string, req: CreateClientAssociationRequest): Promise<CreateClientAssociationResponse>;
    /**
     * Creates a new fact find
     */
    createFactFind(request: FactFindCreateRequest): Promise<FactFindCreateResponse>;
    /**
     * Fetches a paginated list of fact finds with optional filtering
     */
    getFactFinds(params?: Record<string, string | number | boolean>): Promise<PaginatedResponse<FactFind>>;
    /**
     * Updates a fact find's status
     */
    updateFactFindStatus(factFindId: string, status: string): Promise<boolean>;
    /**
     * Sets a fact find's status to "Abandoned"
     */
    abandonFactFind(factFindId: string): Promise<boolean>;
    /**
     * Sets a fact find's status to "Complete"
     */
    completeFactFind(factFindId: string): Promise<boolean>;
    /**
     * Abandons all fact finds for a specific client with optional filters
     * Includes retry mechanism and graceful error handling
     */
    abandonAllFactFindsForClient(clientId: string, filters?: FactFindFilters): Promise<void>;
    /**
     * Abandons all open fact finds for one or two clients (e.g., joint clients)
     */
    abandonAllOpenFactFinds(client1Id: string, client2Id?: string): Promise<void>;
}
export {};
//# sourceMappingURL=cdm.d.ts.map