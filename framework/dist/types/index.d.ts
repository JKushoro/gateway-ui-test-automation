/**
 * Framework Type Definitions
 * Centralized type definitions for the UI Automation Framework
 */
export type Environment = 'development' | 'qa' | 'production';
export type SupportedBrowser = 'chromium' | 'chrome' | 'firefox' | 'webkit' | 'safari' | 'edge' | 'msedge';
export interface FrameworkConfig {
    baseUrl: string;
    apiUrl?: string;
    timeout: number;
    headless: boolean;
    browser: SupportedBrowser;
    slowMo: number;
    enableScreenshots: boolean;
    enableVideo: boolean;
    enableTrace: boolean;
    retries?: number;
    workers?: number;
}
export interface TestCredentials {
    username: string;
    password: string;
}
export interface EnvironmentConfig extends FrameworkConfig {
    testUsername: string;
    testPassword: string;
}
export interface EnvironmentDefaults {
    timeout: number;
    headless: boolean;
    browser: SupportedBrowser;
    slowMo: number;
    enableScreenshots: boolean;
    enableVideo: boolean;
    enableTrace: boolean;
}
export interface WaitOptions {
    timeout?: number;
    force?: boolean;
}
export interface ActionOptions extends WaitOptions {
    clear?: boolean;
}
export interface ClickOptions extends WaitOptions {
    button?: 'left' | 'right' | 'middle';
    clickCount?: number;
    delay?: number;
}
export interface TypeOptions {
    delay?: number;
    timeout?: number;
}
export interface SelectOptions extends WaitOptions {
    exact?: boolean;
}
export interface AssertionOptions {
    timeout?: number;
    message?: string;
}
export interface ScreenshotOptions {
    path?: string;
    fullPage?: boolean;
    clip?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}
export interface ElementInfo {
    tagName: string;
    id: string;
    className: string;
    text: string;
    value: string;
    isVisible: boolean;
    isEnabled: boolean;
    isChecked?: boolean;
}
export interface BoundingBox {
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface Position {
    x: number;
    y: number;
}
export interface Size {
    width: number;
    height: number;
}
//# sourceMappingURL=index.d.ts.map