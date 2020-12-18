const { Cart, Product } = require('../models/index')
const { Op } = require("sequelize")

class CartController {
    static async getCarts(req, res, next){
        try {
            const data = await Cart.findAll({
                where: {
                  UserId: req.loggedInUser.id
                },
                include: [Product],
                order: [['id', 'ASC']]
            })
            res.status(200).json(data)
            
        } catch (error) {
            next(error)
        }
    }

    static async addCart(req, res, next){
        const newCart = {
          quantity: 1,
          UserId: +req.loggedInUser.id,
          ProductId: +req.body.ProductId
        }
        try {
          const data = await Cart.findOne({
            where: {
              [Op.and]: [{UserId: newCart.UserId}, {ProductId: newCart.ProductId}]
            },
            include: [Product]
          })
          if(data){
            if(data.quantity < data.Product.stock){
                const id = data.dataValues.id
                const updateData = {
                  quantity: data.dataValues.quantity + 1
                }
                const data2 = await Cart.update(updateData,{
                  where:{
                      id: id
                  },
                  returning: true
                })
                res.status(200).json(data2[1][0])
            }else{
                throw {
                    status: 400,
                    message: 'No more stock'
                }
            }
          }else{
            const data2 = await Cart.create(newCart)
            res.status(201).json(data2)
          }
        } catch (error) {
          next(error)
        }
    }

    static async removeCart(req, res, next){
        try {
            const data = await Cart.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({message: 'Success to delete'})
        } catch (error) {
            next(error)
        }
    }

    static async updateCart(req, res, next) {
          try {
            const data = await Cart.findOne({
              where: {
                id: req.body.cartId
              },
              include: [Product]
            })
            console.log(data.quantity)
            const id = data.dataValues.id
            let updateData = {
              quantity: null
            }
            if(data.quantity === 1 && req.body.addOrRemove == 'remove' || data.quantity >= data.Product.stock && req.body.addOrRemove == 'add'){
                throw {
                  status: 400,
                  message: 'No more stock'
                }
            }
            if(data.quantity < data.Product.stock && req.body.addOrRemove == 'add'){
                updateData = {
                quantity: data.dataValues.quantity + 1
                }
            }
            else if(data.quantity > 1 && req.body.addOrRemove == 'remove') {
                updateData = {
                quantity: data.dataValues.quantity - 1
                }
             }
            const data2 = await Cart.update(updateData,{
            where:{
                id: id
            },
            returning: true
            })
            res.status(200).json(data2[1][0])
            
          } catch (error) {
            next(error)
          }
    }
}

module.exports = CartController