const { Product } = require('../models/index')

class ProductController {
    static async allProducts(req, res, next) {
        try {
            const products = await Product.findAll()
            res.status(200).json(products)
        }
        catch(err) {
            next(err)
        }
    }

    static async addProduct(req, res, next) {
        try {
            const { name, image_url, price, stock, CategoryId } = req.body
            const newProduct = await Product.create({
                name, image_url, stock, price, CategoryId
            })
            console.log(newProduct)
            res.status(201).json(newProduct)
        }
        catch(err) {
            next(err)
        }
    }

    static async editProduct(req, res, next) {
        try {
          const { name, image_url, price, stock, CategoryId } = req.body;
          const newProduct = await Product.update({
              name, image_url, price, stock, CategoryId}, {
                  where: {
                      id: req.params.id}, returning: true});
          res.status(200).json(newProduct[1]);
        } catch(err) {
          next(err);
        }
      }

    static async deleteProduct(req, res, next) {
        try {
            const destroyed = await Product.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({
                message: 'deleted success'
            })
        }
        catch(err) {
            next(err)
        }
    }
}



module.exports = ProductController