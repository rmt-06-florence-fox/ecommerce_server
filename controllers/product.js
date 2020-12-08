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

  static editProduct(req, res, next){
    let updatedProduct = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock
    }
    Product.update(updatedProduct, {
      where: {
        id: +req.params.id
      },
      returning: true
    })
      .then(product => {
        res.status(200).json(product[1][0])
      })
      .catch(err => {
        next (err)
      })
  }

  static deleteProduct(req, res, next){
    Product.destroy({
      where:{
        id: req.params.id
      }
    })
    .then(response => {
      res.status(200).json({
        message: "Successfully delete product"
      })
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = ProductController