const { Product } = require('../models')

class productController {
    static showAll(req, res, next) {
        Product.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json({massage: 'internal server error'})
        })
    }

    static showById(req, res, next) {
        const id = req.params.id
        Product.findById(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json({massage: 'internal server error'})
        })
    }

    static addProduct(req, res, next){
        const newProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }

        Product.create(newProduct)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({massage: 'internal server error'})
        })
    }

    static updateProduct(req, res, next){
        const id = +req.params.id
        let UpdatedProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }

        Product.update(UpdatedProduct, {
            where: {
                id
            }
        })
        .then(data => {
            res.status(200).json(UpdatedProduct)
        })
        .catch(error => {
            res.status(500).json({massage: 'internal server error'})
        })
    }

    static delete(req, res, next){
        const id = +req.params.id
        Product.destroy({
            where: {
                id
            }
        })
        .then(data => {
            res.status(200).json({massage: 'Successfully delete item'})
        })
        .catch(error => {
            res.status(500).json({massage: 'internal server error'})
        })
    }
}

module.exports = productController