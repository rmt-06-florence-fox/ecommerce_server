const {User} = require('../models')
const {compared} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')


class UserController {
  static async login(req,res,next) {
    try {
      const data = {
        email : req.body.email,
        password : req.body.password
      }
      let userData = await User.findOne({where: {email : data.email}})
      if (userData) {
        let makeCompared = compared(data.password, userData.password)
        if (makeCompared) {
          let shownData = {
            id: userData.id,
            email: userData.email
          }
          let access_token = generateToken(shownData)
          res.status(200).json({access_token})
        } else {
          throw {
            status : 401,
            message : 'Invalid email/password'
          }
        }
      } else {
        throw {
          status : 401,
          message : 'Invalid email/password'
        }
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController;