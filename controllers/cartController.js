const {
    Cart
} = require('../models')

class CartController {
    static carts(req, res, next) {
        Cart.findAll({
                where: {
                    UserId: req.userLogin.id
                },
                order: [
                    ['id', 'ASC']
                ]

        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static addCarts(req, res, next) {
        const obj = {
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            quantity: req.body.quantity,
            UserId: req.userLogin.id,
            ProductId: req.body.ProductId
        }
        Cart.findOne({
                where: {
                    UserId: obj.UserId,
                    ProductId: obj.ProductId
                }
            })
            .then(data => {
                console.log(data, 'ini data di add');
                if (!data) {
                    return Cart.create(obj)
                } else {
                    // console.log(data);
                    return Cart.increment('quantity', {
                        where: {
                            id: data.id
                        }
                    })
                }
            })
            .then(result => {
                res.status(200).json({
                    msg: 'Data added/updated to carts'
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static decrementCarts(req, res, next){
        const obj = {
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            quantity: req.body.quantity,
            UserId: req.userLogin.id,
            ProductId: req.body.ProductId
        }
        console.log(obj, '??oo?');

        Cart.findOne({
                where: {
                    UserId: obj.UserId,
                    ProductId: obj.ProductId
                }
            })
            .then(data => {
                console.log(data, 'ini data di add');
                if (!data) {
                    return Cart.create(obj)
                } else {
                    // console.log(data);
                    return Cart.decrement('quantity', {
                        where: {
                            id: data.id
                        }
                    })
                }
            })
            .then(result => {
                res.status(200).json({
                    msg: 'Data updated to carts'
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteCarts(req, res, next) {
        Cart.destroy({
                where: {
                    id: +req.params.id
                }
            })
            .then(_ => {
                res.status(200).json({
                    msg: 'Data has been deleted'
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static cartsProductId(req, res, next){
        Cart.findOne({
            where: {
                ProductId: +req.params.ProductId
            }
        })
            .then(data => {
                // console.log(data)
                res.status(200).json(data)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

module.exports = CartController