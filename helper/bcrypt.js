const bcrypt = require('bcryptjs')

let hash = value => {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(value, salt);
}

let compared = (value, hashed) => {
  return bcrypt.compareSync(value, hashed);
}

module.exports = {hash, compared}