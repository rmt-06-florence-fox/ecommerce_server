const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class Helper{
  static generatePassword(pass){
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(pass, salt)
    return hash
  }
  static verifyPassword(pass, hashPass){
    return bcrypt.compareSync(pass, hashPass)
  }
  static generateToken(payload){
    return jwt.sign(payload, process.env.JWT)
  }
  static verifyToken(payload){
    return jwt.verify(payload, process.env.JWT)
  }
}

module.exports = Helper