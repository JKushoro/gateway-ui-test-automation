import { Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';
export declare class AlertService extends BasePage {
    private readonly alert;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Waits for a visible alert, optionally asserts title/message,
     * clicks the button by exact text, then waits for dismissal.
     */
    handleAlertByButton(buttonText: string, expectedTitle?: string, expectedMessage?: string): Promise<void>;
    /** Convenience: “Client Created” */
    handleClientCreationSuccessAlert(buttonText: string): Promise<void>;
    /** Convenience: “Enable client for new fact find?” */
    handleEnableClientForNewFactFind(buttonText: string): Promise<void>;
}
//# sourceMappingURL=AlertService.d.ts.map