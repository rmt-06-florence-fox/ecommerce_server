const { Product } = require('../models')

class ProductController{
    static async getProduct(req,res,next){
        try {
            let allProducts = await Product.findAll({
                order: [['id','ASC']]
            })
            res.status(200).json({products:allProducts})
        } catch (err) {
            next(err)
        }
    }
    static async postProduct(req,res,next){
        let obj = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: Number(req.body.price),
            stock: Number(req.body.stock),
            category: req.body.category
        }
        try {
            let newProduct = await Product.create(obj)
            res.status(201).json({ products : newProduct})
        } catch (err) {
            next(err)
        }
    }
    static async putProduct(req,res,next){
        let obj = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: Number(req.body.price),
            stock: Number(req.body.stock),
            category: req.body.category
        }
        let id = req.params.id
        try {
            console.log(req.params, '<-----params');
            console.log(id , '<---- id');
            let targetProduct = await Product.findOne({
                where:{
                    id:id
                }
            })
            if(targetProduct){
                let editProduct = await Product.update(obj,{
                    where: {
                        id:id
                    },
                    returning: true
                })
                res.status(200).json({ products : editProduct[1][0]})
            }else{
                throw {
                    status: 404,
                    message: 'error product not found'
                }
            }
        } catch (err) {
            next(err)
        }
    }
    static async deleteProduct(req,res,next){
        let id = req.params.id
        try {
            let targetProduct = await Product.findOne({
                where:{
                    id:id
                }
            })
            if(targetProduct){
                let deleteProduct = await Product.destroy({
                    where:{
                        id:id
                    }
                })
                res.status(200).json({message:'products deleted'})
            }else{
                throw {
                    status: 404,
                    message: 'error product not found'
                }
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = ProductController