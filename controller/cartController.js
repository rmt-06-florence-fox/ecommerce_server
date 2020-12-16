const {User, Product, Cart} = require('../models/index')

class CartController{
    static async create(req, res, next) {
        try {
            const cart = await Cart.findOne({where: {
                UserId: +req.loginUser.id,
                ProductId: +req.body.ProductId
            }})
            if (cart) {
                const product = await Product.findByPk(cart.ProductId)
                if (!product) {
                    throw{
                        status: 404,
                        message: 'data not found'
                    }
                }
                const quantity = cart.quantity + 1
                const obj = {
                    UserId: +req.loginUser.id,
                    ProductId: +req.body.ProductId,
                    quantity: quantity
                }
                const newCart = await Cart.update(obj, {
                    where: {
                        UserId: +req.loginUser.id,
                        ProductId: +req.body.ProductId
                    }, returning: true
                })
                console.log(newCart[1][0].dataValues);
                res.status(201).json(newCart[1][0].dataValues)
            }else{
                const id = +req.body.ProductId
                const product = await Product.findByPk(id)
                if (!product) {
                    throw{
                        status: 404,
                        message: 'data not found'
                    }
                }
                const obj = {
                    UserId: +req.loginUser.id,
                    ProductId: +req.body.ProductId,
                    quantity: 1
                }
                const newCart = await Cart.create(obj)
                res.status(201).json(newCart)
            }
        } catch (error) {
            console.log(error, '<<<<<<<<<<<');
            next(error)
        }
    }
    static async patch(req, res, next){
        const quantity = +req.body.quantity
        try {
            const cart = await Cart.findOne({where: {
                UserId: +req.loginUser.id,
                ProductId: +req.body.ProductId
            }})
            if (!cart) {
                throw{
                    status: 404,
                    message: 'data not found'
                }
            }
            const product = await Product.findByPk(cart.ProductId)
            if (!product) {
                throw{
                    status: 404,
                    message: 'data not found'
                }
            }
            if (quantity + cart.quantity > product.stock) {
                throw {
                    status: 401,
                    message: 'Stock not already yet'
                }
            }else if (quantity + cart.quantity < 0) {
                throw {
                    status: 401,
                    message: 'Quantity cannot 0'
                }
            }else{
                const newQuantity = quantity + cart.quantity
                const newQuantityCart = await Cart.update({quantity: newQuantity}, {where: {
                    UserId: +req.loginUser.id,
                    ProductId: +req.body.ProductId
                }, returning: true})
                res.status(201).json(newQuantityCart[1][0].dataValues)
            }
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    static async getAll(req, res, next){
        try {
            const cart = await Cart.findAll({
                where: {
                    UserId: +req.loginUser.id
                },
                include: [{
                    model: User
                  },
                {
                    model: Product
                }]
            })
            res.status(200).json(cart)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    static remove(req, res, next){
        const id = +req.params.cartId
        Cart.findByPk(id)
         .then(value => {
            if (!value) {
                throw {
                    status: 404,
                    message: `data not found`
                }
             }else{
                return Cart.destroy({
                    where: {id : id},
                  })
             }
         })
         .then(value => {
            res.status(201).json(`Cart succes to delete`)
        })
        .catch(error => {
            next(error)
        })
    }
    static async getById(req, res, next){
        try {
            const id = req.params.cartId
            const cart = await Cart.findByPk(id,
                {include: [{
                    model: User
                  },
                {
                    model: Product
                }]})
            if (!cart) {
                throw {
                    status: 404,
                    message: `data not found`
                }
            }else{
                res.status(200).json(cart)
            }
        } catch (error) {
            next(error)
        }
    }
}
module.exports = CartController