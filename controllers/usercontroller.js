const { User } = require('../models')
const { comparePwd } = require('../helpers/passwordhelper')
const { generateToken } = require('../helpers/jwthelper')

class UserController {
  static async adminSignIn(req, res, next) {
    try {
      const { email, password } = req.body
      const verifyAdmin = await User.findOne({ where: { email } })
      if (!verifyAdmin) throw { status: 404, message: 'Invalid account' }
      else if (comparePwd(password, verifyAdmin.password)) {
        const access_token = generateToken({ id: verifyAdmin.id, email: verifyAdmin.email })
        res.status(200).json({ access_token })
      }
      else throw { status: 400, message: 'Invalid email/password' }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController