const { Product } = require('../models')

class ProductController {
    static async input(req, res, next) {        
        try {
            const data = {
                name: req.body.name,
                image_url: req.body.image_url,
                price: req.body.price,
                stock: req.body.stock
            }
            const product = await Product.create(data)
            res.status(201).json(product)
        } catch (err) {
            next(err)
        }
    }

    static async show(req, res, next) {
        try {
            const data = await Product.findAll({
                order: [['id', 'ASC']]
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async showById(req, res, next) {
        try {
            const data = await Product.findOne({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async update(req, res, next) {
        try {
            const id = Number(req.params.id)
            const data = {
                name: req.body.name,
                image_url: req.body.image_url,
                price: req.body.price,
                stock: req.body.stock
            }
            const product = await Product.update(data, {
                where: {
                    id
                },
                returning: true
            })
            res.status(200).json(product[1][0])
        } catch (err) {
            next(err)
        }
    }

    static async delete(req, res, next) {
        try {
            const id = Number(req.params.id)
            const data = await Product.destroy({
                where: {
                    id
                }
            })
            res.status(200).json({ message: `Product success to delete` })
        } catch (err) {
            next(err)
        }
    }
    
}

module.exports = ProductController