const JwtHelper = require('../helpers/jwtHelper')
const { User } = require('../models')
const PassHelper = require('../helpers/passHelper')

class UserController{
  //admin login
  static async login(req, res, next){
    try {
      if(!req.body.email || !req.body.password){
        throw {status : 400, message : "field can not be empty"}
      }
      const user = await User.findOne({
        where : {
          email : req.body.email
        }
      })
      if(!user){
        throw {status : 404, message : "email is not registered yet"}
      }
      if(user && PassHelper.passCompare(req.body.password, user.password)){
        // console.log('masuk');
        res.status(200).json({access_token : JwtHelper.encode({ 
          id : user.id,
          email :  user.email
         })})
      }else throw {status : 400, message : "invalid"}
    } catch (error) {
      next(error)
    }
  }
  //user register

  static async register (req ,res ,next){
    const payload = {
      email: req.body.email,
      password: req.body.password,
      role: ''
    }
    console.log(payload);
    try {
      const newUser = await User.create(payload)
      res.status(201).json(newUser)
    } catch (error) {
      next(error)
    }
  }

  //user login
  static async loginCustomer (req, res, next){
    const payload = {
      email: req.body.email,
      password: req.body.password
    }
    console.log(payload.email);
    try {
      if(!req.body.email || !req.body.password){
        throw {status : 400, message : "field can not be empty"}
      }
      const loginUser = await User.findOne({
        where: {
          email: payload.email,
          role: 'customer'
        }
      })
      console.log(loginUser);
      if(!loginUser){
        throw { status: 404, message : "email is not registered yet"}
      }
      if(loginUser && PassHelper.passCompare(payload.password, loginUser.password)){
        res.status(200).json({ access_token: JwtHelper.encode({ id: loginUser.ud, email: loginUser.email})})
      }else  throw { status: 400, message: 'invalid'}
    } catch (error) {
      next(error)
    }
  }

}

module.exports = UserController