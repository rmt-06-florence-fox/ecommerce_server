const {Product} = require('../models')

class ProductController {
    static async getItem(req, res, next) {
        try {
            const data = await Product.findAll({
                order: [
                    ['id', 'ASC']
                ],
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }
    
    static async addItem(req, res, next) {
        const data = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        try {
            const newData = await Product.create(data)
            res.status(201).json(newData)
        } catch (err) {
            next(err)
        }
    }

    static async getItemById(req, res, next) {
        const idItem = req.params.id
        try {
            const data = await Product.findByPk(idItem)
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async updateItem(req, res, next) {
        const idItem = req.params.id
        const data = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        try {
            const updatedItem = await Product.update(data, {
                where: {
                    id: idItem
                },
                returning: true
            })
            res.status(200).json(updatedItem[1][0])
        } catch (err) {
            next(err)
        }
    }

    static async deleteItem(req, res, next) {
        const idItem = req.params.id
        try {
            await Product.destroy({
                where: {
                    id: idItem
                }
            })
            res.status(200).json({message: "Deleted Successfully"})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = ProductController