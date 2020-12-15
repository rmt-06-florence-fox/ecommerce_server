const {Product, User, Cart} = require('../models/index')

class CartRouter {
    static async getCart (req, res, next) {
        try {
            let data = await Cart.findAll({
                where: {
                    UserId = req.userLoggedIn.id
                }
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async addCart (req, res, next) {
        try {
            let obj = {
                UserId: req.userLoggedIn.id,
                ProductId :req.body.ProductId,
                quantity: req.body.quantity
            }
            
            let data = await Cart.findOne({
                include:{
                    model: Product
                },
                where: {
                    UserId: obj.UserId,
                    ProductId : obj.ProductId
                }
            })
            //kalau belum ada
            if(!data) {
                //cek stocknya masih ada atau tidak
                if(data.quantity <= data.Product.stock) {
                    let cart = await Cart.create(obj)
                    res.status(201).json(data)
                } else {
                    throw({
                        status: 400,
                        message: 'stock not available'
                    })
                }
            } 
            //kalau sudah ada
            else {
                if(data.quantity <= data.Product.stock) {
                    let cart = await Cart.update({
                        quantity: data.quantity += 1,
                        returning: true
                    })
                    res.status(200).json(data[1][0])
                } else {
                    throw({
                        status: 400,
                        message: 'stock not available'
                    })
                }
            }
        } catch (error) {
            next(error)
        }
    }
    static async editQuantity (req, res, next) {
        try {
            let id = req.params.id
            let data = await Cart.update({stock: req.body.stock}, {
                where: {
                    id
                },
                returning: true
            })
            res.status(200).json(data[1][0])
        } catch (error) {
            next(error)
        }

    }
    static async deleteFromCart (req, res, next) {
        try {
            let id = req.params.id
            let data = await Cart.destroy({
                where: {
                    id
                }
            })
            res.status(200).json({message: `delete success`})
        } catch (error) {
            next(error)
        }
    }
}
module.exports = CartRouter