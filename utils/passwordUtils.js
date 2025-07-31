// password generator
const { faker } = require('@faker-js/faker');

function generateInvalidPassword() {
  return faker.internet.password({ length: 6, memorable: true });
}

function generateValidPassword() {
  const specialChars = '~!@#$%^&*[?+';
  const getRandom = (chars) => chars[Math.floor(Math.random() * chars.length)];

  const schars = getRandom(specialChars);
  const base = faker.internet.password({ length: 12, pattern: /[a-zA-Z0-9]/ });
  const shuffled = base
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('');
  console.log(schars + shuffled);
  return schars + shuffled;
}

module.exports = {
  generateInvalidPassword,
  generateValidPassword,
};
