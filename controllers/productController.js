const {Product} = require('../models')

class ProductController {
  static async add(req,res,next) {
    try {
      let data = {
        name: req.body.name,
        image_url: req.body.image_url,
        price: req.body.price,
        stock: req.body.stock,
        UserId: req.loggedInUser.id
      }
      const product = await Product.create(data)
      res.status(201).json(product)
    } 
    catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async fetch(req,res,next) {
    try {
      const products = await Product.findAll()
      if (products) {
        res.status(200).json(products)
      } 
      else {
        throw {
          status : 404,
          message: `Product not found`
        }
      }
    } 
    catch (error) {
      next(error)
    }
  }

  static async fetchById(req,res,next) {
    try {
      let id = req.params.id
      const products = await Product.findOne({
        where: {id}
      })
      if (products) {
        res.status(200).json(products)
      } 
      else {
        throw {
          status : 404,
          message: `Product not found`
        }
      }
    } 
    catch (error) {
      next(error)
    }
  }

  static async update(req,res,next) {
    try {
      let data = {
        name: req.body.name,
        image_url: req.body.image_url,
        price: req.body.price,
        stock: req.body.stock,
        UserId: req.loggedInUser.id
      }
      let id = req.params.id
      const products = await Product.update(data, {
        where: {id}, 
        returning : true
      })
      if (products) {
        res.status(200).json(products[1][0])
      } 
      else {
        throw {
          status : 404,
          message: `Product not found`
        }
      }
    } 
    catch (error) {
      next(error)
    }
  }

  static async destroy(req,res,next) {
    try {
      let id = req.params.id
      const products = await Product.destroy({
        where: {id}
      })
      if (products) {
        res.status(200).json({'message': `successfully deleted`})
      } 
      else {
        throw {
          status : 500,
          message: `error internal server`
        }
      }
    } 
    catch (error) {
      next(error)
    }
  }
}

module.exports = ProductController