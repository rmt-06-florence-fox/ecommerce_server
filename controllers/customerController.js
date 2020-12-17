const Bcrypt = require('../helpers/bcrypt')
const Jwt = require('../helpers/jwt')
const { User } = require('../models/index')

class CustomerController {
    static async register(req, res, next) {
      try {
        const { firstName, lastName, gender, email, password } = req.body
        const newUser = await User.create({
          firstName, lastName, gender, email, password, role: 'customer'
        })
        res.status(201).json({
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          gender: newUser.gender,
          email: newUser.email,
          role: newUser.role
        })
      } catch(err) {
        next(err)
      }
    }
  
    static async login(req, res, next) {
      try {
        const { email, password } = req.body
        const user = await User.findOne({
          where: {
            email
          }
        })
        if(!user) {
          throw {name: 'WrongEmailPassword'}
        } else {
          if(!Bcrypt.compare(password, user.password)) {
            throw {name: 'WrongEmailPassword'}
          } else {
            const token = Jwt.sign({
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              gender: user.gender,
              email: user.email,
              role: user.role
            })
            res.status(200).json({
              email: user.email,
              token
            })
          }
        }
      } catch(err) {
        next(err)
      }
    }
  }
  
  module.exports = CustomerController