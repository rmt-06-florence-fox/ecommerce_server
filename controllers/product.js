const { Product } = require('../models')

class ProductController{
  static async create(req, res, next){
    try {

      const newProduct = await Product.create(req.body)
      
      res.status(201).json({id: newProduct.id, name : newProduct.name, image_url : newProduct.image_url, price : newProduct.price, stock : newProduct.stock})
    } catch (error) {
      next(error)
    }
  }

  static async update(req, res, next){
    // console.log(req.body);
    
    try {
      const updatedProduct = await Product.update(req.body, { where:{ id : req.params.id },  returning : true })
      console.log('asa');
      res.status(200).json({id: updatedProduct.id, name : updatedProduct.name, image_url : updatedProduct.image_url, price : updatedProduct.price, stock : updatedProduct.stock})
    } catch (error) {
      next(error)
    }
  }

  static async deleteProduct(req , res, next){

    try {
      const findProduct = await Product.findByPk(req.params.id)
      console.log(findProduct);
      if(findProduct){
        const deleteProduct = await Product.destroy({ where : { id : req.params.id}})
        res.status(200).json({message : "succesfully delete a product"})
      } throw{status : 404 , message : "product not found"}
      
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ProductController