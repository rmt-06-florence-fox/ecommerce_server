const { User } = require('../models')
const { generateToken } = require('../helpers/token')
const bcrypt = require('bcryptjs')

class UserController {
  static async register(req, res, next){
    try {
      const payload = {
        email: req.body.email,
        password: req.body.password
      }

      let person = await User.findOne({
        where: {
          email: payload.email
        }
      })

      if(person) {
        next({name: 'EMAIL_REGISTERED'})
      } else {
        let data = await User.create(payload)
        res.status(201).json(data.toJSON());
      }
    }
    catch(err) {
      next(err);
    }
  }

  static async login(req, res, next){
    try {
      const payload = {
        email: req.body.email,
        password: req.body.password,
      }

      let registered = await User.findOne({
        where: {
          email: payload.email
        }
      })
      if (!registered) {
        next({name: 'INVALID_EMAIL_PASS'})
      } else {
        let checkPassword = await bcrypt.compareSync(payload.password, registered.password);
        if (!checkPassword) {
          next({name: 'INVALID_EMAIL_PASS'})
        } else {
          let payloadToken = {id: registered.id, email: registered.email}
          const access_token = generateToken(payloadToken);
          res.status(200).json({access_token})
        }
      }
    }
    catch(err) {
      next(err)
    }
  }
}

module.exports = UserController