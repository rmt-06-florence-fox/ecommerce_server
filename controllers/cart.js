const {Cart, Product} = require('../models')

class CartController {
    static async addToCart (req, res, next) {
        try {
            let payload = {
                UserId: +req.loggedInUser.id,
                ProductId: +req.params.idProduct,
                quantity: +req.body.quantity,
                status: 'Unpaid'
            }
            let checkProduct = await Cart.findOne({where:{UserId: payload.UserId, ProductId: payload.ProductId}})
            if(!checkProduct) {
                const data = await Cart.create(payload)
                res.status(201).json(data)
            } else {
                throw{
                    status: 400,
                    message: 'Product is already in the cart.'
                }
            }
        } catch (error) {
            next(error)
        }
    }

    static async fetchCartProduct (req, res, next) {
        try {
            let UserId = +req.loggedInUser.id
            const data = await Cart.findAll({where:{UserId}})
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async updateQuantity (req, res, next) {
        try {
            let UserId = +req.loggedInUser.id
            let ProductId = +req.params.idProduct
            let quantity = +req.body.quantity
            let checkStock = await Cart.findOne({where:{UserId, ProductId}, include:Product})
            let stock = +checkStock.Product.stock
            if (stock > quantity){
                const data = await Cart.update({quantity}, {where:{UserId, ProductId}, returning:true})
                res.status(200).json(data[1][0])
            } else {
                throw{
                    status: 400,
                    message: `Max Product Quantity is ${stock}`
                }
            }
        } catch (error) {
            next(error)
        }
    }

    static async delCartProduct (req, res, next) {
        try {
            let UserId = +req.loggedInUser.id
            let ProductId = +req.params.idProduct
            let data = await Cart.destroy({where:{UserId, ProductId}})
            res.status(200).json({message: 'Product Deleted Successfuly'})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CartController