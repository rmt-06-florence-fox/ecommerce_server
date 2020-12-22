const { Product, Category } = require('../models/index')

class CategoryController{
    static listCategories(req, res, next){
        Category.findAll({
            include: Product
        })
        .then(data=>{
            res.status(200).json({data: data})
        })
        .catch(e=>{
            next(e)
        })
    }
    static addCategory(req, res, next){
        const obj = {
            category: req.body.category
        }
        Category.create(obj)
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(e=>{
            next(e)
        })
    }
}

module.exports = CategoryController