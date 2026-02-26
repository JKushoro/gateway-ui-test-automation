import { Page } from '@playwright/test';
import { KYCHelper } from '@/framework/src';
import { FrameworkConfig } from '@framework/types';
/**
 * Base class for KYC form steps with common functionality
 * Now extends KYCHelper to reduce duplication
 */
export declare class BaseKYCSteps extends KYCHelper {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Persist key/value pairs under a prefix in the data store
     */
    protected persist(prefix: string, obj: Record<string, unknown>): void;
}
//# sourceMappingURL=BaseKYCSteps.d.ts.map