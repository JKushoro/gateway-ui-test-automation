"use strict";
/**
 * Simple Logger utility for the automation framework
 * Supports optional chaining syntax: this.logger?.warn?.('message', error)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.Logger = void 0;
exports.createLogger = createLogger;
class Logger {
    constructor(context = 'Framework') {
        this.debug = (message, ...args) => {
            console.debug(`[${this.context}] ${message}`, ...args);
        };
        this.info = (message, ...args) => {
            console.info(`[${this.context}] ${message}`, ...args);
        };
        this.warn = (message, ...args) => {
            console.warn(`[${this.context}] ${message}`, ...args);
        };
        this.error = (message, ...args) => {
            console.error(`[${this.context}] ${message}`, ...args);
        };
        this.context = context;
    }
}
exports.Logger = Logger;
/**
 * Create a logger instance
 */
function createLogger(context) {
    return new Logger(context);
}
/**
 * Default logger instance
 */
exports.logger = new Logger('Framework');
//# sourceMappingURL=Logger.js.map