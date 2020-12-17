const {User} = require('../models')
const {compared} = require('../helper/bcrypt')
const { makeToken } = require('../helper/jsonwebtoken')


class UserController {
  static async register(req,res,next){
    try {
      const obj = {
        name: req.body.name,
        email : req.body.email,
        role : 'customer',
        password : req.body.password
      }
      let data = await User.create(obj)
      const  objData = {
        name: data.name,
        email : data.email,
        role : data.role
      }
      res.status(201).json(objData)
    } catch (error) {
      next(error)
    }
  }

  static async login(req,res,next){
    try {
      const obj = {
        email : req.body.email,
        password : req.body.password
      }
      let data = await User.findOne({where: {email : obj.email}})
      if (data) {
        let makeCompared = compared(obj.password, data.password)
        if (makeCompared) {
          let inData = {
            id: data.id,
            email: data.email
          }
          let access_token = makeToken(inData)
          res.status(200).json({access_token})
        } else {
          throw {
            status : 401,
            message : 'We found your email or password is not match with our data. Please try again'
          }
        }
      } else {
        throw {
          status : 401,
          message : 'We found your email or password is not match with our data. Please try again'
        }
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController;