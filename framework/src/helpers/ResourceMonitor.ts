import * as os from "os";

export class ResourceMonitor {
  private intervalId: any = null;

  /** Returns CPU usage as a percentage (averaged across all cores). */
  private static async getCpuUsage(): Promise<number> {
    const startCpus = os.cpus();

    await new Promise((resolve) => setTimeout(resolve, 500));

    const endCpus = os.cpus();
    let totalIdle = 0;
    let totalTick = 0;

    for (let i = 0; i < startCpus.length; i++) {
      const startTimes = startCpus[i].times;
      const endTimes = endCpus[i].times;

      const idle = endTimes.idle - startTimes.idle;
      const total =
        endTimes.user -
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
  private static formatBytes(bytes: number): string {
    if (bytes >= 1024 ** 3) {
      return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
    }
    return `${(bytes / 1024 ** 2).toFixed(0)} MB`;
  }

  /** Starts logging CPU and RAM usage every `intervalMs` (default 10 000 ms). */
  start(intervalMs = 10_000): void {
    if (this.intervalId) return;

    console.log(
      `[ResourceMonitor] Starting — logging every ${intervalMs / 1000}s`
    );

    const tick = async () => {
      const cpuPercent = await ResourceMonitor.getCpuUsage();
      const totalMem = os.totalmem();
      const freeMem = os.freemem();
      const usedMem = totalMem - freeMem;

      const timestamp = new Date().toISOString();

      console.log(
        `[ResourceMonitor] ${timestamp}  CPU: ${cpuPercent.toFixed(1)}%  |  RAM: ${ResourceMonitor.formatBytes(usedMem)} / ${ResourceMonitor.formatBytes(totalMem)} (${((usedMem / totalMem) * 100).toFixed(1)}% used)`
      );
    };

    // Fire immediately, then repeat on the interval.
    tick();
    this.intervalId = setInterval(tick, intervalMs);
  }

  /** Stops the monitor. */
  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log("[ResourceMonitor] Stopped");
    }
  }
}