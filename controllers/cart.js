const {Product, Cart} = require('../models')

class CartController {
    static async addToCart(req, res, next) {
        try {
            const exist = await Cart.findOne({
                where: {
                    UserId: req.loggedInUser.id,
                    ProductId: req.params.id,
                    status: false
                }
            })
            const dataProduct = await Product.findByPk(req.params.id)
            if (exist.stock === dataProduct.stock) {
                throw {
                    status: 400,
                    message: 'Your order quantity has reached this product stock maximum value'
                }
            }
            if (req.body.quantity > dataProduct.stock) {
                throw {
                    status: 400,
                    message: `Your order has been rejected because it has exceeded the amount of available ${dataProduct.name} stock`
                }
            }
            if (!exist) {
                const data = {
                    UserId: req.loggedInUser.id,
                    ProductId: req.params.id,
                    quantity: req.body.quantity,
                    price: Number(dataProduct.price)*Number(req.body.quantity),
                    status: false
                }
                const newData = await Cart.create(data)
                res.status(200).json({message: `Product ${dataProduct.name} Has Been Successfully Added To Your Cart!`})
            } else {
                let updatedQuantity = Number(exist.quantity)+Number(req.body.quantity)
                const updatedData = await Cart.update({
                    quantity: updatedQuantity,
                    price: Number(dataProduct.price)*updatedQuantity
                    }, {
                    where: {
                    id: exist.id
                    },
                    returning: true
                })
                if (updatedData[1][0].quantity < 1) {
                    Cart.destroy({
                        where: {
                            id: updatedData[1][0].id
                        }
                    })
                    res.status(200).json({message: `Product ${dataProduct.name} Has Been Successfully Removed From Your Cart!`})
                } else {
                    res.status(200).json({message: `Product ${dataProduct.name} Has Been Successfully Added To Your Cart!`})
                }
            }
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async getCart(req, res, next) {
        try {
            const data = await Cart.findAll({
                where: {
                    UserId: req.loggedInUser.id,
                    status: false
                },
                order: [
                    ['id', 'ASC']
                ],
                include: [Product]
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async patchCart(req, res, next) {
        const dataCart = await Cart.findByPk(req.params.id)
        const dataProduct = await Product.findByPk(dataCart.ProductId)
        const updatedData = await Cart.update({
            status: true
        }, {
            where: {
                id: req.params.id
            },
            returning: true
        })
        if (updatedData[1][0].status === true) {
            const updateStock = await Product.update({
                stock: Number(dataProduct.stock)-Number(dataCart.quantity)
            }, {
                where: {
                    id: dataCart.ProductId
                },
                returning: true
            })
            res.status(200).json({message: `You Have Been Successfuly Bought Product ${dataProduct.name}`})
        } else {
            throw {
                status: 400,
                message: `Your order has been rejected because it has exceeded the amount of available ${dataProduct.name} stock`
            }
        }
    }

    static async putCart(req, res, next) {
        try {
            console.log(req.body.quantity);
            const dataCart = await Cart.findOne({
                where: {
                    UserId: req.loggedInUser.id,
                    ProductId: req.params.id,
                    status: false
                }
            })
            const dataProduct = await Product.findByPk(req.params.id)
            if (req.body.info === 'increase' || req.body.info === 'decrease') {
                let updatedQuantity = Number(dataCart.quantity)+Number(req.body.quantity)
                if (dataProduct.stock < updatedQuantity) {
                    throw {
                        status: 400,
                        message: `You can only increase the amount of order up to ${dataProduct.stock}`
                    }
                }
                console.log(dataCart.id);
                const updatedData = await Cart.update({
                    quantity: updatedQuantity,
                    price: Number(dataProduct.price)*updatedQuantity
                    }, {
                    where: {
                        id: dataCart.id,
                        status: false
                    },
                    returning: true
                })
                if (updatedData[1][0].quantity < 1) {
                    Cart.destroy({
                        where: {
                            id: updatedData[1][0].id
                        }
                    })
                    res.status(200).json({message: `Product ${dataProduct.name} Has Been Successfully Removed From Your Cart!`})
                } else {
                    if (dataCart.quantity > updatedQuantity) {
                        res.status(200).json({message: `The Amount of Product ${dataProduct.name} Orders Has Been Successfully Decreased!`})
                    } else {
                        res.status(200).json({message: `The Amount of Product ${dataProduct.name} Orders Has Been Successfully Increased!`})
                    }
                }
            } else if (Number(req.body.quantity) > 0) {
                console.log('masuk');
                const updateCart = await Cart.update({
                    quantity: Number(req.body.quantity),
                    price: Number(dataProduct.price)*Number(req.body.quantity)
                    }, {
                    where: {
                        id: dataCart.id
                    }
                })
                res.status(200).json({message: `The Amount of Product ${dataProduct.name} Orders Has Been Successfully Updated!`})
            } else if (Number(req.body.quantity) === 0) {
                Cart.destroy({
                    where: {
                        id: dataCart.id
                    }
                })
                res.status(200).json({message: `Product ${dataProduct.name} Has Been Successfully Removed From Your Cart!`})
            }
            
        } catch (err) {
            next(err)
        }
    }

    static async deleteCart(req, res, next) {
        try {
            const dataCart = await Cart.findByPk(req.params.id)
            const dataProduct = await Product.findByPk(dataCart.ProductId)
            await Cart.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({message: `Product ${dataProduct.name} Has Been Successfully Removed From Your Cart`})
        } catch (err) {
            next(err)
        }
    }

    static async history(req, res, next) {
        try {
            const data = await Cart.findAll({
                where: {
                    UserId: req.loggedInUser.id,
                    status: true
                },
                order: [
                    ['id', 'ASC']
                ],
                include: [Product]
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = CartController