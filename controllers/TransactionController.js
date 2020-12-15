const { Transaction, Product } = require('../models')

class TransactionController{
    static listTransactions(req, res, next){
        Transaction.findAll({
            include: Product
        },
        {
            where: {
                UserId: req.loginUser.id
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(e => next(e))
    }
    static addTransaction(req, res, next){
        const productId = req.params.productId
        const obj = {
            UserId: req.loginUser.id,
            ProductId: productId,
            quantity: req.body.quantity
        }
        Transaction.create(obj)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(e => next(e))
    }
}

module.exports = TransactionController