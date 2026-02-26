import { Page, Locator } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';
/**
 * AlertComponent - Reusable component for handling different types of alerts
 * Supports both SweetAlert2 and custom alert implementations
 */
export declare class AlertComponent extends BasePage {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Get alert locators based on alert type
     */
    private getAlertLocators;
    /**
     * Auto-detect alert type based on what's present on the page
     */
    private detectAlertType;
    /**
     * Assert client creation success alert with auto-detection
     */
    assertClientCreationSuccessAlert(expectedTitle?: string, expectedMessage?: string, alertType?: 'sweetAlert2' | 'customAlert' | 'legacySweetAlert'): Promise<void>;
    /**
     * Click OK button on success alert with auto-detection
     */
    clickSuccessAlertOkButton(alertType?: 'sweetAlert2' | 'customAlert' | 'legacySweetAlert'): Promise<void>;
    /**
     * Complete alert handling workflow (assert + dismiss)
     */
    handleClientCreationSuccessAlert(expectedTitle?: string, expectedMessage?: string, alertType?: 'sweetAlert2' | 'customAlert' | 'legacySweetAlert'): Promise<void>;
    /**
     * Get alert locators for external use (maintains backward compatibility)
     */
    getAlertElements(alertType: 'sweetAlert2' | 'customAlert' | 'legacySweetAlert'): {
        container: Locator;
        successIcon: Locator;
        title: Locator;
        message: Locator;
        okButton: Locator;
    };
}
//# sourceMappingURL=AlertComponent.d.ts.map