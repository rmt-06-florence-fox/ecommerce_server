const { Product } = require('../models')

class ProductController {
    static async getProduct(req, res, next) {
        try {
            const products = await Product.findAll()
            res.status(200).json({products})
        } catch (error) {
            next(error)
        }
    }

    static async postProduct(req, res, next) {
        const payload = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: +req.body.price,
            stock: +req.body.stock,
            CategoryId: req.body.CategoryId
        }

        try {
            const product = await Product.create(payload)

            res.status(200).json({product})
        } catch (error) {
            next(error)
        }
    }

    static async putProduct(req, res, next) {
        const id = req.params.id
        const payload = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: +req.body.price,
            stock: +req.body.stock,
            CategoryId: req.body.CategoryId
        }
        
        try {
            const product = await Product.update(payload, {
                where: {
                    id
                },
                returning: true
            })

            res.status(200).json({product})
        } catch (error) {
            next(error)
        }
    }

    static async deleteProduct(req, res, next) {
        const id = req.params.id
        try {
            const product = await Product.destroy({
                where: {
                    id
                }
            })

            res.status(200).json({message: `Product Deleted Successfully`})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductController