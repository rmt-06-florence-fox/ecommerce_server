const JwtHelper = require('../helpers/jwtHelper')
const { User } = require('../models')
const PassHelper = require('../helpers/passHelper')

class UserController{
  static async login(req, res, next){
    try {
      if(!req.body.email && !req.body.password){
        throw {status : 400, message : "field can not be empty"}
      }
      const user = await User.findOne({
        where : {
          email : req.body.email
        }
      })
      if(!user){
        throw {status : 404, message : "email is not registered yet"}
      }
      if(user && PassHelper.passCompare(req.body.password, user.password)){
        // console.log('masuk');
        res.status(200).json({access_token : JwtHelper.encode({ 
          id : user.id,
          email :  user.email
         })})
      }else throw {status : 400, message : "invalid"}
    } catch (error) {
      next(error)
    }
  }

}

module.exports = UserController