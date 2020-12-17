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
            console.log(payload.ProductId);
            const cart = await Cart.create(payload,{returning:true})
            // console.log('decrementing belum ada');
            // const updated = await Product.decrement({stock:1},{
            //    where: {
            //       id: payload.ProductId
            //    }
            // })
            console.log('success');
            res.status(201).json(cart)
         } catch (error) {
            console.log(error);
            //next(error)
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
            console.log(payload.ProductId);
            console.log('decrementing sudah ada');

            // const updated = await Product.decrement({stock:1},{
            //    where: {
            //       id: payload.ProductId
            //    }
            // })
            console.log('success');
            res.status(201).json(cart)
         } catch (error) {
            console.log(error);
            next(error)
         }
      }
   }

   static async decrementProduct(id){
      console.log(id,'<<<<< decrment');
      try {
         const updated = await Product.decrement({stock:1},{
            where: {
               id
            }
         })
      } catch (error) {
         console.log(error);
         next(error)
      }
   }

   static async incrementProduct(id){
      try {
         const updated = await Product.increment({stock:1},{
            where: {
               id
            }
         })
      } catch (error) {
         console.log(error);
         next(error)
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
         // const updated = await Product.increment({stock:1},{
         //    where: {
         //       id: cart[0][0][0].ProductId
         //    }
         // })
         res.status(201).json(cart[0][0][0])
      } catch (error) {
         next(error)
      }
   }

   static async destroyCart(req,res,next){
      const id = +req.params.id
      console.log(req.params);
      try {
         const target = await Cart.findOne({where:{id},include:Product})
         const destroyed = await Cart.destroy({where:{id},returning:true}) 
         console.log(destroyed)

         if (destroyed === 0)
            throw {
               status: 404,
               message: 'Product Not Found'
            }
         console.log(target);  
         // const updated = await Product.increment({stock:target.quantity},{
         //    where: {
         //       id: target.Product.id
         //    }
         // })
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

   static async fetchAllCarts(req,res,next){
      const ProductId = req.params.productId
      try {
         const cart = await Cart.findAll({
            where: {
               ProductId
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

   static async checkOutCarts(req,res,next){
      console.log('checking out');
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
         cart.forEach(async (item) => {
            if ( item.quantity > item.Product.stock ) {
               throw {
                  status: 400,
                  message: `${item.Product.name} stock not enough`
               }
            }

            const updated = await Product.decrement({stock:item.quantity},{
               where: {
                  id: item.ProductId
               }
            })
            const deleted = await Cart.destroy({where: {
               id: item.id
            }})
         })
         res.status(200).json({message:'checkout success'})
      } catch (error) {
         next(error)
      }
   }


}

module.exports = CartController
