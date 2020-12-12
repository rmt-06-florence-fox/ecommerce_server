const { Product } = require("../models")

class ProductController {
    static addProduct(req, res, next) {
        Product.create({
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static getProduct(req, res, next) {
        // res.send("halooo")
        Product.findAll()
            .then(data => {
                // if (data.lenght === 0) {
                //     next({
                //         name: "DataNotFound"
                //     })
                // } else {
                // }
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static getOneProduct(req, res, next) {
        const id = req.params.id
        Product.findOne({
            where: {
                id
            }
        })
            .then(data => {
                if(data) {
                    res.status(200).json(data)
                } else {
                    next({name: "DataNotFound"})
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static updateProduct(req, res, next) {
        // console.log(req.params.id,"HAiiiiii")
        // res.status(200).json("HAiiiiii")
        const id = req.params.id
        Product.update({
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }, {
            where: { id: id },
            returning: true
        })
            .then(data => {
                if(data[1][0]) {
                    res.status(200).json(data[1][0])
                } else {
                    next({name: "DataNotFound"})
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteProduct(req, res, next) {
        // res.status(200).json("hao")
        const id = req.params.id
        Product.destroy({
            where: {
                id
            }
        })
            .then(data => {
                if(data) {
                    res.status(200).json({msg: "Success Delete"})
                } else {
                    next({name: "DataNotFound"})
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ProductController