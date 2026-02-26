/**
 * Simple Logger utility for the automation framework
 * Supports optional chaining syntax: this.logger?.warn?.('message', error)
 */

/* eslint-disable no-console */
export interface ILogger {
  debug?: (message: string, ...args: any[]) => void;
  info?: (message: string, ...args: any[]) => void;
  warn?: (message: string, ...args: any[]) => void;
  error?: (message: string, ...args: any[]) => void;
}

export class Logger implements ILogger {
  private readonly context: string;

  constructor(context: string = 'Framework') {
    this.context = context;
  }

  debug = (message: string, ...args: any[]): void => {
    console.debug(`[${this.context}] ${message}`, ...args);
  };

  info = (message: string, ...args: any[]): void => {
    console.info(`[${this.context}] ${message}`, ...args);
  };

  warn = (message: string, ...args: any[]): void => {
    console.warn(`[${this.context}] ${message}`, ...args);
  };

  error = (message: string, ...args: any[]): void => {
    console.error(`[${this.context}] ${message}`, ...args);
  };
}

/**
 * Create a logger instance
 */
export function createLogger(context: string): Logger {
  return new Logger(context);
}

/**
 * Default logger instance
 */
export const logger = new Logger('Framework');