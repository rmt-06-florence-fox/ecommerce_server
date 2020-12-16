const Helper = require('../helpers/helper')
const { User } = require('../models')

class UserController {
  static async login (req, res, next) {
    try {
      const data = await User.findOne({
        where: {
          email: req.body.email
        }
      })
      if (data) {
        Helper.comparePassword(req.body.password, data.password)
        const access_token = Helper.createToken({
          id: data.id,
          email: data.email,
          role: data.role
        }, process.env.SECRET)
        res.status(200).json({ access_token })
      } else {
        throw {
          status: 400,
          message: `Invalid Email / Password !`
        }
      }
    }
    catch(err) {
      next(err)
    }
  }
}

module.exports = UserController