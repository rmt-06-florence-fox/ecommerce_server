const {Cart} = require('../models')
const { Op } = require("sequelize")

class CartController {

    static async getCart (req,res,next) {
        const userId = req.loginUser.id
        console.log(userId,'<<<< Login')
        try {
            const getAllCart = await Cart.findAll({
                where: {
                    UserId:userId
                },
                include: ['Product']
            })
            res.status(200).json(getAllCart)
        } catch (error) {
            next(error)            
        }
    }

    static async addCart(req,res,next) {
        const userId = req.loginUser.id
        const productId = req.params.id
        const newCart = {
            UserId: userId,
            ProductId:productId,
            quantity: 1
        }

        try {
            const findCart = await Cart.findOne({
                where: {
                    ProductId: productId
                }
            })

            if(findCart) {
                console.log('======== Sudah ada =====')
                console.log(findCart.dataValues.quantity)
                const newQuantity = findCart.dataValues.quantity + 1
                console.log(newQuantity)

                const updatedQuantity = {
                    quantity: newQuantity
                }
                console.log(updatedQuantity)

                const updateQuantity = await Cart.update(updatedQuantity, {
                    where: {
                        [Op.and] :[
                            {UserId: userId},
                            {ProductId: productId}
                        ]
                    },
                    returning: true
                })
                console.log(updateQuantity)

                res.status(200).json(updateQuantity[1])
            }else {
                console.log('======= Data Baru========')
                const createCart = await Cart.create(newCart)
                res.status(200).json(createCart)
            }

        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async editQuantity(req,res,next) {
            const id = req.params.cartId 
            const quantity = req.body.quantity       

        try {
            const findCart = await Cart.findOne({
                where: {
                    id
                },
                include: ['Product']
            })
            if (findCart) {
                if(quantity > +findCart.dataValues.Product.stock ){
                    throw {
                        status: 400,
                        msg: 'wrong ammount of quantity'
                    }
                } else {
                    const updatedQuantity = {
                        quantity
                    }
                    console.log(updatedQuantity,'update')            
                    const updateQuantity = await Cart.update(updatedQuantity, {
                        where: {
                            id
                        },
                        returning: true
                    })
                    console.log(updateQuantity,'add')
                    res.status(200).json(updateQuantity)
                }
            } else {
                res.status(404).json({
                    msg : 'data not found'
                })
            }



        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async destroyCart(req,res,next) {
        const id = req.params.cartId

        try {
            const deleteProduct = await Cart.destroy({
                where: {
                    id
                }
            })
            res.status(200).json({
                msg: 'success delete cart'
            })
        } catch (error) {
            next(error)
        }
    }
    
}

module.exports = CartController