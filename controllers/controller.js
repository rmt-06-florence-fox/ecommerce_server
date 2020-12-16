const { User } = require('../models/index')
const ProductController = require('./productController')
const { compare } = require('../helpers/encryption')
const { tokenize } = require('../helpers/tokening')
const CartController = require('./cartController')


class Controller{
   static async register(req,res,next){
      const payload={
        email:req.body.email,
        password:req.body.password,
        role: 'user'
      }

      try {
        const user = await User.create(payload,{returning:true})
        res.status(201).json({id:user.id,email:user.email,role:'user'})
      } catch (error) {
        next(error)
      }
   }

   static async login(req,res,next){
      console.log('login...')
      const host = req.get('host')
      const isCms = host.includes('cms') ? true : false
      const payload = {
         email:req.body.email,
         password:req.body.password
      }

      console.log(req.body)
      console.log(payload)

      if (payload.email === '' || payload.password ==='')
        next({ 
           status:400, 
           message:'Email/Password must be filled'
        })
      try {
         const user = await User.findOne({where:{email:payload.email},returning:true})
         if (!user) 
          throw {
            status: 400,
            message:'Wrong Email/Password'
          }

         if (isCms && user.role === 'user') {
           throw {
              status: 400,
              message: 'Not Authorized'
            }
         } else if (!isCms && user.role === 'admin') {
            throw {
               status: 400,
               message: 'Not Authorized'
            }
         }
         const comparison = compare(payload.password,user.password)
         if(!comparison)
            throw {
               status:400,
               message:'Wrong Email/Password'
            }
         const access_token = tokenize({id:user.id,email:user.email,role:user.role})

         console.log('success')
         res.status(200).json({access_token})
      } catch (error) {
         console.log(error);
         next(error)
      }
   }
}

module.exports = {ProductController, Controller, CartController}

