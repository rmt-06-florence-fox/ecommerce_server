const {decoded} = require('../helper/jsonwebtoken')
const {User} = require('../models')

module.exports = async (req,res,next) => {

  try {
    if (req.headers.access_token) {
      const {access_token} = req.headers
      const decode = decoded(access_token)
      const found = await User.findOne({where : {id : decode.id}})
      if (found) {
        req.UserLogin = decode
        next()
      } else {
        throw {
          status : 401,
          message : 'you must login first'
        }
      }
    } else {
      throw {
        status : 401,
        message : 'you must login first'
      }
    }
  } catch (error) {
    next(error)
  }
}