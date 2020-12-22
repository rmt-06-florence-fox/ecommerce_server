const { Product } = require('../models')

class ProductController {
  static async getProduct(req, res, next) {
    try {
      const data = await Product.findAll({ order: [['id', 'ASC']] })
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async getProductById(req, res, next) {
    try {
      const { id } = req.params
      const data = await Product.findByPk(id)
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
      res.status(201).json(newProduct)
    } catch (error) {
      next(error)
    }
  }

  static async updateProduct(req, res, next) {
    try {
      const id = req.params.id
      const editProduct = {
        name: req.body.name,
        image_url: req.body.image_url,
        price: req.body.price,
        stock: req.body.stock
      }
      const editedProduct = await Product.update(editProduct, {
        where: { id }, returning: true
      })
      res.status(200).json(editedProduct[1][0])
    } catch (error) {
      next(error)
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const id = req.params.id
      await Product.destroy({ where: { id } })
      res.status(200).json({message: 'Product has been deleted:)'})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ProductController