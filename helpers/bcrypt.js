const bcrypt= require('bcrypt')

function hashPassword(plain){
  const hash = bcrypt.hashSync(plain, process.env.SALT)
  return hash
}

function checkPassword(plain, hash){
  return bcrypt.compareSync(plain,hash)
}

module.exports = {
  hashPassword,
  checkPassword
}