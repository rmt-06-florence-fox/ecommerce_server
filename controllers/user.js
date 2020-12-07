const JwtHelper = require('../helpers/jwtHelper')
const { User } = require('../models')
const PassHelper = require('../helpers/passHelper')

class UserController{
  static async login(req, res, next){
    try {
      const user = await User.findOne({
        where : {
          email : req.body.email
        }
      })
      // console.log(PassHelper.passCompare(req.body.password, user.password));
      if(user && PassHelper.passCompare(req.body.password, user.password)){
        console.log('masuk');
        res.status(200).json({access_token : JwtHelper.encode({ 
          id : user.id,
          email :  user.email,
          role : user.role
         })})
      }else throw {status : 400, message : "not found"}
    } catch (error) {
      next(error)
    }
  }

}

module.exports = UserController