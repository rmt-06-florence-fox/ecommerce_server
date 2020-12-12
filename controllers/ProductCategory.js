const { ProductCategory } = require('../models/index')

class ProductCategoryController{
    static add(req, res, next) {
        const obj = {
            ProductId: req.body.ProductId,
            CategoryId: req.body.CategoryId
        }
        ProductCategory.create(obj)
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(e=>{
            next(e)
        })
    }
    static edit(req, res, next){
        const id = req.params.id
        const obj = {
            ProductId: req.body.ProductId,
            CategoryId: req.body.CategoryId
        }
        ProductCategory.update(obj, {
            where:{
                ProductId: id
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
}

module.exports = ProductCategoryController