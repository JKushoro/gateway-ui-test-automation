import { PlaywrightTestConfig } from '@playwright/test';
/**
 * PlaywrightConfigBuilder - Clean, reusable Playwright configuration
 * Works with any browser and provides standardized settings
 */
export declare class PlaywrightConfigBuilder {
    /**
     * Build standard Playwright configuration
     */
    static buildConfig(projectSpecificConfig?: Partial<PlaywrightTestConfig>): PlaywrightTestConfig;
    /**
     * Quick config for projects
     */
    static quickConfig(projectName: string): PlaywrightTestConfig;
}
//# sourceMappingURL=PlaywrightConfigBuilder.d.ts.map