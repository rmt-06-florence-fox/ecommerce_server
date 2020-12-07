const { User } = require('../models')
const {compare,convert} = require ('../helper/bcrypts')
const {generateToken} =require ('../helper/jwt')
const bcrypt = require('bcryptjs')

class UserController {
  static register (req,res,next){

    console.log('masuk regist')
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    console.log(req.body.name,req.body.email)
    User.create(newUser)
      .then (data=>{
        console.log(data)
        res.status(201).json({id: data.id,email: data.email})
      })
      .catch (err=>{
        console.log('gagal')
        console.log(err)
        next(err)
      })

  }
  
  static login(req,res,next){
    const email = req.body.email
    User.findOne({where:{email:email}})
      .then(data=>{
        if(!data){
          res.status(401).json({message: `Account Not Found`})
        }
       else if (bcrypt.compareSync(req.body.password,data.password)){
          // console.log(req.body.password + "<><><<" + data.password)
          const access_token = generateToken({id: data.id,email: data.email})
          res.status(200).json({access_token})
       }
        
        else if (!compare(req.body.password,data.password)){
          res.status(404).json({message: 'Invalid Email/Password'})
          // throw {
          //   status: 404,
          //   message: 'Invalid Email/Password'
          // }
          }
      })
      .catch (err=>{
        console.log(err)
        next(err)
      })


  }
}

module.exports = UserController