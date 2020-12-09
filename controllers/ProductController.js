const { Product } = require('../models/index')

class ProductController {
    static addProduct(req, res, next) {
        const newProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            UserId: req.loggedInUser.id
        }
        Product.create(newProduct)
        .then(data => {
            res.status(201).json({data})
        })
        .catch(err => {
            next(err)
        })
    }

    static editProduct(req, res, next) {
        const editedProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            if (data) {
                return Product.update(editedProduct, {
                    where: {
                        id: req.params.id
                    },
                    returning: true
                })
            } else {
                next({
                    status: 404,
                    message: 'Product not found!'
                })
            }
        })
        .then(data => {
            res.status(200).json({
                data: data[1][0]
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteProduct(req, res, next) {
        Product.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            console.log(data);
            if (data) {
                return Product.destroy({
                    where: {
                        id: data.id
                    }
                })
            } else {
                next({
                    status: 404,
                    message: 'Product not found!'
                })
            }
        })
        .then(data => {
            res.status(200).json({
                message: 'Data deleted successfully.'
            })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = ProductController