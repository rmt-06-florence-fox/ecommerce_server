const jwt = require('jsonwebtoken')

class JwtHelper{
  static encode(obj){
    return jwt.sign(obj, process.env.SECRET)
  }

  static decode(token){
    return jwt.verify(token, process.env.SECRET)
  }
}


module.exports = JwtHelper