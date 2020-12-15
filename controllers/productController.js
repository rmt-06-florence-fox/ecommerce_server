const { Product } = require('../models')

class ProductController {
    static async create (req, res, next) {
        const { name, image_url, price, stock } = req.body
        const UserId = req.loggedInUser.id
        const payload = { name, image_url, price, stock, UserId}
        try {
            const products = await Product.create(payload);
            res.status(201).json(products);   
        }
        catch (error) {
            next(error)
        }
    }

    static async update (req, res, next) {
        const id = +req.params.productId
        const { name, image_url, price, stock } = req.body
        const payload = { name, image_url, price, stock }
        try {
            const product = await Product.update(payload, { where: { id }, returning: true });
            res.status(200).json(product[1][0])
        } catch (error) {
            next(error)
        }
    }

    static async delete (req, res, next) {
        const id = +req.params.productId
        try {
            await Product.destroy({ where: { id } });
            res.status(200).json({message: 'product succes to delete'})
        } catch (error) {
            next(error)            
        }
    }

    static async getAll (req, res, next) {
        try {
            const products = await Product.findAll({ order: [['id', 'ASC']] })
            res.status(200).json({products})
        } catch (error) {
            next(error)
        }
    }

    static async getOne (req, res, next) {
        const id = +req.params.productId
        try {
            const product = await Product.findByPk(id)
            res.status(200).json({product})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductController