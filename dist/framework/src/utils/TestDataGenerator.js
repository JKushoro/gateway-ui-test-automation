"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestDataGenerator = void 0;
// framework/src/utils/TestDataGenerator.ts
const faker_1 = require("@faker-js/faker");
const real_uk_postcodes_json_1 = __importDefault(require("../data/real-uk-postcodes.json")); // string[]
class TestDataGenerator {
    // ---------- Private helpers ----------
    static alphaOnly(s) {
        return s.replace(/[^a-zA-Z]/g, '');
    }
    static nonEmpty(producer, isEmpty) {
        let v = producer();
        while (isEmpty(v))
            v = producer();
        return v;
    }
    static randomArrayItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    // ---------- Timing helpers (kept for backwards compatibility) ----------
    static async delay(ms = 100) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    static async generateWithDelay(generator, delayMs = 50) {
        await this.delay(delayMs);
        return generator();
    }
    // ---------- Basic generators ----------
    static firstName() {
        return this.nonEmpty(() => this.alphaOnly(faker_1.fakerEN_GB.person.firstName()), v => v.length === 0);
    }
    static lastName() {
        return this.nonEmpty(() => this.alphaOnly(faker_1.fakerEN_GB.person.lastName()), v => v.length === 0);
    }
    static fullName() {
        return faker_1.fakerEN_GB.person.fullName();
    }
    /**
     * Canonical reusable name generator
     * - Uses provided values if supplied
     * - Falls back to faker-generated names if not
     * - Used by Retail, KYC, Dependants, etc.
     */
    static personName(forename, surname) {
        return {
            forename: forename ?? this.firstName(),
            surname: surname ?? this.lastName(),
        };
    }
    static email(opts) {
        if (opts?.first && opts?.last) {
            const local = `${opts.first}.${opts.last}`.toLowerCase().replace(/[^a-z0-9.]+/g, '');
            const domain = (opts.domain ?? 'example.com').toLowerCase();
            return `${local}@${domain}`;
        }
        return faker_1.fakerEN_GB.internet.email();
    }
    // ---------- Phone / postcode ----------
    static mobileUk() {
        return '07' + faker_1.fakerEN_GB.string.numeric(9);
    }
    static postcodeFake() {
        return faker_1.fakerEN_GB.location.zipCode();
    }
    static postcodeReal() {
        return this.randomArrayItem(real_uk_postcodes_json_1.default);
    }
    // ---------- Back-compat aliases ----------
    static phone() {
        return this.mobileUk();
    }
    static postcode() {
        return this.postcodeReal();
    }
    static state() {
        return this.county();
    }
    static landlineUk() {
        const prefix = faker_1.fakerEN_GB.helpers.arrayElement(['01', '02']);
        return prefix + faker_1.fakerEN_GB.string.numeric(9);
    }
    static companyName() {
        return faker_1.fakerEN_GB.company.name();
    }
    static street() {
        return faker_1.fakerEN_GB.location.street();
    }
    static streetAddress() {
        return `${faker_1.fakerEN_GB.location.buildingNumber()} ${faker_1.fakerEN_GB.location.street()}`;
    }
    static city() {
        return faker_1.fakerEN_GB.location.city();
    }
    static county() {
        return faker_1.fakerEN_GB.location.county();
    }
    static country() {
        return 'United Kingdom';
    }
    static occupation() {
        return faker_1.fakerEN_GB.person.jobTitle();
    }
    static employer() {
        return faker_1.fakerEN_GB.company.name();
    }
    static shortText(maxLength = 20) {
        return faker_1.fakerEN_GB.lorem.words(3).slice(0, maxLength);
    }
    static randomNumericString(length = 6) {
        return faker_1.fakerEN_GB.string.numeric(length);
    }
    // ---------- Async generators ----------
    static async firstNameAsync(delayMs = 50) {
        return this.generateWithDelay(() => this.firstName(), delayMs);
    }
    static async lastNameAsync(delayMs = 50) {
        return this.generateWithDelay(() => this.lastName(), delayMs);
    }
    static async emailAsync(opts, delayMs = 50) {
        return this.generateWithDelay(() => this.email(opts), delayMs);
    }
    static async phoneAsync(delayMs = 50) {
        return this.generateWithDelay(() => this.phone(), delayMs);
    }
    static async companyNameAsync(delayMs = 50) {
        return this.generateWithDelay(() => this.companyName(), delayMs);
    }
    static async occupationAsync(delayMs = 50) {
        return this.generateWithDelay(() => this.occupation(), delayMs);
    }
    static async employerAsync(delayMs = 50) {
        return this.generateWithDelay(() => this.employer(), delayMs);
    }
    // ---------- Numbers ----------
    static randomNumber() {
        return faker_1.fakerEN_GB.number.int({ min: 30, max: 500 });
    }
    // ---------- Dates ----------
    static todayDdMmYyyy() {
        const d = new Date();
        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const yyyy = d.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
    }
    // ---------- Composite ----------
    static generateBusiness() {
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
    static generateUKAddress(options) {
        const useReal = options?.useRealPostcode ?? true;
        const useBuildingName = Math.random() < 0.15;
        const buildingNumber = useBuildingName ? '' : faker_1.fakerEN_GB.location.buildingNumber();
        const buildingName = useBuildingName ? faker_1.fakerEN_GB.company.name() : undefined;
        const street = this.street();
        const locality = Math.random() < 0.3 ? faker_1.fakerEN_GB.location.secondaryAddress() : undefined;
        const town = this.city();
        let county = this.county();
        if (!county || county.trim().length === 0) {
            county = faker_1.fakerEN_GB.helpers.arrayElement([
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
    static seed(seed) {
        faker_1.fakerEN_GB.seed(seed);
    }
}
exports.TestDataGenerator = TestDataGenerator;
//# sourceMappingURL=TestDataGenerator.js.map