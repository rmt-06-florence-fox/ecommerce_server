const { Product } = require('../models')

class ProductController{
    static async getProduct(req,res,next){
        try {
            let allProducts = await Product.findAll()
            res.status(200).json({products:allProducts})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = ProductController