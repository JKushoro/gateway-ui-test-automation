export type Environment = 'development' | 'qa' | 'production';
export type SupportedBrowser = 'chromium' | 'chrome' | 'firefox' | 'webkit' | 'safari' | 'edge' | 'msedge';
export interface EnvironmentConfig {
    baseUrl: string;
    apiUrl: string;
    timeout: number;
    headless: boolean;
    browser: string;
    slowMo: number;
    testUsername: string;
    testPassword: string;
    enableScreenshots: boolean;
    enableVideo: boolean;
    enableTrace: boolean;
}
interface EnvironmentDefaults {
    timeout: number;
    headless: boolean;
    browser: SupportedBrowser;
    slowMo: number;
    enableScreenshots: boolean;
    enableVideo: boolean;
    enableTrace: boolean;
}
export declare class EnvManager {
    private static instance;
    private readonly config;
    private readonly environment;
    private readonly supportedBrowsers;
    private readonly environmentDefaults;
    private constructor();
    static getInstance(): EnvManager;
    static reset(): void;
    private getEnvironment;
    private loadEnvironmentConfig;
    private parseConfig;
    private getRequiredEnvVar;
    private getEnvVar;
    private validateBrowser;
    getConfig(): EnvironmentConfig;
    getCurrentEnvironment(): Environment;
    getBaseUrl(): string;
    getApiUrl(): string;
    getTimeout(): number;
    isHeadless(): boolean;
    getBrowser(): string;
    getSlowMo(): number;
    getTestCredentials(): {
        username: string;
        password: string;
    };
    shouldEnableScreenshots(): boolean;
    shouldEnableVideo(): boolean;
    shouldEnableTrace(): boolean;
    isDevelopment(): boolean;
    isQA(): boolean;
    isProduction(): boolean;
    getEnvironmentDefaults(): EnvironmentDefaults;
    getSupportedBrowsers(): SupportedBrowser[];
}
export declare const envManager: EnvManager;
export {};
//# sourceMappingURL=EnvManager.d.ts.map