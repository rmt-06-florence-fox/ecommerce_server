const { UserProduct, Product, sequelize } = require('../models')

class UserProductController{
    static listCart(req, res, next){
        UserProduct.findAll({
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
    static addCart(req, res, next){
        const productId = req.params.productId
        const obj = {
            UserId: req.loginUser.id,
            ProductId: productId,
            quantity: 1
        }
        UserProduct.create(obj)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(e => next(e))
    }
    static editCart(req, res, next){
        const productId = req.params.productId
        UserProduct.update({
            quantity: sequelize.literal('quantity + 1')
        }, {
            where: {
                ProductId: productId,
                UserId: req.loginUser.id
            },
            returning: true
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(e => next(e))
    }
    static deleteCart(req, res, next){
        UserProduct.destroy({
            where: {},
            truncate: true
        })
        .then(data => {
            res.status(200).json({message: `cart successfully deleted`})
        })
        .catch(e => next(e))
    }
}

module.exports = UserProductController