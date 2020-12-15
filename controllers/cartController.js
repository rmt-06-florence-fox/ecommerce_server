const { Cart, Product, sequelize } = require('../models')

class CartController {
    static async showCart ( req, res, next) {
        try {
            const UserId = req.loggedIn.id
            const carts = await Cart.findAll({
                where: {
                    UserId,
                    status: 'Unpaid'
                },
                include: Product,
                order: [['createdAt', 'ASC']]
            })
            res.status(200).json(carts)
        }
        catch(err) {
            next(err)
        }
    }

    static async addToCart ( req, res, next ) {
        try {
            const UserId = req.loggedIn.id
            const { ProductId } = req.body
            const newItem = await Cart.create({
                UserId, ProductId, amount: 1, status: 'Unpaid'
            })
            res.status(201).json(newItem)
        }
        catch(err) {
            next(err)
        }
    }

    static async updateMount (req, res, next) {
        try {
            let nowAmount 
            const UserId = req.loggedIn.id
            const ProductId = req.params.id
            const total = req.body.total
            const cart = await Cart.findOne({
                where: {
                    UserId, ProductId
                }
            })
            if(total) {
                nowAmount = Number(cart.amount) + 1
            }
            else {
                nowAmount = Number(cart.amount) - 1
            }
            await Cart.update({
                amount: nowAmount
            }, {
                where: {
                    UserId, ProductId
                }
            })
            res.status(200).json({ message: 'Update cart success'})
        }
        catch(err) {
            next(err)
        }
    }

    static async deleteItem ( req, res, next ) {
        try {
            const UserId = req.loggedIn.id
            const ProductId = req.params.id
            await Cart.destroy({
                where: {
                    UserId, ProductId, status: 'Unpaid'
                }
            })
            res.status(200).json({ message: 'Delete cart success'})
        }
        catch(err) {
            next(err)
        }
    }

    static async history ( req, res, next ) {
        try {
            const UserId = req.loggedIn.id
            const carts = await Cart.findAll({
                where:{
                    UserId, status: 'Paid'
                } ,
                include: Product,
                order: [['updatedAt', 'DESC']]
            })
            res.status(200).json(carts)
        }
        catch(err) {
            next(err)
        }
    }

    static async checkout (req, res, next) {
        try {
            const UserId = req.loggedId.id
            const t = await sequelize.transaction()
            const cart = await Cart.findAll({
                where: {
                    UserId, status: 'Unpaid'
                }
            }, {
                transaction: t
            })
            for (const item of cart) {
                const product = await Product.findByPk(item.ProductId)
                if(item.amount > product.stock) {
                    throw {name: 'MaximumAmountExceeded'}
                }
                else {
                    let stock = product.stock - item.amount
                    await Product.update({stock}, {where: {id: item.ProductId}})
                    await Cart.update({status: 'Paid'}, {where: { UserId, ProductId: item.ProductId, status: 'Unpaid'}})
                }
            }
            console.log('harusnya sampe checkout controller')
            t.afterCommit(() => {
                console.log('kalo ini?')
                return res.status(200).json({message: 'Success update stock'})
            })
            await t.commit()
        }
        catch(err){
        console.log(err)
        await t.rollback()
        next(err)
        }
    }
}

module.exports = CartController