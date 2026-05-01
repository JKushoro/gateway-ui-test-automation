"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiClient = void 0;
const axios_1 = __importDefault(require("axios"));
const Logger_1 = require("./Logger");
// =======================
// ApiClient Implementation
// =======================
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
class ApiClient {
    constructor(baseUrl, apiKey, adviserId, createdByUserId) {
        this.logger = (0, Logger_1.createLogger)('CDM');
        this.baseUrl = ApiClient.validateBaseUrl(baseUrl ?? process.env.API_URL);
        this.apiKey = apiKey ?? process.env.API_KEY;
        this.adviserId = this.parseNumberId(adviserId ?? process.env.ADVISOR_ID);
        this.createdByUserId = this.parseNumberId(createdByUserId ?? process.env.ADVISOR_USER_ID);
        this.logger.info(`Initialising ApiClient with baseUrl: ${this.baseUrl}`);
        this.logger.info(`API key present: ${Boolean(this.apiKey)}`);
        this.logger.info(`Advisor ID: ${this.adviserId ?? 'not set'}`);
        this.logger.info(`Created by User ID: ${this.createdByUserId ?? 'not set'}`);
        this.client = axios_1.default.create({
            baseURL: this.baseUrl,
            headers: this.apiKey ? { 'x-functions-key': this.apiKey } : {},
            timeout: 30000,
        });
    }
    /**
     * Check if the API is available and responding
     * @returns Promise<boolean> - true if API is available, false otherwise
     */
    async isApiAvailable() {
        try {
            // Try a simple GET request to check API availability
            // Using a lightweight endpoint or health check if available
            const response = await this.client.get('/health', { timeout: 5000 });
            return response.status === 200;
        }
        catch (error) {
            // If health endpoint doesn't exist, try a basic factfinds request with minimal params
            try {
                await this.client.get('/factfinds', {
                    params: { page: 1, size: 1 },
                    timeout: 5000
                });
                return true;
            }
            catch (secondError) {
                this.logger.warn('API availability check failed:', this.getErrorMessage(secondError));
                return false;
            }
        }
    }
    /**
     * Sleep for specified milliseconds
     */
    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    /**
     * Retry operation with exponential backoff
     */
    async retryWithBackoff(operation, maxRetries = 3, baseDelay = 1000) {
        let lastError;
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                return await operation();
            }
            catch (error) {
                lastError = error;
                if (attempt === maxRetries) {
                    throw error;
                }
                const delay = baseDelay * Math.pow(2, attempt - 1);
                this.logger.warn(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
                await this.sleep(delay);
            }
        }
        throw lastError;
    }
    /**
     * Extract error message from various error types
     */
    getErrorMessage(error) {
        if (error?.response?.status === 403) {
            return `API service unavailable (403: ${error.response.statusText || 'Forbidden'})`;
        }
        if (error?.response?.status) {
            return `HTTP ${error.response.status}: ${error.response.statusText || 'Unknown error'}`;
        }
        if (error?.message) {
            return error.message;
        }
        return String(error);
    }
    static validateBaseUrl(value) {
        const trimmed = value?.trim();
        if (!trimmed) {
            throw new Error('[CDM] API_URL is missing. Ensure your .env file is loaded and API_URL is set.');
        }
        try {
            const url = new URL(trimmed);
            if (!url.protocol.startsWith('http')) {
                throw new Error('Only http/https URLs are supported.');
            }
            return url.toString().replace(/\/+$/, '');
        }
        catch (error) {
            if (error instanceof Error && error.message === 'Only http/https URLs are supported.') {
                throw error;
            }
            throw new Error(`[CDM] API_URL is invalid: "${trimmed}". Expected an absolute URL such as "https://example.azurewebsites.net".`);
        }
    }
    parseNumberId(value) {
        if (value === undefined || value === null || value === '') {
            return undefined;
        }
        const parsed = typeof value === 'string' ? Number(value) : value;
        return isNaN(parsed) ? undefined : parsed;
    }
    // =======================
    // Client Methods
    // =======================
    /**
     * Creates a new client
     */
    async createClient(clientData) {
        const payload = {
            ...clientData,
            adviserId: clientData.adviserId ?? this.adviserId,
        };
        this.logger.info(`POST /clients — creating client: ${payload.forename} ${payload.surname} ` +
            `(${payload.emailAddress}) adviserId: ${payload.adviserId}`);
        try {
            const response = await this.client.post('/clients', payload);
            this.logger.info(`POST /clients response: ${response.status} — id: ${response.data.id}`);
            return response.data;
        }
        catch (error) {
            this.logger.error(`Failed to create client:`, error);
            throw error;
        }
    }
    /**
     * Soft-deletes or restores a client by setting isDeleted
     */
    async setClientDeleted(clientId, isDeleted) {
        this.logger.info(`PATCH /clients/${clientId} — setting isDeleted to ${isDeleted}`);
        try {
            const response = await this.client.patch(`/clients/${clientId}`, { isDeleted });
            this.logger.info(`PATCH /clients/${clientId} response: ${response.status}`);
            return response.status === 204;
        }
        catch (error) {
            this.logger.error(`Failed to update client deletion status:`, error);
            throw error;
        }
    }
    // =======================
    // Association Methods
    // =======================
    /**
     * Creates an association between two clients
     */
    async createClientAssociation(clientId, req) {
        this.logger.info(`POST /clients/${clientId}/associations — associating with ${req.associatedClientId}, ` +
            `type: ${req.associationType}`);
        try {
            const response = await this.client.post(`/clients/${clientId}/associations`, req);
            this.logger.info(`POST /clients/${clientId}/associations response: ${response.status} — id: ${response.data.id}`);
            return response.data;
        }
        catch (error) {
            this.logger.error(`Failed to create client association:`, error);
            throw error;
        }
    }
    // =======================
    // Fact Find Methods
    // =======================
    /**
     * Creates a new fact find
     */
    async createFactFind(request) {
        const payload = {
            ...request,
            createdByUserId: request.createdByUserId ?? this.createdByUserId,
        };
        this.logger.info(`POST /factfinds — client1: ${request.client1Id}, client2: ${request.client2Id ?? '(none)'}, ` +
            `typeId: ${request.factFindTypeId}, createdByUserId: ${payload.createdByUserId}`);
        try {
            const response = await this.client.post('/factfinds', payload);
            this.logger.info(`POST /factfinds response: ${response.status} — id: ${response.data.id}`);
            return response.data;
        }
        catch (error) {
            this.logger.error(`Failed to create fact find:`, error);
            throw error;
        }
    }
    /**
     * Fetches a paginated list of fact finds with optional filtering
     */
    async getFactFinds(params = {}) {
        this.logger.info(`GET /factfinds with params: ${JSON.stringify(params)}`);
        try {
            const { data, status } = await this.client.get('/factfinds', {
                params,
            });
            this.logger.info(`GET /factfinds response: ${status} — page ${data.page}, total ${data.total}, ` +
                `items returned: ${data.items?.length ?? 0}`);
            return {
                page: data.page,
                size: data.size,
                total: data.total,
                items: data.items ?? [],
            };
        }
        catch (error) {
            this.logger.error(`Failed to get fact finds:`, error);
            throw error;
        }
    }
    /**
     * Updates a fact find's status
     */
    async updateFactFindStatus(factFindId, status) {
        this.logger.info(`PATCH /factfinds/${factFindId} — setting status to "${status}"`);
        try {
            const response = await this.client.patch(`/factfinds/${factFindId}`, { status });
            this.logger.info(`PATCH /factfinds/${factFindId} response: ${response.status}`);
            return response.status >= 200 && response.status < 300;
        }
        catch (error) {
            this.logger.error(`Failed to update fact find status:`, error);
            throw error;
        }
    }
    /**
     * Sets a fact find's status to "Abandoned"
     */
    async abandonFactFind(factFindId) {
        this.logger.info(`Abandoning fact-find: ${factFindId}`);
        return this.updateFactFindStatus(factFindId, 'Abandoned');
    }
    /**
     * Sets a fact find's status to "Complete"
     */
    async completeFactFind(factFindId) {
        this.logger.info(`Completing fact-find: ${factFindId}`);
        return this.updateFactFindStatus(factFindId, 'Complete');
    }
    /**
     * Abandons all fact finds for a specific client with optional filters
     * Includes retry mechanism and graceful error handling
     */
    async abandonAllFactFindsForClient(clientId, filters = {}) {
        this.logger.info(`Abandoning fact-finds for client: ${clientId}${Object.keys(filters).length ? ` with filters: ${JSON.stringify(filters)}` : ''}`);
        // Check API availability first
        const isAvailable = await this.isApiAvailable();
        if (!isAvailable) {
            const errorMsg = 'API is not available - skipping fact find cleanup';
            this.logger.warn(errorMsg);
            throw new Error(errorMsg);
        }
        const pageSize = 100;
        let page = 1;
        let totalPages = 1;
        try {
            await this.retryWithBackoff(async () => {
                do {
                    const params = {
                        page,
                        size: pageSize,
                        clientid: clientId,
                        status: filters.statusId ?? 1, // Default to Open status
                    };
                    if (filters.typeId !== undefined) {
                        params.typeid = filters.typeId;
                    }
                    const result = await this.getFactFinds(params);
                    totalPages = Math.max(1, Math.ceil(result.total / pageSize));
                    this.logger.info(`Page ${page}/${totalPages} — ${result.items.length} fact-finds for client (total: ${result.total})`);
                    for (const factFind of result.items) {
                        this.logger.info(`  → Abandoning id=${factFind.id}, status="${factFind.status}" ` +
                            `(statusId=${factFind.statusId}), type="${factFind.type}"`);
                        await this.retryWithBackoff(() => this.abandonFactFind(factFind.id), 2, 500);
                    }
                    page++;
                } while (page <= totalPages);
            }, 3, 2000);
            this.logger.info(`Finished abandoning fact-finds for client: ${clientId}`);
        }
        catch (error) {
            const errorMessage = this.getErrorMessage(error);
            this.logger.error(`Failed to abandon fact finds for client ${clientId}: ${errorMessage}`);
            throw error;
        }
    }
    /**
     * Abandons all open fact finds for one or two clients (e.g., joint clients)
     */
    async abandonAllOpenFactFinds(client1Id, client2Id) {
        this.logger.info(`Abandoning all open fact-finds — client1: ${client1Id}, client2: ${client2Id ?? '(none)'}`);
        try {
            await this.abandonAllFactFindsForClient(client1Id);
            if (client2Id) {
                await this.abandonAllFactFindsForClient(client2Id);
            }
            this.logger.info('Done abandoning all open fact-finds');
        }
        catch (error) {
            this.logger.error(`Failed to abandon all open fact finds:`, error);
            throw error;
        }
    }
}
exports.ApiClient = ApiClient;
//# sourceMappingURL=cdm.js.map