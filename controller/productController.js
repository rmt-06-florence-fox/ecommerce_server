const { Product } = require('../models')


class ProductContoller{

    static async getAllProduct(req,res,next){
        try {
            const getAllData = await Product.findAll()

            if(getAllData){
                res.status(200).json({
                    data : getAllData
                })
            }
            else {
                res.status(400).json({
                    message : 'Bad request'
                })
            }
            
        } catch (error) {
            next(error)
        }
    }

    static async addNewProduct(req,res,next){
        const newProduct = {
            name : req.body.name,
            image_url : req.body.image_url,
            price : req.body.price,
            stock : req.body.stock
        }

        try {
            const addProduct =  await Product.create(newProduct)
            res.status(201).json(addProduct)


        } catch (error) {
            next(error)
        }
    }

    static async destroyProduct(req,res,next){
        const id = req.params.id
        try {
            const deleteProduct = await Product.destroy({
                where : {
                    id:id
                }
            })

            res.status(200).json({
                message : "succes delete product"
            })
        } catch (error) {
            next(error)
        }
    }

    static async replaceProduct(req,res,next){
        const id = req.params.id
        const updatedProduct = {
            name : req.body.name,
            image_url : req.body.image_url,
            price : req.body.price,
            stock : req.body.stock
        }

        try {
            const replaceData = await Product.update(updatedProduct, {
                where : {
                    id
                }
            })
            res.status(200).json({
                message : 'succes modified'
            })
        } catch (error) {
            next(error)
        }
    }
}


module.exports = ProductContoller