"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestDataGenerator = void 0;
//framework/src/utils/TestDataGenerator.ts
const faker_1 = require("@faker-js/faker");
const real_uk_postcodes_json_1 = __importDefault(require("../data/real-uk-postcodes.json"));
/**
 * Test Data Generator (class-based)
 * Provides static helpers for generating common fake test data
 */
class TestDataGenerator {
    /* -------------------- Standalone atomic generators -------------------- */
    static firstName() {
        return faker_1.faker.person.firstName();
    }
    static lastName() {
        return faker_1.faker.person.lastName();
    }
    static fullName() {
        return faker_1.faker.person.fullName();
    }
    static email(opts) {
        if (opts?.first && opts?.last) {
            const local = `${opts.first}.${opts.last}`.toLowerCase().replace(/\s+/g, '');
            const domain = opts.domain ?? 'example.com';
            return `${local}@${domain}`;
        }
        return faker_1.faker.internet.email();
    }
    static phone() {
        return '07' + faker_1.faker.string.numeric(9);
    }
    static landlineUk() {
        const prefix = faker_1.faker.helpers.arrayElement(['01', '02']);
        return prefix + faker_1.faker.string.numeric(9);
    }
    static companyName() {
        return faker_1.faker.company.name();
    }
    static streetAddress() {
        return faker_1.faker.location.streetAddress();
    }
    static city() {
        return faker_1.faker.location.city();
    }
    static state() {
        return faker_1.faker.location.state();
    }
    static postcode() {
        return faker_1.faker.helpers.arrayElement(real_uk_postcodes_json_1.default);
    }
    static country() {
        return faker_1.faker.location.country();
    }
    /* -------------------- Date generators -------------------- */
    static todayDdMmYyyy() {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        return `${day}/${month}/${year}`;
    }
    /* -------------------- Composite generators -------------------- */
    static generateBusiness() {
        const name = this.companyName();
        return {
            name,
            email: this.email(),
            phone: this.phone(),
            address: this.streetAddress(),
            city: this.city(),
            postcode: this.postcode()
        };
    }
}
exports.TestDataGenerator = TestDataGenerator;
//# sourceMappingURL=TestDataGenerator.js.map