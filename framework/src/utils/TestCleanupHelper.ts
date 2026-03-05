// framework/src/utils/TestCleanupHelper.ts

import * as fs from 'fs';
import * as path from 'path';
import { ApiClient } from '@framework/utils/cdm';
import { loadEnvFile } from '@framework/utils/loadEnvFile';

/**
 * Clean up fact finds for Client1 after test execution
 * Uses the actual ApiClient to abandon fact finds for cleanup
 *
 * @param typeId - Optional type filter
 * @param statusId - Optional status filter
 */
export async function cleanupClient1FactFinds(
  typeId?: number,
  statusId?: number
): Promise<void> {
  try {
    // Load environment variables if not already loaded
    if (!process.env.API_URL) {
      console.log('[Cleanup] Loading environment variables...');
      const envPath = path.resolve(__dirname, '../../../projects/gateway-ui/environments/.env.qa');
      if (fs.existsSync(envPath)) {
        loadEnvFile(envPath);
        console.log('[Cleanup] Environment variables loaded from .env.qa');
      } else {
        console.warn('[Cleanup] Environment file not found, skipping cleanup');
        return;
      }
    }

    // Check if API_URL is still missing after loading
    if (!process.env.API_URL) {
      console.warn('[Cleanup] API_URL not configured, skipping fact find cleanup');
      return;
    }

    const dataPath = path.resolve(__dirname, "../../../playwright/currentClient1.json");
    
    // Check if client data file exists
    if (!fs.existsSync(dataPath)) {
      console.log('[Cleanup] Client data file not found, skipping cleanup');
      return;
    }

    const client1Data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    const api = new ApiClient();
    
    const filters = (typeId !== undefined || statusId !== undefined)
      ? { typeId, statusId }
      : undefined;
      
    console.log(`[Cleanup] Starting cleanup for client: ${client1Data.clientId}`);
    await api.abandonAllFactFindsForClient(client1Data.clientId, filters);
    console.log('[Cleanup] Fact find cleanup completed successfully');
    
  } catch (error) {
    console.warn('[Cleanup] Failed to cleanup fact finds:', error instanceof Error ? error.message : String(error));
    // Don't fail the test due to cleanup issues
  }
}