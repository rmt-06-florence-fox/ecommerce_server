const { UserProduct, Product, sequelize } = require('../models')

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
        let productId = req.params.productId
        console.log(productId)
        let quantity = 1
        let status = false
        let cartData = null
        let quantityProduct = null

        let objUserProduct = {
            UserId: idUser,
            ProductId: productId,
            quantity,
            status
        }
        UserProduct.findOne({
            where: {
                ProductId: productId,
                UserId: idUser
            }
        })
          .then(data => {
            cartData = data
                return Product.findOne({
                     where: {
                        id: productId
                    }
                })
          })
          .then(data => {
            quantityProduct = data.stock
            if(!cartData) {
                return UserProduct.create(objUserProduct)
            }else {
                let quantityWillUpdate = cartData.quantity
                if (quantityWillUpdate === quantityProduct) {
                    throw {
                        message: "The quantity exceeds stock"
                    }
                }else if (quantityWillUpdate <= quantityProduct) {
                    return UserProduct.increment('quantity', {
                        by: 1,
                        where: {
                            ProductId: productId,
                            UserId: idUser
                        }
                    })
                }
            }
          })
          .then(data => {
                if(!cartData) {
                    res.status(201).json({ message: 'Succesed create ProductId' })
                }else {
                    res.status(200).json({ message: 'Succesed add quantity' })
                }
          })
          .catch(err => {
                next(err)
          })
    }

    static incrementQuantityDataUserProduct (req, res, next) {
        let id = req.params.productId
        
        UserProduct.findOne({
            where: {
                id
            },
            include: Product,
            order: [['createdAt', 'ASC']]
        })
            .then(data => {
                if(data.Product.stock === data.quantity) {
                    throw {
                        message: "The quantity exceeds stock"
                    }
                }else {
                    return UserProduct.increment('quantity', {
                                by: 1,
                                where: {
                                    id
                                }
                            })
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
        let id = req.params.productId

        UserProduct.findOne({
            where: {
                id
            },
            include: Product,
            order: [['createdAt', 'ASC']]
        })
            .then(data => {
                console.log(data.quantity)
                console.log(data.Product.stock)
                if(data.quantity === 1) {
                    throw {
                        message: "can't be decrement again"
                    }
                }else {
                    return UserProduct.decrement('quantity', {
                        by: 1,
                        where: {
                            id
                        }
                    })
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
        let id = req.params.productId
        let UserId = req.dataUser.id
        UserProduct.destroy({
            where: {
                id,
                UserId,
                status: false
            }
        })
            .then(data => {
                console.log('11111')
                if(data) {
                    console.log('222')
                    res.status(200).json({ The_number_of_destroyed_rows: data})
                }else {
                    console.log('3333')
                    throw {
                        status: 400,
                        message: { error: "UserProduct not found" }
                    }
                }
            })
            .catch(err => {
                console.log('444')
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

    // Sequelize transaction v6
    static async checkout (req, res, next) {
        try {
            let UserId = req.dataUser.id
            let t = await sequelize.transaction()
            const userProduct = await UserProduct.findAll({
                where: {
                    UserId, status: false
                }
            }, {
                transaction: t
            })
            for (const item of userProduct) {
                const product = await Product.findByPk(item.ProductId)
                if(item.quantity > product.stock) {
                    throw {name: 'MaximumAmountExceeded'}
                }else {
                    let stock = product.stock - item.quantity
                    await Product.update({stock}, {where: {id: item.ProductId}})
                    await UserProduct.update({status: true}, {where: { UserId, ProductId: item.ProductId, status: false}})
                }
            }
            t.afterCommit(() => {
                return res.status(200).json({message: 'Success update stock'})
            })
            await t.commit()
        }
        catch(err){
        // console.log(err)
        await t.rollback()
        next(err)
        }
    }
}

module.exports = ControllerUserProduct