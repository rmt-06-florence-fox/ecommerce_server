const bcrypt= require('bcrypt')

function hashPassword(plain){
  const salt= bcrypt.genSaltSync(process.env.SALT)
  const hash= bcrypt.hashSync(plain, salt)
  return hash
}

function checkPassword(plain, hash){
  return bcrypt.compareSync(plain,hash)
}

module.exports = {
  hashPassword,
  checkPassword
}