const {Product} = require('../models/index')


class ProductController{
   static async createProduct(req,res,next){
      const payload = {
         name:req.body.name,
         image_url:req.body.image_url,
         price:req.body.price,
         stock:req.body.stock
      }

      try {
         console.log('masuk create')
         console.log(Product)
         const product = await Product.create(payload,{returning:true})
         console.log(product)
         res.status(201).json(product)
      } catch (error) {
         next(error)
      }
   }

   static async updateProduct(req,res,next){
      const payload = {
         name:req.body.name,
         image_url:req.body.image_url,
         price:req.body.price,
         stock:req.body.stock
      }

      const id = req.params.id

      try {

         const product = await Product.update(payload,{where:{
            id
         },returning:true})

         
         res.status(201).json(product[1][0])
      } catch (error) {
         next(error)
      }
   }

   static async destroyProduct(req,res,next){
      const id = +req.params.id

      try {
         const destroyed = await Product.destroy({where:{id},returning:true}) 
         res.status(200).json({message:"Resource Deleted Successfully"})
      } catch (error) {
         next(error)
      }
   }

}

module.exports = ProductController

