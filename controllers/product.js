const { Product } = require("../models/index.js")

class ProductController {
  static showAll(req, res, next){
    Product.findAll()
      .then(products => {
        res.status(200).json(products)
      })
      .catch(err => {
        next(err)
      })
  }

  static addProduct(req, res, next){
    let newProduct = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock
    }
    Product.create(newProduct)
      .then(product => {
        res.status(201).json({
          name: product.name,
          image_url: product.image_url,
          price: product.price,
          stock: product.stock
        })
      })
      .catch(err => {
        next (err)
      })
  }
}

module.exports = ProductController