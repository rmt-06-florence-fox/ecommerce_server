const { UserProduct, Product } = require('../models')

class ControllerUserProduct {

    static showDataUserProduct (req, res, next) { // nampilin data yang dimiliki Customer
        let idUser = req.dataUser.id
        UserProduct.findAll({
            where: {
                UserId: idUser,
                status: false
            },
            include: Product,
            order: [['createdAt', 'ASC']]
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static addDataUserProduct (req, res, next) {
        let idUser = req.dataUser.id
        let productId = req.params.id
        let quantity = 1
        let status = false
        let objUserProduct = {
            UserId: idUser,
            ProductId: productId,
            quantity,
            status
        }
        UserProduct.create(objUserProduct)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static incrementQuantityDataUserProduct (req, res, next) {
        let id = req.params.id
        UserProduct.increment('quantity', {
            by: 1,
            where: {
                id
            }
        })
            .then(data => {
                res.status(200).json({ message: 'Success increment stock'})
            })
            .catch(err => {
                next(err)
            })
    }

    static decrementQuantityDataUserProduct (req, res, next) {
        let id = req.params.id
        UserProduct.decrement('quantity', {
            by: 1,
            where: {
                id
            }
        })
            .then(data => {
                res.status(200).json({ message: 'Success decrement stock'})
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteDataUserProduct (req, res, next) {
        let id = req.params.id
        let UserId = req.dataUser.id
        UserProduct.destroy({
            where: {
                id,
                UserId,
                status: false
            }
        })
            .then(data => {
                if(data) {
                    res.status(200).json({ The_number_of_destroyed_rows: data})
                }else {
                    throw {
                        status: 400,
                        message: { error: "UserProduct not found" }
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static history (req, res, next) {
        let UserId = req.dataUser.id
        
        UserProduct.findAll({
            where: {
                UserId,
                status: true
            },
            include: Product,
            order: [['updatedAt','DESC']]
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }
    
}

module.exports = ControllerUserProduct