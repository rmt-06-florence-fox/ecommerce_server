const { Cart, Product } = require('../models')

class CartController {
    static async addUpdateCart (req, res, next) {
        try {
            const product = await Product.findByPk(req.params.productId)
            const payload = {
                ProductId: product.id,
                CustomerId: req.loggedInUser.id,
                quantity: req.body.quantity,
                status: 'unpaid'
            }
            if (!product) {
                throw { status: 400, message: 'invalid product id' }
            }
            else if (product.stock < req.body.quantity) {
                throw { status: 400, message: `${product.name} is out of stock` }                
            }
            else {            
                const cart = await Cart.findOne({
                    where: {
                        CustomerId: req.loggedInUser.id,
                        ProductId: payload.ProductId,
                        status: 'unpaid'
                    }
                })
                if (!cart) {
                    const newCart = await Cart.create(payload)
                    res.status(201).json(newCart)                                        
                }
                else if (payload.ProductId === cart.ProductId) {
                    payload.quantity = cart.quantity + 1
                    const updatedCart = await Cart.update(payload, { where: { id: cart.id }, returning: true })
                    res.status(200).json(updatedCart)                                        
                }
            }
        } catch (error) {
            next(error)
        }            
    }

    static async showCart (req, res, next) {
        try {
            const carts
                = await Cart.findAll({
                    order: [['id', 'ASC']],
                    where: {
                        CustomerId: req.loggedInUser.id,
                        status: 'unpaid'
                    },
                    include : [{
                        model: Product
                    }]  
                })
            res.status(200).json(carts)            
        } catch (error) {
            next(error)
        }
    }

    static async removeCart (req, res, next) {
        try {
            Cart.destroy({
                where: { id: req.params.id }
            })
            res.status(200).json({message: 'cart succes to delete'})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CartController