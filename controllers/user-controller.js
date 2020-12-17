const { User } = require('../models')
const { checkPassword, generateToken } = require('../helpers');
class UserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      if (!email && !password) throw { status: 400, message: 'Please input email and password' }
      else if (!email) throw { status: 400, message: 'Email cannot be empty' }
      else if (!password) throw { status: 400, message: 'Password cannot be empty' }

      const user = await User.findOne({
        where: { email }
      })

      if (!user) throw { status: 404, message: "User not found" }
      else if (checkPassword(password, user.password)) {
        const access_token = generateToken({
          id: user.id,
          email: user.email,
          role: user.role,
        })
        res.status(200).json({
          id: user.id,
          role: user.role,
          access_token
        })
      } else {
        throw {
          status: 400,
          message: "Invalid email/password"
        }
      }
    } catch (err) {
      next(err)
    }
  }

  static async register(req, res, next) {
    let newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    try {
      let user = await User.create(newUser)
      res.status(201).json({ message: "Register Success !", id:user.id, email:user.email })

    } catch (err) {
      next(err)
    }
  }
}
module.exports = UserController