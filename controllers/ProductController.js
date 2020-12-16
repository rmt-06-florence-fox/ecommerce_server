const { Product } = require("../models")
const { User } = require("../models")

class ProductController {
    static showProduct(req,res,next){
        Product.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            next(error)
        })
    }

    static create(req,res,next){
        const obj = {
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.create(obj)
        .then(data => {
            res.status(201).json({
                id: data.id,
                name: data.name,
                imageUrl: data.imageUrl,
                price: data.price,
                stock: data.stock
            })
        })
        .catch (error => {
            next(error)
        })
    }


    static update(req,res,next){
        const obj = {
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.update(obj,{where: {id: req.params.id}})
        .then(data2 => {
            return Product.findOne({where: {id: req.params.id}})
            .then(data3 => {
                res.status(201).json({
                    name: data3.name,
                    imageUrl: data3.imageUrl,
                    price: data3.price,
                    stock: data3.stock
                })
            })
        })           
        .catch (error => {
            next(error)
        })
    }


    static delete(req,res,next){
        Product.destroy({where: {id: req.params.id}})
        .then(data => {
            res.status(200).json({message: "Product deleted"})
        })
        .catch (error => {
            next(error)
        })
    }
}

module.exports = ProductController