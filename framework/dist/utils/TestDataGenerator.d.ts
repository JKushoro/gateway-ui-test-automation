/**
 * Test Data Generator (class-based)
 * Provides static helpers for generating common fake test data
 */
export declare class TestDataGenerator {
    static firstName(): string;
    static lastName(): string;
    static fullName(): string;
    static email(opts?: {
        first?: string;
        last?: string;
        domain?: string;
    }): string;
    static phone(): string;
    static landlineUk(): string;
    static companyName(): string;
    static streetAddress(): string;
    static city(): string;
    static state(): string;
    static postcode(): string;
    static country(): string;
    static todayDdMmYyyy(): string;
    static generateBusiness(): {
        name: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        postcode: string;
    };
}
//# sourceMappingURL=TestDataGenerator.d.ts.map