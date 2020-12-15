const { User } = require('../models')
const Helper = require('../helpers/helper')

class UserController{
  static async loginAdmin(req, res, next){
    try{
      const findData = await User.findOne({
        where: { email: req.body.email, role: 'admin' }
      })
      if(findData){
        if(Helper.verifyPassword(req.body.password, findData.password)){
          const access_token = Helper.generateToken({
            id: findData.id,
            email: findData.email
          })
          res.status(200).json({
            id: findData.id,
            email: findData.email,
            access_token
          })
        }else{
          throw{
            status: 400,
            message: `Invalid email / password !`
          }
        }
      }else{
        throw{
          status: 400,
          message: `Invalid account !`
        }
      }
    }catch(err){
      next(err)
    }
  }
  static async registCust (req, res, next) {
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
    }catch(err) {
      if(err.name === 'SequelizeValidationError'){
        next({
          name: 'Validation Error',
          status: 400,
          message: err.errors
        })
      }else if(err.name === 'SequelizeUniqueConstraintError'){
        next({
          status: 400,
          message: 'Email has been already exists'
        })
      }else next(err)    
    }
  }

  static async loginCust (req, res, next) {
    try {
      const findUser = await User.findOne({
        where: { email: req.body.email }
      })
      if (findUser) {
        if (Helper.verifyPassword(req.body.password, findUser.password)) {
          const access_token = Helper.generateToken({
            id: findUser.id,
            email: findUser.email
          })
          res.status(200).json({
            id: findUser.id,
            email: findUser.email,
            access_token
          })
        } else {
          throw {
            status: 400,
            message: 'Invalid email / password !'
          }
        }
      }else {
        throw {
          status: 400,
          message: 'Invalid account !'
        }
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController