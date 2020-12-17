const { Cart, CartProduct, Product } = require('../models')

class cartController {
    static async readUserCart(request, response, next) {
        const userId = request.loggedInUser.id

        try {
            let cart = await Cart.findOne({
                where: {
                    UserId: userId,
                    status: 'on-process'
                },
                include: [{ model: CartProduct, include: Product }]
            })
            if (!cart) {
                throw ({ name: 'EmptyCart' })
            }
            else {
                response.status(200).json({ cart })
            }
        } catch (error) {
            console.log("Error reading user cart!", error);
            next(error)
        }
    }

    static async removeItem(request, response, next) {
        const productId = request.params.id
        const cartId = request.body.cartId

        try {
            const deletedItem = await CartProduct.destroy({ 
                where: { 
                    CartId: cartId, 
                    ProductId: productId 
                } 
            })
            console.log(deletedItem)
            response.status(200).json({ 
                message: 'Successfully deleted item from cart.' 
            })
        } catch (error) {
            console.log("Error while removing item!",error)
            next(error)
        }
    }

    static async addToCart(request, response, next) {
        const productId = request.body.productId

        try {
            const checkProduct = await Product.findOne({ 
                where: { 
                    id: productId 
                } 
            })
            if (!checkProduct) {
                throw ({ name: 'NotFound' })
            }
            else {
                const foundCart = await Cart.findOrCreate({
                    where: {
                        UserId: request.loggedInUser.id,
                        status: 'on-process'
                    }
                })
                const existInCart = await CartProduct.findOrCreate({
                    where: {
                        CartId: foundCart[0].id,
                        ProductId: productId
                    },
                })
                existInCart[0].quantity += 1
                existInCart[0].save()
                console.log("EXIST CART QUANTITY ",existInCart[0].quantity += 1);
                response.status(201).json({
                    CartId: foundCart[0].id,
                    CartProductId: existInCart[0].id
                })
            }
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async updateQuantity(request, response, next) {
        const productId = +request.params.id
        const itemQuantity = Number(request.body.itemQuantity)

        try {
            const itemInCart = await CartProduct.findOne({ 
                where: { 
                    ProductId: productId 
                } 
            })
            itemInCart.quantity = itemInCart.quantity + itemQuantity
            itemInCart.save()
            response.status(200).json({ 
                message: 'Successfully update item quantity.' 
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = cartController;