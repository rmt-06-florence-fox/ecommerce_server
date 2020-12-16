const {decoded} = require('../helper/jwt')
const {User} = require('../models')

module.exports = async (req,res,next) => {

  try {
    if (req.headers.access_token) {
      const {access_token} = req.headers
      const decode = decoded(access_token)
      let userData = await User.findOne({where : {id : decode.id}})
      if (userData && userData.role == 'admin') {
        req.loggedInUser = decode
        next()
      } 
      else {
        throw {
          status : 401,
          message : `Please log in as admin`
        }
      }
    } 
    else {
      throw {
        status : 401,
        message : 'Please log in as admin'
      }
    }
  } 
  catch (error) {
    next(error)
  }
}