const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../configs/jwt');


createHash = password =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);


createToken = userId => {
  const token = jwt.sign({
    userId,
    expiresIn: '1d'
  }, config.secretKey);
    return 'bearer '+ token;
};

module.exports = {
  createHash,
  isValidPassword,
  createToken
}
