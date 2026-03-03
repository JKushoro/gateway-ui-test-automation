import { Page } from '@playwright/test';
/**
 * Gateway search form data structure
 * Used for tracking data generated from gateway forms
 */
export type GatewaySearchFormData = {
    forename?: string;
    surname?: string;
    company?: string;
    email?: string;
};
/**
 * FormsService – UI interaction service for filling gateway forms
 * All data stored with 'gateway.' prefix for clear tracking and comparison with KYC data
 */
export declare class FormsService {
    private readonly page;
    private readonly formsComponent;
    private readonly datePicker;
    private readonly action;
    constructor(page: Page);
    /**
     * Generic search form filler for gateway forms
     * Stores data with 'gateway.' prefix for clear identification
     */
    searchMinimalForm(data?: GatewaySearchFormData, dataPrefix?: string): Promise<GatewaySearchFormData>;
    /** Set date field to today using DatePicker service */
    setDateToday(locatorGetter: () => any): Promise<string>;
}
//# sourceMappingURL=Forms.d.ts.map