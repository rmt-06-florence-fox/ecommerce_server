const bcrypt = require('bcryptjs')

let hash = value => {
  var salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(value, salt);
}

let compared = (value, hashed) => {
  return bcrypt.compareSync(value, hashed);
}

module.exports = {hash, compared}