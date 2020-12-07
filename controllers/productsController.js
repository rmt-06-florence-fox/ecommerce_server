const {Product} = require('../models/index')

class ProductsController {
    static async listProducts(req, res, next) {
        try {
            const products = await Product.findAll({order: [['id', 'ASC']]});
            res.status(200).json(products)
        } catch (err) {
            next(err)
        }
    }
    static async addProduct(req, res, next) {
        try {
            const {name, image_url, price, stock, category} = req.body
            const UserId = req.loggedInUser.id
            const newProduct = await Product.create({
                name,
                image_url,
                price,
                stock,
                category,
                UserId
            })
            res.status(201).json(newProduct)
        } catch (err) {
            next(err)
        }
    }
    static async findProduct(req, res, next) {
        try {
            let id = req.params.id;
            const product = await Product.findByPk(id);
            if (!product) {
                return next({
                    name: 'NotFound',
                    msg: 'Error Not Found!'
                })
            } else {
                res.status(200).json(product);
            }
        } catch (err) {
            next(err)
        }
    }
    static async updateProduct(req, res, next) {
        try {
            let id = req.params.id;
            const {name, image_url, price, stock, category} = req.body
            const updateProd = await Product.update({
                name,
                image_url,
                price,
                stock,
                category
            }, {
                where: {id},
                returning: true
            })
            if (updateProd[0] === 0) {
                return next({
                    name: 'NotFound',
                    msg: 'Error Not Found!'
                })
            } else {
                res.status(200).json(updateProd[1][0])
            }
        } catch (err) {
            next(err)
        }
    }
    static async deleteProduct(req, res, next) {
        try {
            const id = req.params.id;
            const delProduct = await Product.destroy({
                where: {id}
            })
            if (!delProduct) {
                return next({
                    name: 'NotFound',
                    msg: 'Error Not Found!'
                })
            } else {
                res.status(200).json({
                    msg: 'Product Deleted Successfully'
                });
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = ProductsController
