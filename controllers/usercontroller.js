const {User} = require('../models/')
const {verifyHash} = require('../helpers/bcrypt')
const {signToken} = require('../helpers/jwt')

class UserController {
  static async login (req, res, next) {
    try {
      const {email, password} = req.body

      const login = await User.findOne({
        where: {
          email,
          role: "Admin"
        }
      })

      if (!login) {
        throw {
          status: 400,
          message: 'wrong email/password'
        }
      } else if (!verifyHash(password, login.password)) {
        throw {
          status: 400,
          message: 'wrong email/password'
        }
      } else {
        const access_token = signToken ({
          id: login.id,
          email: login.email,
          role: login.role
        }) 
        
        const userLogin = login.email

        res.status(200).json({
          access_token,
          userLogin
        })

      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController