//utils/generators/personGenerator.ts
import { getFirstName, getLastName, getEmail, getPhoneNumber } from '../dataGenerator';
import {Person} from "../interfaces/Person";

export function generatePerson(overrides: Partial<Person> = {}): Person {
    return {
        firstName: getFirstName(),
        lastName: getLastName(),
        email: getEmail(),
        phoneNumber: getPhoneNumber(),
        ...overrides,
    };
}
