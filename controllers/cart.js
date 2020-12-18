const {Cart, Product, History} = require('../models')

class CartController {

    static async fetchCartProduct (req, res, next) {
        try {
            let UserId = +req.loggedInUser.id
            const data = await Cart.findAll({where:{UserId, status: false}, include: Product})
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
                {where:{UserId: payload.UserId, ProductId: payload.ProductId, status: false}, 
                include:Product})
            if (stock >= payload.quantity) {
                if (checkProduct){
                    let quantity = checkProduct.quantity + payload.quantity
                    if (quantity <= stock) {
                        if (quantity == 0) {
                            const data = await Cart.destroy({where:{UserId: payload.UserId, ProductId: payload.ProductId}})
                            res.status(200).json({message: 'Product Deleted Successfuly'})
                        } else {
                            const data = await Cart.update(
                                {quantity}, 
                                {where:{UserId: payload.UserId, ProductId: payload.ProductId, status: false}, 
                                returning:true})
                            res.status(200).json(data[1][0])
                        }
                    } else {
                        throw{
                            status: 400,
                            message: `Product Quantity is min 1 and max ${stock}`
                        }
                    }
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
            let data = await Cart.destroy({where:{id, status: false}})
            res.status(200).json({message: 'Product Deleted Successfuly'})
        } catch (error) {
            next(error)
        }
    }

    static async checkout (req, res, next) {
        try {
            let UserId = +req.loggedInUser.id
            let updateCarts = []
            let updateProducts = []
            let updateHistory = []
            let cart = await Cart.findAll({where:{UserId, status:false}, include: Product})
            cart.forEach(e => {
                if (!e.status && e.Product.stock >= e.quantity) {
                    let updateStatus = {status: true}
                    let updateStock = {stock: e.Product.stock - e.quantity}
                    updateCarts.push(Cart.update(updateStatus, {where:{id: e.id}}))
                    updateProducts.push(Product.update(updateStock, {where:{id: e.ProductId}}))
                    updateHistory.push(History.create({
                        name: e.Product.name,
                        image_url: e.Product.image_url,
                        price: e.Product.price,
                        quantity: e.quantity,
                        UserId: +req.loggedInUser.id
                    }))
                } else {
                    throw{
                        status: 400,
                        message: 'Stock not enough'
                    }
                }
            })
            let checkout = await Promise.all(updateProducts, updateCarts, updateHistory)
            res.status(200).json({message: 'Cart Checkout Successfuly'})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CartController