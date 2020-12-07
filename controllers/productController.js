const { Product } = require('../models')

class productController {
  static async create(req, res, next) {
    const payload = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
      UserId: req.loggedin.id
    }
    try {
      const data = await Product.create(payload)
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async get(req, res, next) {

  }
  static async update(req, res, next) {

  }
  static async delete(req, res, next) {
    
  }
}

module.exports = productController