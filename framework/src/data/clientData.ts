//framework/src/data/clientData.ts
type ClientDataObject = {
  forename: string;
  middleName: string;
  surname: string;
  servicingTypeId: string;
};

const client1: ClientDataObject = {
  forename: process.env.CLIENT_ONE_FORENAME || 'Test',
  middleName: process.env.CLIENT_ONE_MIDDLENAME || 'James',
  surname: process.env.CLIENT_ONE_SURNAME || 'Client mMoJchjsOEbXeZCSHR',
  servicingTypeId: '11',

};
const client2: ClientDataObject = {
  forename: process.env.CLIENT_TWO_FORENAME || 'Test',
  middleName: ' ',
  surname: process.env.CLIENT_TWO_SURNAME || 'Joint Client mMoJchjsOEbXeZCSHR',
  servicingTypeId: '11',
};

export { ClientDataObject, client1, client2 };
