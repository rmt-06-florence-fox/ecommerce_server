const { Product, Chart } = require("../models")

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
                    // res.status(200).json(data)
                    res.status(200).json({msg: "Success Delete"})
                } else {
                    next({name: "DataNotFound"})
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static addChart(req, res, next) {
        const id = req.params.idChart
        console.log(id)
        
        let product
        let productMax

        Product.findOne({where: {id}})
            .then(data => {
                product = data
                return Chart.findOne({where: {ProductId: id}})
            })
            .then(data => {
                // console.log(product)
                // console.log(data, "bukan null")
                if (data) {
                    if(data.quantity < product.stock) {
                        return Chart.increment('quantity', {where: {id: data.id}})
                    } else {
                        productMax = 'tidak bisa melibihi batas maximum' 
                    }
                } else {
                    return Chart.create({
                        name: product.name,
                        image_url: product.image_url,
                        price: product.price,
                        quantity: 1,
                        UserId: req.LoginUser.id,
                        ProductId: product.id
                    })
                }
            })
            .then(data => {
                if (productMax) {
                    res.status(401).json({msg: 'tidak bisa melibihi batas maximum'})
                } else if (Array.isArray(data)) {
                    res.status(201).json(data[0][0][0])
                } else {
                    res.status(201).json(data)
                }
            })
            .catch(err => {
                res.status(200).json(err)
                console.log(err)
            })
    }

    static getAllChart(req, res, next) {
        Chart.findAll({where: {UserId: req.LoginUser.id}})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
                console.log(err)
            })
    }

    static decrementChart(req, res, next) {
        const idChart = req.params.idChart
        let productMin

        Chart.findOne({where: {id: idChart}})
            .then(data => {
                if (data.quantity > 0) {
                    return Chart.decrement('quantity', {where: {id: data.id}})          
                } else {
                    productMin = 'tidak bisa melibihi batas minimum'
                }
            })
            .then(data => {
                if (productMin) {
                    res.status(401).json({msg: 'tidak bisa melibihi batas minimum'})
                } else {
                    res.status(200).json(data[0][0][0])
                }
            })
            .catch(err => {
                res.status(500).json(err)
                console.log(err)
            })
    }

    static incrementChart(req, res, next) {
        const idChart = req.params.idChart
        let productMin

        Chart.findOne({where: {id: idChart}})
            .then(data => {
                if (data.quantity > 0) {
                    return Chart.increment('quantity', {where: {id: data.id}})          
                } else {
                    productMin = 'tidak bisa melibihi batas minimum'
                }
            })
            .then(data => {
                if (productMin) {
                    res.status(401).json({msg: 'tidak bisa melibihi batas minimum'})
                } else {
                    res.status(200).json(data[0][0][0])
                }
            })
            .catch(err => {
                res.status(500).json(err)
                console.log(err)
            })
    }

    static deleteChart(req, res, next) {
        const idChart = req.params.idChart
        Chart.destroy({where: {id: idChart}})
            .then(data => {
                res.status(200).json({msg: "Success Deleted"})
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = ProductController