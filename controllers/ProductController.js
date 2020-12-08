const { Product } = require('../models/index')

class ProductController {
    static async addProduct(req, res) {
        const obj = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        try {
            const data = await Product.create(obj)
            res.status(201).json(data)
        } catch(error) {
            if (error.name === 'SequelizeValidationError') {
                res.status(400).json({message: error.errors[0].message})
            } else {
                res.status(500).json({message: "Internal Server Error"})
            }
        }
    }
}

module.exports = ProductController