const { User } = require('../models')
const { compare } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')

class UserControl {
  static async signin(req, res, next) {
    try {
      const value = {
        email: req.body.email,
        password: req.body.password
      }
      const data = await User.findOne({
        where: {
          email: value.email
        }
      })
      if (!data) {
        throw {
          name: `Wrong User Password`
        }
      } else if (compare(value.password, data.password)) {
        const access_token = createToken({
          id: data.id,
          email: data.email,
          role: data.role
        })
        res.status(201).json({ access_token })
      } else {
        throw {
          name: `Wrong User Password`
        }
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserControl
