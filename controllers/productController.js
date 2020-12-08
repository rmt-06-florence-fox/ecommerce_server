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

         if (product[0][1] === 0)
            throw {
               status: 404,
               message: 'Product Not Found'
            }
         res.status(201).json(product[1][0])
      } catch (error) {
         next(error)
      }
   }

   static async destroyProduct(req,res,next){
      const id = +req.params.id

      try {
         const destroyed = await Product.destroy({where:{id},returning:true}) 

         if (product[0][1] === 0)
            throw {
               status: 404,
               message: 'Product Not Found'
            }
            
         res.status(200).json({message:"Resource Deleted Successfully"})
      } catch (error) {
         next(error)
      }
   }

   static async fetchProducts(req,res,next){
      try {
         const products = await Product.findAll()
         res.status(200).json({data:products})
      } catch (error) {
         next(error)
      }
   }

   static async fetchProductsById(req,res,next){
      const id = +req.params.id

      try {
         const product = Product.findOne({
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
         
         res.status(200).json({data:product})
      } catch (error) {
         next(error)
      }
   }

}

module.exports = ProductController

