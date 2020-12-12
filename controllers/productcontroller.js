const {Product} = require('../models/')

class ProductController {
  static async getAllProducts (req, res, next) {
    const UserId = req.userLoggedIn.id

    try {
      const products = await Product.findAll ({
        where: {UserId}
      })
      res.status(200).json(products)

    } catch (err) {
      next(err)
    }
  }

  static async addProduct (req, res, next) {
    try {
      
      const newProduct = {
        name: req.body.name,
        image_url: req.body.image_url,
        price: +req.body.price,
        stock: +req.body.stock,
        category: req.body.category,
        UserId: req.userLoggedIn.id
      }

      // console.log(newProduct);
      const product = await Product.create(newProduct)

      res.status(201).json(product)
    } catch (err) {
      next(err)
    }
  }

  static async getProductById (req, res, next) {

    try {
      const id = +req.params.id
      const product = await Product.findByPk(id)

      if (!product) {
        throw {
          status: 400,
          message: 'product unavailable'
        }
      } else {
        res.status(200).json(product)
      }
    } catch (err) {
      next(err)
    }
  }

  static async editProductById (req, res, next) {
    try {
      const id = +req.params.id

      const editProduct = {
        name: req.body.name,
        image_url: req.body.image_url,
        price: +req.body.price,
        stock: +req.body.stock,
        category: req.body.category
      }

      const product = await Product.update(editProduct, {
        where: {id}, returning: true
      })

      res.status(201).json(product[1][0])
    } catch (err) {
      next(err)
    }
  }

  static async categoryFilter (req, res, next) {
    try {
      const { category } = req.query
      const { id } = req.userLoggedIn

      const products = await Product.findAll({
        where: {
          UserId: id,
          category
        }
      })

      res.status(200).json(products)
    } catch (err) {
      next(err)
    }
  }

  static async deleteProduct (req, res, next) {
    try {
      const id = +req.params.id
      const product = await Product.destroy ({
        where: {id}
      })

      res.status(201).json({
        message: "product is deleted"
      })
    } catch (err) {
      next(err)
    }
  }
  
}

module.exports = ProductController