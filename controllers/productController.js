const { Product } = require("../models/index")

class ProductController {
    static add (req,res, next) {
        const { name, description,  price, stock, image } = req.body
        Product.create({name, description,  price, stock, image}, {returning: true})
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            next(err)
        })
    }
    static list (req,res, next) {
        Product.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
    static edit (req, res, next) {
        const { name, description,  price, stock, image } = req.body
        // console.log(title, description, status, due_date)
        // console.log(req.body)
        Product.update({
            name,
            description,
            price,
            stock,
            image
        }, {
            where :{
                id: req.params.id
            }, returning: true
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            // console.log(err, "masuk ke error bro")
            next(err)
        })
    }
    static findOne(req, res, next){
        Product.findOne({where :{id: req.params.id}}, {returning: true})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }
    static update(req, res, next){
        const { stock } = req.body
        // console.log(req.body)
        Product.update({
            stock
        }, {
            where :{
                id: req.params.id
            }, returning: true
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
    static delete(req,res, next){
        Product.destroy({where:{id: req.params.id}})
        .then(() => {
            res.status(204).send({msg: "Product success to delete"})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = ProductController