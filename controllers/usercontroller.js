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
        const access_token = generateToken({ id: verifyAdmin.id, email: verifyAdmin.email, role: verifyAdmin.role })
        res.status(200).json({ access_token })
      }
      else throw { status: 400, message: 'Invalid email/password' }
    } catch (error) {
      next(error)
    }
  }

  static async custSignUp(req, res, next) {
    try {
      const payload = {
        email: req.body.email,
        password: req.body.password
      }
      const data = await User.create(payload)
      res.status(201).json({
        id: data.id,
        email: data.email
      })
    } catch (error) {
      next(error)
    }
  }

  static async custSignIn(req, res, next) {
    try {
      const { email, password } = req.body
      const verifyCust = await User.findOne({ where: { email } })
      if (!verifyCust) throw { status: 404, message: 'Invalid account' }
      else if (comparePwd(password, verifyCust.password)) {
        const access_token = generateToken({ id: verifyCust.id, email: verifyCust.email, role: verifyCust.role })
        res.status(200).json({ access_token })
      }
      else throw { status: 400, message: 'Invalid email/password' }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController