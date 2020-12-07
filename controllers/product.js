const { Product } = require('../models')

class ProductController {
    static async addProduct(req, res, next) {
        try {
            let { name, image_url, price, stock } = req.body
            let payload = {
                name,
                image_url,
                price,
                stock
            }
            let data = await Product.create(payload)
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async findAllProduct(req, res, next) {
        try {
            let data = await Product.findAll()
            res.status(201).json({ products: data })
        } catch (error) {
            next(error)
        }
    }

    static async updateProduct(req, res, next) {
        try {
            let { id } = req.params
            let { name, image_url, price, stock } = req.body
            let payload = {
                name,
                image_url,
                price,
                stock
            }
            let data = await Product.update(payload, { where: { id }, returning: true })
            res.status(200).json(data[1][0])
        } catch (error) {
            next(error)
        }
    }

    static async deleteProduct(req, res, next) {
        try {
            let { id } = req.params
            let data = await Product.destroy({ where: { id } })
            res.status(200).json({message: 'Product deleted successfuly'})
        } catch (error) {
            next(error)
        }
    }

}

module.exports = ProductController