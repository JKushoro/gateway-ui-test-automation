import { ApiClient, ClientCreateRequest, ClientCreateResponse, FactFindCreateRequest, FactFindCreateResponse } from './cdm';
import { createLogger, ILogger } from './Logger';
import { EnvironmentManager } from './EnvironmentManager';
import { Environment } from '../types/Environment';

/**
 * Enhanced API Client specifically designed for test isolation patterns.
 * Uses composition to wrap the base ApiClient with methods optimized for creating and cleaning up test data.
 */
export class TestIsolationApiClient {
  private readonly apiClient: ApiClient;
  private readonly logger: ILogger;
  private readonly createdClients: Set<string> = new Set();
  private readonly createdFactFinds: Set<string> = new Set();

  constructor(
    environment: Environment = 'qa',
    baseUrl?: string,
    apiKey?: string,
    adviserId?: string | number,
    createdByUserId?: string | number
  ) {
    this.logger = createLogger('TestIsolationApiClient');
    
    // Load environment settings
    const envManager = EnvironmentManager.getInstance();
    envManager.ensureEnvLoaded(environment);
    
    // Use environment values or provided overrides
    const apiUrl = baseUrl || envManager.getEnvValue('API_URL', environment);
    const apiKeyValue = apiKey || envManager.getEnvValue('API_KEY', environment);
    const advisorId = adviserId || envManager.getEnvValue('ADVISOR_ID', environment);
    const userId = createdByUserId || envManager.getEnvValue('ADVISOR_USER_ID', environment);
    
    this.logger.info(`Initializing TestIsolationApiClient for environment: ${environment}`);
    this.logger.info(`API URL: ${apiUrl}`);
    
    this.apiClient = new ApiClient(apiUrl, apiKeyValue, advisorId, userId);
  }

  /**
   * Get the underlying API client for direct access to base methods
   */
  get api(): ApiClient {
    return this.apiClient;
  }

  /**
   * Create a test client with unique email and track it for cleanup
   * @param clientData - Base client data (email will be made unique if not already)
   * @returns Promise<ClientCreateResponse & { id: string }>
   */
  async createTestClient(clientData: Partial<ClientCreateRequest>): Promise<ClientCreateResponse & { id: string }> {
    const uniqueEmail = clientData.emailAddress?.includes('@')
      ? clientData.emailAddress
      : `testuser${Date.now()}@example.com`;

    const testClientData: ClientCreateRequest = {
      forename: 'Pipeline',
      surname: 'Automation',
      emailAddress: uniqueEmail,
      migrated: true,
      // Don't include adviserId - let the API handle it automatically
      ...clientData
    };
    
    // Remove adviserId if it was passed in clientData to avoid the API error
    delete (testClientData as any).adviserId;

    this.logger.info(`Creating test client with email: ${testClientData.emailAddress}`);
    
    const response = await this.apiClient.createClient(testClientData);
    this.createdClients.add(response.id);
    
    this.logger.info(`Test client created with ID: ${response.id}`);
    return response;
  }

  /**
   * Create a test fact find and track it for cleanup
   * @param request - Fact find creation request
   * @returns Promise<FactFindCreateResponse & { id: string }>
   */
  async createTestFactFind(request: FactFindCreateRequest): Promise<FactFindCreateResponse & { id: string }> {
    const factFindData: FactFindCreateRequest = {
      createdByUserId: this.apiClient.createdByUserId,
      ...request
    };

    this.logger.info(`Creating test fact find for client: ${factFindData.client1Id}`);
    
    const response = await this.apiClient.createFactFind(factFindData);
    this.createdFactFinds.add(response.id);
    
    this.logger.info(`Test fact find created with ID: ${response.id}`);
    return response;
  }

  /**
   * Clean up a specific client (mark as deleted)
   * @param clientId - ID of client to clean up
   */
  async cleanupClient(clientId: string): Promise<void> {
    try {
      this.logger.info(`Cleaning up client: ${clientId}`);
      await this.apiClient.setClientDeleted(clientId, true);
      this.createdClients.delete(clientId);
      this.logger.info(`Client ${clientId} marked as deleted`);
    } catch (error) {
      this.logger.error(`Failed to cleanup client ${clientId}:`, error);
      throw error;
    }
  }

  /**
   * Clean up all tracked clients created by this instance
   */
  async cleanupAllClients(): Promise<void> {
    if (this.createdClients.size === 0) {
      this.logger.info('No clients to clean up');
      return;
    }

    this.logger.info(`Cleaning up ${this.createdClients.size} tracked clients`);
    
    const cleanupPromises = Array.from(this.createdClients).map(async (clientId) => {
      try {
        await this.cleanupClient(clientId);
      } catch (error) {
        this.logger.error(`Failed to cleanup client ${clientId}:`, error);
        // Continue with other cleanups even if one fails
      }
    });

    await Promise.allSettled(cleanupPromises);
    this.createdClients.clear();
    this.logger.info('Client cleanup completed');
  }

  /**
   * Get the count of tracked resources
   */
  getTrackedResourceCounts(): { clients: number; factFinds: number } {
    return {
      clients: this.createdClients.size,
      factFinds: this.createdFactFinds.size
    };
  }

  /**
   * Reset tracking (useful for test isolation)
   */
  resetTracking(): void {
    this.createdClients.clear();
    this.createdFactFinds.clear();
    this.logger.info('Resource tracking reset');
  }
}