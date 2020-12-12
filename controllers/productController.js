const {Product, Category} = require('../models/index')

class ProductController {
    static async createProduct(req, res, next){
        try {
            let category = await Category.findOne({
                where: {
                    name: req.body.categoryName
                }
            })
            let obj = {
                name: req.body.name,
                image_url: req.body.image_url,
                price: req.body.price,
                stock: req.body.stock,
                CategoryId: category.id
            }
            let data = await Product.create(obj)
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async getAllProduct(req, res, next){
        try {
            let data = await Product.findAll({
                include: {
                    model: Category
                }
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async getProductById(req, res, next){
        try {
            let id = req.params.id
            let data = await Product.findOne({
                where: {
                    id
                }
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    
    static async editProduct(req, res, next){
        try {
            let category = await Category.findOne({
                where: {
                    name: req.body.categoryName
                }
            })
            let obj = {
                name: req.body.name,
                image_url: req.body.image_url,
                price: req.body.price,
                stock: req.body.stock,
                CategoryId: category.id
            }
            let id = req.params.id
            let data = await Product.update(obj, {
                where: {
                    id
                },
                returning: true
            })
            res.status(200).json(data[1][0])
        } catch (error) {
            next(error)
        }
    }
    
    static async updateStock(req, res, next){
        try {
            let id = req.params.id
            let data = await Product.update({stock: req.body.stock}, {
                where: {
                    id
                },
                returning: true
            })
            res.status(200).json(data[1][0])
        } catch (error) {
            next(error)
        }
    }
    static async deleteStock(req, res, next){
        try {
            let id = req.params.id
            let data = await Product.destroy({
                where: {
                    id
                }
            })
            res.status(200).json({message: `delete success`})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductController