const { User } = require('../models')
const { checkPassword, generateToken } = require('../helpers');
class UserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: { email }
      })
      if (!user) {
        throw {
          status: 404,
          message: "User not found"
        }
      } else if (checkPassword(password, user.password)) {
        const access_token = generateToken({
          id: user.id,
          email: user.email,
          role: user.role,
        })
        res.status(200).json({
          id: user.id,
          email: user.email,
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
}
module.exports = UserController