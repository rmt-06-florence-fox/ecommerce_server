const {User} = require('../database/models')
const {verifyHash} = require('../helpers/bcrypt')
const {signToken} = require ('../helpers/jwt')

class CustomerController {

  static async register(req, res, next) {
    try {
      const newCustomer = {
        email: req.body.email,
        password: req.body.password,
        role: 'Customer'
      }

      const user = await User.create(newCustomer)

      res.status(201).json({
        id: user.id,
        email: user.email
      })
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      const {email, password} = req.body
      const login = await User.findOne({
        where: {
          email,
          role: 'Customer'
        }
      })

      if(!login) {
        throw {
          status: 400,
          message: 'Wrong email/password'
        }
      } else if (login.role === 'Admin') {
        throw {
          status: 401,
          message: 'Unauthorized'
        }
      } else if (!verifyHash(password, login.password)) {
        throw {
          status: 400,
          message: 'wrong email/password'
        }
      } else {
        const access_token = signToken({
          id: login.id,
          email: login .email,
          role: login.role
        })
        res.status(200).json({access_token})
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = CustomerController