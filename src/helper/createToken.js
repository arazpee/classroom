const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (id) => {
  const token = jwt.sign({ id: id }, config.secret);
  return token;
}
