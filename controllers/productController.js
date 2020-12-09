const { Product } = require('../models')

class ProductController{
    static create(req, res, next){
        const { name, imageUrl, price, stock } = req.body
        Product.create({
            name, imageUrl, price, stock
        })
            .then(product => {
                res.status(201).json(product)
            })
            .catch(err => {
                next(err)
            })
    }

    static update(req, res, next){
        const { name, imageUrl, price, stock } = req.body
        Product.update({
            name, imageUrl, price, stock
        }, {
            where : {
                id: +req.params.id
            }   
        })
            .then(response => {
                res.status(200).json({message: 'Data success updated'});
            })
            .catch(err => {
                next(err)
            })
    }

    static getProducts(req, res, next){
        Product.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static delete(req, res, next){
        Product.destroy({
            where: {
                id: +req.params.id
            }
        })
            .then(data => {
                console.log('masuk', data);
                res.status(200).json({message: "Data success deleted"})
            })
            .catch(err => {
                console.log(err);
                next(err)
            })
    }
}

module.exports = ProductController