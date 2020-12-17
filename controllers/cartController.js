const {Cart, Product} = require('../models')

class CartController {

    static addToCart (req, res) {
        // let currentCart = null;
        let newCart = {
            UserId: req.loggedIn.id,
            ProductId: req.params.id,
            quantity: 1,
            status: true
        }
        console.log(newCart)
        Cart.findOne ({
            where:{
                UserId: req.loggedIn.id,
                ProductId: req.params.id,
                status: true
            }
        })
        .then(data => {
            if(data) {
                if(data.status) {
                    res.status(400).json({message: 'item already taken'})
                } else {
                    console.log(data.status, '<<<<<<')
                    return Cart.create(newCart)
                }
                // return Cart.update({
                //     quantity: data.quantity + 1
                // }, {
                //     where: {
                //         id: data.id
                //     },
                //     returning: true
                // })
                // currentCart = data
                // Product.findOne({
                //     where: {
                //         id: req.params.id
                //     }
                // })
                // .then(product => {
                //     if(product.stock > currentCart.quantity ) {}
                // })
            } else {
                return Cart.create(newCart)
            }
        })
        .then(cart => {
            res.status(201).json(cart)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static fetchCarts (req, res) {
        Cart.findAll({
            where:{
                UserId: req.loggedIn.id
            },
            include: [Product],
            order: [['createdAt', 'ASC']]
        })
        .then(carts => {
            //loopping
            res.status(200).json(carts)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static deleteCart (req, res) {
        Cart.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(_ => {
            res.status(200).json({message: 'Delete success'})
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static updateCart (req, res) {
        Cart.update({quantity: req.body.quantity},{
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            res.status(200).json({message: 'Update success'})
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static checkoutCart (req, res) {
        let totalCart = null;
        let totalProduct = null
        Cart.update({status: false}, {
            where: {
                UserId: req.loggedIn.id,
                status: true
            },
            returning: true
        })
        .then(data => {
            // console.log(data[1][0].dataValues, '===+')
            // return Product.update({})
            totalCart = data[1]
             for (let i = 0 ; i < totalCart.length; i++) {
                Product.findOne({
                    where: {
                        id: totalCart[i].ProductId
                    }
                })
                .then(product => {
                    return Product.update({
                        stock: product.stock - totalCart[i].quantity
                    }, {
                        where: {
                            id: totalCart[i].ProductId
                        }
                    })
                })
                .then(result => {
                    console.log(result, 'XXXXX')
                    res.status(200).json({message: 'Checkout success'})
                })
                .catch(err => {
                    res.status(500).json(err)
                })
             }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = CartController