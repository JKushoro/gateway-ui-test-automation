// utils/generators/formGenerator.ts
import { FormTypes } from '../interfaces/formTypes';
import {
    getFirstName,
    getLastName,
    getEmail,
    getPhoneNumber,
    getSentence,
    getParagraph,
} from '../dataGenerator';


export function generateForm(overrides: Partial<FormTypes> = {}): FormTypes {
    return {
        name: `${getFirstName()} ${getLastName()}`,
        email: getEmail(),
        phone: getPhoneNumber(),
        subject: getSentence(),
        message: getParagraph(),
        ...overrides,
    };
}
