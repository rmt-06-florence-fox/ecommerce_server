const { User } = require('../models/index')
const ProductController = require('./productController')
const { compare } = require('../helpers/encryption')
const { tokenize } = require('../helpers/tokening')


class Controller{
   static async register(req,res,next){
      const payload={
         email:req.body.email,
         password:req.body.password
      }

      try {
         const user = await User.create(payload,{returning:true})
         res.status(201).json({id:user.id,email:user.email,role:'admin'})
      } catch (error) {
         next(error)
      }
   }

   static async login(req,res,next){
      console.log('login')
      const payload={
         email:req.body.email,
         password:req.body.password
      }

      if(payload.email === '' || payload.password ==='')
         next({
            status:400,
            message:'Email/Password must be filled'
         })
      if(payload.email === 'notfound@gmail.com')
         console.log("<<<<<< notfound")
      try {
         const user = await User.findOne({where:{email:payload.email},returning:true})
         if(!user)
            throw {
               status:400,
               message:'Wrong Email/Password'
            }
         const comparison = compare(payload.password,user.password)
         if(!comparison)
            throw {
               status:400,
               message:'Wrong Email/Password'
            }
         const access_token = tokenize({id:user.id,email:user.email})

         console.log('success')
         res.status(200).json({access_token})
      } catch (error) {
         next(error)
      }
   }
}

module.exports = {ProductController,Controller}

