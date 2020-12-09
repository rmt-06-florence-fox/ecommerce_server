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
      res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async get(req, res, next) {
    try {
      const data = await Product.findAll()
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async update(req, res, next) {
    const id = +req.params.id
    const payload = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
    }
    try {
      const updateProduct = await Product.update(payload, {
        where: {
          id: id
        }, 
        returning: true
      })
      res.status(200).json(updateProduct[1][0])
    } catch (error) {
      next(error)
    }
  }
  static async delete(req, res, next) {
    
  }
}

module.exports = productController