const { Product } = require('../models')

class ProductController {
  static async getProduct(req, res, next) {
    try {
      const data = await Product.findAll()
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async createProduct(req, res, next) {
    try {
      const product = {
        name: req.body.name,
        image_url: req.body.image_url,
        price: req.body.price,
        stock: req.body.stock,
        UserId: req.signedInUser.id
      }
      const newProduct = await Product.create(product)
      console.log(newProduct)
      res.status(201).json(newProduct)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ProductController