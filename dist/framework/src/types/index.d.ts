/**
 * 🎯 Framework Type Definitions
 *
 * This file contains all core type definitions following SOLID principles:
 * - Single Responsibility: Each interface has one clear purpose
 * - Interface Segregation: Small, focused interfaces that clients actually need
 * - Open/Closed: Extensible through composition and inheritance
 *
 * @fileoverview Core framework types for test automation
 * @author Framework Team
 * @since 1.0.0
 */
/**
 * Base configuration interface for the framework
 *
 * @example
 * ```typescript
 * const config: FrameworkConfig = {
 *   timeout: 30000,
 *   slowMo: 100
 * };
 * ```
 */
export interface FrameworkConfig {
    /** Default timeout for operations in milliseconds */
    readonly timeout: number;
    /** Slow motion delay between actions in milliseconds */
    readonly slowMo?: number;
}
/**
 * Extended configuration with environment-specific settings
 */
export interface ExtendedFrameworkConfig extends FrameworkConfig {
    /** Environment name (qa, dev, staging, prod) */
    readonly environment: Environment;
    /** Base URL for the application */
    readonly baseUrl: string;
    /** Whether to run tests in headless mode */
    readonly headless: boolean;
    /** Browser viewport configuration */
    readonly viewport: ViewportConfig;
}
/**
 * Viewport configuration for browser testing
 */
export interface ViewportConfig {
    /** Viewport width in pixels */
    readonly width: number;
    /** Viewport height in pixels */
    readonly height: number;
}
/**
 * Base options for waiting operations
 *
 * @example
 * ```typescript
 * const options: WaitOptions = {
 *   timeout: 5000,
 *   force: false
 * };
 * ```
 */
export interface WaitOptions {
    /** Timeout for the operation in milliseconds */
    readonly timeout?: number;
    /** Whether to force the action even if element is not ready */
    readonly force?: boolean;
}
/**
 * Options for general UI actions (typing, filling forms, etc.)
 */
export interface ActionOptions extends WaitOptions {
    /** Whether to clear the field before performing action */
    readonly clear?: boolean;
    /** Whether to trigger change events */
    readonly triggerChange?: boolean;
}
/**
 * Options for click operations
 */
export interface ClickOptions extends WaitOptions {
    /** Mouse button to use for clicking */
    readonly button?: MouseButton;
    /** Number of clicks to perform */
    readonly clickCount?: number;
    /** Delay between clicks in milliseconds */
    readonly delay?: number;
    /** Position relative to element to click */
    readonly position?: ClickPosition;
}
/**
 * Options for dropdown/select operations
 */
export interface SelectOptions extends WaitOptions {
    /** Whether to match text exactly */
    readonly exact?: boolean;
    /** Whether to match by value instead of text */
    readonly byValue?: boolean;
}
/**
 * Options for file upload operations
 */
export interface UploadOptions extends WaitOptions {
    /** Whether to accept multiple files */
    readonly multiple?: boolean;
    /** Allowed file types */
    readonly acceptedTypes?: readonly string[];
}
/**
 * Options for navigation operations
 */
export interface NavigationOptions extends WaitOptions {
    /** Whether to wait for page load */
    readonly waitForLoad?: boolean;
    /** URL parameters to append */
    readonly params?: Record<string, string>;
}
/**
 * Standard result interface for operations that can succeed or fail
 *
 * @template T - Type of the success data
 *
 * @example
 * ```typescript
 * const result: OperationResult<User> = {
 *   success: true,
 *   data: { id: '123', name: 'John Doe' },
 *   timestamp: new Date()
 * };
 * ```
 */
export interface OperationResult<T = unknown> {
    /** Whether the operation succeeded */
    readonly success: boolean;
    /** Data returned on success */
    readonly data?: T;
    /** Error message on failure */
    readonly error?: string;
    /** Error code for programmatic handling */
    readonly errorCode?: string;
    /** When the operation completed */
    readonly timestamp: Date;
}
/**
 * Validation result interface
 */
export interface ValidationResult {
    /** Whether validation passed */
    readonly isValid: boolean;
    /** List of validation errors */
    readonly errors: readonly ValidationError[];
    /** List of validation warnings */
    readonly warnings?: readonly ValidationWarning[];
}
/**
 * Individual validation error
 */
export interface ValidationError {
    /** Field that failed validation */
    readonly field: string;
    /** Error message */
    readonly message: string;
    /** Error code for programmatic handling */
    readonly code: string;
}
/**
 * Individual validation warning
 */
export interface ValidationWarning {
    /** Field with warning */
    readonly field: string;
    /** Warning message */
    readonly message: string;
    /** Warning code */
    readonly code: string;
}
/**
 * Supported mouse buttons for click operations
 */
export type MouseButton = 'left' | 'right' | 'middle';
/**
 * Click position relative to element
 */
export type ClickPosition = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
/**
 * Supported environments
 */
export type Environment = 'qa' | 'dev' | 'staging' | 'prod';
/**
 * Log levels for the framework
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
/**
 * Test execution status
 */
export type TestStatus = 'pending' | 'running' | 'passed' | 'failed' | 'skipped';
/**
 * Makes all properties of T optional and readonly
 */
export type PartialReadonly<T> = Partial<Readonly<T>>;
/**
 * Extracts the return type of a Promise
 */
export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
/**
 * Creates a type with required properties from T
 */
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
/**
 * Creates a type with optional properties from T
 */
export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
/**
 * @deprecated Use FrameworkConfig instead
 * @todo Remove in v2.0.0
 */
export type Config = FrameworkConfig;
/**
 * @deprecated Use ActionOptions instead
 * @todo Remove in v2.0.0
 */
export type InputOptions = ActionOptions;
//# sourceMappingURL=index.d.ts.map