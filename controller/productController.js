const {Product, User} = require('../models')

class ProductController {
  static async create(req,res,next) {
    try {
      let obj = {
        name: req.body.name,
        image_url: req.body.image_url,
        price: req.body.price,
        stock: req.body.stock,
        UserId: req.UserLogin.id
      }
      const data = await Product.create(obj)
      res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ProductController