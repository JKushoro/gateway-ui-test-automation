/**
 * Simple Logger utility for the automation framework
 * Supports optional chaining syntax: this.logger?.warn?.('message', error)
 */
export interface ILogger {
    debug?: (message: string, ...args: any[]) => void;
    info?: (message: string, ...args: any[]) => void;
    warn?: (message: string, ...args: any[]) => void;
    error?: (message: string, ...args: any[]) => void;
}
export declare class Logger implements ILogger {
    private readonly context;
    constructor(context?: string);
    debug: (message: string, ...args: any[]) => void;
    info: (message: string, ...args: any[]) => void;
    warn: (message: string, ...args: any[]) => void;
    error: (message: string, ...args: any[]) => void;
}
/**
 * Create a logger instance
 */
export declare function createLogger(context: string): Logger;
/**
 * Default logger instance
 */
export declare const logger: Logger;
//# sourceMappingURL=Logger.d.ts.map