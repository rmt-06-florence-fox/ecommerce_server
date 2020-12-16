const { Transaction, Product, sequelize, UserProduct} = require('../models')

class TransactionController{
    static listTransactions(req, res, next){
        Transaction.findAll({
            where: {
                UserId: req.loginUser.id
            },
            include: Product,
            order: [['updatedAt', 'ASC']]
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(e => next(e))
    }
    static async checkoutData(req, res, next){
        const t = await sequelize.transaction()
        try {
            const listCarts = await UserProduct.findAll({
                where: {
                    UserId: req.loginUser.id
                },
                include: Product
            })
            let promiseAll = []
            for (let i=0; i<listCarts.length; i++) {
                let obj = {
                    UserId: listCarts[i].UserId,
                    ProductId: listCarts[i].ProductId,
                    quantity: listCarts[i].quantity
                }
                let decreaseStock = {
                    stock: listCarts[i].Product.stock - listCarts[i].quantity
                }
                promiseAll.push(Transaction.create(obj, {
                    transaction: t
                }))
                promiseAll.push(Product.update(decreaseStock, {
                    where: {
                        id: listCarts[i].ProductId
                    },
                    returning: true,
                    transaction: t
                }))
                promiseAll.push(UserProduct.destroy({
                    where: {
                        id: listCarts[i].id
                    }
                }))
            }
            await Promise.all(promiseAll)
            await t.commit()
            res.status(200).json(promiseAll)
        } catch (e){
            await t.rollback()
            next(e)
        }
    }
}

module.exports = TransactionController