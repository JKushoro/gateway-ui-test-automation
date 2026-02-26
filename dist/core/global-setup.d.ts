import { FullConfig } from '@playwright/test';
/**
 * Global setup that runs once before all tests
 * Used for environment preparation and validation
 */
declare function globalSetup(config: FullConfig): Promise<void>;
export default globalSetup;
//# sourceMappingURL=global-setup.d.ts.map