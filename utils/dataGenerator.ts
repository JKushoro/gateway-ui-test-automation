// utils/dataGenerator.ts
// import { faker } from "@faker-js/faker";
import { fakerEN_GB as faker } from '@faker-js/faker';


export function getFirstName(): string {
    return faker.person.firstName();
}

export function getLastName(): string {
    return faker.person.lastName();
}

export function getAge(min = 18, max = 80): number {
    return faker.number.int({ min, max });
}

export function getEmail(): string {
    return faker.internet.email();
}

export function getPhoneNumber(): string {
    const prefixes = ['071', '072', '073', '074', '075', '077', '078', '079'];
    const prefix = faker.helpers.arrayElement(prefixes);

    const number = faker.number.int({ min: 10000000, max: 99999999 }).toString();

    return `${prefix}${number}`;
}

export function getFullAddress(): string {
    return `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.zipCode()}`;
}

export function getSentence(): string {
    return faker.lorem.sentence();
}

export function getParagraph(): string {
    return faker.lorem.paragraph();
}

export function numberAndString(): string {
    const numberPart = faker.number.int({ min: 100, max: 999 });
    const letterPart = faker.string.alpha({ length: 1, casing: 'upper' });
    return `${numberPart}${letterPart}`;
}

export function generateTwoOrThreeDigitNumber(): string {
    return faker.number.int({ min: 10, max: 999 }).toString();
}