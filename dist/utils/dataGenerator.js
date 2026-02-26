"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirstName = getFirstName;
exports.getLastName = getLastName;
exports.getAge = getAge;
exports.getEmail = getEmail;
exports.getPhoneNumber = getPhoneNumber;
exports.getFullAddress = getFullAddress;
exports.getSentence = getSentence;
exports.getParagraph = getParagraph;
exports.numberAndString = numberAndString;
exports.generateTwoOrThreeDigitNumber = generateTwoOrThreeDigitNumber;
// utils/dataGenerator.ts
// import { faker } from "@faker-js/faker";
const faker_1 = require("@faker-js/faker");
function getFirstName() {
    return faker_1.fakerEN_GB.person.firstName();
}
function getLastName() {
    return faker_1.fakerEN_GB.person.lastName();
}
function getAge(min = 18, max = 80) {
    return faker_1.fakerEN_GB.number.int({ min, max });
}
function getEmail() {
    return faker_1.fakerEN_GB.internet.email();
}
function getPhoneNumber() {
    const prefixes = ['071', '072', '073', '074', '075', '077', '078', '079'];
    const prefix = faker_1.fakerEN_GB.helpers.arrayElement(prefixes);
    const number = faker_1.fakerEN_GB.number.int({ min: 10000000, max: 99999999 }).toString();
    return `${prefix}${number}`;
}
function getFullAddress() {
    return `${faker_1.fakerEN_GB.location.streetAddress()}, ${faker_1.fakerEN_GB.location.city()}, ${faker_1.fakerEN_GB.location.zipCode()}`;
}
function getSentence() {
    return faker_1.fakerEN_GB.lorem.sentence();
}
function getParagraph() {
    return faker_1.fakerEN_GB.lorem.paragraph();
}
function numberAndString() {
    const numberPart = faker_1.fakerEN_GB.number.int({ min: 100, max: 999 });
    const letterPart = faker_1.fakerEN_GB.string.alpha({ length: 1, casing: 'upper' });
    return `${numberPart}${letterPart}`;
}
function generateTwoOrThreeDigitNumber() {
    return faker_1.fakerEN_GB.number.int({ min: 10, max: 999 }).toString();
}
//# sourceMappingURL=dataGenerator.js.map