export type UKAddress = {
    buildingNumber: string;
    buildingName?: string;
    street: string;
    locality?: string;
    town: string;
    county?: string;
    postcode: string;
    country?: string;
    fullAddress: string;
};
export type PersonName = {
    forename: string;
    surname: string;
};
export declare class TestDataGenerator {
    private static alphaOnly;
    private static nonEmpty;
    private static randomArrayItem;
    private static delay;
    private static generateWithDelay;
    static firstName(): string;
    static lastName(): string;
    static fullName(): string;
    /**
     * Canonical reusable name generator
     * - Uses provided values if supplied
     * - Falls back to faker-generated names if not
     * - Used by Retail, KYC, Dependants, etc.
     */
    static personName(forename?: string, surname?: string): PersonName;
    static email(opts?: {
        first?: string;
        last?: string;
        domain?: string;
    }): string;
    static mobileUk(): string;
    static postcodeFake(): string;
    static postcodeReal(): string;
    static phone(): string;
    static postcode(): string;
    static state(): string;
    static landlineUk(): string;
    static companyName(): string;
    static street(): string;
    static streetAddress(): string;
    static city(): string;
    static county(): string;
    static country(): string;
    static occupation(): string;
    static employer(): string;
    static shortText(maxLength?: number): string;
    static randomNumericString(length?: number): string;
    static firstNameAsync(delayMs?: number): Promise<string>;
    static lastNameAsync(delayMs?: number): Promise<string>;
    static emailAsync(opts?: {
        first?: string;
        last?: string;
        domain?: string;
    }, delayMs?: number): Promise<string>;
    static phoneAsync(delayMs?: number): Promise<string>;
    static companyNameAsync(delayMs?: number): Promise<string>;
    static occupationAsync(delayMs?: number): Promise<string>;
    static employerAsync(delayMs?: number): Promise<string>;
    static randomNumber(): number;
    static todayDdMmYyyy(): string;
    static generateBusiness(): {
        name: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        postcode: string;
    };
    static generateUKAddress(options?: {
        useRealPostcode?: boolean;
    }): UKAddress;
    static seed(seed: number): void;
}
//# sourceMappingURL=TestDataGenerator.d.ts.map