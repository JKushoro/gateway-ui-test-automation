import axios, { AxiosInstance } from 'axios';
import { createLogger, ILogger } from './Logger';

// =======================
// Interfaces & Types
// =======================

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
export class ApiClient {
  private readonly client: AxiosInstance;
  private readonly baseUrl: string;
  private readonly apiKey?: string;
  private readonly logger: ILogger;
  public readonly adviserId?: number;
  public readonly createdByUserId?: number;

  constructor(
    baseUrl?: string,
    apiKey?: string,
    adviserId?: string | number,
    createdByUserId?: string | number
  ) {
    this.logger = createLogger('CDM');
    this.baseUrl = ApiClient.validateBaseUrl(baseUrl ?? process.env.API_URL);
    this.apiKey = apiKey ?? process.env.API_KEY;
    this.adviserId = this.parseNumberId(adviserId ?? process.env.ADVISOR_ID);
    this.createdByUserId = this.parseNumberId(createdByUserId ?? process.env.ADVISOR_USER_ID);

    this.logger.info(`Initialising ApiClient with baseUrl: ${this.baseUrl}`);
    this.logger.info(`API key present: ${Boolean(this.apiKey)}`);
    this.logger.info(`Advisor ID: ${this.adviserId ?? 'not set'}`);
    this.logger.info(`Created by User ID: ${this.createdByUserId ?? 'not set'}`);

    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: this.apiKey ? { 'x-functions-key': this.apiKey } : {},
      timeout: 30000,
    });
  }

  /**
   * Check if the API is available and responding
   * @returns Promise<boolean> - true if API is available, false otherwise
   */
  async isApiAvailable(): Promise<boolean> {
    try {
      // Try a simple GET request to check API availability
      // Using a lightweight endpoint or health check if available
      const response = await this.client.get('/health', { timeout: 5000 });
      return response.status === 200;
    } catch (error) {
      // If health endpoint doesn't exist, try a basic factfinds request with minimal params
      try {
        await this.client.get('/factfinds', {
          params: { page: 1, size: 1 },
          timeout: 5000
        });
        return true;
      } catch (secondError) {
        this.logger.warn('API availability check failed:', this.getErrorMessage(secondError));
        return false;
      }
    }
  }

  /**
   * Sleep for specified milliseconds
   */
  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Retry operation with exponential backoff
   */
  private async retryWithBackoff<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000
  ): Promise<T> {
    let lastError: any;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
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
  private getErrorMessage(error: any): string {
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

  private static validateBaseUrl(value?: string): string {
    const trimmed = value?.trim();

    if (!trimmed) {
      throw new Error(
        '[CDM] API_URL is missing. Ensure your .env file is loaded and API_URL is set.'
      );
    }

    try {
      const url = new URL(trimmed);

      if (!url.protocol.startsWith('http')) {
        throw new Error('Only http/https URLs are supported.');
      }

      return url.toString().replace(/\/+$/, '');
    } catch (error) {
      if (error instanceof Error && error.message === 'Only http/https URLs are supported.') {
        throw error;
      }
      throw new Error(
        `[CDM] API_URL is invalid: "${trimmed}". Expected an absolute URL such as "https://example.azurewebsites.net".`
      );
    }
  }

  private parseNumberId(value?: string | number): number | undefined {
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
  public async createClient(clientData: ClientCreateRequest): Promise<ClientCreateResponse> {
    const payload = {
      ...clientData,
      adviserId: clientData.adviserId ?? this.adviserId,
    };

    this.logger.info(
      `POST /clients — creating client: ${payload.forename} ${payload.surname} ` +
      `(${payload.emailAddress}) adviserId: ${payload.adviserId}`
    );

    try {
      const response = await this.client.post<ClientCreateResponse>('/clients', payload);
      this.logger.info(`POST /clients response: ${response.status} — id: ${response.data.id}`);
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to create client:`, error);
      throw error;
    }
  }

  /**
   * Soft-deletes or restores a client by setting isDeleted
   */
  public async setClientDeleted(clientId: string, isDeleted: boolean): Promise<boolean> {
    this.logger.info(`PATCH /clients/${clientId} — setting isDeleted to ${isDeleted}`);

    try {
      const response = await this.client.patch(`/clients/${clientId}`, { isDeleted });
      this.logger.info(`PATCH /clients/${clientId} response: ${response.status}`);
      return response.status === 204;
    } catch (error) {
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
  public async createClientAssociation(
    clientId: string,
    req: CreateClientAssociationRequest
  ): Promise<CreateClientAssociationResponse> {
    this.logger.info(
      `POST /clients/${clientId}/associations — associating with ${req.associatedClientId}, ` +
      `type: ${req.associationType}`
    );

    try {
      const response = await this.client.post<CreateClientAssociationResponse>(
        `/clients/${clientId}/associations`,
        req
      );
      this.logger.info(
        `POST /clients/${clientId}/associations response: ${response.status} — id: ${response.data.id}`
      );
      return response.data;
    } catch (error) {
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
  public async createFactFind(request: FactFindCreateRequest): Promise<FactFindCreateResponse> {
    const payload = {
      ...request,
      createdByUserId: request.createdByUserId ?? this.createdByUserId,
    };

    this.logger.info(
      `POST /factfinds — client1: ${request.client1Id}, client2: ${request.client2Id ?? '(none)'}, ` +
      `typeId: ${request.factFindTypeId}, createdByUserId: ${payload.createdByUserId}`
    );

    try {
      const response = await this.client.post<FactFindCreateResponse>('/factfinds', payload);
      this.logger.info(`POST /factfinds response: ${response.status} — id: ${response.data.id}`);
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to create fact find:`, error);
      throw error;
    }
  }

  /**
   * Fetches a paginated list of fact finds with optional filtering
   */
  public async getFactFinds(
    params: Record<string, string | number | boolean> = {}
  ): Promise<PaginatedResponse<FactFind>> {
    this.logger.info(`GET /factfinds with params: ${JSON.stringify(params)}`);

    try {
      const { data, status } = await this.client.get<PaginatedResponse<FactFind>>('/factfinds', {
        params,
      });

      this.logger.info(
        `GET /factfinds response: ${status} — page ${data.page}, total ${data.total}, ` +
        `items returned: ${data.items?.length ?? 0}`
      );

      return {
        page: data.page,
        size: data.size,
        total: data.total,
        items: data.items ?? [],
      };
    } catch (error) {
      this.logger.error(`Failed to get fact finds:`, error);
      throw error;
    }
  }

  /**
   * Updates a fact find's status
   */
  public async updateFactFindStatus(factFindId: string, status: string): Promise<boolean> {
    this.logger.info(`PATCH /factfinds/${factFindId} — setting status to "${status}"`);

    try {
      const response = await this.client.patch(`/factfinds/${factFindId}`, { status });
      this.logger.info(`PATCH /factfinds/${factFindId} response: ${response.status}`);
      return response.status >= 200 && response.status < 300;
    } catch (error) {
      this.logger.error(`Failed to update fact find status:`, error);
      throw error;
    }
  }

  /**
   * Sets a fact find's status to "Abandoned"
   */
  public async abandonFactFind(factFindId: string): Promise<boolean> {
    this.logger.info(`Abandoning fact-find: ${factFindId}`);
    return this.updateFactFindStatus(factFindId, 'Abandoned');
  }

  /**
   * Sets a fact find's status to "Complete"
   */
  public async completeFactFind(factFindId: string): Promise<boolean> {
    this.logger.info(`Completing fact-find: ${factFindId}`);
    return this.updateFactFindStatus(factFindId, 'Complete');
  }

  /**
   * Abandons all fact finds for a specific client with optional filters
   * Includes retry mechanism and graceful error handling
   */
  public async abandonAllFactFindsForClient(
    clientId: string,
    filters: FactFindFilters = {}
  ): Promise<void> {
    this.logger.info(
      `Abandoning fact-finds for client: ${clientId}${
        Object.keys(filters).length ? ` with filters: ${JSON.stringify(filters)}` : ''
      }`
    );

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
          const params: Record<string, string | number | boolean> = {
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

          this.logger.info(
            `Page ${page}/${totalPages} — ${result.items.length} fact-finds for client (total: ${result.total})`
          );

          for (const factFind of result.items) {
            this.logger.info(
              `  → Abandoning id=${factFind.id}, status="${factFind.status}" ` +
              `(statusId=${factFind.statusId}), type="${factFind.type}"`
            );
            await this.retryWithBackoff(() => this.abandonFactFind(factFind.id), 2, 500);
          }

          page++;
        } while (page <= totalPages);
      }, 3, 2000);

      this.logger.info(`Finished abandoning fact-finds for client: ${clientId}`);
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      this.logger.error(`Failed to abandon fact finds for client ${clientId}: ${errorMessage}`);
      throw error;
    }
  }

  /**
   * Abandons all open fact finds for one or two clients (e.g., joint clients)
   */
  public async abandonAllOpenFactFinds(client1Id: string, client2Id?: string): Promise<void> {
    this.logger.info(
      `Abandoning all open fact-finds — client1: ${client1Id}, client2: ${client2Id ?? '(none)'}`
    );

    try {
      await this.abandonAllFactFindsForClient(client1Id);

      if (client2Id) {
        await this.abandonAllFactFindsForClient(client2Id);
      }

      this.logger.info('Done abandoning all open fact-finds');
    } catch (error) {
      this.logger.error(`Failed to abandon all open fact finds:`, error);
      throw error;
    }
  }
}
