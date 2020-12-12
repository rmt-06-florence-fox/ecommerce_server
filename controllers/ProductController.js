const { Product } = require('../models/index')

class ProductController {
    static getProduct(req, res, next) {
        Product.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

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

    static addStock(req, res, next) {
        const newStock = +req.body.stock
        
        if (!newStock) {
            next({
                status: 400,
                message: 'Stock cannot be empty!'
            })
        } else if (newStock < 0) {
            next({
                status: 400,
                message: 'Stock cannot be negative!'
            })
        } else {
            Product.findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(data => {
                if (data) {
                    const updatedStock = {
                        stock : data.stock + newStock
                    }
                    return Product.update(updatedStock, {
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
    }

    static getProductById(req, res, next) {
        Product.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                if (data) {
                    res.status(200).json(data)
                } else {
                    next({
                        status: 404,
                        message: 'Product not found!'
                    })
                }
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
            if (data) {
                return Product.destroy({
                    where: {
                        id: req.params.id
                    }
                })
            } else {
                throw next({
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