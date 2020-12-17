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
  static async findProduct(req, res, next){
    try{
      const product = await Product.findByPk(req.params.id)
      res.status(200).json(product)
    }catch(err){
      next(err)
    }
  }
  static async replaceDataProduct(req, res, next){
    try{
      const payload = {
        name: req.body.name,
        image_url: req.body.image_url,
        price: req.body.price,
        stock: req.body.stock
      }
      const result = await Product.update(payload, {
        where: {
          id: req.params.id
        }, 
        returning: true
      })
      res.status(200).json(result[1][0])
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
  static async deleteProduct(req, res, next){
    try{
      const findData = await Product.findByPk(req.params.id)
      if(findData){
        const result = await Product.destroy({
          where: { id: req.params.id }
        })
        res.status(200).json({ message: `Successfully deleted data product !`})
      }else{
        throw{
          status: 400,
          message: `Data Not Found`
        }
      }
    }catch(err){
      next(err)
    }
  }
}
module.exports = ProductController