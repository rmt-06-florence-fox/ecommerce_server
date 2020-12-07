const {Product} = require('../models')

class ProductController {

    static async addProduct(req, res, next){

        try {
            const {name, imageUrl, stock, price} = req.body

            const product = await Product.create({ name, imageUrl, stock, price }, {returning : true})

            if (product){
                res.status(201).json({
                    name : product.name,
                    mageUrl : product.imageUrl, 
                    stock : product.stock, 
                    price : product.price
                })

            } else {
                throw {
                    message : "fail to add product"
                }
            }

        } catch(err){
            next(err)
        }
    }

    static async fetchAll(req, res, next){
        try{
            const products = await Product.findAll()
            
            res.status(200).json({products})

        } catch(err){
            next(err)
        }
    }
}

module.exports = ProductController