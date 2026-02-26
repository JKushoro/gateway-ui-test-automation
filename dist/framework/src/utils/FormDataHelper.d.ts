/**
 * Test form data interface
 */
export interface TestFormData {
    firstName: string;
    lastName: string;
    companyName: string;
    email: string;
    phone: string;
    fullName: string;
    generatedAt: string;
}
/**
 * FormDataHelper - Utility for generating and managing test form data
 * Focused on data generation and storage, not UI interaction
 */
export declare class FormDataHelper {
    /**
     * Create TestFormData object from individual fields
     */
    private static createFormData;
    /**
     * Store form data in DataStore
     */
    private static storeFormData;
    /**
     * Generate and store a complete set of form data
     */
    static generateAndStore(prefix?: string): TestFormData;
    /**
     * Generate form data with custom overrides
     */
    static generateWithOverrides(overrides?: Partial<Pick<TestFormData, 'firstName' | 'lastName' | 'companyName' | 'email' | 'phone'>>, prefix?: string): TestFormData;
    /**
     * Retrieve stored form data
     */
    static getStoredData(prefix?: string): TestFormData | null;
    /**
     * Get a specific field from stored form data
     */
    static getField(field: string, prefix?: string): string | undefined;
    /**
     * Clear stored form data
     */
    static clearStoredData(prefix?: string): void;
}
//# sourceMappingURL=FormDataHelper.d.ts.map