const bcrypt = require('bcryptjs')

function hash(password) {
  const salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(password, salt);
}

function compare(plainPass, hashPass) {
  return bcrypt.compareSync(plainPass, hashPass)
}

module.exports = {
  hash,
  compare
}