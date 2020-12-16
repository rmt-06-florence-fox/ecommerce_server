const { Product } = require("../models/index")

class ControllerProduct {

    static showAllData(req, res, next) {
        Product.findAll()
            .then(data => {
                res.status(200).json({data: data})
            })
            .catch(err => {
                next(err)
            })
    }

    static getDataById(req, res, next) {
        let id = req.params.id
        Product.findOne({
            where: {
                id
            }
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static createDataProduct(req, res, next) {  
        let objProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            CategorieId: req.body.CategorieId
        }
        console.log(objProduct)
        Product.create(objProduct)
            .then(data => {
                // console.log(data)
                res.status(201).json(data)
            })
            .catch(err => {
                console.log(err, '------')
                next(err)
            })
    }

    static updateProduct(req, res, next) {
        let id = req.params.id
        let objProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: +req.body.price,
            stock: +req.body.stock
        }

        Product.update(objProduct, {
            where: {
                id
            },
            returning: true
        })
            .then(data => {
                res.status(200).json(data[1][0].dataValues)
            })
            .catch(err => {
                next(err)
            })

    }

    static deleteProduct(req, res, next) {
        let id = req.params.id

        Product.destroy({
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
                        message: { error: "Product not found" }
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ControllerProduct