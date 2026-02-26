// framework/src/utils/TestDataGenerator.ts
import { fakerEN_GB as faker } from '@faker-js/faker';
import realUkPostcodes from '../data/real-uk-postcodes.json'; // string[]

// ---------- Types ----------
export type UKAddress = {
  buildingNumber: string;
  buildingName?: string;
  street: string;
  locality?: string; // district / line2
  town: string;
  county?: string;
  postcode: string;
  country?: string; // 'United Kingdom'
  fullAddress: string;
};

export type PersonName = {
  forename: string;
  surname: string;
};

export class TestDataGenerator {
  // ---------- Private helpers ----------
  private static alphaOnly(s: string): string {
    return s.replace(/[^a-zA-Z]/g, '');
  }

  private static nonEmpty<T>(producer: () => T, isEmpty: (v: T) => boolean): T {
    let v = producer();
    while (isEmpty(v)) v = producer();
    return v;
  }

  private static randomArrayItem<T>(arr: readonly T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // ---------- Timing helpers (kept for backwards compatibility) ----------
  private static async delay(ms: number = 100): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private static async generateWithDelay<T>(generator: () => T, delayMs: number = 50): Promise<T> {
    await this.delay(delayMs);
    return generator();
  }

  // ---------- Basic generators ----------
  static firstName(): string {
    return this.nonEmpty(
      () => this.alphaOnly(faker.person.firstName()),
      v => v.length === 0
    );
  }

  static lastName(): string {
    return this.nonEmpty(
      () => this.alphaOnly(faker.person.lastName()),
      v => v.length === 0
    );
  }

  static fullName(): string {
    return faker.person.fullName();
  }

  /**
   * Canonical reusable name generator
   * - Uses provided values if supplied
   * - Falls back to faker-generated names if not
   * - Used by Retail, KYC, Dependants, etc.
   */
  static personName(forename?: string, surname?: string): PersonName {
    return {
      forename: forename ?? this.firstName(),
      surname: surname ?? this.lastName(),
    };
  }

  static email(opts?: { first?: string; last?: string; domain?: string }): string {
    if (opts?.first && opts?.last) {
      const local = `${opts.first}.${opts.last}`.toLowerCase().replace(/[^a-z0-9.]+/g, '');
      const domain = (opts.domain ?? 'example.com').toLowerCase();
      return `${local}@${domain}`;
    }
    return faker.internet.email();
  }

  // ---------- Phone / postcode ----------
  static mobileUk(): string {
    return '07' + faker.string.numeric(9);
  }

  static postcodeFake(): string {
    return faker.location.zipCode();
  }

  static postcodeReal(): string {
    return this.randomArrayItem(realUkPostcodes);
  }

  // ---------- Back-compat aliases ----------
  static phone(): string {
    return this.mobileUk();
  }

  static postcode(): string {
    return this.postcodeReal();
  }

  static state(): string {
    return this.county();
  }

  static landlineUk(): string {
    const prefix = faker.helpers.arrayElement(['01', '02']);
    return prefix + faker.string.numeric(9);
  }

  static companyName(): string {
    return faker.company.name();
  }

  static street(): string {
    return faker.location.street();
  }

  static streetAddress(): string {
    return `${faker.location.buildingNumber()} ${faker.location.street()}`;
  }

  static city(): string {
    return faker.location.city();
  }

  static county(): string {
    return faker.location.county();
  }

  static country(): string {
    return 'United Kingdom';
  }

  static occupation(): string {
    return faker.person.jobTitle();
  }

  static employer(): string {
    return faker.company.name();
  }

  static shortText(maxLength: number = 20): string {
    return faker.lorem.words(3).slice(0, maxLength);
  }

  static randomNumericString(length = 6): string {
    return faker.string.numeric(length);
  }

  // ---------- Async generators ----------
  static async firstNameAsync(delayMs: number = 50): Promise<string> {
    return this.generateWithDelay(() => this.firstName(), delayMs);
  }

  static async lastNameAsync(delayMs: number = 50): Promise<string> {
    return this.generateWithDelay(() => this.lastName(), delayMs);
  }

  static async emailAsync(
    opts?: { first?: string; last?: string; domain?: string },
    delayMs: number = 50
  ): Promise<string> {
    return this.generateWithDelay(() => this.email(opts), delayMs);
  }

  static async phoneAsync(delayMs: number = 50): Promise<string> {
    return this.generateWithDelay(() => this.phone(), delayMs);
  }

  static async companyNameAsync(delayMs: number = 50): Promise<string> {
    return this.generateWithDelay(() => this.companyName(), delayMs);
  }

  static async occupationAsync(delayMs: number = 50): Promise<string> {
    return this.generateWithDelay(() => this.occupation(), delayMs);
  }

  static async employerAsync(delayMs: number = 50): Promise<string> {
    return this.generateWithDelay(() => this.employer(), delayMs);
  }

  // ---------- Numbers ----------
  static randomNumber(): number {
    return faker.number.int({ min: 30, max: 500 });
  }

  // ---------- Dates ----------
  static todayDdMmYyyy(): string {
    const d = new Date();
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }

  // ---------- Composite ----------
  static generateBusiness(): {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postcode: string;
  } {
    const name = this.companyName();
    return {
      name,
      email: this.email(),
      phone: this.phone(),
      address: this.streetAddress(),
      city: this.city(),
      postcode: this.postcode(),
    };
  }

  static generateUKAddress(options?: { useRealPostcode?: boolean }): UKAddress {
    const useReal = options?.useRealPostcode ?? true;

    const useBuildingName = Math.random() < 0.15;
    const buildingNumber = useBuildingName ? '' : faker.location.buildingNumber();
    const buildingName = useBuildingName ? faker.company.name() : undefined;

    const street = this.street();
    const locality = Math.random() < 0.3 ? faker.location.secondaryAddress() : undefined;
    const town = this.city();

    let county = this.county();
    if (!county || county.trim().length === 0) {
      county = faker.helpers.arrayElement([
        'Greater London',
        'West Midlands',
        'Merseyside',
        'Tyne and Wear',
        'West Yorkshire',
        'Hampshire',
        'Lancashire',
        'Surrey',
      ]);
    }

    const postcode = useReal ? this.postcodeReal() : this.postcodeFake();

    const parts = [
      buildingName || buildingNumber,
      street,
      locality,
      town,
      county,
      postcode,
      'United Kingdom',
    ].filter(Boolean);

    return {
      buildingNumber,
      buildingName,
      street,
      locality,
      town,
      county,
      postcode,
      country: 'United Kingdom',
      fullAddress: parts.join(', '),
    };
  }

  // ---------- Utilities ----------
  static seed(seed: number): void {
    faker.seed(seed);
  }
}
