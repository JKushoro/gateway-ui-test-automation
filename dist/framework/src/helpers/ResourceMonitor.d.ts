export declare class ResourceMonitor {
    private intervalId;
    /** Returns CPU usage as a percentage (averaged across all cores). */
    private static getCpuUsage;
    /** Formats bytes into a human-readable string (MB / GB). */
    private static formatBytes;
    /** Starts logging CPU and RAM usage every `intervalMs` (default 10 000 ms). */
    start(intervalMs?: number): void;
    /** Stops the monitor. */
    stop(): void;
}
//# sourceMappingURL=ResourceMonitor.d.ts.map