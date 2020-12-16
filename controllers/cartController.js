const { Cart, Product } = require('../models/index')


class CartController{
   static async createCart(req,res,next){
      console.log(req.loggedIn);
      const payload = {
         UserId: req.loggedIn.id,
         ProductId: req.body.productId,
         quantity: 1,
         totalPrice: req.body.price
      }
      console.log(payload);
      const isCarted = await Cart.findOne({
         where: {
            UserId: payload.UserId,
            ProductId: payload.ProductId
         }
      }) 

      if (!isCarted) {

         try {
            const cart = await Cart.create(payload,{returning:true})
            res.status(201).json(cart)
         } catch (error) {
            next(error)
         }
      } else {
         try {
            const cart = await Cart.increment({
               quantity: 1, 
               totalPrice: payload.totalPrice 
               },
               {
               where: {
                  UserId: payload.UserId,
                  ProductId: payload.ProductId
               }
            })
            res.status(201).json(cart)
         } catch (error) {
            next(error)
         }
      }
   }

   static async updateCart(req,res,next){
      const payload = {
         quantity: 1,
         totalPrice: req.body.price
      }
      const id = req.params.id

      try {

         const cart = await Cart.decrement(payload,{where:{
           id
         }})
         console.log(cart[0][0][0]);
         if (cart[0][1] === 0)
            throw {
               status: 404,
               message: 'Cart Not Found'
            }
         res.status(201).json(cart[0][0][0])
      } catch (error) {
         next(error)
      }
   }

   static async destroyCart(req,res,next){
      const id = +req.params.id
      console.log('destroy')
      try {
         const destroyed = await Cart.destroy({where:{id},returning:true}) 
         console.log(destroyed)

         if (destroyed === 0)
            throw {
               status: 404,
               message: 'Product Not Found'
            }
            
         res.status(200).json({message:"Resource Deleted Successfully"})
      } catch (error) {
         next(error)
      }
   }

   static async fetchCarts(req,res,next){
      try {
         const cart = await Cart.findAll({
            where: {
               UserId: req.loggedIn.id
            },
            order:[
               ['id','ASC']
            ],
            include: Product
         })
         res.status(200).json({data:cart})
      } catch (error) {
         next(error)
      }
   }

   static async fetchProductsById(req,res,next){
      const id = +req.params.id
      try {
         const product = await Product.findOne({
            where: {
               id
            }
         })

         if(!product) {
            throw{
               status:404,
               message:'Product Not Found'
            }
         }

         console.log(product)

         res.status(200).json({data:product})
      } catch (error) {
         next(error)
      }
   }

}

module.exports = CartController
