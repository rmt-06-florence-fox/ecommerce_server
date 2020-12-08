const { Product } = require('../models')

class ProductController {
    static async create (req, res, next) {
        const { name, image_url, price, stock } = req.body
        const UserId = req.loggedInUser.id
        const payload = { name, image_url, price, stock, UserId}
        try {
            const product = await Product.create(payload);
            res.status(201).json(product);   
        }
        catch (error) {
            next(error)
        }
    }

    static async update (req, res, next) {
        const id = +req.params.id
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
        console.log('<<<<<<<<<<<<<<<<<<<<<<masuk sini con')

        const id = +req.params.id
        try {
            await Product.destroy({ where: { id } });
            res.status(200).json({message: 'task succes to delete'})
        } catch (error) {
            next(error)            
        }
    }
}

module.exports = ProductController