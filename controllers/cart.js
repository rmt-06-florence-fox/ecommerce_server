const { where } = require('sequelize')
const {Cart, Product} = require('../models')

class ControllerCart {

    static async getCart (req, res, next) {
        try {
            let UserId = req.user.id
            const data = await Cart.findAll({ where: { UserId, status: 'unpaid' }, include: [Product] })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async addToCart (req, res, next) {
        
        try {
            let UserId = req.user.id
            let data = {
                ProductId: req.params.id,
                UserId,
                Qty: req.body.Qty,
                status: 'unpaid'
            }
            const find = await Cart.findOne({where: {ProductId: data.ProductId}})
            if(find){
                data.Qty = +data.Qty + find.Qty
                console.log(data.Qty);
                const Qty = await Cart.update({Qty: data.Qty }, {where: {ProductId: req.params.id}})
                const showData = await Cart.findOne({where: {ProductId: data.ProductId}})
                res.status(200).json(showData)
            } else {
                const added = await Cart.create(data)
                res.status(201).json(added)
            }
            
        } catch (err) {
            next(err)
        }
    }

    static async deleteCartItem (req, res, next) {
        try {
            let ProductId = req.params.id
            const find = await Cart.findOne({where: {ProductId}})
            if(find){
                const deleted = await Cart.destroy({where: {ProductId}})
                if(deleted){
                    res.status(200).json({message: 'Product removed from cart'})
                }
            } else {
                throw{
                    status: 404,
                    message: 'Product not found in the cart'
                }
            }
        } catch (err) {
            next(err)
        }
    }

    static async updateProduct (req, res, next) {
        try {
            let Qty = {Qty: req.body.Qty}
            const qty = await Cart.update(Qty, {where: {ProductId: req.params.id}})
            res.status(200).json({qty})
        } catch (err) {
            next(err)
        }
    }

    static async checkout (req, res, next) {
        try {
            let UserId = req.user.id
            const checkout = await Cart.findAll({where: {UserId}})
            if(checkout){
                let status = {
                    status: 'paid'
                }
                const changeStat = await Cart.update(status, {where: {UserId}})
                res.status(200).json({message: 'Successfully to checkout'})
            } else {
                throw {
                    status: 400,
                    message: 'fail to get data'
                }
            }
        } catch (err) {
            next(err)
        }
    }

    static async history (req, res, next) {
        try {
            let UserId = req.user.id
            const data = await Cart.findAll({ where: { UserId, status: 'paid' }, include: [Product] })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

}

module.exports = ControllerCart