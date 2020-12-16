const {Cart, Product} = require('../models')

class CartController {

    static async fetchCartProduct (req, res, next) {
        try {
            let UserId = +req.loggedInUser.id
            const data = await Cart.findAll({where:{UserId}, include: Product})
            let totalPrice = 0
            data.forEach(e => {
                totalPrice += e.quantity * e.Product.price;
            })
            res.status(200).json({products: data, totalPrice})
        } catch (error) {
            next(error)
        }
    }

    static async updateOrAddCart (req, res, next) {
        try {
            let payload = {
                UserId: +req.loggedInUser.id,
                ProductId: +req.params.idProduct,
                quantity: +req.body.quantity,
                status: false
            }
            let checkStock = await Product.findOne({where:{id: payload.ProductId}})
            let stock = +checkStock.stock
            let checkProduct = await Cart.findOne(
                {where:{UserId: payload.UserId, ProductId: payload.ProductId}, 
                include:Product})
            if (stock >= payload.quantity && payload.quantity > 0) {
                if (checkProduct){
                    const data = await Cart.update(
                        {quantity: payload.quantity}, 
                        {where:{UserId: payload.UserId, ProductId: payload.ProductId}, 
                        returning:true})
                    res.status(200).json(data[1][0])
                } else {
                    const data = await Cart.create(payload)
                    res.status(201).json(data)
                }
            } else if (stock === 0) {
                throw{
                    status: 400,
                    message: `Sold Out`
                }
            } else {
                throw{
                    status: 400,
                    message: `Product Quantity is min 1 and max ${stock}`
                }
            }
        } catch (error) {
            next(error)
        }
    }

    static async delCartProduct (req, res, next) {
        try {
            let id = +req.params.idCart
            let data = await Cart.destroy({where:{id}})
            res.status(200).json({message: 'Product Deleted Successfuly'})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CartController