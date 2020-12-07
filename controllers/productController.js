const { Product } = require('../models')

class ProductController{
  static async getAllProduct(req, res, next){
    try{
      const data = await Product.findAll()
      res.status(200).json({result: data})
    }catch(err){
      next(err)
    }
  }
  static async createProduct(req, res, next){
    try{
      const payload = {
        name: req.body.name,
        image_url: req.body.image_url,
        price: req.body.price,
        stock: req.body.stock
      }
      const result = await Product.create(payload)
      res.status(201).json(result)
    }catch(err){
      if(err.name === 'SequelizeValidationError'){
        next({
          name: 'Validation Error',
          status: 400,
          message: err.errors
        })
      }else next(err)
    }
  }

}
module.exports = ProductController