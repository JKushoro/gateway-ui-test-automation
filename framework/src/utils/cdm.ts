import axios, { AxiosInstance } from 'axios';

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

type FactFindFilters = {
  typeId?: number;
  statusId?: number;
};

export class ApiClient {
  private readonly client: AxiosInstance;
  private readonly baseUrl: string;
  private readonly apiKey?: string;

  constructor(baseUrl?: string, apiKey?: string) {
    this.baseUrl = ApiClient.validateBaseUrl(baseUrl ?? process.env.API_URL);
    this.apiKey = apiKey ?? process.env.API_KEY;

    console.log(`[CDM] Initialising ApiClient with baseUrl: ${this.baseUrl}`);
    console.log(`[CDM] API key present: ${Boolean(this.apiKey)}`);

    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: this.apiKey ? { 'x-functions-key': this.apiKey } : {},
      timeout: 30000,
    });
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
    } catch {
      throw new Error(
        `[CDM] API_URL is invalid: "${trimmed}". Expected an absolute URL such as "https://example.azurewebsites.net".`
      );
    }
  }

  public async getFactFinds(
    params: Record<string, string | number | boolean> = {}
  ): Promise<PaginatedResponse<FactFind>> {
    console.log(`[CDM] GET /factfinds with params: ${JSON.stringify(params)}`);

    const { data, status } = await this.client.get<PaginatedResponse<FactFind>>('/factfinds', {
      params,
    });

    console.log(
      `[CDM] GET /factfinds response: ${status} — page ${data.page}, total ${data.total}, items returned: ${data.items?.length ?? 0}`
    );

    return {
      page: data.page,
      size: data.size,
      total: data.total,
      items: data.items ?? [],
    };
  }

  public async updateFactFindStatus(factFindId: string, status: string): Promise<boolean> {
    console.log(`[CDM] PATCH /factfinds/${factFindId} — setting status to "${status}"`);

    const response = await this.client.patch(`/factfinds/${factFindId}`, { status });

    console.log(`[CDM] PATCH /factfinds/${factFindId} response: ${response.status}`);

    return response.status === 200;
  }

  public async abandonFactFind(factFindId: string): Promise<boolean> {
    console.log(`[CDM] Abandoning fact-find: ${factFindId}`);
    return this.updateFactFindStatus(factFindId, 'Abandoned');
  }

  public async abandonAllFactFindsForClient(
    clientId: string,
    filters: FactFindFilters = {}
  ): Promise<void> {
    console.log(
      `[CDM] Abandoning fact-finds for client: ${clientId}${
        Object.keys(filters).length ? ` with filters: ${JSON.stringify(filters)}` : ''
      }`
    );

    const pageSize = 100;
    let page = 1;
    let totalPages = 1;

    do {
      const params: Record<string, string | number | boolean> = {
        page,
        size: pageSize,
        clientid: clientId,
        status: filters.statusId ?? 1,
      };

      if (filters.typeId !== undefined) {
        params.typeid = filters.typeId;
      }

      const result = await this.getFactFinds(params);
      totalPages = Math.max(1, Math.ceil(result.total / pageSize));

      console.log(
        `[CDM] Page ${page}/${totalPages} — ${result.items.length} fact-finds for client (total: ${result.total})`
      );

      for (const factFind of result.items) {
        console.log(
          `[CDM]   → Abandoning id=${factFind.id}, status="${factFind.status}" (statusId=${factFind.statusId}), type="${factFind.type}"`
        );
        await this.abandonFactFind(factFind.id);
      }

      page++;
    } while (page <= totalPages);

    console.log(`[CDM] Finished abandoning fact-finds for client: ${clientId}`);
  }

  public async abandonAllOpenFactFinds(client1Id: string, client2Id?: string): Promise<void> {
    console.log(
      `[CDM] Abandoning all open fact-finds — client1: ${client1Id}, client2: ${client2Id ?? '(none)'}`
    );

    await this.abandonAllFactFindsForClient(client1Id);

    if (client2Id) {
      await this.abandonAllFactFindsForClient(client2Id);
    }

    console.log('[CDM] Done abandoning all open fact-finds');
  }
}