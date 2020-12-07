const {User} = require('../models')
const {compared} = require('../helper/bcrypt')
const { makeToken } = require('../helper/jsonwebtoken')


class UserController {
  static async adminLogin(req,res,next){
    try {
      const obj = {
        email : req.body.email,
        password : req.body.password
      }
      let data = await User.findOne({where: {email : obj.email}})
      if (data) {
        let makeCompared = compared(obj.password, data.password)
        if (makeCompared) {
          let inData = {
            id: data.id,
            email: data.email
          }
          let access_token = makeToken(inData)
          res.status(200).json({access_token})
        } else {
          throw {
            status : 401,
            message : 'invalid email/password'
          }
        }
      } else {
        throw {
          status : 401,
          message : 'invalid email/password'
        }
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController;