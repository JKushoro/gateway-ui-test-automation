"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client2 = exports.client1 = void 0;
const client1 = {
    forename: process.env.CLIENT_ONE_FORENAME || 'Test',
    middleName: process.env.CLIENT_ONE_MIDDLENAME || 'James',
    surname: process.env.CLIENT_ONE_SURNAME || 'Client JKmMoJchjsOEbXeZCSHR',
    servicingTypeId: '11',
};
exports.client1 = client1;
const client2 = {
    forename: process.env.CLIENT_TWO_FORENAME || 'Test',
    middleName: ' ',
    surname: process.env.CLIENT_TWO_SURNAME || 'Joint Client mMoJchjsOEbXeZCSHR',
    servicingTypeId: '11',
};
exports.client2 = client2;
//# sourceMappingURL=clientData.js.map