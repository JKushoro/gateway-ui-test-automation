// framework/src/utils/TestCleanupHelper.ts

import * as fs from 'fs';
import * as path from 'path';
import { ApiClient } from '@framework/utils/cdm';
import { loadEnvFile } from '@framework/utils/loadEnvFile';

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
export async function cleanupClient1FactFinds(
  options: CleanupOptions = {}
): Promise<void> {
  const {
    skipCleanup = false,
    maxRetries = 3,
    timeoutMs = 30000,
    typeId,
    statusId
  } = options;

  // Check if cleanup is disabled
  if (skipCleanup || process.env.SKIP_CLEANUP === 'true') {
    console.log('[Cleanup] Cleanup disabled, skipping fact find cleanup');
    return;
  }

  const startTime = Date.now();
  
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
    
    // Validate client data
    if (!client1Data.clientId) {
      console.warn('[Cleanup] Invalid client data - missing clientId, skipping cleanup');
      return;
    }

    const api = new ApiClient();
    
    // Check API availability before attempting cleanup
    console.log('[Cleanup] Checking API availability...');
    const isApiAvailable = await Promise.race([
      api.isApiAvailable(),
      new Promise<boolean>((_, reject) =>
        setTimeout(() => reject(new Error('API availability check timeout')), 10000)
      )
    ]);

    if (!isApiAvailable) {
      console.warn('[Cleanup] API is not available, skipping fact find cleanup');
      return;
    }

    const filters = (typeId !== undefined || statusId !== undefined)
      ? { typeId, statusId }
      : undefined;
      
    console.log(`[Cleanup] Starting cleanup for client: ${client1Data.clientId}`);
    
    // Execute cleanup with timeout
    await Promise.race([
      api.abandonAllFactFindsForClient(client1Data.clientId, filters),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Cleanup operation timeout')), timeoutMs)
      )
    ]);
    
    const duration = Date.now() - startTime;
    console.log(`[Cleanup] Fact find cleanup completed successfully in ${duration}ms`);
    
  } catch (error) {
    const duration = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    // Categorize errors for better handling
    if (errorMessage.includes('403') || errorMessage.includes('Site Disabled')) {
      console.warn(`[Cleanup] API service unavailable (${duration}ms): ${errorMessage}`);
    } else if (errorMessage.includes('timeout')) {
      console.warn(`[Cleanup] Operation timed out (${duration}ms): ${errorMessage}`);
    } else if (errorMessage.includes('ECONNREFUSED') || errorMessage.includes('ENOTFOUND')) {
      console.warn(`[Cleanup] Network connectivity issue (${duration}ms): ${errorMessage}`);
    } else {
      console.warn(`[Cleanup] Cleanup failed (${duration}ms): ${errorMessage}`);
    }
    
    // Don't fail the test due to cleanup issues
    // Log additional context for debugging
    console.log('[Cleanup] Test will continue despite cleanup failure');
  }
}

/**
 * Legacy function for backward compatibility
 * @deprecated Use cleanupClient1FactFinds with options instead
 */
export async function cleanupClient1FactFindsLegacy(
  typeId?: number,
  statusId?: number
): Promise<void> {
  return cleanupClient1FactFinds({ typeId, statusId });
}
