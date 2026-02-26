import { FullConfig } from '@playwright/test';
/**
 * Global teardown that runs once after all tests
 * Used for cleanup and reporting
 */
declare function globalTeardown(config: FullConfig): Promise<void>;
export default globalTeardown;
//# sourceMappingURL=global-teardown.d.ts.map