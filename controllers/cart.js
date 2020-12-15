const {Cart, Product} = require('../models')

class ControllerCart {

    static async getCart (req, res, next) {
        try {
            let UserId = req.user.id
            const data = await Cart.findAll({ where: { UserId }, include: [Product] })
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
                Qty: req.body.Qty
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
            const deleted = await Cart.destroy({where: {ProductId}})
            if(deleted){
                res.status(200).json({message: 'Product removed from cart'})
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

}

module.exports = ControllerCart