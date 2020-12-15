const { Product, Category } = require('../models/index')

class ProductController{
    static listProducts(req, res, next){
        Product.findAll({
            include: Category
        })
        .then(data=>{
            res.status(200).json({data: data})
        })
        .catch(e=>{
            next(e)
        })
    }
    static addProduct(req, res, next){
        const obj = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.create(obj)
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(e=>{
            next(e)
        })
    }
    static editProduct(req, res, next){
        const id = req.params.id
        const obj = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.update(obj, {
            where:{
                id
            },
            returning: true
        })
        .then(data=>{
            if(!data || data[0]==0){
                throw {
                    status: 404,
                    message: `data not found`
                }
            } else {
                res.status(200).json(data[1][0])
            }
        })
        .catch(e=>{
            next(e)
        })
    }
    static filterId(req, res, next){
        const id = req.params.id
        Product.findByPk(id, {
            include: Category
        })
        .then(data=>{
            if(!data){
                throw{
                    status: 404,
                    message: `data not found`
                }
            } else {
                res.status(200).json(data)
            }
        })
        .catch(e=>{
            next(e)
        })
    }
    static deleteId(req, res, next){
        const id = req.params.id
        Product.destroy({
            where:{
                id
            }
        })
        .then(data=>{
            if(!data){
                throw {
                    status: 404,
                    message: `data not found`
                }
            } else {
                res.status(200).json({message: `Product success to delete`})
            }
        })
        .catch(e=>{
            next(e)
        })
    }
    static patchProduct(req, res, next){
        const id = req.params.id
        const obj = {
            stock: req.body.stock
        }
        Product.update(obj, {
            where: {
                id
            },
            returning: true
        })
        .then(data=>{
            if(!data || data[0]==0){
                throw {
                    status: 404,
                    message: `data not found`
                }
            } else {
                res.status(200).json(data[1][0])
            }
        })
        .catch(e=>{
            next(e)
        })
    }
    static deleteStock(req, res, next){
        Product.destroy({
            where: {
                stock: 0
            }
        })
        .then(data => {
            res.status(200).json({message: `Product success to delete`})
        })
        .catch(e => next(e))
    }
}

module.exports = ProductController