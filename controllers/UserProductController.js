const { UserProduct, Product, sequelize } = require('../models')

class UserProductController{
    static listCart(req, res, next){
        UserProduct.findAll({
            where: {
                UserId: req.loginUser.id
            },
            include: Product
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(e => next(e))
    }
    static addCart(req, res, next){
        const data = req.body
        const productId = req.params.productId
        let status = 'notFound'
        UserProduct.findOne({
            where: {
                UserId: req.loginUser.id,
                ProductId: productId
            }
        })
        .then(list => {
            console.log(list)
            if (!list) {
                const obj = {
                    UserId: req.loginUser.id,
                    ProductId: productId,
                    quantity: 1
                }
                return UserProduct.create(obj)
            } else {
                if (list.ProductId === data.id) {
                    if (list.quantity === data.stock) {
                        throw {
                            status: 400,
                            message: 'you can not order more than available stock'
                        }
                    } else {
                        status = 'patch'
                        return UserProduct.update({
                            quantity: sequelize.literal('quantity + 1')
                        }, {
                            where: {
                                ProductId: productId,
                                UserId: req.loginUser.id
                            },
                            returning: true
                        })
                    }
                }
            }
        })
        .then(data => {
            if (status == 'notFound') {
                res.status(201).json(data)
            } else {
                res.status(200).json(data)
            }
            
        })
        .catch(e => next(e))
    }
    static editCart(req, res, next){
        const productId = req.params.productId
        let status = ''
        if (req.body.status == 'increment') {
            status = 'quantity + 1'
        } else {
            status = 'quantity - 1'
        }
        UserProduct.update({
            quantity: sequelize.literal(status)
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
    static deleteId(req, res, next){
        const id = req.params.id
        UserProduct.destroy({
            where: {
                id
            }
        })
        .then(data => {
            res.status(200).json({message: 'cart successfully deleted'})
        })
        .catch(e => next(e))
    }
}

module.exports = UserProductController