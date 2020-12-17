const {Category, Product} = require('../models/index')

class CategoryController {
    static async getCategory (req, res, next){
        try {
            let data = await Category.findAll({
                include: {
                    model: Product
                },
                order: [
                    ['name']
                ]
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async getCategoryById (req, res, next){
        try {
            let id = req.params.id
            let data = await Category.findOne({
                where: {
                    id
                },
                include: {
                    model: Product
                }
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async createCategory (req, res, next){
        try {
            let obj = {
                name: req.body.name
            }
            let data = await Category.create(obj)
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CategoryController