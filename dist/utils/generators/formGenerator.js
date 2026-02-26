"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateForm = generateForm;
const dataGenerator_1 = require("../dataGenerator");
function generateForm(overrides = {}) {
    return {
        name: `${(0, dataGenerator_1.getFirstName)()} ${(0, dataGenerator_1.getLastName)()}`,
        email: (0, dataGenerator_1.getEmail)(),
        phone: (0, dataGenerator_1.getPhoneNumber)(),
        subject: (0, dataGenerator_1.getSentence)(),
        message: (0, dataGenerator_1.getParagraph)(),
        ...overrides,
    };
}
//# sourceMappingURL=formGenerator.js.map