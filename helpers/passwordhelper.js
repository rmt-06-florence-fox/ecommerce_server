const bcrypt = require('bcryptjs')

function hashPwd(password) {
  const salt = bcrypt.genSaltSync(+process.env.SALT)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

function comparePwd(password, hashPassword) {
  return bcrypt.compareSync(password, hashPassword)
}

module.exports = { hashPwd, comparePwd }