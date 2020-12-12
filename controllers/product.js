const { Product } = require('../models/index')

class ProductController {
    static async getProducts(req, res, next){
        try {
            const data = await Product.findAll({
                order: [['id', 'ASC']]
            })
            res.status(200).json({data})
            
        } catch (error) {
            next(error)
        }
    }

    static async getProductById(req, res, next){
        const id = req.params.id
        try {
            const data = await Product.findByPk(id)
            if(data){
                res.status(200).json(data)
            }else{
                throw {
                    status: 404,
                    message: 'Data not found'
                }
            }
        } catch (error) {
            next(error)
        }
    }
    
    static async addProduct(req, res, next){
        const newProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        try {
           const data = await Product.create(newProduct)
           res.status(201).json(data)
        } catch (error) {
            console.log(error.name)
            next(error)
        }
    }

    static async editProduct(req, res, next){
        const id = req.params.id
        const updatedProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        try {
            const data = await Product.update(updatedProduct,{
                where:{
                    id: id
                },
                returning: true
            })
            if(data[1].length > 0){
                console.log(data[1][0].dataValues)
                res.status(200).json({data: data[1][0].dataValues})
            }else{
                throw {
                    status: 404,
                    message: 'Id not found'
                }
            }
        } catch (error) {
            next(error)
        }
    }

    static async deleteProduct(req, res, next){
        const id = req.params.id
        console.log(req.loggedInUser)
        try {
            const data = await Product.destroy({
                where: {
                    id: id
                }
            })
            if(data){
                res.status(200).json({message: `Task success to delete`})
            }else{
                throw {
                    status: 404,
                    message: 'Id not found'
                }
            }
        } catch (error) {
            next(error)
        }
    }
}


module.exports = ProductController