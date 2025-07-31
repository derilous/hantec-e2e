// generate user data for the tests
const { faker } = require('@faker-js/faker');

function generateUserData() {
  const rawPhone = faker.number.int({ min: 1111111, max: 9999999 });
  const localPhone = '415' + rawPhone;

  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: localPhone,
  };
}

module.exports = { generateUserData };
