const { Product , Cart, sequelize, History } = require('../models')

class CartController{
    static async getCart(req,res,next){
        try {
            const cart = await Cart.findAll({
                where:{
                    UserId: req.loggedInUser.id
                },
                attributes: {
                    exclude: ['createdAt','updatedAt']
                },
                include: [Product]
            })
            res.status(200).json({cart})
        } catch (err) {
            next(err)
        }
    }
    static async postCart(req,res,next){
        let productId = req.params.productId
        try {
            const [cart,created] = await Cart.findOrCreate({
                where:{
                    UserId : req.loggedInUser.id,
                    ProductId : productId
                },
                defaults:{
                    quantity: 1
                }
            })
            if (created) {
                res.status(201).json({cart})
            }else{
                const product = await Product.findOne({
                    where:{
                        id: productId
                    }
                })
                if(product.stock > cart.quantity){
                    const updated = await Cart.increment(['quantity'],{
                        by:1,
                        where: {
                            UserId : req.loggedInUser.id,
                            ProductId : productId
                        }
                    })
                    res.status(200).json({cart: updated})
                }else{
                    throw{
                        status: 400,
                        message: 'cannot add more to the cart'
                    }
                }
            }
        } catch (err) {
            next(err)
        }
    }
    static async patchCart(req,res,next){
        const value = +req.body.value
        try {
            const cart = await Cart.findOne({
                where:{
                    id: req.params.cartId
                }
            })
            const product = await Product.findOne({
                where:{
                    id: cart.ProductId
                }
            })
            if(cart.quantity > product.stock){
                await Cart.update({
                    quantity: product.stock
                },{
                    where:{
                        id: cart.id
                    }
                })
            }
            if((product.stock - cart.quantity - value) >= 0 && (product.stock - cart.quantity - value) < product.stock){
                await Cart.increment(['quantity'],{
                    by: value,
                    where:{
                        UserId: req.loggedInUser.id,
                        ProductId: cart.ProductId
                    }
                })
                res.status(200).json([1])
            }else if((product.stock - cart.quantity - value) == product.stock){
                await Cart.destroy({
                    where:{
                        id: cart.id,
                        UserId: req.loggedInUser.id,
                        ProductId: cart.ProductId
                    }
                })
                res.status(200).json({message: 'cart has been destroyed'})
            }else{
                res.status(400).json({message: 'cannot add/reduce quantity'})
            }
        } catch (err) {
            next(err)
        }
    }
    static async deleteCart(req,res,next){
        try {
            await Cart.destroy({
                where: {
                    id: req.params.cartId
                }
            })
            res.status(200).json({message: 'cart successfully deleted'})
        } catch (err) {
            next(err)
        }
    }
    static async checkout(req,res,next){
        let t;
        try {
            const carts = await Cart.findAll({
                where:{
                    UserId: req.loggedInUser.id
                }
            })
            t = await sequelize.transaction()
            for(let i = 0; i < carts.length; i++){
                const product = await Product.findOne({
                    where:{
                        id: carts[i].ProductId
                    },
                    transaction: t
                })
                await Product.update({
                    stock: product.stock - carts[i].quantity
                },{
                    where:{
                        id: carts[i].ProductId
                    },
                    transaction: t
                })
                await History.create({
                    UserId: req.loggedInUser.id,
                    name: product.name,
                    image_url: product.image_url,
                    quantity: carts[i].quantity,
                    price: product.price,
                    total: carts[i].quantity * product.price
                },{
                    transaction: t
                })
                await Cart.destroy({
                    where:{
                        UserId: req.loggedInUser.id
                    },
                    transaction: t
                })
            }
            t.commit()
            res.status(200).json({message: 'success'})
        } catch (err) {
            if(t) await t.rollback()
            next(err)
        }
    }
    static async getHistory(req,res,next){
        try {
            const histories = await History.findAll({
                where:{
                    UserId: +req.loggedInUser.id
                },
                attributes: {
                    exclude: ['id','updatedAt']
                }
            })
            res.status(200).json({histories})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = CartController