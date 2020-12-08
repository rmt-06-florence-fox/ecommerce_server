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

}

module.exports = ProductController