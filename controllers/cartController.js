const { Cart, Product, User } = require('../models')

class CartController {
    static showCart(req, res, next) {
        Cart.findAll({
            where: {
                UserId: req.loggedInUser.id
            },
            include: Product,
            order: [['createdAt', 'DESC']]
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            next(error)
        })
    }

    static addCart(req, res, next) {
        let newCart = {
            UserId: req.loggedInUser.id,
            ProductId: req.body.ProductId,
            quantity: 1
        }
        Product.findOne({where: {
            id: req.body.ProductId
        }})
        .then(product => {
            Cart.findOrCreate({
                where: {
                    UserId: req.loggedInUser.id,
                    ProductId: req.body.ProductId
                },
                defaults: {
                    quantity: 1
                }
            })
            .then(([cart, created]) => {
                if(created) {
                    res.send(201).json({cart})
                } else {
                    if(product.stock > cart.quantity) {
                        Cart.increment('quantity', {
                            where: {
                                UserId: req.loggedInUser.id,
                                ProductId: req.body.ProductId
                            }
                        })
                        .then(data => {
                            res.status(200).json(data)
                        })
                        .catch(error => {
                            res.status(500).json({massage: 'Cannot add this item to cart'})
                        })
                    }
                }
            })
            .catch(error => {
                next(error)
            })
        })
    }

    static updateQuantity(req, res, next) {
        let newQuantity
        let increment = req.body.increment
        Cart.findOne({where: {
            ProductId: +req.params.id,
            UserId: req.loggedInUser.id
        }})
        .then(data => {
            if(increment) {
                console.log(data.quantity)
                newQuantity = data.quantity + 1
                // console.log(newQuantity)
            } else {
                newQuantity = data.quantity - 1
            }
            Product.findByPk(+req.params.id)
            .then(product => {
                console.log(product)
                if(newQuantity >= product.stock) {
                    res
                } else {
                    Cart.update({
                        quantity: newQuantity
                    },
                    {where: {
                        ProductId: +req.params.id,
                        UserId: req.loggedInUser.id
                    }})
                    // .then(data => {
                        console.log(newQuantity)
                        res.status(200).json({massage: 'Quantity has been Updated'})
                }
            })
        })
        .catch(error => {
            next(error)
        })
    }

    static removeCart(req, res, next) {
        Cart.destroy({where: {
            ProductId: +req.params.id,
            UserId: req.loggedInUser.id
        }})
        .then(data => {
            res.status(200).json({message: 'Successfully delete your item'})
        })
        .catch(error => {
            console.log(error)
        })
    }
    
}
module.exports = CartController