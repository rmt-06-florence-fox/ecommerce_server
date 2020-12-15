const { UserProduct, Product } = require('../models')

class ControllerUserProduct {

    static showDataUserProduct (req, res, next) { // nampilin data yang dimiliki Customer
        const idUser = req.dataUser.id
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

    static deleteDataUserProduct (req, res, next) {
        let id = req.params.id
        UserProduct.destroy({
            where: {
                id
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
}

module.exports = ControllerUserProduct