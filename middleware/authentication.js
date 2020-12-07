const Helper = require('../helpers/helper')
const { User } = require('../models')

module.exports= async(req, res, next) => {
  try{
    const { access_token } = req.headers
    if(access_token){
      const decoded = Helper.verifyToken(access_token)
      const user = await User.findOne({
        where: { id: decoded.id }
      })
      if (user){
        req.loginUser = decoded
        next()
      }else{
        throw {
          status: 401,
          message: 'Please Login First !'
        }
      }
    }else{
      throw {
        status: 401,
        message: 'Please Login First !'
      }
    }
  }catch(err){
    next(err)
  } 
}