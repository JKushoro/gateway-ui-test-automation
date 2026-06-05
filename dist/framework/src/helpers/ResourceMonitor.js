"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceMonitor = void 0;
const os = __importStar(require("os"));
class ResourceMonitor {
    constructor() {
        this.intervalId = null;
    }
    /** Returns CPU usage as a percentage (averaged across all cores). */
    static async getCpuUsage() {
        const startCpus = os.cpus();
        await new Promise((resolve) => setTimeout(resolve, 500));
        const endCpus = os.cpus();
        let totalIdle = 0;
        let totalTick = 0;
        for (let i = 0; i < startCpus.length; i++) {
            const startTimes = startCpus[i].times;
            const endTimes = endCpus[i].times;
            const idle = endTimes.idle - startTimes.idle;
            const total = endTimes.user -
                startTimes.user +
                (endTimes.nice - startTimes.nice) +
                (endTimes.sys - startTimes.sys) +
                (endTimes.irq - startTimes.irq) +
                idle;
            totalIdle += idle;
            totalTick += total;
        }
        return totalTick === 0 ? 0 : ((1 - totalIdle / totalTick) * 100);
    }
    /** Formats bytes into a human-readable string (MB / GB). */
    static formatBytes(bytes) {
        if (bytes >= 1024 ** 3) {
            return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
        }
        return `${(bytes / 1024 ** 2).toFixed(0)} MB`;
    }
    /** Starts logging CPU and RAM usage every `intervalMs` (default 10 000 ms). */
    start(intervalMs = 10000) {
        if (this.intervalId)
            return;
        console.log(`[ResourceMonitor] Starting — logging every ${intervalMs / 1000}s`);
        const tick = async () => {
            const cpuPercent = await ResourceMonitor.getCpuUsage();
            const totalMem = os.totalmem();
            const freeMem = os.freemem();
            const usedMem = totalMem - freeMem;
            const timestamp = new Date().toISOString();
            console.log(`[ResourceMonitor] ${timestamp}  CPU: ${cpuPercent.toFixed(1)}%  |  RAM: ${ResourceMonitor.formatBytes(usedMem)} / ${ResourceMonitor.formatBytes(totalMem)} (${((usedMem / totalMem) * 100).toFixed(1)}% used)`);
        };
        // Fire immediately, then repeat on the interval.
        tick();
        this.intervalId = setInterval(tick, intervalMs);
    }
    /** Stops the monitor. */
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            console.log("[ResourceMonitor] Stopped");
        }
    }
}
exports.ResourceMonitor = ResourceMonitor;
//# sourceMappingURL=ResourceMonitor.js.map