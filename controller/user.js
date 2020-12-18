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
        console.log('masuk sini 1');
        throw {
          name: `Wrong User Password`
        }
      } else if (compare(value.password, data.password)) {
        console.log('masuk sini 2');
        const access_token = createToken({
          id: data.id,
          email: data.email,
          role: data.role
        })
        res.status(201).json({ access_token })
      } else {
        console.log('masuk sini 3');
        throw {
          name: `Wrong User Password`
        }
      }
    } catch (err) {
      next(err)
    }
  }

  static async signup(req, res, next) {
    try {
      const value = {
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      }
      const user = await User.create(value)
      res.status(201).json({
        id: user.id,
        email: user.email,
        role: user.role
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserControl
