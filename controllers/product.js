const { Product } = require('../models')

class ProductController{
  static async create(req, res, next){
    // console.log(req.loggedInUser.email,'from PC');
    // console.log(req.body);
    // res.status(201).json({message : 'halo dari PC'})
    try {
      const newProduct = await Product.create(req.body)
      
      res.status(201).json({name : newProduct.name, image_url : newProduct.image_url, price : newProduct.price, stock : newProduct.stock})
    } catch (error) {
      next(error)
    }

  }
}

module.exports = ProductController