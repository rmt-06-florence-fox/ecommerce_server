const { Product } = require('../models/index')

class ProductController {
    static async addProduct(req, res, next) {
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
            next(error)
        }
    }

    static async editProduct(req, res, next) {
        const obj = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        try {
            const data = await Product.update(obj, {where: {id: req.params.id}, returning: true})
            res.status(200).json(data[1][0].dataValues)
        } catch (error) {
            next(error)
        }
    }

    static async deleteProduct(req, res, next) {
        try {
            const data = await Product.destroy({where: {id: req.params.id}})
            res.status(200).json({message: "Data deleted successful"})
        } catch (error) {
            next(error)
        }
    }

    static async getProduct(req, res, next) {
        try {
            const data = await Product.findAll()
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getProductById(req, res, next) {
        try {
            const data = await Product.findByPk(req.params.id)
            if (!data) {
                throw {
                    status: 404,
                    message: 'Data not found'
                }
            } else {
                res.status(200).json(data)
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductController