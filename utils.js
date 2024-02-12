const Ajv = require('ajv');
const ajv = new Ajv();

ajv.addFormat('email', (data) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(data);
});

const validateEmail = (data) => {
  return ajv.validate({ format: 'email' }, data);
};

module.exports = {
  validateEmail
};